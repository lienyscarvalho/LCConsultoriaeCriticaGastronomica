import { GoogleGenAI } from "@google/genai";

// Fix: Always use process.env.API_KEY directly and with the named parameter object.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGastronomicCritique = async (menuItems: string, style: string) => {
  // Fix: Call generateContent directly on ai.models.
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Atue como a especialista Lienys Carvalho da LC Consultoria e Crítica Gastronômica. 
    Analise o seguinte menu do estilo ${style} e forneça uma crítica técnica, construtiva e elegante:
    Menu: ${menuItems}`,
    config: {
      temperature: 0.7,
      systemInstruction: "Você é Lienys Carvalho, uma consultora gastronômica sênior e crítica renomada. Seu foco é excelência operacional, equilíbrio de sabores, sofisticação e rentabilidade estratégica (Menu Engineering)."
    }
  });
  // Fix: response.text is a property, not a method.
  return response.text;
};

export const getSafetyAdvice = async (issue: string) => {
  // Fix: Call generateContent directly on ai.models.
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Forneça orientações técnicas de segurança alimentar (ANVISA/POP) seguindo os padrões de rigor da LC Consultoria para o seguinte problema: ${issue}`,
    config: {
        systemInstruction: "Você é um especialista técnico da LC Consultoria e Crítica Gastronômica, especializado em vigilância sanitária e POPs de segurança alimentar de alto padrão."
    }
  });
  // Fix: response.text is a property, not a method.
  return response.text;
};
