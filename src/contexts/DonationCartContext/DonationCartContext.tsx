import React, { createContext, useState } from 'react';

import { IDonationCartContext, IDonationCartItem } from './types';
import { DonationCart } from '@/components';

const DonationCartContext = createContext({} as IDonationCartContext);

const DonationCartProvider = ({ children }: { children?: React.ReactNode }) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [items, setItems] = useState<IDonationCartItem[]>([]);

  const addItem = (item: IDonationCartItem) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === item.id))
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
        );
      else return [...prev, item];
    });
  };

  const updateItem = (
    supplyId: string,
    payload: Partial<Omit<IDonationCartItem, 'id'>>
  ) => {
    setItems((prev) => {
      if (prev.some((p) => p.id === supplyId))
        return prev.map((p) => (p.id === supplyId ? { ...p, ...payload } : p));
      else return prev;
    });
  };

  const removeItem = (supplyId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== supplyId));
  };

  const toggleOpened = () => setOpened((prev) => !prev);

  return (
    <DonationCartContext.Provider
      value={{ items, addItem, removeItem, updateItem, opened, toggleOpened }}
    >
      <DonationCart opened={opened} onClose={toggleOpened} />
      {children}
    </DonationCartContext.Provider>
  );
};

export { DonationCartContext, DonationCartProvider };
