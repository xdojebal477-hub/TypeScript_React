import { useState } from 'react';

type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  items: TabItem[];
};

const Tabs = ({ items }: TabsProps) => {
  // Inicializamos con el primer ID
  const [activeTabId, setActiveTabId] = useState(items[0].id);

  // Buscamos el contenido activo
  const activeItem = items.find((item) => item.id === activeTabId);

  return (
    <div className="tabs-wrapper">
      <div className="tabs-header">
        {items.map((item) => (
          <button
            key={item.id}
            className={`tab-btn ${activeTabId === item.id ? 'active' : ''}`}
            onClick={() => setActiveTabId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="tab-panel">
        {activeItem?.content}
      </div>
    </div>
  );
};

export default Tabs;