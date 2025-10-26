import { GoogleGenAI } from "@google/genai";
import { CavalcanteData, Metric } from '../types';

const formatMetricsForPrompt = (metrics: Metric[]): string => {
  let formattedString = "";
  metrics.forEach(metric => {
      formattedString += `- ${metric.title}: ${metric.value}\n`;
      if (metric.description) {
        formattedString += `  (Descrição: ${metric.description})\n`;
      }
    });
  return formattedString;
}

const getSegmentTitle = (segmentKey: keyof CavalcanteData | 'economyAndQualityOfLife'): string => {
    const titles: { [key: string]: string } = {
        health: 'Saúde',
        education: 'Educação',
        publicSafety: 'Segurança Pública',
        sanitation: 'Saneamento Básico',
        economyAndQualityOfLife: 'Economia e Qualidade de Vida',
    };
    return titles[segmentKey] || 'Análise Geral';
}

export const generateAnalysis = async (
    segmentKey: keyof CavalcanteData | 'economyAndQualityOfLife', 
    data: CavalcanteData
): Promise<string> => {
  // FIX: Check for API key and throw an error if it's missing.
  if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI Analysis will not work.");
    throw new Error("API Key não configurada. A análise por IA está desabilitada.");
  }
  
  // FIX: Initialize GoogleGenAI inside the function to avoid an app crash on startup if the API key is missing.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const segmentTitle = getSegmentTitle(segmentKey);
  let formattedData: string;

  if (segmentKey === 'economyAndQualityOfLife') {
      formattedData = `--- DADOS DE ECONOMIA ---\n${formatMetricsForPrompt(data.economy)}\n--- DADOS DE QUALIDADE DE VIDA ---\n${formatMetricsForPrompt(data.qualityOfLife)}`;
  } else {
      formattedData = formatMetricsForPrompt(data[segmentKey as keyof CavalcanteData]);
  }
    
  const prompt = `
    Aja como um consultor especialista em políticas públicas e gestão municipal, focado em ações proativas para a prefeitura de Cavalcante, Goiás.
    Sua análise deve ser direcionada especificamente para o setor de **${segmentTitle}**.

    **Dados do Setor Fornecidos:**
    ${formattedData}

    **Análise Proativa Solicitada:**

    1.  **Diagnóstico Focado:** Qual é o cenário atual do setor de "${segmentTitle}" em Cavalcante, com base estritamente nos dados fornecidos? Identifique o principal ponto de atenção (gargalo) e a principal fortaleza (potencial).
    2.  **Causas e Consequências:** Para o principal ponto de atenção identificado, quais podem ser as causas subjacentes? Quais são as consequências diretas para a população se nada for feito?
    3.  **Plano de Ação Proativo:** Sugira um plano de ação claro e objetivo para a prefeitura. O plano deve conter:
        *   **2 Ações de Curto Prazo (imediatas, até 3 meses):** Medidas de baixo custo e alto impacto para mitigar o problema principal.
        *   **1 Ação de Médio Prazo (até 1 ano):** Uma iniciativa mais estruturada para resolver a causa raiz do problema.
    4.  **Indicadores de Sucesso:** Como a prefeitura pode medir o sucesso das ações propostas? Sugira 1 ou 2 indicadores-chave de desempenho (KPIs) para monitorar.

    Formate a resposta em Markdown, usando títulos, listas e negrito para organizar a informação de forma clara e direta para um gestor público. A linguagem deve ser objetiva e focada em resultados.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // FIX: Throw an error instead of returning an error string to allow for proper error handling in the UI.
    if (error instanceof Error) {
        throw new Error(`Ocorreu um erro ao gerar a análise: ${error.message}. Verifique a chave de API e a conexão.`);
    }
    throw new Error("Ocorreu um erro desconhecido ao gerar a análise.");
  }
};