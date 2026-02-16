
import React, { useState } from 'react';
import { getGastronomicCritique } from '../services/geminiService.ts';

interface AIConsultantProps {
  onAction?: (msg?: string) => void;
}

const AIConsultant: React.FC<AIConsultantProps> = ({ onAction }) => {
  const [menuItems, setMenuItems] = useState('');
  const [style, setStyle] = useState('Casual Dinning');
  const [loading, setLoading] = useState(false);
  const [critique, setCritique] = useState<string | null>(null);

  const handleConsult = async () => {
    if (!menuItems.trim()) return;
    setLoading(true);
    try {
      const result = await getGastronomicCritique(menuItems, style);
      setCritique(result || 'Não foi possível gerar a crítica no momento.');
    } catch (error) {
      setCritique('Erro ao conectar com o servidor da LC Consultoria.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h2 className="text-3xl font-serif text-slate-900">Consultoria Digital LC</h2>
        <p className="text-slate-500 mt-1">Acesse a visão técnica de Lienys Carvalho para analisar seu cardápio ou tirar dúvidas operacionais.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 mb-4">Simulador de Crítica</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">Estilo do Negócio</label>
                <select 
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                >
                  <option>Casual Dinning</option>
                  <option>Fine Dinning</option>
                  <option>Italiano Moderno</option>
                  <option>Japonês Fusion</option>
                  <option>Bistrô</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2">Itens do Cardápio / Descrições</label>
                <textarea 
                  rows={6}
                  value={menuItems}
                  onChange={(e) => setMenuItems(e.target.value)}
                  placeholder="Ex: Risoto de cogumelos, Filé au poivre com fritas rústicas..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                ></textarea>
              </div>
              <button 
                onClick={handleConsult}
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-sm transition-all shadow-md cursor-pointer ${
                  loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95'
                }`}
              >
                {loading ? 'Consultando Lienys Carvalho...' : 'Gerar Crítica Técnica'}
              </button>
            </div>
          </div>

          <div className="bg-amber-700 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
             <div className="relative z-10">
                <h4 className="text-lg font-serif italic mb-2">Visita Técnica Presencial</h4>
                <p className="text-xs text-amber-100 mb-4 leading-relaxed">Agende uma auditoria completa com Lienys Carvalho para uma análise 360º de sua operação.</p>
                <button 
                  onClick={() => onAction?.("Redirecionando para solicitação de orçamento via WhatsApp...")}
                  className="bg-white text-amber-800 px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-amber-50 transition-colors cursor-pointer"
                >
                  Solicitar Orçamento
                </button>
             </div>
             <div className="absolute top-0 right-0 w-24 h-24 bg-amber-600 rounded-full -translate-y-12 translate-x-12 opacity-50"></div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm min-h-[500px] flex flex-col">
            <div className="p-4 border-b border-slate-50 bg-slate-50 rounded-t-2xl flex items-center space-x-3">
               <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-white font-serif italic font-bold">LC</div>
               <span className="text-sm font-bold text-slate-800 tracking-tight">Parecer de Lienys Carvalho</span>
            </div>
            <div className="p-8 flex-1 overflow-y-auto">
              {critique ? (
                <div className="prose prose-slate max-w-none animate-fadeIn">
                   <div className="whitespace-pre-wrap text-slate-700 leading-relaxed font-serif text-lg italic">
                     "{critique}"
                   </div>
                   <div className="mt-8 pt-8 border-t border-slate-100 text-xs text-slate-400 font-medium">
                     *Análise baseada nos pilares de excelência da LC Consultoria e Crítica Gastronômica.
                   </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center space-y-4">
                  <svg className="w-16 h-16 opacity-10" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" /></svg>
                  <p className="max-w-xs font-serif italic">Descreva seus pratos ao lado para receber a análise técnica de Lienys Carvalho.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;
