import { Product } from '@/lib/generated/prisma/client';
import { create } from 'zustand';

interface ProductState {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
}));
