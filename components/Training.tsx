
import React, { useState } from 'react';

interface Module {
  id: number;
  title: string;
  team: 'Salão' | 'Cozinha' | 'Gerência' | 'Geral';
  duration: string;
  level: string;
  desc: string;
  content: string[];
}

const MODULES: Module[] = [
  { id: 1, title: 'Excelência em Atendimento', team: 'Salão', duration: '4h', level: 'Fundamental', desc: 'Protocolos de hospitalidade de alto padrão.', content: ['Postura e Fala', 'Abertura de Mesa', 'Serviço de Charola', 'Controle de Fluxo'] },
  { id: 2, title: 'Habilidades de Faca Master', team: 'Cozinha', duration: '6h', level: 'Técnico', desc: 'Precisão e segurança operacional.', content: ['Afiação Básica', 'Cortes Clássicos', 'Organização de Praça', 'Segurança de Lâminas'] },
  { id: 3, title: 'Engenharia de Menu Finanças', team: 'Gerência', duration: '8h', level: 'Estratégico', desc: 'Análise de CMV e precificação.', content: ['Markup vs Margem', 'Cálculo de Quebra', 'Gestão de Fichas Técnicas', 'Matriz de Lucratividade'] },
  { id: 4, title: 'Segurança Alimentar RDC 216', team: 'Geral', duration: '5h', level: 'Obrigatório', desc: 'Normas técnicas ANVISA.', content: ['Contaminações', 'Higiene de Mãos', 'Etiquetagem', 'Controle de Pragas'] },
  { id: 5, title: 'Serviço de Vinhos & Bebidas', team: 'Salão', duration: '5h', level: 'Técnico', desc: 'Sommelieria básica para garçons.', content: ['Tipos de Uvas', 'Abertura de Garrafas', 'Temperatura de Serviço', 'Harmonização'] },
  { id: 6, title: 'Cocção em Baixa Temperatura', team: 'Cozinha', duration: '7h', level: 'Avançado', desc: 'Sous-vide e pasteurização.', content: ['Teoria do Vácuo', 'Tabelas Tempo/Temp', 'Segurança no Resfriamento', 'Finalização de Crosta'] }
];

const Training: React.FC<{ onAction?: (msg?: string) => void }> = ({ onAction }) => {
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [progress, setProgress] = useState(0);

  const handleStart = (m: Module) => {
    onAction?.(`Iniciando Módulo: ${m.title}`);
    setActiveModule(m);
    setProgress(0);
  };

  if (activeModule) {
    return (
      <div className="fixed inset-0 z-[250] bg-white animate-fadeIn flex flex-col">
        <nav className="bg-slate-900 text-white p-4 flex justify-between items-center">
           <div className="flex items-center space-x-4">
              <button onClick={() => setActiveModule(null)} className="p-2 hover:bg-slate-800 rounded-full cursor-pointer"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeWidth={2}/></svg></button>
              <div>
                <p className="text-[10px] font-bold text-amber-500 uppercase">Universidade LC</p>
                <h3 className="text-lg font-bold">{activeModule.title}</h3>
              </div>
           </div>
           <div className="flex items-center space-x-6">
              <div className="hidden md:block text-right">
                 <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Progresso</p>
                 <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
                 </div>
              </div>
              <button 
                onClick={() => { if (progress < 100) setProgress(p => p + 25); else setActiveModule(null); }} 
                className="px-6 py-2 bg-amber-600 rounded-lg text-sm font-bold cursor-pointer hover:bg-amber-700 transition-all"
              >
                {progress === 100 ? "Concluir Aula" : "Próximo Conteúdo"}
              </button>
           </div>
        </nav>

        <div className="flex-1 overflow-y-auto p-6 md:p-12">
           <div className="max-w-4xl mx-auto space-y-10">
              <div className="aspect-video bg-slate-900 rounded-3xl relative overflow-hidden flex items-center justify-center shadow-2xl group cursor-pointer">
                 <img src={`https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200`} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" alt="Treinamento" />
                 <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                       <svg className="w-10 h-10 fill-current translate-x-1" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6V4z"/></svg>
                    </div>
                    <p className="font-bold uppercase tracking-widest text-sm">Iniciar Videoaula Prática</p>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-6">
                    <h4 className="text-xl font-bold border-b pb-2">Tópicos da Lição</h4>
                    <ul className="space-y-4">
                       {activeModule.content.map((item, i) => (
                         <li key={i} className="flex items-center space-x-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <span className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] font-bold">{i+1}</span>
                            <span className="font-medium text-slate-700">{item}</span>
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
                    <h4 className="text-amber-800 font-bold mb-4 uppercase text-xs">Anotações da Consultoria</h4>
                    <p className="text-amber-900 font-serif italic text-lg leading-relaxed">
                       "O segredo da alta performance gastronômica não está apenas no que fazemos, mas na repetição obsessiva da técnica correta."
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h2 className="text-3xl font-serif text-slate-900">Treinamentos Técnicos LC</h2>
        <p className="text-slate-500 mt-1 italic">Capacitação profissional certificada para sua brigada.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MODULES.map(m => (
          <div key={m.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col group">
             <div className="flex justify-between mb-4">
                <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded uppercase">{m.team}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase">{m.duration}</span>
             </div>
             <h4 className="text-lg font-bold mb-2 group-hover:text-amber-700 transition-colors">{m.title}</h4>
             <p className="text-xs text-slate-500 mb-6 flex-1 italic">"{m.desc}"</p>
             <button 
               onClick={() => handleStart(m)}
               className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-amber-700 cursor-pointer shadow-md transition-all active:scale-95"
             >
               Entrar em Aula
             </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Training;
