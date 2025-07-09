
'use client';

import { useState } from 'react';

export default function WeeklyAvailabilityConfig() {
  const [week, setWeek] = useState('');
  const [status, setStatus] = useState('available');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique pour sauvegarder la disponibilité hebdomadaire
    console.log({ week, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="week" className="block text-sm font-medium text-gray-700">
          Semaine (par exemple, 2024-W29)
        </label>
        <input
          type="text"
          id="week"
          value={week}
          onChange={(e) => setWeek(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Statut
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="available">Disponible</option>
          <option value="unavailable">Indisponible</option>
          <option value="booked">Réservé</option>
        </select>
      </div>
      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Enregistrer
      </button>
    </form>
  );
}
