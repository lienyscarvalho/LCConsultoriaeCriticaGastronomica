import React, { useState } from 'react';
import { createPortal } from 'react-dom';

interface Module {
  id: number;
  title: string;
  team: 'Salão' | 'Cozinha' | 'Gerência' | 'Geral';
  duration: string;
  level: string;
  desc: string;
  videoTitle: string;
  content: string[];
  materials: { title: string; type: 'PDF' | 'DOC' | 'XLS'; size: string }[];
}

interface Badge {
  id: number;
  name: string;
  icon: string;
  desc: string;
  earned: boolean;
}

interface Challenge {
  id: number;
  title: string;
  xp: number;
  completed: boolean;
}

const BADGES_DATA: Badge[] = [
  { id: 1, name: 'Primeiros Passos', icon: '🥚', desc: 'Concluiu o primeiro módulo', earned: true },
  { id: 2, name: 'Mestre da Faca', icon: '🔪', desc: 'Concluiu o módulo de Cortes', earned: false },
  { id: 3, name: 'Sommelier Iniciante', icon: '🍷', desc: 'Concluiu o módulo de Vinhos', earned: false },
  { id: 4, name: 'Guardião da Segurança', icon: '🛡️', desc: 'Concluiu RDC 216', earned: true },
];

const CHALLENGES_DATA: Challenge[] = [
  { id: 1, title: 'Assistir 2 aulas esta semana', xp: 150, completed: false },
  { id: 2, title: 'Baixar 3 materiais complementares', xp: 100, completed: true },
  { id: 3, title: 'Gabariar um Quiz final', xp: 300, completed: false },
];

const TEAM_SCORES_DATA = [
  { team: 'Cozinha', score: 12450 },
  { team: 'Salão', score: 11200 },
  { team: 'Gerência', score: 9800 },
];

const MODULES: Module[] = [
  { 
    id: 1, 
    title: 'Excelência em Atendimento', 
    team: 'Salão', 
    duration: '4h', 
    level: 'Fundamental', 
    desc: 'Protocolos de hospitalidade de alto padrão inspirados nas melhores escolas de serviço.', 
    videoTitle: 'A Arte da Hospitalidade: O Ritual de Serviço',
    content: [
      'A Arte da Hospitalidade: Antecipação de Necessidades e Leitura do Cliente', 
      'Protocolos de Serviço à Francesa e Inglesa: Técnicas de Charola e Pinça', 
      'Gestão de Crises e Recovery: Transformando Reclamações em Fidelização', 
      'Vendas Sugestivas (Upselling) e Cross-selling com Elegância',
      'Etiqueta e Postura Corporal: A Linguagem Não-Verbal no Salão'
    ],
    materials: [
      { title: 'Manual de Etiqueta e Postura', type: 'PDF', size: '2.4 MB' },
      { title: 'Script de Vendas Sugestivas', type: 'DOC', size: '150 KB' },
      { title: 'Checklist de Abertura de Salão', type: 'PDF', size: '0.8 MB' }
    ]
  },
  { 
    id: 2, 
    title: 'Habilidades de Faca Master', 
    team: 'Cozinha', 
    duration: '6h', 
    level: 'Técnico', 
    desc: 'Precisão, velocidade e segurança operacional com técnicas francesas clássicas.', 
    videoTitle: 'Taillage: Domine os Cortes Clássicos',
    content: [
      'Anatomia da Faca e Manutenção: Técnicas Avançadas de Afiação (Pedra e Chaira)', 
      'Taillage Clássico Francês: Brunoise, Julienne, Chiffonade e Tourné', 
      'Desossa e Limpeza de Proteínas: Aves, Peixes e Carnes Vermelhas', 
      'Ergonomia e Segurança: Prevenção de Acidentes e Fadiga',
      'Velocidade e Precisão: Otimização do Mise en Place'
    ],
    materials: [
      { title: 'Guia Visual de Cortes Clássicos', type: 'PDF', size: '5.1 MB' },
      { title: 'Tabela de Afiação e Manutenção', type: 'PDF', size: '1.2 MB' }
    ]
  },
  { 
    id: 3, 
    title: 'Engenharia de Menu & Finanças', 
    team: 'Gerência', 
    duration: '8h', 
    level: 'Estratégico', 
    desc: 'Análise de CMV, precificação estratégica e psicologia do consumidor.', 
    videoTitle: 'Matriz de Engenharia de Menu na Prática',
    content: [
      'Psicologia do Menu: Layout, Ancoragem de Preços e Pontos Focais', 
      'Engenharia de Cardápio: Matriz BCG (Estrelas, Burros de Carga, Quebra-Cabeças, Cães)', 
      'Fichas Técnicas Operacionais e Gerenciais: O Controle Absoluto do CMV', 
      'Precificação Estratégica: Além do Markup, o Valor Percebido',
      'Análise de Desperdício e Otimização de Compras'
    ],
    materials: [
      { title: 'Planilha de Engenharia de Menu', type: 'XLS', size: '3.5 MB' },
      { title: 'Modelo de Ficha Técnica Master', type: 'XLS', size: '2.1 MB' },
      { title: 'E-book: Psicologia de Preços', type: 'PDF', size: '4.8 MB' }
    ]
  },
  { 
    id: 4, 
    title: 'Segurança Alimentar RDC 216', 
    team: 'Geral', 
    duration: '5h', 
    level: 'Obrigatório', 
    desc: 'Normas técnicas ANVISA e microbiologia aplicada à segurança dos alimentos.', 
    videoTitle: 'Controle de Contaminação Cruzada',
    content: [
      'Microbiologia Básica: Entendendo os Perigos Biológicos, Químicos e Físicos', 
      'Controle de Temperatura: Zona de Perigo e Cadeia de Frio', 
      'Procedimentos Operacionais Padronizados (POPs): Higiene Pessoal e Ambiental', 
      'Recebimento e Armazenamento: PVPS (Primeiro que Vence, Primeiro que Sai)',
      'Gestão de Resíduos e Controle Integrado de Pragas'
    ],
    materials: [
      { title: 'Manual de Boas Práticas (Modelo)', type: 'DOC', size: '1.8 MB' },
      { title: 'Planilhas de Controle de Temperatura', type: 'XLS', size: '0.5 MB' },
      { title: 'Cartazes de Higienização de Mãos', type: 'PDF', size: '3.2 MB' }
    ]
  },
  { 
    id: 5, 
    title: 'Serviço de Vinhos & Bebidas', 
    team: 'Salão', 
    duration: '5h', 
    level: 'Técnico', 
    desc: 'Sommelieria essencial: do terroir à taça, elevando a experiência do cliente.', 
    videoTitle: 'O Ritual do Vinho: Abertura e Decantação',
    content: [
      'Fundamentos da Enologia: Terroir, Vinificação e Principais Castas', 
      'O Ritual do Serviço: Apresentação, Abertura, Decantação e Aeração', 
      'Técnicas de Degustação e Análise Sensorial para Recomendação', 
      'Harmonização Enogastronômica: Princípios de Semelhança e Contraste',
      'Gestão de Adega: Armazenamento, Rotação e Carta de Vinhos'
    ],
    materials: [
      { title: 'Guia de Harmonização Rápida', type: 'PDF', size: '2.2 MB' },
      { title: 'Ficha de Avaliação Sensorial', type: 'PDF', size: '0.4 MB' }
    ]
  },
  { 
    id: 6, 
    title: 'Cocção em Baixa Temperatura', 
    team: 'Cozinha', 
    duration: '7h', 
    level: 'Avançado', 
    desc: 'Ciência do Sous-vide e pasteurização para texturas perfeitas.', 
    videoTitle: 'Sous-vide: Textura e Sabor Perfeitos',
    content: [
      'Ciência do Sous-Vide: Desnaturação Proteica e Texturas Modificadas', 
      'Equipamentos e Segurança: Termocirculadores e Embaladoras a Vácuo', 
      'Pasteurização e Cook-Chill: Estendendo o Shelf-life com Segurança', 
      'Técnicas de Finalização: Reação de Maillard Pós-Cocção',
      'Infusões e Marinadas Comprimidas: Intensificação de Sabores'
    ],
    materials: [
      { title: 'Tabela de Tempo e Temperatura', type: 'PDF', size: '1.5 MB' },
      { title: 'Receituário Base Sous-vide', type: 'PDF', size: '3.8 MB' }
    ]
  }
];

const Training: React.FC<{ onAction?: (msg?: string) => void }> = ({ onAction }) => {
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filterTeam, setFilterTeam] = useState<string>('Todos');
  const [filterLevel, setFilterLevel] = useState<string>('Todos');
  const [userPoints, setUserPoints] = useState(1250);
  
  // Gamification State
  const [badges, setBadges] = useState<Badge[]>(BADGES_DATA);
  const [challenges, setChallenges] = useState<Challenge[]>(CHALLENGES_DATA);
  const [teamScores, setTeamScores] = useState(TEAM_SCORES_DATA);

  const handleStart = (m: Module) => {
    onAction?.(`Iniciando Módulo: ${m.title}`);
    setActiveModule(m);
    setProgress(0);
    setIsPlaying(false);
  };

  const handleDownloadMaterial = (mat: { title: string }) => {
    onAction?.(`Baixando material: ${mat.title}...`);
    
    // Create a dummy blob to simulate a real file download
    const blob = new Blob([`Conteúdo simulado do material: ${mat.title}\n\nEste é um arquivo gerado automaticamente para demonstrar a funcionalidade de download.`], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${mat.title}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    // Simulate gamification delay
    setTimeout(() => {
      onAction?.(`Download concluído: ${mat.title}`);
      setUserPoints(p => p + 50); // Gamification: points for downloading
      
      // Check for challenge completion (mock logic)
      const challenge = challenges.find(c => c.id === 2);
      if (challenge && !challenge.completed) {
          const newChallenges = challenges.map(c => c.id === 2 ? { ...c, completed: true } : c);
          setChallenges(newChallenges);
          setUserPoints(p => p + challenge.xp);
          onAction?.(`Desafio Concluído: ${challenge.title} (+${challenge.xp} XP)`);
      }
    }, 500);
  };

  const handleClaimChallenge = (challenge: Challenge) => {
      if (challenge.completed) return;
      // Simulate claiming a challenge
      const newChallenges = challenges.map(c => c.id === challenge.id ? { ...c, completed: true } : c);
      setChallenges(newChallenges);
      setUserPoints(p => p + challenge.xp);
      onAction?.(`Desafio Concluído: ${challenge.title} (+${challenge.xp} XP)`);
  };

  const filteredModules = MODULES.filter(m => {
    const matchTeam = filterTeam === 'Todos' || m.team === filterTeam;
    const matchLevel = filterLevel === 'Todos' || m.level === filterLevel;
    return matchTeam && matchLevel;
  });

  // Calculate Level based on XP (simple formula: level = floor(xp / 1000) + 1)
  const userLevel = Math.floor(userPoints / 1000) + 1;
  const nextLevelXp = userLevel * 1000;
  const progressToNextLevel = ((userPoints % 1000) / 1000) * 100;

  if (activeModule) {
    return createPortal(
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
                onClick={() => { 
                  if (progress < 100) {
                    setProgress(p => p + 25); 
                  } else {
                    setActiveModule(null);
                    setUserPoints(p => p + 200); // Gamification: points for completion
                    onAction?.("Módulo concluído! +200 XP");
                    
                    // Unlock Badge Logic (Mock)
                    if (activeModule.id === 2) { // Mestre da Faca
                        const badge = badges.find(b => b.id === 2);
                        if (badge && !badge.earned) {
                            const newBadges = badges.map(b => b.id === 2 ? { ...b, earned: true } : b);
                            setBadges(newBadges);
                            onAction?.(`Medalha Desbloqueada: ${badge.name}!`);
                        }
                    }
                  }
                }} 
                className="px-6 py-2 bg-amber-600 rounded-lg text-sm font-bold cursor-pointer hover:bg-amber-700 transition-all"
              >
                {progress === 100 ? "Concluir Aula (+200 XP)" : "Próximo Conteúdo"}
              </button>
           </div>
        </nav>

        <div className="flex-1 overflow-y-auto p-6 md:p-12">
           <div className="max-w-4xl mx-auto space-y-10">
              <div className="aspect-video bg-slate-900 rounded-3xl relative overflow-hidden flex items-center justify-center shadow-2xl group">
                 {!isPlaying ? (
                   <>
                     <img src={`https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200`} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" alt="Treinamento" />
                     <div className="relative z-10 text-center cursor-pointer" onClick={() => setIsPlaying(true)}>
                        <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl hover:scale-110 transition-transform">
                           <svg className="w-10 h-10 fill-current translate-x-1 text-white" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6V4z"/></svg>
                        </div>
                        <p className="font-bold uppercase tracking-widest text-sm drop-shadow-md text-white">Assistir: {activeModule.videoTitle}</p>
                     </div>
                   </>
                 ) : (
                   <div className="w-full h-full bg-black flex items-center justify-center">
                     <iframe 
                       width="100%" 
                       height="100%" 
                       src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                       title="YouTube video player" 
                       frameBorder="0" 
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                       allowFullScreen
                       className="rounded-3xl"
                     ></iframe>
                   </div>
                 )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-6">
                    <h4 className="text-xl font-bold border-b pb-2">Conteúdo Programático</h4>
                    <ul className="space-y-4">
                       {activeModule.content.map((item, i) => (
                         <li key={i} className="flex items-start space-x-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <span className="w-6 h-6 bg-slate-900 text-white rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5">{i+1}</span>
                            <span className="font-medium text-slate-700 text-sm leading-relaxed">{item}</span>
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="space-y-6">
                    <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100 h-fit">
                       <h4 className="text-amber-800 font-bold mb-4 uppercase text-xs">Nota da Chefia</h4>
                       <p className="text-amber-900 font-serif italic text-lg leading-relaxed">
                          "A excelência não é um ato, mas um hábito. Este módulo foi desenhado para elevar o padrão técnico da equipe, focando nos detalhes que transformam o serviço em experiência."
                       </p>
                       <div className="mt-6 pt-6 border-t border-amber-200 flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-amber-800 text-white flex items-center justify-center font-serif italic font-bold text-xs">LC</div>
                          <p className="text-xs font-bold text-amber-900 uppercase">Lienys Carvalho</p>
                       </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                      <h4 className="text-slate-900 font-bold mb-4 uppercase text-xs flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth={2}/></svg>
                        Material Complementar
                      </h4>
                      <div className="space-y-3">
                        {activeModule.materials?.map((mat, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 transition-colors group">
                            <div className="flex items-center gap-3">
                              <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${mat.type === 'PDF' ? 'bg-rose-100 text-rose-700' : mat.type === 'XLS' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>{mat.type}</span>
                              <div>
                                <p className="text-xs font-bold text-slate-700 group-hover:text-amber-700 transition-colors">{mat.title}</p>
                                <p className="text-[10px] text-slate-400">{mat.size}</p>
                              </div>
                            </div>
                            <button 
                              onClick={() => handleDownloadMaterial(mat)}
                              className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-all cursor-pointer"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth={2}/></svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>,
      document.body
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Gamification Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile & XP */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center text-2xl font-bold border-4 border-slate-800 shadow-xl">LC</div>
                    <div>
                        <h2 className="text-xl font-bold">Chef Iniciante</h2>
                        <p className="text-slate-400 text-sm">Nível {userLevel}</p>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-xs font-bold uppercase mb-2">
                        <span className="text-amber-500">{userPoints} XP</span>
                        <span className="text-slate-500">{nextLevelXp} XP</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-1000" style={{ width: `${progressToNextLevel}%` }}></div>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2 text-right">Faltam {nextLevelXp - userPoints} XP para o próximo nível</p>
                </div>
            </div>
        </div>

        {/* Team Leaderboard */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
                <span className="text-xl">🏆</span> Placar de Equipes
            </h3>
            <div className="space-y-3">
                {teamScores.sort((a, b) => b.score - a.score).map((team, index) => (
                    <div key={team.team} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${index === 0 ? 'bg-yellow-100 text-yellow-700' : index === 1 ? 'bg-slate-200 text-slate-700' : 'bg-orange-100 text-orange-700'}`}>
                                {index + 1}
                            </span>
                            <span className="font-bold text-slate-700">{team.team}</span>
                        </div>
                        <span className="font-mono font-bold text-slate-900">{team.score.toLocaleString()} XP</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Weekly Challenges */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
            <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
                <span className="text-xl">🎯</span> Desafios da Semana
            </h3>
            <div className="space-y-3 flex-1">
                {challenges.map(challenge => (
                    <div 
                        key={challenge.id} 
                        onClick={() => handleClaimChallenge(challenge)}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${challenge.completed ? 'bg-emerald-50 border-emerald-100 opacity-60' : 'bg-white border-slate-100 hover:border-amber-300 hover:shadow-sm'}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${challenge.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
                                {challenge.completed && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7" strokeWidth={3}/></svg>}
                            </div>
                            <span className={`text-xs font-bold ${challenge.completed ? 'text-emerald-700 line-through' : 'text-slate-700'}`}>{challenge.title}</span>
                        </div>
                        <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">+{challenge.xp} XP</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2">
              <span className="text-xl">🎖️</span> Minhas Conquistas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {badges.map(badge => (
                  <div key={badge.id} className={`p-4 rounded-2xl border flex flex-col items-center text-center transition-all ${badge.earned ? 'bg-amber-50 border-amber-200 shadow-sm' : 'bg-slate-50 border-slate-100 opacity-50 grayscale'}`}>
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <h4 className="text-xs font-bold text-slate-800 mb-1">{badge.name}</h4>
                      <p className="text-[9px] text-slate-500 leading-tight">{badge.desc}</p>
                  </div>
              ))}
          </div>
      </div>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pt-8 border-t border-slate-200">
        <div>
          <h2 className="text-2xl font-serif text-slate-900">Módulos de Treinamento</h2>
          <p className="text-slate-500 mt-1 italic">Selecione um módulo para iniciar sua jornada.</p>
        </div>
        <div className="flex items-center gap-4">
          <select 
            value={filterTeam}
            onChange={(e) => setFilterTeam(e.target.value)}
            className="p-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 focus:outline-none focus:border-amber-500 shadow-sm"
          >
            <option value="Todos">Todas as Equipes</option>
            <option value="Salão">Equipe de Salão</option>
            <option value="Cozinha">Equipe de Cozinha</option>
            <option value="Gerência">Gerência</option>
            <option value="Geral">Geral</option>
          </select>
          <select 
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="p-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 focus:outline-none focus:border-amber-500 shadow-sm"
          >
            <option value="Todos">Todos os Níveis</option>
            <option value="Fundamental">Fundamental</option>
            <option value="Técnico">Técnico</option>
            <option value="Estratégico">Estratégico</option>
            <option value="Obrigatório">Obrigatório</option>
            <option value="Avançado">Avançado</option>
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map(m => (
          <div key={m.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg className="w-24 h-24 text-slate-900" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/></svg>
             </div>
             <div className="flex justify-between mb-4 relative z-10">
                <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded uppercase">{m.team}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase">{m.duration}</span>
             </div>
             <h4 className="text-lg font-bold mb-2 group-hover:text-amber-700 transition-colors relative z-10">{m.title}</h4>
             <p className="text-xs text-slate-500 mb-6 flex-1 italic relative z-10">"{m.desc}"</p>
             <button 
               onClick={() => handleStart(m)}
               className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-amber-700 cursor-pointer shadow-md transition-all active:scale-95 relative z-10"
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
