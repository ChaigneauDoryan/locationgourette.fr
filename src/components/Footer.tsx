import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8 mt-16">
      <div className="container mx-auto text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Location Gourette. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
