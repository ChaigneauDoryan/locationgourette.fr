'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface AvailabilityPeriod {
  id: string;
  start_date: string;
  end_date: string;
  is_available: boolean;
}

export default function AvailabilityPeriodForm() {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);
  const [periods, setPeriods] = useState<AvailabilityPeriod[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  useEffect(() => {
    fetchPeriods();
  }, []);

  const fetchPeriods = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('availabilities')
      .select('id, start_date, end_date, is_available')
      .order('start_date', { ascending: false });

    if (error) {
      console.error('Error fetching periods:', error);
      setMessage('Erreur lors du chargement des périodes.');
    } else {
      setPeriods(data || []);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!startDate || !endDate) {
      setMessage('Veuillez sélectionner une date de début et de fin.');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setMessage('La date de début ne peut pas être après la date de fin.');
      return;
    }

    const { data: existingPeriods, error: fetchError } = await supabase
      .from('availabilities')
      .select('id, start_date, end_date')
      .lt('start_date', endDate) // existing_start < new_end
      .gt('end_date', startDate); // existing_end > new_start

    if (fetchError) {
      console.error('Error checking for overlapping periods:', fetchError);
      setMessage('Erreur lors de la vérification des périodes existantes.');
      return;
    }

    if (existingPeriods && existingPeriods.length > 0) {
      setMessage("La période que vous essayez d'ajouter chevauche une période existante.");
      return;
    }

    // Si aucune période ne chevauche, procéder à l'insertion
    const { error } = await supabase
      .from('availabilities')
      .insert([{ start_date: startDate, end_date: endDate, is_available: isAvailable }]);

    if (error) {
      console.error('Error saving period:', error);
      setMessage(`Erreur lors de la sauvegarde de la période: ${error.message}`);
    } else {
      setMessage('Période sauvegardée avec succès !');
      setStartDate('');
      setEndDate('');
      fetchPeriods(); // Refresh the list
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette période ?')) {
      const { error } = await supabase
        .from('availabilities')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting period:', error);
        setMessage(`Erreur lors de la suppression: ${error.message}`);
      } else {
        setMessage('Période supprimée avec succès.');
        fetchPeriods(); // Refresh the list
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Configurer une période de disponibilité</h2>
      <form onSubmit={handleSave} className="mb-8 p-4 border rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="start_date" className="block text-gray-700 text-sm font-bold mb-2">Date de début:</label>
            <input
              type="date"
              id="start_date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="end_date" className="block text-gray-700 text-sm font-bold mb-2">Date de fin:</label>
            <input
              type="date"
              id="end_date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Statut de la période:</label>
          <select
            value={isAvailable ? 'available' : 'unavailable'}
            onChange={(e) => setIsAvailable(e.target.value === 'available')}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="available">Disponible</option>
            <option value="unavailable">Non disponible</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ajouter la période
        </button>
      </form>

      {message && <p className="text-sm text-green-500 mb-4">{message}</p>}

      <h3 className="text-xl font-bold mb-4">Périodes existantes</h3>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="space-y-2">
          {periods.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-2 border rounded-lg">
              <span>
                Du <strong>{formatDate(p.start_date)}</strong> au <strong>{formatDate(p.end_date)}</strong> -{' '}
                <span className={p.is_available ? 'text-green-600' : 'text-red-600'}>
                  {p.is_available ? 'Disponible' : 'Non disponible'}
                </span>
              </span>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}