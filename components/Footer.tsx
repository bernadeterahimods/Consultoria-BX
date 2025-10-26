
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-12">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Painel Cívico Cavalcante. Todos os direitos reservados.</p>
        <p className="text-xs mt-1">
          Uma iniciativa para promover a transparência e a participação cidadã.
        </p>
      </div>
    </footer>
  );
};
