'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Availability {
  date: string;
  is_available: boolean;
}

export default function WeeklyAvailabilityConfig() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);

  useEffect(() => {
    fetchAvailabilities();
  }, []);

  const fetchAvailabilities = async () => {
    const { data, error } = await supabase
      .from('availabilities')
      .select('date, is_available');

    if (error) {
      console.error('Error fetching availabilities:', error);
      setMessage('Erreur lors du chargement des disponibilités.');
    } else {
      setAvailabilities(data || []);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!selectedDate) {
      setMessage('Veuillez sélectionner une date.');
      return;
    }

    const { data, error } = await supabase
      .from('availabilities')
      .upsert({ date: selectedDate, is_available: isAvailable }, { onConflict: 'date' });

    if (error) {
      console.error('Error saving availability:', error);
      setMessage('Erreur lors de la sauvegarde de la disponibilité.');
    } else {
      setMessage('Disponibilité sauvegardée avec succès !');
      fetchAvailabilities(); // Refresh the list
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Configurer les disponibilités hebdomadaires</h2>
      <form onSubmit={handleSave} className="mb-4">
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
          <input
            type="date"
            id="date"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Statut:</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAvailable"
              className="mr-2 leading-tight"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
            />
            <label htmlFor="isAvailable" className="text-sm">Disponible</label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sauvegarder
        </button>
      </form>

      {message && <p className="text-sm text-green-500 mb-4">{message}</p>}

      <h3 className="text-xl font-bold mb-2">Disponibilités existantes:</h3>
      <ul className="list-disc list-inside">
        {availabilities.map((item) => (
          <li key={item.date} className="mb-1">
            {item.date}: {item.is_available ? 'Disponible' : 'Non disponible'}
          </li>
        ))}
      </ul>
    </div>
  );
}
