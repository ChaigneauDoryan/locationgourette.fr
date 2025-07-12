"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Availability {
  id: string;
  start_date: string;
  end_date: string;
  is_available: boolean;
}

const AvailabilityCalendar = () => {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailabilities = async () => {
      try {
        const { data, error } = await supabase
          .from('availabilities')
          .select('id, start_date, end_date, is_available');

        if (error) {
          throw error;
        }
        setAvailabilities(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailabilities();
  }, []);

  if (loading) return <p className="text-center">Chargement des disponibilités...</p>;
  if (error) return <p className="text-center text-red-500">Erreur: {error}</p>;

  // Fonction pour vérifier la disponibilité d'une date
  const isDateAvailable = (date: Date): boolean => {
    // Créer une date de référence locale pour la comparaison (minuit du jour)
    const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    for (const period of availabilities) {
      if (period.is_available === false) {
        // Parser start_date et end_date comme des dates locales pour éviter les problèmes de fuseau horaire
        const [startY, startM, startD] = period.start_date.split('-').map(Number);
        const start = new Date(startY, startM - 1, startD); // Mois est 0-indexé

        const [endY, endM, endD] = period.end_date.split('-').map(Number);
        const end = new Date(endY, endM - 1, endD); // Mois est 0-indexé

        // Vérifier si la date est dans la période (inclusivement)
        if (checkDate >= start && checkDate <= end) {
          return false; // Non disponible
        }
      }
    }
    return true; // Disponible
  };

  // Générer les mois à afficher (par exemple, les 12 prochains mois)
  const today = new Date();
  const monthsToDisplay = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
    monthsToDisplay.push(date);
  }

  const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  return (
    <section id="disponibilites" className="py-16 bg-gray-100" style={{ scrollMarginTop: '5rem' }}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Calendrier des Disponibilités</h2>
        <p className="text-lg mb-8">
          Consultez les dates disponibles pour votre séjour à Gourette. Les jours en rouge sont non disponibles.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {monthsToDisplay.map((monthDate, monthIndex) => {
            const year = monthDate.getFullYear();
            const month = monthDate.getMonth();
            const firstDayOfMonth = new Date(year, month, 1);
            const lastDayOfMonth = new Date(year, month + 1, 0);
            const numDays = lastDayOfMonth.getDate();

            // Calculer le décalage pour le premier jour de la semaine (Lundi = 0)
            const startDayOffset = (firstDayOfMonth.getDay() + 6) % 7; // Lundi = 0, Mardi = 1, ..., Dimanche = 6

            const days = [];
            // Ajouter des jours vides pour le décalage
            for (let i = 0; i < startDayOffset; i++) {
              days.push(<div key={`empty-${monthIndex}-${i}`} className="p-2"></div>);
            }

            // Ajouter les jours du mois
            for (let i = 1; i <= numDays; i++) {
              const currentDate = new Date(year, month, i);
              const isAvailable = isDateAvailable(currentDate);
              days.push(
                <div
                  key={`${monthIndex}-${i}`}
                  className={`p-2 rounded ${isAvailable ? 'bg-green-200 text-gray-800' : 'bg-red-500 text-white'}`}
                >
                  {i}
                </div>
              );
            }

            return (
              <div key={monthIndex} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">{monthDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}</h3>
                <div className="grid grid-cols-7 gap-2 text-sm">
                  {daysOfWeek.map(day => (
                    <div key={day} className="font-bold text-gray-600">{day}</div>
                  ))}
                  {days}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AvailabilityCalendar;
