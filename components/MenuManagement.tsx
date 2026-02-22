
import React, { useState } from 'react';

interface Ingredient {
  item: string;
  qty: string;
  cost: number;
}

interface MenuItem {
  name: string;
  category: string;
  strategy: 'Estrela' | 'Burro de Carga' | 'Quebra-cabeça' | 'Cão';
  price: number;
  image: string;
  prepTime: string;
  yield: string;
  ingredients: Ingredient[];
  method: string;
  storage: string;
  allergens: string;
}

interface MenuStyle {
  id: string;
  name: string;
  desc: string;
  markup: string;
  tip: string;
  items: MenuItem[];
}

const generateItems = (styleName: string, baseId: number): MenuItem[] => {
  const categories = ['Entradas', 'Prato Principal', 'Sobremesas', 'Bebidas'];
  return Array.from({ length: 12 }, (_, i) => ({
    name: `${styleName} ${['Premium', 'Signature', 'Chef', 'Special'][i % 4]} ${i + 1}`,
    category: categories[Math.floor(i / 3)],
    strategy: i % 4 === 0 ? 'Estrela' : i % 3 === 0 ? 'Burro de Carga' : 'Quebra-cabeça',
    price: 45 + (i * 12),
    // Usando IDs estáveis para comida
    image: `https://images.unsplash.com/photo-${[
      '1504674900247-0877df9cc836', '1567620905732-2d1ec7ab7445', '1565299624-2983501f30ee', 
      '1546069901-ba9599a7e63c', '1555939594-58d7cb561ad1', '1482049016688-2d3e1b311543',
      '1484723091739-3c4058d259b8', '1529042414371-48c1a8be84f3', '1476224203421-9ac3993547a1',
      '1473093226795-af9932fe5856', '1551024709-8f23befc6f87', '1493770348161-369560ae357d'
    ][i % 12]}?auto=format&fit=crop&q=80&w=600`,
    prepTime: '25-35 min',
    yield: '1 porção padrão LC',
    ingredients: [
      { item: 'Insumo Base Premium', qty: '220g', cost: 14.50 },
      { item: 'Base de Carboidrato Complexo', qty: '150g', cost: 3.20 },
      { item: 'Redução de Caldo Artesanal', qty: '40ml', cost: 2.10 },
      { item: 'Guarnição de Vegetais', qty: '80g', cost: 4.50 },
      { item: 'Finalização (Brotos/Azeite)', qty: 'Q.B.', cost: 1.80 }
    ],
    method: '1. Pré-preparo (Mise en place) rigoroso.\n2. Selagem da proteína em alta temperatura.\n3. Cocção lenta da guarnição.\n4. Montagem com foco em altura e contraste.',
    storage: 'Manter sob refrigeração de 2°C a 4°C. Validade de 48h.',
    allergens: 'Contém Glúten, Lactose e traços de Oleaginosas.'
  }));
};

const MENU_STYLES: MenuStyle[] = [
  { id: 'bistro', name: 'Bistrô Contemporâneo', desc: 'Refinamento francês.', markup: '3.8x', tip: 'Foque em pratos "Estrela".', items: generateItems('Bistrô', 100) },
  { id: 'pizzaria', name: 'Pizzaria & Massas', desc: 'Tradição italiana.', markup: '4.5x', tip: 'Massa de longa fermentação.', items: generateItems('Pizza', 200) },
  { id: 'buffet', name: 'Buffet Self Service', desc: 'Giro de estoque agressivo.', markup: '2.8x', tip: 'Itens de menor custo primeiro.', items: generateItems('Buffet', 300) },
  { id: 'alacarte', name: 'A la Carte Moderno', desc: 'Serviço clássico.', markup: '3.5x', tip: 'Treinamento em venda sugestiva.', items: generateItems('Class', 400) },
  { id: 'churrascaria', name: 'Churrascaria Premium', desc: 'Cortes nobres.', markup: '3.2x', tip: 'Monitore o "Waste" na desossa.', items: generateItems('Steak', 500) },
  { id: 'espetinhos', name: 'Espetinhos & Brasa', desc: 'Operação enxuta.', markup: '4.0x', tip: 'Combos elevam o lucro.', items: generateItems('Grill', 600) },
  { id: 'bar', name: 'Bar & Mixologia', desc: 'Coquetelaria autoral.', markup: '5.5x', tip: 'O lucro está nos coquetéis.', items: generateItems('Bar', 700) },
  { id: 'boteco', name: 'Boteco Chic', desc: 'Comida de raiz.', markup: '3.5x', tip: 'Padronize as porções.', items: generateItems('Petisco', 800) },
  { id: 'lanchonete', name: 'Burguer & Lanches', desc: 'Blends exclusivos.', markup: '3.4x', tip: 'Batata frita é a margem.', items: generateItems('Burguer', 900) },
  { id: 'cafeteria', name: 'Café & Confeitaria', desc: 'Grãos especiais.', markup: '4.8x', tip: 'Vitrine vendedora.', items: generateItems('Coffee', 10) },
];

const MenuManagement: React.FC<{ onAction?: (msg?: string) => void }> = ({ onAction }) => {
  const [activeStyle, setActiveStyle] = useState(MENU_STYLES[0]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const handleDownload = () => {
    onAction?.("Formatando Cardápio Master para Exportação PDF...");
    // Pequeno delay para garantir que o toast apareça antes do bloqueio de impressão
    setTimeout(() => window.print(), 500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end print:hidden gap-4">
        <div>
          <h2 className="text-3xl font-serif text-slate-900">Engenharia de Cardápio Master</h2>
          <p className="text-slate-500 mt-1 italic">Consultoria estratégica para 10 nichos de mercado.</p>
        </div>
        <button 
          onClick={handleDownload} 
          className="px-6 py-3 bg-amber-700 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-amber-800 transition-all flex items-center gap-2 cursor-pointer z-10"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth={2} /></svg>
          Baixar Cardápio PDF
        </button>
      </header>

      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar print:hidden">
        {MENU_STYLES.map(style => (
          <button 
            key={style.id} 
            onClick={() => setActiveStyle(style)} 
            className={`px-6 py-4 rounded-2xl border transition-all cursor-pointer whitespace-nowrap shadow-sm ${activeStyle.id === style.id ? 'bg-slate-900 text-white border-slate-900 scale-105' : 'bg-white text-slate-600 border-slate-100 hover:border-amber-400'}`}
          >
            <span className="font-bold text-[10px] uppercase tracking-widest">{style.name}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 print:grid-cols-2">
        {activeStyle.items.map((item, idx) => (
          <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col print:shadow-none print:border print:rounded-none">
            <div className="relative h-48 overflow-hidden">
              <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-[9px] font-bold uppercase text-amber-800 shadow-sm">{item.strategy}</div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h4 className="text-lg font-bold text-slate-900 mb-1">{item.name}</h4>
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-4">{item.category}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xl font-serif font-bold text-amber-700">R$ {item.price.toFixed(2)}</span>
                <button 
                  onClick={() => setSelectedItem(item)} 
                  className="text-[10px] font-bold text-slate-500 hover:text-amber-700 transition-colors flex items-center gap-1 cursor-pointer print:hidden uppercase"
                >
                  Ficha Técnica
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7" strokeWidth={3} /></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold uppercase tracking-widest text-amber-500">Documentação Técnica LC</h3>
              <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-slate-800 rounded-full cursor-pointer transition-colors"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2} /></svg></button>
            </div>
            <div className="p-8 overflow-y-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <img src={selectedItem.image} className="rounded-2xl w-full h-64 object-cover shadow-lg border border-slate-100" alt={selectedItem.name} />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-50 p-3 rounded-xl text-center"><p className="text-[10px] text-slate-400 font-bold uppercase">Tempo</p><p className="text-xs font-bold">{selectedItem.prepTime}</p></div>
                    <div className="bg-slate-50 p-3 rounded-xl text-center"><p className="text-[10px] text-slate-400 font-bold uppercase">Rende</p><p className="text-xs font-bold">{selectedItem.yield}</p></div>
                    <div className="bg-slate-50 p-3 rounded-xl text-center"><p className="text-[10px] text-slate-400 font-bold uppercase">Markup</p><p className="text-xs font-bold">{activeStyle.markup}</p></div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-400 mb-4 tracking-widest border-b pb-2">Composição de Insumos</h4>
                  <div className="space-y-2 mb-6">
                    {selectedItem.ingredients.map((ing, i) => (
                      <div key={i} className="flex justify-between text-xs border-b border-slate-50 pb-2">
                        <span className="text-slate-700">{ing.qty} {ing.item}</span>
                        <span className="font-bold">R$ {ing.cost.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-slate-900 p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-2"><span className="text-[10px] font-bold text-slate-400 uppercase">Preço Sugerido</span><span className="text-2xl font-serif font-bold text-amber-500">R$ {selectedItem.price.toFixed(2)}</span></div>
                    <p className="text-[9px] text-slate-500 uppercase tracking-tighter">*Markup de {activeStyle.markup} aplicado sobre o custo de insumos.</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-widest border-l-4 border-amber-600 pl-3">Método Operacional</h4>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 whitespace-pre-wrap">{selectedItem.method}</p>
                </div>
                <div className="space-y-4">
                   <h4 className="text-xs font-bold uppercase text-slate-400 tracking-widest border-l-4 border-rose-600 pl-3">Segurança e Alergênicos</h4>
                   <p className="text-xs text-rose-700 font-bold bg-rose-50 p-4 rounded-2xl border border-rose-100">{selectedItem.allergens}</p>
                   <h4 className="text-xs font-bold uppercase text-slate-400 tracking-widest border-l-4 border-blue-600 pl-3">Armazenamento</h4>
                   <p className="text-xs text-slate-600 bg-blue-50 p-4 rounded-2xl border border-blue-100">{selectedItem.storage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
