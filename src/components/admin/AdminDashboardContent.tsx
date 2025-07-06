'use client';

import React from 'react';

export default function AdminDashboardContent() {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Fonctionnalités d'administration</h2>
      <ul>
        <li className="mb-2">
          <a href="/admin/useful-addresses" className="text-blue-500 hover:underline">Gérer les adresses utiles</a>
        </li>
        <li className="mb-2">
          <a href="/admin/availabilities" className="text-blue-500 hover:underline">Gérer les disponibilités</a>
        </li>
      </ul>
    </div>
  );
}
