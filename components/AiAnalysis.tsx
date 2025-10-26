import React, { useState } from 'react';
import { generateAnalysis } from '../services/geminiService';
import { CavalcanteData } from '../types';

interface AiAnalysisProps {
  data: CavalcanteData;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-2">
    <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <p className="text-sm text-gray-500">Analisando dados e gerando insights... Isso pode levar alguns segundos.</p>
  </div>
);

interface Segment {
  key: keyof CavalcanteData | 'economyAndQualityOfLife';
  title: string;
}

const analysisSegments: Segment[] = [
  { key: 'health', title: 'Saúde' },
  { key: 'education', title: 'Educação' },
  { key: 'publicSafety', title: 'Segurança Pública' },
  { key: 'sanitation', title: 'Saneamento Básico' },
  { key: 'economyAndQualityOfLife', title: 'Economia e Qualidade de Vida' },
];

export const AiAnalysis: React.FC<AiAnalysisProps> = ({ data }) => {
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeSegment, setActiveSegment] = useState<Segment | null>(null);

  const handleGenerateAnalysis = async (segment: Segment) => {
    if (isLoading) return;

    setIsLoading(true);
    setActiveSegment(segment);
    setError('');
    setAnalysis('');
    try {
      const result = await generateAnalysis(segment.key, data);
      setAnalysis(result);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro desconhecido.');
      setActiveSegment(null); // Reset on error
    } finally {
      setIsLoading(false);
    }
  };

  // FIX: Replaced the simple text renderer with a more robust markdown-to-React parser.
  // This new function correctly handles paragraphs, lists, and bold/italic text,
  // producing semantic HTML that can be styled by the Tailwind 'prose' class.
  const renderFormattedText = (text: string) => {
    // Split text into blocks based on one or more empty lines.
    const blocks = text.split(/\n\s*\n/);
    
    return blocks.map((block, blockIndex) => {
      const trimmedBlock = block.trim();
      if (!trimmedBlock) return null;

      // Inline formatter for bold and italic text.
      const formatInline = (line: string) => {
        const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
        return parts.filter(Boolean).map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={i}>{part.slice(1, -1)}</em>;
          }
          return part;
        });
      };

      // Handle lists (lines starting with - or *)
      if (trimmedBlock.startsWith('- ') || trimmedBlock.startsWith('* ')) {
        const items = trimmedBlock.split('\n');
        return (
          <ul key={blockIndex} className="list-disc pl-5 mb-4 space-y-1">
            {items.map((item, itemIndex) => (
              <li key={itemIndex}>{formatInline(item.replace(/^[-*]\s*/, ''))}</li>
            ))}
          </ul>
        );
      }
      
      // Handle paragraphs
      return <p key={blockIndex} className="mb-4">{formatInline(block)}</p>;
    });
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Análise Proativa para Gestão</h2>
      <p className="text-sm text-gray-500 mb-6">Selecione um segmento para que a Inteligência Artificial gere uma análise focada com ações proativas para a prefeitura.</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {analysisSegments.map((segment) => (
          <button
            key={segment.key}
            onClick={() => handleGenerateAnalysis(segment)}
            disabled={isLoading && activeSegment?.key !== segment.key}
            className={`
              inline-flex justify-center items-center text-center py-2 px-3 border border-transparent shadow-sm text-xs sm:text-sm font-medium rounded-md text-white transition-colors
              ${activeSegment?.key === segment.key && isLoading ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700'}
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
              disabled:bg-gray-400 disabled:cursor-not-allowed
            `}
          >
            Analisar {segment.title}
          </button>
        ))}
      </div>

      {isLoading && <div className="mt-6"><LoadingSpinner /></div>}
      
      {error && (
        <div className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
          <p className="font-bold">Erro</p>
          <p>{error}</p>
        </div>
      )}

      {analysis && activeSegment && (
        <div className="mt-6 prose prose-sm max-w-none text-gray-600 leading-relaxed">
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2 border-b pb-2">
              Relatório de Análise: {activeSegment.title}
            </h3>
            {/* FIX: Removed `whitespace-pre-wrap` as the new render function produces semantic block elements. */}
            <div>{renderFormattedText(analysis)}</div>
        </div>
      )}
    </div>
  );
};
