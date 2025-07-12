import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Non Trouvée</h2>
      <p className="text-lg mb-8">Désolé, la page que vous recherchez n&apos;existe pas.</p>
      <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
