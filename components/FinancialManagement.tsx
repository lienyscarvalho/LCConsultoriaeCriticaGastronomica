
import React from 'react';

const FinancialManagement: React.FC<{ onAction?: (msg?: string) => void }> = ({ onAction }) => {
  // Valores simulados para demonstração de alertas
  const currentCMV = 32.8; 
  const currentLabor = 22.4;
  const targetCMV = 30.0;
  const targetLabor = 20.0;

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h2 className="text-3xl font-serif text-slate-900">Gestão Financeira LC</h2>
        <p className="text-slate-500 mt-1 italic">Indicadores vitais e alertas de rentabilidade.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPIBox 
          label="CMV Real" 
          value={`${currentCMV}%`} 
          desc={`Alvo: ${targetCMV}%. Alerta: Insumos acima do limite estratégico.`} 
          trend="+2.8%" 
          alert={currentCMV > targetCMV}
        />
        <KPIBox 
          label="Labor Cost" 
          value={`${currentLabor}%`} 
          desc={`Alvo: ${targetLabor}%. Alerta: Escala de equipe precisa de otimização.`} 
          trend="+2.4%" 
          alert={currentLabor > targetLabor}
        />
        <KPIBox label="EBITDA" value="16.5%" desc="Lucratividade operacional do mês." trend="+1.2%" />
        <KPIBox label="Ponto de Equilíbrio" value="R$ 138k" desc="Faturamento mínimo necessário." neutral />
        <KPIBox label="RevPASH" value="R$ 142,00" desc="Receita por assento/hora." trend="+8%" />
        <KPIBox label="Ticket Médio" value="R$ 94,50" desc="Consumo médio por transação." trend="+15%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
           <h3 className="text-xl font-serif italic text-amber-400 mb-8 border-b border-slate-800 pb-4">Estratégias de Lucro LC</h3>
           <div className="space-y-6">
              <StrategyCard title="Engenharia de Menu" text="Pratos 'Cão' devem ser removidos ou reformulados imediatamente para reduzir o CMV global." />
              <StrategyCard title="Gestão de Insumos" text="Otimize o PVPS (Primeiro que Vence, Primeiro que Sai) para reduzir perdas de estoque em 15%." />
              <StrategyCard title="Produtividade da Brigada" text="Treine o salão em 'Upselling' de bebidas para diluir o custo fixo de equipe." />
           </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
           <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">Simulador de Resultado</h3>
           <div className="space-y-4 flex-1">
              <div className="flex justify-between p-3 bg-slate-50 rounded-xl font-bold"><span>Faturamento Bruto</span><span>R$ 220.000,00</span></div>
              <div className="flex justify-between p-2 text-rose-600 border-b border-rose-50 italic"><span>(-) CMV Total</span><span>- R$ 72.160,00</span></div>
              <div className="flex justify-between p-2 text-rose-600 border-b border-rose-50 italic"><span>(-) Labor Cost</span><span>- R$ 49.280,00</span></div>
              <div className="flex justify-between p-2 text-rose-600 border-b border-rose-50 italic"><span>(-) Custos Fixos</span><span>- R$ 38.000,00</span></div>
              <div className="mt-6 pt-4 border-t-2 border-slate-100 flex justify-between items-center">
                 <span className="text-lg font-serif font-bold">LUCRO LÍQUIDO</span>
                 <span className="text-3xl font-serif font-bold text-emerald-600">R$ 60.560,00</span>
              </div>
           </div>
           <button onClick={() => { onAction?.("Gerando Relatório de Fluxo de Caixa..."); window.print(); }} className="mt-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-amber-700 transition-all cursor-pointer">Exportar Cashflow</button>
        </div>
      </div>
    </div>
  );
};

const KPIBox = ({ label, value, desc, trend, neutral, alert }: any) => (
  <div className={`bg-white p-6 rounded-3xl border-2 transition-all hover:scale-105 shadow-sm ${alert ? 'border-rose-400 bg-rose-50 animate-pulse' : 'border-slate-100'}`}>
    <div className="flex justify-between items-start mb-2">
      <p className={`text-[10px] font-bold uppercase tracking-widest ${alert ? 'text-rose-600' : 'text-slate-400'}`}>{label}</p>
      {!neutral && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${trend.startsWith('+') ? (alert ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700') : 'bg-rose-100 text-rose-700'}`}>{trend}</span>}
    </div>
    <div className="flex items-center gap-2 mb-2">
      <p className={`text-4xl font-serif font-bold ${alert ? 'text-rose-800' : 'text-slate-900'}`}>{value}</p>
      {alert && <svg className="w-6 h-6 text-rose-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" /></svg>}
    </div>
    <p className={`text-[10px] leading-tight font-medium ${alert ? 'text-rose-600' : 'text-slate-400'}`}>{desc}</p>
  </div>
);

const StrategyCard = ({ title, text }: any) => (
  <div className="border-b border-slate-800 pb-4 last:border-0">
    <h4 className="text-amber-500 font-bold text-xs mb-1 uppercase">{title}</h4>
    <p className="text-xs text-slate-400 leading-relaxed italic">"{text}"</p>
  </div>
);

export default FinancialManagement;
