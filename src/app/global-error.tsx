'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
          <h2 className="text-6xl font-bold text-red-500">Erreur Globale</h2>
          <h2 className="text-2xl font-semibold mb-4">Une erreur est survenue.</h2>
          <p className="text-lg mb-8">{error.message}</p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}