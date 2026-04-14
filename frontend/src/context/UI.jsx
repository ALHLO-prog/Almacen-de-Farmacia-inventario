import create from 'zustand'

export const useUI = create((set) => ({
  menuOpen: false,
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
}))