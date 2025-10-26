
import React from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { FeedbackForm } from './components/FeedbackForm';
import { AiAnalysis } from './components/AiAnalysis';
import { cavalcanteData } from './data/mockData';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <Dashboard data={cavalcanteData} />
        
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <AiAnalysis data={cavalcanteData} />
          <FeedbackForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
