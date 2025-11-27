import { create } from 'zustand';

export const useStore = create((set, get) => ({
  cartCount: 0,
  cartItems: [],
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  addToCart: (product) => set(({ cartCount, cartItems }) => ({
    cartCount: cartCount + 1,
    cartItems: [...cartItems, product],
  })),
  removeFromCart: (id) => set(({ cartItems, cartCount }) => {
    const idx = cartItems.findIndex((p) => p.id === id);
    if (idx === -1) return {};
    const next = cartItems.slice();
    next.splice(idx, 1);
    return { cartItems: next, cartCount: Math.max(0, cartCount - 1) };
  }),
}));


