
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

const FinancialManagement: React.FC<{ onAction?: (msg?: string) => void }> = ({ onAction }) => {
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'quarter'>('month');

  // Valores simulados para demonstração de alertas
  const currentCMV = 32.8; 
  const currentLabor = 22.4;
  const targetCMV = 30.0;
  const targetLabor = 20.0;

  const handleExport = () => {
    onAction?.("Gerando Relatório de Fluxo de Caixa...");
    
    const csvContent = "Data,CMV,Labor Cost\n" + 
      chartData.map(d => `${d.name},${d.cmv},${d.labor}`).join("\n");
      
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `relatorio_financeiro_${timeFilter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    onAction?.("Relatório exportado com sucesso!");
  };

  // Mock data for charts
  const dataWeek = [
    { name: 'Seg', cmv: 30, labor: 20 },
    { name: 'Ter', cmv: 31, labor: 21 },
    { name: 'Qua', cmv: 29, labor: 19 },
    { name: 'Qui', cmv: 33, labor: 22 },
    { name: 'Sex', cmv: 35, labor: 24 },
    { name: 'Sáb', cmv: 34, labor: 25 },
    { name: 'Dom', cmv: 32, labor: 23 },
  ];

  const dataMonth = [
    { name: 'Sem 1', cmv: 31, labor: 21 },
    { name: 'Sem 2', cmv: 33, labor: 22 },
    { name: 'Sem 3', cmv: 30, labor: 20 },
    { name: 'Sem 4', cmv: 32, labor: 23 },
  ];

  const dataQuarter = [
    { name: 'Mês 1', cmv: 30, labor: 20 },
    { name: 'Mês 2', cmv: 34, labor: 24 },
    { name: 'Mês 3', cmv: 31, labor: 21 },
  ];

  const chartData = timeFilter === 'week' ? dataWeek : timeFilter === 'month' ? dataMonth : dataQuarter;

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-serif text-slate-900">Gestão Financeira LC</h2>
          <p className="text-slate-500 mt-1 italic">Indicadores vitais e alertas de rentabilidade.</p>
        </div>
        <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-100">
          {(['week', 'month', 'quarter'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                timeFilter === filter 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {filter === 'week' ? 'Semana' : filter === 'month' ? 'Mês' : 'Trimestre'}
            </button>
          ))}
        </div>
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

      {/* New Chart Section */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-900">Evolução de Custos (CMV vs Labor)</h3>
          <div className="flex gap-4 text-xs font-bold">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-500"></div>CMV</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-800"></div>Labor</div>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} unit="%" />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <ReferenceLine y={targetCMV} stroke="#f43f5e" strokeDasharray="3 3" label={{ value: 'Meta CMV', fill: '#f43f5e', fontSize: 10, position: 'right' }} />
              <ReferenceLine y={targetLabor} stroke="#1e293b" strokeDasharray="3 3" label={{ value: 'Meta Labor', fill: '#1e293b', fontSize: 10, position: 'right' }} />
              <Bar dataKey="cmv" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={40} />
              <Bar dataKey="labor" fill="#1e293b" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
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
           <button onClick={handleExport} className="mt-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-amber-700 transition-all cursor-pointer">Exportar Cashflow</button>
        </div>
      </div>
    </div>
  );
};

const KPIBox = ({ label, value, desc, trend, neutral, alert }: any) => (
  <div className={`bg-white p-6 rounded-3xl border-2 transition-all hover:scale-105 shadow-sm ${alert ? 'border-rose-500 bg-rose-50 ring-4 ring-rose-100' : 'border-slate-100'}`}>
    <div className="flex justify-between items-start mb-2">
      <p className={`text-[10px] font-bold uppercase tracking-widest ${alert ? 'text-rose-700' : 'text-slate-400'}`}>{label}</p>
      {!neutral && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${trend.startsWith('+') ? (alert ? 'bg-rose-200 text-rose-800' : 'bg-emerald-100 text-emerald-700') : 'bg-rose-100 text-rose-700'}`}>{trend}</span>}
    </div>
    <div className="flex items-center gap-2 mb-2">
      <p className={`text-4xl font-serif font-bold ${alert ? 'text-rose-900' : 'text-slate-900'}`}>{value}</p>
      {alert && <div className="animate-bounce"><svg className="w-6 h-6 text-rose-600" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" /></svg></div>}
    </div>
    <p className={`text-[10px] leading-tight font-medium ${alert ? 'text-rose-700' : 'text-slate-400'}`}>{desc}</p>
  </div>
);

const StrategyCard = ({ title, text }: any) => (
  <div className="border-b border-slate-800 pb-4 last:border-0">
    <h4 className="text-amber-500 font-bold text-xs mb-1 uppercase">{title}</h4>
    <p className="text-xs text-slate-400 leading-relaxed italic">"{text}"</p>
  </div>
);

export default FinancialManagement;
