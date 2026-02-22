
import React, { useState } from 'react';

interface SOP {
  id: string;
  title: string;
  cat: string;
  steps: string[];
  details: string;
  checklistItems: string[];
}

const SOPS: SOP[] = [
  { id: '1', title: 'Recebimento de Mercadorias', cat: 'Operacional', steps: ['Conferir Temperatura', 'Higienizar Embalagens', 'Conferir Lotes e SIF'], details: 'Barreira primária contra patógenos.', checklistItems: ['Termômetro calibrado?', 'Planilha preenchida?', 'Embalagens integras?'] },
  { id: '2', title: 'Controle de Pragas', cat: 'Sanitário', steps: ['Monitorar pontos de isca', 'Vedar ralos', 'Janelas com telas'], details: 'Prevenção contra vetores RDC 216.', checklistItems: ['Telas intactas?', 'Ralinhos fechados?', 'Lixeiras tampadas?'] },
  { id: '3', title: 'Higiene de Mãos', cat: 'Equipe', steps: ['Uso de sabonete antisséptico', 'Secagem com papel', 'Álcool 70%'], details: 'Pilar central da segurança alimentar.', checklistItems: ['Sabonete reposto?', 'Papel toalha disponível?', 'Técnica aplicada?'] },
  { id: '4', title: 'Coleta de Amostras', cat: 'Técnico', steps: ['Sacos estéreis', '100g de amostra', 'Armazenar por 72h'], details: 'Garantia jurídica e técnica.', checklistItems: ['Sacos datados?', 'Temperatura correta?', 'Amostra de 100g?'] },
  { id: '5', title: 'Manejo de Resíduos', cat: 'Sanitário', steps: ['Lixeiras de pedal', 'Retirada diária', 'Lavagem externa'], details: 'Controle de contaminação cruzada.', checklistItems: ['Pedais operantes?', 'Lixeiras sem transbordo?', 'Local limpo?'] },
  { id: '6', title: 'Descongelação Técnica', cat: 'Preparo', steps: ['Refrigeração a 4°C', 'Uso de dreno', 'Não recongelar'], details: 'Preservação de textura e segurança.', checklistItems: ['Etiqueta de início?', 'Dreno limpo?', 'Temperatura estável?'] },
  { id: '7', title: 'Rastreabilidade e PVPS', cat: 'Gestão', steps: ['Etiquetagem pós-abertura', 'Organização por vencimento', 'Controle de lotes'], details: 'Gestão inteligente de validade.', checklistItems: ['Tudo etiquetado?', 'PVPS respeitado?', 'Letra legível?'] },
  { id: '8', title: 'Calibração de Equipamentos', cat: 'Técnico', steps: ['Calibrar termômetros', 'Verificar balanças', 'Filtros de água'], details: 'Precisão nos processos e custos.', checklistItems: ['Termômetros ok?', 'Balanças zeradas?', 'Filtros trocados?'] },
  { id: '9', title: 'Higienização de FLV', cat: 'Preparo', steps: ['Seleção', 'Lavagem', 'Sanitização clorada'], details: 'Controle químico e biológico.', checklistItems: ['Tempo de 15 min?', 'Concentração correta?', 'Enxágue final?'] },
  { id: '10', title: 'Saúde dos Manipuladores', cat: 'Equipe', steps: ['Exames periódicos', 'Afastamento se doente', 'Sem adornos'], details: 'Prevenção de transmissão humana.', checklistItems: ['ASO em dia?', 'Unhas curtas?', 'Uniforme limpo?'] },
  { id: '11', title: 'Limpeza de Caixas de Gordura', cat: 'Manutenção', steps: ['Limpeza mensal', 'Descarte correto', 'Registro em planilha'], details: 'Evitar entupimentos e odores.', checklistItems: ['Caixa limpa?', 'Registro efetuado?'] },
  { id: '12', title: 'Qualidade da Água', cat: 'Sanitário', steps: ['Limpeza de reservatório', 'Troca de filtros', 'Análise de cloro'], details: 'Insumo base para tudo.', checklistItems: ['Laudo de limpeza?', 'Filtros novos?'] },
  { id: '13', title: 'Rotulagem de Produção', cat: 'Operacional', steps: ['Nome do produto', 'Data de preparo', 'Validade'], details: 'Padrão ouro de organização.', checklistItems: ['Etiquetas padrão LC?', 'Validade correta?'] },
  { id: '14', title: 'Qualidade de Óleos', cat: 'Qualidade', steps: ['Medição de polares', 'Filtração diária', 'Temp < 180°C'], details: 'Segurança química e crocância.', checklistItems: ['Teste realizado?', 'Cor padrão?'] },
  { id: '15', title: 'Segurança de Buffet', cat: 'Exposição', steps: ['Quente > 60°C', 'Frio < 10°C', 'Troca de utensílios'], details: 'Proteção em tempo real.', checklistItems: ['Termômetro ok?', 'Pista limpa?'] },
  { id: '16', title: 'Fluxo de Visitantes', cat: 'Normas', steps: ['Uso de kit visitante', 'Lavar mãos', 'Acompanhamento'], details: 'Controle de perigos biológicos externos.', checklistItems: ['Kits disponíveis?', 'Registro assinado?'] }
];

const EXTRA_CHECKLISTS = [
  { id: 'abert', name: 'Abertura de Unidade', items: ['Gás ligado e verificado', 'Temperaturas iniciais ok', 'Mise en place pronto', 'Higiene de salão', 'Check de equipe'] },
  { id: 'fech', name: 'Fechamento de Unidade', items: ['Gás desligado', 'Lixos retirados', 'Planilhas preenchidas', 'Etiquetagem final', 'Trancas ok'] },
  { id: 'estq', name: 'Controle de Estoque', items: ['Verificar validades PVPS', 'Limpeza prateleiras', 'Conferência física', 'Lançamento perdas', 'Pedido fornecedor'] },
  { id: 'audit', name: 'Auditoria Mensal LC', items: ['Revisão de POPs', 'Vencimento extintores', 'Estado dos utensílios', 'Treinamentos feitos', 'Manutenções'] },
  { id: 'limp_pesada', name: 'Limpeza Pesada', items: ['Atrás dos freezers', 'Dentro das coifas', 'Teto e luminárias', 'Ralo sifonado', 'Paredes azulejadas'] },
  { id: 'prod', name: 'Controle de Produção', items: ['Pesagem insumos', 'Seguir Ficha Técnica', 'Amostra coletada', 'Temperatura final', 'Resfriamento rápido'] }
];

const SafetySOP: React.FC<{ onAction?: (msg?: string) => void }> = ({ onAction }) => {
  const [printFilter, setPrintFilter] = useState<string | null>(null);

  const handlePrintAll = () => {
    onAction?.("Exportando Manual Completo de POPs LC...");
    setTimeout(() => window.print(), 500);
  };

  const handlePrintChecklist = (id: string, name: string) => {
    onAction?.(`Gerando checklist exclusivo: ${name}`);
    setPrintFilter(id);
    setTimeout(() => {
      window.print();
      setPrintFilter(null);
    }, 500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 print:hidden">
        <div>
          <h2 className="text-3xl font-serif text-slate-900">Segurança Alimentar & POPs LC</h2>
          <p className="text-slate-500 mt-1 italic">Rigor técnico ANVISA e excelência operacional.</p>
        </div>
        <button 
          onClick={handlePrintAll} 
          className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg flex items-center gap-2 cursor-pointer hover:bg-slate-800 transition-all z-10"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2" strokeWidth={2} /></svg>
          Imprimir Manual Completo
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-serif font-bold text-slate-800 border-b pb-2 print:hidden">POPs Oficiais (16 Procedimentos)</h3>
          <div className="grid grid-cols-1 gap-4">
            {SOPS.map(sop => (
              <div key={sop.id} className={`bg-white p-6 rounded-3xl border border-slate-100 shadow-sm print:mb-10 print:border-none print:shadow-none ${printFilter && printFilter !== sop.id ? 'print:hidden' : ''}`}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded uppercase tracking-widest">{sop.cat}</span>
                  <h4 className="text-lg font-bold text-slate-900">{sop.title}</h4>
                  <button onClick={() => handlePrintChecklist(sop.id, sop.title)} className="p-2 text-slate-300 hover:text-amber-700 print:hidden cursor-pointer transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2" strokeWidth={2} /></svg></button>
                </div>
                <div className="space-y-5">
                   <div className="space-y-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Procedimentos Técnicos:</p>
                      {sop.steps.map((s, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                           <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">{i+1}</div>
                           <p className="font-medium">{s}</p>
                        </div>
                      ))}
                   </div>
                   <div className="pt-4 border-t border-slate-50">
                      <p className="text-[10px] font-bold text-amber-600 uppercase mb-3">Checklist de Auditoria:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                         {sop.checklistItems.map((item, i) => (
                           <div key={i} className="flex items-center gap-2 text-[11px] text-slate-500 font-medium italic">
                              <div className="w-4 h-4 rounded border-2 border-slate-200"></div>
                              {item}
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6 print:hidden">
          <h3 className="text-xl font-serif font-bold text-slate-800 border-b pb-2">Checklists de Gestão Diária</h3>
          {EXTRA_CHECKLISTS.map(list => (
            <div key={list.id} className={`bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-amber-200 transition-all ${printFilter && printFilter !== list.id ? 'print:hidden' : ''}`}>
               <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2 uppercase text-xs tracking-widest">
                     <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                     {list.name}
                  </h4>
                  <button onClick={() => handlePrintChecklist(list.id, list.name)} className="p-2 text-slate-400 hover:text-amber-700 transition-colors cursor-pointer"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2" strokeWidth={2} /></svg></button>
               </div>
               <div className="space-y-3 mb-6">
                  {list.items.map((item, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer group">
                       <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-200 text-amber-600 focus:ring-amber-500" />
                       <span className="text-xs text-slate-600 group-hover:text-slate-900 transition-colors font-medium">{item}</span>
                    </label>
                  ))}
               </div>
               <button onClick={() => onAction?.(`${list.name} finalizado e logado.`)} className="w-full py-2 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-amber-700 transition-all cursor-pointer">Salvar Auditoria</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SafetySOP;
