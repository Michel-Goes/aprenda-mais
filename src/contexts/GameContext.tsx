import React, { createContext, useContext, useState, useEffect } from 'react';

type GameContextType = {
  stars: number;
  setStars: (val: number) => void;
  inventory: number[];
  purchaseItem: (id: number, price: number) => { success: boolean; message: string };
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [stars, setStars] = useState(() => {
    const s = localStorage.getItem('stars');
    return s ? parseInt(s) : 120;
  });

  const [inventory, setInventory] = useState<number[]>(() => {
    const s = localStorage.getItem('inventory');
    return s ? JSON.parse(s) : [];
  });

  useEffect(() => {
    localStorage.setItem('stars', stars.toString());
  }, [stars]);

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  const purchaseItem = (id: number, price: number) => {
    if (inventory.includes(id)) {
      return { success: false, message: 'Item já adquirido!' };
    }
    if (stars < price) {
      return { success: false, message: 'Estrelas insuficientes!' };
    }
    setStars(stars - price);
    setInventory([...inventory, id]);
    return { success: true, message: 'Item comprado com sucesso!' };
  };

  return (
    <GameContext.Provider value={{ stars, setStars, inventory, purchaseItem }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
}
