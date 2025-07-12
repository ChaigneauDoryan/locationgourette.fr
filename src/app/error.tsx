'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void; }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h2 className="text-6xl font-bold text-red-500">500</h2>
      <h2 className="text-2xl font-semibold mb-4">Quelque chose s&apos;est mal passé !</h2>
      <p className="text-lg mb-8">Nous sommes désolés pour le désagrément. Veuillez réessayer plus tard.</p>
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        onClick={() => reset()}
      >
        Réessayer
      </button>
    </div>
  );
}
