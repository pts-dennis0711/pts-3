import { create } from 'zustand';
import { useAuthStore } from './authStore';

// Cart store with user session support
export const useCartStore = create((set, get) => ({
      // Cart state - organized by user session
      cartItems: [],
      cartCount: 0,

      // Initialize cart for current user session
      initializeCart: () => {
        const { sessionId } = useAuthStore.getState();
        if (sessionId) {
          const stored = localStorage.getItem(`cart_${sessionId}`);
          if (stored) {
            const cartData = JSON.parse(stored);
            set({
              cartItems: cartData.items || [],
              cartCount: cartData.count || 0,
            });
          }
        }
      },

      // Add item to cart
      addToCart: (item) => {
        const { sessionId } = useAuthStore.getState();
        if (!sessionId) {
          // If no session, create a guest session
          const guestSessionId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          useAuthStore.setState({ sessionId: guestSessionId });
          return get().addToCart(item);
        }

        const currentItems = get().cartItems;
        const existingIndex = currentItems.findIndex(
          (i) => i.id === item.id && i.pricingType === item.pricingType
        );

        let newItems;
        if (existingIndex >= 0) {
          // Update quantity if item exists
          newItems = [...currentItems];
          newItems[existingIndex] = {
            ...newItems[existingIndex],
            quantity: (newItems[existingIndex].quantity || 1) + 1,
          };
        } else {
          // Add new item
          newItems = [...currentItems, { ...item, quantity: 1, addedAt: new Date().toISOString() }];
        }

        const newCount = newItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

        set({
          cartItems: newItems,
          cartCount: newCount,
        });

        // Persist to session-specific storage
        localStorage.setItem(
          `cart_${sessionId}`,
          JSON.stringify({ items: newItems, count: newCount })
        );

        return { success: true, items: newItems, count: newCount };
      },

      // Remove item from cart
      removeFromCart: (itemId, pricingType = null) => {
        const { sessionId } = useAuthStore.getState();
        if (!sessionId) return;

        const currentItems = get().cartItems;
        const newItems = currentItems.filter(
          (item) => !(item.id === itemId && (!pricingType || item.pricingType === pricingType))
        );

        const newCount = newItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

        set({
          cartItems: newItems,
          cartCount: newCount,
        });

        localStorage.setItem(
          `cart_${sessionId}`,
          JSON.stringify({ items: newItems, count: newCount })
        );
      },

      // Update item quantity
      updateQuantity: (itemId, pricingType, quantity) => {
        const { sessionId } = useAuthStore.getState();
        if (!sessionId) return;

        const currentItems = get().cartItems;
        const newItems = currentItems.map((item) => {
          if (item.id === itemId && (!pricingType || item.pricingType === pricingType)) {
            return { ...item, quantity: Math.max(1, quantity) };
          }
          return item;
        });

        const newCount = newItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

        set({
          cartItems: newItems,
          cartCount: newCount,
        });

        localStorage.setItem(
          `cart_${sessionId}`,
          JSON.stringify({ items: newItems, count: newCount })
        );
      },

      // Clear cart
      clearCart: () => {
        const { sessionId } = useAuthStore.getState();
        if (sessionId) {
          localStorage.removeItem(`cart_${sessionId}`);
        }
        set({
          cartItems: [],
          cartCount: 0,
        });
      },

      // Get cart total
      getCartTotal: () => {
        const items = get().cartItems;
        return items.reduce((total, item) => {
          const price = parseFloat(item.price?.replace('$', '').replace(',', '') || 0);
          const quantity = item.quantity || 1;
          return total + price * quantity;
        }, 0);
      },
    })
);

