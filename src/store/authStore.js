import { create } from 'zustand';

// Authentication store with session persistence
export const useAuthStore = create((set, get) => ({
      // User state
      user: null,
      isAuthenticated: false,
      sessionId: null,

      // Login function
      login: (email, password) => {
        // In a real app, this would call an API
        // For now, we'll simulate authentication
        const user = {
          id: Date.now().toString(),
          email,
          name: email.split('@')[0],
          sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
        };
        
        set({
          user,
          isAuthenticated: true,
          sessionId: user.sessionId,
        });
        
        return { success: true, user };
      },

      // Register function
      register: (email, password, name) => {
        // In a real app, this would call an API
        const user = {
          id: Date.now().toString(),
          email,
          name: name || email.split('@')[0],
          sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
        };
        
        set({
          user,
          isAuthenticated: true,
          sessionId: user.sessionId,
        });
        
        return { success: true, user };
      },

      // Logout function
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          sessionId: null,
        });
      },

      // Update user
      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },
    })
);

// Persist auth state to localStorage manually
if (typeof window !== 'undefined') {
  // Load from localStorage on init
  const storedAuth = localStorage.getItem('auth-storage');
  if (storedAuth) {
    try {
      const parsed = JSON.parse(storedAuth);
      if (parsed.user) {
        useAuthStore.setState({
          user: parsed.user,
          isAuthenticated: parsed.isAuthenticated || false,
          sessionId: parsed.sessionId || null
        });
      }
    } catch (e) {
      console.error('Failed to load auth from localStorage', e);
    }
  }

  // Save to localStorage on changes (subscribe to state changes)
  let prevState = useAuthStore.getState();
  useAuthStore.subscribe((state) => {
    // Only update if state actually changed
    if (state.user !== prevState.user || state.isAuthenticated !== prevState.isAuthenticated || state.sessionId !== prevState.sessionId) {
      localStorage.setItem('auth-storage', JSON.stringify({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        sessionId: state.sessionId
      }));
      prevState = state;
    }
  });
}

