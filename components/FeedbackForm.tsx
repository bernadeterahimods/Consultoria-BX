
import React, { useState } from 'react';
import { FEEDBACK_CATEGORIES } from '../constants';
import { FeedbackCategory } from '../types';

export const FeedbackForm: React.FC = () => {
  const [category, setCategory] = useState<FeedbackCategory>(FeedbackCategory.SAUDE);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setError('Por favor, escreva sua mensagem antes de enviar.');
      return;
    }
    setError('');
    console.log({ category, message });
    setIsSubmitted(true);
    setMessage('');
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-200 h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Ouvidoria do Cidadão</h2>
      <p className="text-sm text-gray-500 mb-6">Seu feedback é fundamental para melhorar nossos serviços. Conte-nos sua experiência.</p>
      
      {isSubmitted ? (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
          <p className="font-bold">Mensagem Enviada!</p>
          <p>Agradecemos sua contribuição. Sua voz ajuda a construir uma Cavalcante melhor.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Área do Serviço</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as FeedbackCategory)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
            >
              {FEEDBACK_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Sua Mensagem</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full text-base border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              placeholder="Descreva sua sugestão, elogio ou reclamação aqui..."
            ></textarea>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Enviar Feedback
          </button>
        </form>
      )}
    </div>
  );
};
