"use client";

import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '', // Champ honeypot
  });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Vérification du honeypot
    if (formData.honeypot) {
      setStatus('Spam detected!');
      return;
    }

    // Ici, vous intégreriez l'envoi du formulaire à un service backend (ex: Formspree, Netlify Forms, votre propre API)
    // Pour cet exemple, nous allons juste simuler un envoi réussi.
    console.log('Formulaire soumis:', formData);
    setStatus('Message envoyé avec succès !');
    setFormData({ name: '', email: '', message: '', honeypot: '' }); // Réinitialiser le formulaire
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Contactez-nous</h2>
        <p className="text-lg text-center mb-8">
          Vous avez des questions sur l&apos;appartement ou votre futur séjour ? N&apos;hésitez pas à nous contacter via le formulaire ci-dessous.
        </p>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-gray-100 p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nom :</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email :</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message :</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            ></textarea>
          </div>
          {/* Champ Honeypot - Rendu invisible via CSS */}
          <div style={{ display: 'none' }}>
            <label htmlFor="honeypot">Ne remplissez pas ce champ :</label>
            <input
              type="text"
              id="honeypot"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Envoyer
            </button>
            {status && <p className="text-center text-sm mt-4">{status}</p>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
