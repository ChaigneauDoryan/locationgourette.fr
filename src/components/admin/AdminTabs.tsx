'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminTabs() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const router = useRouter();

  const handleTabClick = (tabName: string, path: string) => {
    setActiveTab(tabName);
    router.push(path);
  };

  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => handleTabClick('dashboard', '/admin/dashboard')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'dashboard' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Tableau de bord
          </button>
          <button
            onClick={() => handleTabClick('availabilities', '/admin/availabilities')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'availabilities' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Disponibilités
          </button>
          <button
            onClick={() => handleTabClick('usefulAddresses', '/admin/useful-addresses')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'usefulAddresses' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            Adresses Utiles
          </button>
        </nav>
      </div>

      {activeTab === 'dashboard' && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Fonctionnalités d'administration</h2>
          <ul>
            <li className="mb-2">
              <Link href="/admin/useful-addresses" className="text-blue-500 hover:underline">Gérer les adresses utiles</Link>
            </li>
            <li className="mb-2">
              <Link href="/admin/availabilities" className="text-blue-500 hover:underline">Gérer les disponibilités</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
