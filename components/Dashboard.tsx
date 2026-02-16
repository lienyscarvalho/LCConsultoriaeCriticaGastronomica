
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { AppView } from '../types.ts';

interface DashboardProps {
  onAction?: (msg?: string) => void;
  onNavigate?: (view: AppView) => void;
}

const data = [
  { name: 'Seg', rev: 4200, cost: 2400 },
  { name: 'Ter', rev: 3500, cost: 1398 },
  { name: 'Qua', rev: 5200, cost: 3200 },
  { name: 'Qui', rev: 4800, cost: 3100 },
  { name: 'Sex', rev: 6900, cost: 4800 },
  { name: 'Sab', rev: 8100, cost: 3800 },
  { name: 'Dom', rev: 7490, cost: 4300 },
];

const Dashboard: React.FC<DashboardProps> = ({ onAction, onNavigate }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h2 className="text-3xl font-serif text-slate-900">Visão Geral do Negócio</h2>
        <p className="text-slate-500 italic mt-1 font-serif">"A excelência está nos detalhes, a rentabilidade na gestão."</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="CMV Real" value="28.4%" trend="+0.5%" color="bg-blue-50" />
        <StatCard title="Labor Cost" value="18.2%" trend="-1.2%" color="bg-amber-50" />
        <StatCard title="Waste (Desperdício)" value="3.1%" trend="-0.4%" color="bg-emerald-50" />
        <StatCard title="RevPASH" value="R$ 142,00" trend="+8%" color="bg-purple-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold mb-6 text-slate-800">Desempenho Semanal (Receita vs Custo)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b45309" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#b45309" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="rev" stroke="#b45309" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-lg font-semibold mb-4 text-slate-800">Checklist de Segurança</h3>
          <div className="space-y-4 flex-1">
            <CheckItem label="Controle de Temperatura" status="OK" time="10:00" />
            <CheckItem label="Higienização de FLV" status="OK" time="08:30" />
            <CheckItem label="Armazenamento de Proteínas" status="PENDENTE" time="---" warning />
            <CheckItem label="Limpeza de Coifas" status="OK" time="Ontem" />
          </div>
          <button 
            onClick={() => onNavigate?.(AppView.SAFETY_SOP)}
            className="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Ver Todos os POPs
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, color }: any) => (
  <div className={`${color} p-6 rounded-2xl border border-slate-100 transition-transform hover:scale-[1.02]`}>
    <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">{title}</p>
    <div className="flex items-end justify-between">
      <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.startsWith('+') ? 'text-emerald-700 bg-emerald-100' : 'text-rose-700 bg-rose-100'}`}>
        {trend}
      </span>
    </div>
  </div>
);

const CheckItem = ({ label, status, time, warning }: any) => (
  <div className="flex items-center justify-between p-3 border-b border-slate-50 last:border-0">
    <div className="flex items-center space-x-3">
      <div className={`w-2 h-2 rounded-full ${warning ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </div>
    <div className="text-right">
      <p className={`text-[10px] font-bold ${warning ? 'text-amber-600' : 'text-slate-400'}`}>{status}</p>
      <p className="text-[10px] text-slate-400">{time}</p>
    </div>
  </div>
);

export default Dashboard;
