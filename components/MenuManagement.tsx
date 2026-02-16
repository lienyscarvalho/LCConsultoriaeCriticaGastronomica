
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

const FOOD_IMAGES = [
  '1546069901-ba9599a7e63c', '1504674900247-0877df9cc836', '1473093226795-af9932fe5856',
  '1493770348161-369560ae357d', '1476224203421-9ac3993547a1', '1567621132799-79423c42d482',
  '1555939594-58d7cb561ad1', '1540189549336-e6e99c3679fe', '1565299624-2983501f30ee',
  '1482049016688-2d3e1b311543', '1484723091739-3c4058d259b8', '1490645935967-10de6ba17051'
];

const generateItems = (styleName: string, styleIndex: number): MenuItem[] => {
  const categories = ['Entradas', 'Prato Principal', 'Sobremesas', 'Bebidas'];
  return Array.from({ length: 12 }, (_, i) => ({
    name: `${styleName} ${['Especial', 'Premium', 'Chef', 'Destaque'][i % 4]} ${i + 1}`,
    category: categories[Math.floor(i / 3)],
    strategy: i % 4 === 0 ? 'Estrela' : i % 3 === 0 ? 'Burro de Carga' : 'Quebra-cabeça',
    price: 38 + (i * 14) + (styleIndex * 5),
    image: `https://images.unsplash.com/photo-${FOOD_IMAGES[i]}?auto=format&fit=crop&q=80&w=600`,
    prepTime: '20-40 min',
    yield: '1 porção',
    ingredients: [
      { item: 'Insumo Base Premium', qty: '200g', cost: 12.50 },
      { item: 'Guarnição de Estação', qty: '150g', cost: 4.20 },
      { item: 'Molho LC Signature', qty: '50ml', cost: 3.80 }
    ],
    method: '1. Mise en place rigoroso.\n2. Selagem da proteína.\n3. Deglacear com vinho branco.\n4. Montagem com foco em altura e cor.',
    storage: 'Refrigeração de 2°C a 4°C por 48h.',
    allergens: 'Contém Glúten, Lactose.'
  }));
};

const MENU_STYLES: MenuStyle[] = [
  { id: 'bistro', name: 'Bistrô Contemporâneo', desc: 'Clássicos franceses.', markup: '3.8x', tip: 'Markup alto em vinhos.', items: generateItems('Bistrô', 0) },
  { id: 'pizzaria', name: 'Pizzaria & Massas', desc: 'Tradição italiana.', markup: '4.5x', tip: 'Massa fermentação natural.', items: generateItems('Pizza', 1) },
  { id: 'buffet', name: 'Buffet Self Service', desc: 'Agilidade e giro.', markup: '2.8x', tip: 'Insumos A no início da pista.', items: generateItems('Buffet', 2) },
  { id: 'alacarte', name: 'A la Carte Moderno', desc: 'Serviço clássico.', markup: '3.5x', tip: 'Treine venda sugestiva.', items: generateItems('Prato', 3) },
  { id: 'churrascaria', name: 'Churrascaria Master', desc: 'Cortes nobres.', markup: '3.2x', tip: 'Controle de quebra na desossa.', items: generateItems('Corte', 4) },
  { id: 'espetinhos', name: 'Espetinhos Gourmet', desc: 'Braseiro rápido.', markup: '4.0x', tip: 'Combos elevam ticket.', items: generateItems('Espeto', 5) },
  { id: 'bar', name: 'Bar & Mixologia', desc: 'Drinques e petiscos.', markup: '5.5x', tip: 'Margem alta nos drinques.', items: generateItems('Mix', 6) },
  { id: 'boteco', name: 'Boteco Chic', desc: 'Raiz com sofisticação.', markup: '3.5x', tip: 'Padronização de porções.', items: generateItems('Petisco', 7) },
  { id: 'lanchonete', name: 'Burguer & Lanches', desc: 'Blends exclusivos.', markup: '3.4x', tip: 'Adicionais são lucro líquido.', items: generateItems('Burguer', 8) },
  { id: 'cafeteria', name: 'Café & Patisserie', desc: 'Grãos e doces.', markup: '4.8x', tip: 'Olfato é ferramenta de venda.', items: generateItems('Café', 9) },
];

const MenuManagement: React.FC<{ onAction?: (msg?: string) => void }> = ({ onAction }) => {
  const [activeStyle, setActiveStyle] = useState(MENU_STYLES[0]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const handlePrint = () => {
    onAction?.("Gerando Documento Master para Impressão...");
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 print:hidden">
        <div>
          <h2 className="text-3xl font-serif text-slate-900">Engenharia de Cardápio Master</h2>
          <p className="text-slate-500 mt-1 italic">Consultoria técnica para 10 nichos de mercado.</p>
        </div>
        <button 
          onClick={handlePrint} 
          className="px-6 py-3 bg-amber-700 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-amber-800 transition-all flex items-center gap-2 cursor-pointer"
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
            className={`px-6 py-3 rounded-2xl border transition-all cursor-pointer whitespace-nowrap shadow-sm ${activeStyle.id === style.id ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-100'}`}
          >
            <span className="font-bold text-[10px] uppercase tracking-widest">{style.name}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 print:grid-cols-2">
        {activeStyle.items.map((item, idx) => (
          <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm flex flex-col group print:shadow-none print:border">
            <div className="relative h-44 overflow-hidden">
              <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} />
              <div className="absolute top-3 right-3 bg-white/90 px-2 py-0.5 rounded-full text-[8px] font-bold text-amber-800 uppercase">{item.strategy}</div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h4 className="text-lg font-bold text-slate-900 mb-1">{item.name}</h4>
              <p className="text-[10px] text-slate-400 uppercase font-bold mb-4">{item.category}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xl font-serif font-bold text-amber-700">R$ {item.price.toFixed(2)}</span>
                <button 
                  onClick={() => setSelectedItem(item)} 
                  className="text-[10px] font-bold text-slate-400 hover:text-amber-700 cursor-pointer print:hidden uppercase tracking-tighter"
                >
                  Ficha Técnica +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn print:relative print:bg-white print:p-0">
          <div className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col print:max-h-none print:shadow-none print:rounded-none">
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center print:bg-white print:text-black print:border-b">
              <h3 className="text-xl font-bold uppercase tracking-widest text-amber-500">Documentação Técnica LC</h3>
              <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-slate-800 rounded-full cursor-pointer print:hidden"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2} /></svg></button>
            </div>
            <div className="p-8 overflow-y-auto space-y-8 print:overflow-visible">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <img src={selectedItem.image} className="rounded-2xl w-full h-64 object-cover print:h-48" alt={selectedItem.name} />
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase border-b pb-2">Composição & Custos</h4>
                  {selectedItem.ingredients.map((ing, i) => (
                    <div key={i} className="flex justify-between text-xs border-b border-slate-50 pb-1">
                      <span>{ing.qty} {ing.item}</span>
                      <span className="font-bold">R$ {ing.cost.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="bg-slate-900 p-4 rounded-xl text-amber-500 flex justify-between items-center print:bg-slate-100 print:text-black">
                    <span className="text-[10px] font-bold uppercase">Preço Venda LC</span>
                    <span className="text-2xl font-serif font-bold">R$ {selectedItem.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-amber-700 uppercase">Modo de Preparo Técnico</h4>
                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 rounded-xl">{selectedItem.method}</p>
                </div>
                <div className="space-y-3">
                   <h4 className="text-[10px] font-bold text-rose-700 uppercase">Segurança & Alergênicos</h4>
                   <p className="text-xs font-bold text-rose-800 bg-rose-50 p-4 rounded-xl">{selectedItem.allergens}</p>
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
