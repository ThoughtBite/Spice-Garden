import { useMemo } from 'react';

export const useCartCalculations = (totalPrice: number) => {
  return useMemo(() => {
    const subtotal = totalPrice;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    
    return { subtotal, tax, total };
  }, [totalPrice]);
};