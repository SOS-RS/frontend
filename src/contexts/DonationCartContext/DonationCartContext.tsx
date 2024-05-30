import React, { createContext, useCallback, useEffect, useState } from 'react';

import { IDonationCartContext, IDonationCartItem } from './types';

function getDonationCart(): Record<string, IDonationCartItem[]> {
  const data = localStorage.getItem('shelter-carts');
  if (!data) return {};
  return JSON.parse(data);
}

const DonationCartContext = createContext({} as IDonationCartContext);

const DonationCartProvider = ({ children }: { children?: React.ReactNode }) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [carts, setCarts] = useState<Record<string, IDonationCartItem[]>>(
    getDonationCart()
  );

  const addItem = useCallback((shelterId: string, item: IDonationCartItem) => {
    setCarts((state) => {
      const prev = state[shelterId] ?? [];
      if (prev.some((p) => p.id === item.id))
        return {
          ...state,
          [shelterId]: prev.map((p) =>
            p.id === item.id
              ? { ...p, quantity: p.quantity + item.quantity }
              : p
          ),
        };
      else return { ...state, [shelterId]: [...prev, item] };
    });
  }, []);

  const updateItem = useCallback(
    (
      shelterId: string,
      supplyId: string,
      payload: Partial<Omit<IDonationCartItem, 'id'>>
    ) => {
      setCarts((state) => {
        const prev = state[shelterId] ?? [];
        if (prev.some((p) => p.id === supplyId))
          return {
            ...state,
            [shelterId]: prev.map((p) =>
              p.id === supplyId ? { ...p, ...payload } : p
            ),
          };
        else return state;
      });
    },
    []
  );

  const removeItem = useCallback((shelterId: string, supplyId: string) => {
    setCarts((state) => {
      const prev = state[shelterId] ?? [];
      return { ...state, [shelterId]: prev.filter((p) => p.id !== supplyId) };
    });
  }, []);

  const toggleOpened = useCallback(() => setOpened((prev) => !prev), []);

  const clearCart = useCallback(
    (shelterId: string) => setCarts((state) => ({ ...state, [shelterId]: [] })),
    []
  );

  const updateCart = useCallback(
    (shelterId: string, items: IDonationCartItem[]) => {
      setCarts((prev) => ({ ...prev, [shelterId]: items }));
    },
    []
  );

  useEffect(() => {
    localStorage.setItem('shelter-carts', JSON.stringify(carts));
  }, [carts]);

  return (
    <DonationCartContext.Provider
      value={{
        carts,
        addItem,
        removeItem,
        updateItem,
        opened,
        toggleOpened,
        clearCart,
        updateCart,
      }}
    >
      {children}
    </DonationCartContext.Provider>
  );
};

export { DonationCartContext, DonationCartProvider };
