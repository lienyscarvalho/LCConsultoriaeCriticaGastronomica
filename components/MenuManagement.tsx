
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Label } from 'recharts';

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
  cost: number;
  salesVolume: number;
  image: string;
  prepTime: string;
  yield: string;
  ingredients: Ingredient[];
  method: string;
  storage: string;
  allergens: string;
  materials?: string; // URL or file name
  video?: string; // URL or file name
}

interface MenuStyle {
  id: string;
  name: string;
  desc: string;
  markup: string;
  tip: string;
  items: MenuItem[];
}

const getImagesForStyle = (styleName: string): string[] => {
  // Map styles to specific Unsplash collections/keywords or curated IDs
  switch (styleName) {
    case 'Bistrô': // French/Fine Dining
      return [
        '1559339352-11d035aa65de', '1550966871-3ed3c6226759', '1514326640560-7d063ef2aed5', 
        '1414235077470-4300eec85d11', '1540189549336-e6e99c3679fe', '1467003909585-63c6385cdb26',
        '1428515613728-6e880345daef', '1476224203421-9ac3993547a1', '1473093226795-af9932fe5856',
        '1504674900247-0877df9cc836', '1555939594-58d7cb561ad1', '1565299624-2983501f30ee'
      ];
    case 'Pizza': // Pizza & Pasta
      return [
        '1574071318500-10e566ae80c2', '1565299624-2983501f30ee', '1595854341650-bd5d520e59b3',
        '1513104890138-7c749659a591', '1579631542720-3a87824fff86', '1604382355076-af4b0eb60143',
        '1593560706803-4816718f3065', '1571407970349-bc81e7e96d47', '1534308983000-2591c0df88be',
        '1576458088443-04a19bb13da6', '1590947132387-155cc02f3212', '1518791841217-8f162f1e1131'
      ];
    case 'Burguer': // Burgers
      return [
        '1568901346375-23c9450c58cd', '1550547660-d9450f859349', '1594212699903-ec8a3eca50f5',
        '1551782450-a2132b4ba21d', '1572802419224-296b0aeee0d9', '1561758033432-a969a2127998',
        '1550950158-d0d060d151d7', '1571091718767-18b5b1457add', '1553979459-d2229ba7433b',
        '1586190848861-99c8f3bd8e6e', '1552566626-52f8b828add9', '1596627196504-b3d58b743456'
      ];
    case 'Steak': // Churrascaria/Meat
      return [
        '1600891964092-4316c288032e', '1544025162-d76690b6d014', '1558030006-45067193cb13',
        '1529042414371-48c1a8be84f3', '1615937657715-bc7b4b7962c1', '1504674900247-0877df9cc836',
        '1558030006-45067193cb13', '1432139555190-58524dae6a55', '1607116176195-b819431ec84c',
        '1594041603051-e3f989d569b8', '1519681393797-a1e943f6351f', '1565299524732-638a83085f84'
      ];
    case 'Coffee': // Cafe/Desserts
      return [
        '1517244683847-f85aa58c17fd', '1559305616-3f99cd43e353', '1497935586351-b67a49e012bf',
        '1509042239860-f550ce710b93', '1461023058943-07fcbe16d735', '1514432324607-a09d9b4aefdd',
        '1507133750069-77536e0fa945', '1511920170033-f8396924c348', '1495474472287-4d71bcdd2085',
        '1509042239860-f550ce710b93', '1554118811-1e0d58224f24', '1498804103079-a6351b050096'
      ];
    case 'Bar': // Drinks
      return [
        '1514362545857-3bc16c4c7d1b', '1551024709-8f23befc6f87', '1536935338788-843bb5281046',
        '1470337458703-46ad1756a187', '1572116469696-31de0f17cc34', '1544145945-f90425340c7e',
        '1563223771-aa0127167f63', '1536935338788-843bb5281046', '1556679343-c7306c1976bc',
        '1587223075055-82e9a937ddff', '1597075687490-8f673c6c17f6', '1551538827-9c037cb4f32a'
      ];
    case 'Buffet': // Self Service / Varied
      return [
        '1574672174772-e86b232d7eb1', '1555939594-58d7cb561ad1', '1504674900247-0877df9cc836',
        '1546069901-ba9599a7e63c', '1567620905732-2d1ec7ab7445', '1484723091739-3c4058d259b8',
        '1529042414371-48c1a8be84f3', '1550547660-d9450f859349', '1565299624-2983501f30ee',
        '1568901346375-23c9450c58cd', '1551024709-8f23befc6f87', '1514326640560-7d063ef2aed5'
      ];
    case 'Class': // A la Carte / Modern
      return [
        '1559339352-11d035aa65de', '1540189549336-e6e99c3679fe', '1414235077470-4300eec85d11',
        '1550966871-3ed3c6226759', '1504674900247-0877df9cc836', '1551024709-8f23befc6f87',
        '1555939594-58d7cb561ad1', '1467003909585-63c6385cdb26', '1565299624-2983501f30ee',
        '1546069901-ba9599a7e63c', '1550547660-d9450f859349', '1529042414371-48c1a8be84f3'
      ];
    case 'Grill': // Espetinhos / BBQ
      return [
        '1529042414371-48c1a8be84f3', '1558030006-45067193cb13', '1544025162-d76690b6d014',
        '1600891964092-4316c288032e', '1594041603051-e3f989d569b8', '1532635241-17e820acc59f',
        '1555939594-58d7cb561ad1', '1504674900247-0877df9cc836', '1565299524732-638a83085f84',
        '1544025162-d76690b6d014', '1529042414371-48c1a8be84f3', '1558030006-45067193cb13'
      ];
    case 'Petisco': // Boteco / Snacks
      return [
        '1604908176997-125f25cc6f3d', '1515516947515-835925071f64', '1626082927389-e175950b313b',
        '1599321492551-413f38102623', '1541529094-68d779254e22', '1589302168068-96e26173521d',
        '1604908176997-125f25cc6f3d', '1515516947515-835925071f64', '1626082927389-e175950b313b',
        '1599321492551-413f38102623', '1541529094-68d779254e22', '1589302168068-96e26173521d'
      ];
    default:
      return [
        '1504674900247-0877df9cc836', '1567620905732-2d1ec7ab7445', '1565299624-2983501f30ee', 
        '1546069901-ba9599a7e63c', '1555939594-58d7cb561ad1', '1482049016688-2d3e1b311543',
        '1484723091739-3c4058d259b8', '1529042414371-48c1a8be84f3', '1476224203421-9ac3993547a1',
        '1473093226795-af9932fe5856', '1551024709-8f23befc6f87', '1493770348161-369560ae357d'
      ];
  }
};

const generateItems = (styleName: string, baseId: number): MenuItem[] => {
  const categories = ['Entradas', 'Prato Principal', 'Sobremesas', 'Bebidas'];
  const images = getImagesForStyle(styleName);
  
  return Array.from({ length: 12 }, (_, i) => {
    const ingredients = [
      { item: 'Insumo Base Premium', qty: '220g', cost: 14.50 },
      { item: 'Base de Carboidrato Complexo', qty: '150g', cost: 3.20 },
      { item: 'Redução de Caldo Artesanal', qty: '40ml', cost: 2.10 },
      { item: 'Guarnição de Vegetais', qty: '80g', cost: 4.50 },
      { item: 'Finalização (Brotos/Azeite)', qty: 'Q.B.', cost: 1.80 }
    ];
    const totalCost = ingredients.reduce((acc, curr) => acc + curr.cost, 0);
    const price = 45 + (i * 12);
    
    let salesVolume = 0;
    const contributionMargin = price - totalCost;
    
    const strategyIndex = i % 4;
    let strategy: MenuItem['strategy'] = 'Estrela';
    
    if (strategyIndex === 0) { // Estrela
        strategy = 'Estrela';
        salesVolume = Math.floor(Math.random() * 50) + 50; 
    } else if (strategyIndex === 1) { // Burro de Carga
        strategy = 'Burro de Carga';
        salesVolume = Math.floor(Math.random() * 50) + 50; 
    } else if (strategyIndex === 2) { // Quebra-cabeça
        strategy = 'Quebra-cabeça';
        salesVolume = Math.floor(Math.random() * 40) + 10; 
    } else { // Cão
        strategy = 'Cão';
        salesVolume = Math.floor(Math.random() * 40) + 10; 
    }

    return {
      name: `${styleName} ${['Premium', 'Signature', 'Chef', 'Special'][i % 4]} ${i + 1}`,
      category: categories[Math.floor(i / 3)],
      strategy: strategy,
      price: price,
      cost: totalCost,
      salesVolume: salesVolume,
      image: `https://images.unsplash.com/photo-${images[i % images.length]}?auto=format&fit=crop&q=80&w=600`,
      prepTime: '25-35 min',
      yield: '1 porção padrão LC',
      ingredients: ingredients,
      method: '1. Pré-preparo (Mise en place) rigoroso.\n2. Selagem da proteína em alta temperatura.\n3. Cocção lenta da guarnição.\n4. Montagem com foco em altura e contraste.',
      storage: 'Manter sob refrigeração de 2°C a 4°C. Validade de 48h.',
      allergens: 'Contém Glúten, Lactose e traços de Oleaginosas.'
    };
  });
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
  const [styles, setStyles] = useState<MenuStyle[]>(MENU_STYLES);
  const [activeStyleId, setActiveStyleId] = useState<string>(MENU_STYLES[0].id);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  
  // Form state for new item
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    category: 'Prato Principal',
    price: 0,
    cost: 0,
    prepTime: '30 min',
    yield: '1 porção',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
    method: 'Adicione o método de preparo aqui...',
    storage: 'Refrigeração padrão.',
    allergens: 'Não informado.',
    materials: '',
    video: ''
  });

  const activeStyle = styles.find(s => s.id === activeStyleId) || styles[0];

  const handleDownload = () => {
    onAction?.("Formatando Cardápio Master para Exportação PDF...");
    setTimeout(() => window.print(), 500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'materials' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a server. Here we just simulate it.
      setNewItem(prev => ({ ...prev, [field]: file.name }));
      onAction?.(`Arquivo ${file.name} carregado para ${field === 'materials' ? 'Materiais' : 'Vídeo'}`);
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;

    const cost = newItem.cost || 0;
    const price = Number(newItem.price);
    const contributionMargin = price - cost;
    // Simple logic for new items, default to average volume
    const salesVolume = 50; 
    
    // Determine strategy roughly
    let strategy: MenuItem['strategy'] = 'Quebra-cabeça';
    if (contributionMargin > 30 && salesVolume > 50) strategy = 'Estrela';
    else if (contributionMargin <= 30 && salesVolume > 50) strategy = 'Burro de Carga';
    else if (contributionMargin <= 30 && salesVolume <= 50) strategy = 'Cão';

    const itemToAdd: MenuItem = {
      name: newItem.name || 'Novo Item',
      category: newItem.category || 'Geral',
      strategy: strategy,
      price: price,
      cost: cost,
      salesVolume: salesVolume,
      image: newItem.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
      prepTime: newItem.prepTime || '30 min',
      yield: newItem.yield || '1 porção',
      ingredients: [], // Empty for now
      method: newItem.method || '',
      storage: newItem.storage || '',
      allergens: newItem.allergens || ''
    };

    setStyles(prev => prev.map(s => {
      if (s.id === activeStyleId) {
        return { ...s, items: [itemToAdd, ...s.items] };
      }
      return s;
    }));

    setIsAddModalOpen(false);
    setNewItem({
      name: '',
      category: 'Prato Principal',
      price: 0,
      cost: 0,
      prepTime: '30 min',
      yield: '1 porção',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
      method: 'Adicione o método de preparo aqui...',
      storage: 'Refrigeração padrão.',
      allergens: 'Não informado.'
    });
    onAction?.("Item adicionado ao cardápio com sucesso!");
  };

  // Prepare data for scatter chart
  const scatterData = activeStyle.items.map(item => ({
    x: item.salesVolume, // Popularity
    y: item.price - item.cost, // Profitability (Contribution Margin)
    z: 100, // Bubble size
    name: item.name,
    strategy: item.strategy
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      let suggestion = '';
      let pricingAction = '';
      
      switch (data.strategy) {
        case 'Estrela': 
          suggestion = 'Alta popularidade e alta rentabilidade. Mantenha a qualidade rigorosa e destaque no cardápio.'; 
          pricingAction = 'Possível aumento leve de preço (teste de elasticidade).';
          break;
        case 'Burro de Carga': 
          suggestion = 'Alta popularidade mas baixa margem. Reduza o custo da porção ou faça engenharia de insumos.'; 
          pricingAction = 'Aumente o preço gradualmente ou crie combos com itens de alta margem.';
          break;
        case 'Quebra-cabeça': 
          suggestion = 'Alta margem mas baixa venda. Melhore a foto, descrição ou treine a equipe para venda sugestiva.'; 
          pricingAction = 'Reduza levemente o preço para estimular a prova ou crie promoções limitadas.';
          break;
        case 'Cão': 
          suggestion = 'Baixa margem e baixa venda. Item candidato a exclusão do cardápio.'; 
          pricingAction = 'Não invista em descontos. Substitua por novidade mais rentável.';
          break;
      }

      return (
        <div className="bg-white p-4 border border-slate-200 shadow-xl rounded-xl max-w-xs z-50">
          <p className="font-bold text-sm text-slate-900 mb-1">{data.name}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs mb-3">
             <span className="text-slate-500">Margem:</span>
             <span className="font-mono font-bold text-slate-700">R$ {data.y.toFixed(2)}</span>
             <span className="text-slate-500">Vendas:</span>
             <span className="font-mono font-bold text-slate-700">{data.x} un.</span>
          </div>
          <div className={`text-xs font-bold uppercase px-2 py-1 rounded inline-block mb-2
            ${data.strategy === 'Estrela' ? 'bg-emerald-100 text-emerald-700' : 
              data.strategy === 'Burro de Carga' ? 'bg-blue-100 text-blue-700' :
              data.strategy === 'Quebra-cabeça' ? 'bg-amber-100 text-amber-700' :
              'bg-rose-100 text-rose-700'}`}>
            {data.strategy}
          </div>
          <div className="space-y-2 mt-2 pt-2 border-t border-slate-100">
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Ação Sugerida</p>
                <p className="text-[10px] text-slate-600 leading-tight">{suggestion}</p>
            </div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Estratégia de Preço</p>
                <p className="text-[10px] text-slate-600 leading-tight">{pricingAction}</p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end print:hidden gap-4">
        <div>
          <h2 className="text-3xl font-serif text-slate-900">Engenharia de Cardápio Master</h2>
          <p className="text-slate-500 mt-1 italic">Consultoria estratégica para 10 nichos de mercado.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button 
            onClick={() => setShowAnalysis(!showAnalysis)}
            className={`px-6 py-3 rounded-xl text-sm font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer z-10 ${showAnalysis ? 'bg-amber-100 text-amber-800' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeWidth={2} /></svg>
            {showAnalysis ? 'Ocultar Análise' : 'Análise Matriz BCG'}
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer z-10"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4v16m8-8H4" strokeWidth={2} /></svg>
            Adicionar Item
          </button>
          <button 
            onClick={handleDownload} 
            className="px-6 py-3 bg-amber-700 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-amber-800 transition-all flex items-center gap-2 cursor-pointer z-10"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth={2} /></svg>
            Baixar PDF
          </button>
        </div>
      </header>

      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar print:hidden">
        {styles.map(style => (
          <button 
            key={style.id} 
            onClick={() => setActiveStyleId(style.id)} 
            className={`px-6 py-4 rounded-2xl border transition-all cursor-pointer whitespace-nowrap shadow-sm ${activeStyleId === style.id ? 'bg-slate-900 text-white border-slate-900 scale-105' : 'bg-white text-slate-600 border-slate-100 hover:border-amber-400'}`}
          >
            <span className="font-bold text-[10px] uppercase tracking-widest">{style.name}</span>
          </button>
        ))}
      </div>

      {showAnalysis && (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg animate-fadeIn mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Matriz de Engenharia de Menu</h3>
              <p className="text-xs text-slate-500">Análise de Popularidade (Vendas) vs. Rentabilidade (Margem de Contribuição)</p>
            </div>
            <div className="flex gap-4 text-[10px] font-bold uppercase">
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-500"></div>Estrela</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500"></div>Burro de Carga</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-500"></div>Quebra-cabeça</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-rose-500"></div>Cão</div>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="Vendas" unit=" un">
                  <Label value="Popularidade (Volume de Vendas)" offset={-10} position="insideBottom" />
                </XAxis>
                <YAxis type="number" dataKey="y" name="Margem" unit=" R$">
                  <Label value="Rentabilidade (Margem de Contribuição)" angle={-90} position="insideLeft" />
                </YAxis>
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Items" data={scatterData} fill="#8884d8">
                  {scatterData.map((entry, index) => {
                    let color = '#94a3b8'; // default slate-400
                    if (entry.strategy === 'Estrela') color = '#059669'; // emerald-600 (Vibrant)
                    if (entry.strategy === 'Burro de Carga') color = '#60a5fa'; // blue-400
                    if (entry.strategy === 'Quebra-cabeça') color = '#fbbf24'; // amber-400
                    if (entry.strategy === 'Cão') color = '#e11d48'; // rose-600 (Vibrant)
                    return <Cell key={`cell-${index}`} fill={color} strokeWidth={2} stroke="#fff" />;
                  })}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 print:grid-cols-2">
        {activeStyle.items.map((item, idx) => (
          <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col print:shadow-none print:border print:rounded-none">
            <div className="relative h-48 overflow-hidden">
              <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[9px] font-bold uppercase shadow-sm backdrop-blur-md
                ${item.strategy === 'Estrela' ? 'bg-emerald-100/90 text-emerald-800' : 
                  item.strategy === 'Burro de Carga' ? 'bg-blue-100/90 text-blue-800' :
                  item.strategy === 'Quebra-cabeça' ? 'bg-amber-100/90 text-amber-800' :
                  'bg-rose-100/90 text-rose-800'}`}>
                {item.strategy}
              </div>
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

      {selectedItem && createPortal(
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
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-2">Análise de Performance</h5>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-slate-600">Margem de Contribuição</span>
                      <span className="text-xs font-bold text-slate-900">R$ {(selectedItem.price - selectedItem.cost).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-600">Volume de Vendas (Est.)</span>
                      <span className="text-xs font-bold text-slate-900">{selectedItem.salesVolume} un.</span>
                    </div>
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
                    {selectedItem.ingredients.length === 0 && <p className="text-xs text-slate-400 italic">Nenhum insumo cadastrado.</p>}
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
        </div>,
        document.body
      )}

      {isAddModalOpen && createPortal(
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
            <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
              <h3 className="text-lg font-bold uppercase tracking-widest text-amber-500">Novo Item do Menu</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-full cursor-pointer transition-colors"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2} /></svg></button>
            </div>
            <form onSubmit={handleAddItem} className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nome do Prato</label>
                  <input 
                    type="text" 
                    required
                    value={newItem.name}
                    onChange={e => setNewItem({...newItem, name: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                    placeholder="Ex: Risoto de Funghi"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Categoria</label>
                    <select 
                      value={newItem.category}
                      onChange={e => setNewItem({...newItem, category: e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                    >
                      <option>Entradas</option>
                      <option>Prato Principal</option>
                      <option>Sobremesas</option>
                      <option>Bebidas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Preço Venda (R$)</label>
                    <input 
                      type="number" 
                      required
                      min="0"
                      step="0.01"
                      value={newItem.price}
                      onChange={e => setNewItem({...newItem, price: parseFloat(e.target.value)})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Custo Estimado (R$)</label>
                  <input 
                    type="number" 
                    min="0"
                    step="0.01"
                    value={newItem.cost}
                    onChange={e => setNewItem({...newItem, cost: parseFloat(e.target.value)})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                    placeholder="Custo total dos insumos"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tempo de Preparo</label>
                    <input 
                      type="text" 
                      value={newItem.prepTime}
                      onChange={e => setNewItem({...newItem, prepTime: e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Rendimento</label>
                    <input 
                      type="text" 
                      value={newItem.yield}
                      onChange={e => setNewItem({...newItem, yield: e.target.value})}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Imagem do Prato</label>
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                      {newItem.image ? (
                        <img src={newItem.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full text-slate-400">
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth={2} /></svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-slate-900 file:text-white hover:file:bg-slate-800 cursor-pointer"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Recomendado: JPG ou PNG até 2MB.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Material Técnico (PDF)</label>
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileUpload(e, 'materials')}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                      />
                      {newItem.materials && <p className="text-[10px] text-emerald-600 mt-1">✓ {newItem.materials}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Vídeo de Treinamento</label>
                      <input 
                        type="file" 
                        accept="video/*"
                        onChange={(e) => handleFileUpload(e, 'video')}
                        className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                      />
                      {newItem.video && <p className="text-[10px] text-emerald-600 mt-1">✓ {newItem.video}</p>}
                    </div>
                  </div>
                </div>
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-amber-700 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-amber-800 transition-all shadow-lg"
              >
                Salvar Item
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default MenuManagement;
