import { create } from 'zustand'

export const useUser = create((set) => ({
  user: {
    ci: 30911509,
    name: 'Andres Rodriguez',
    cargo: 'Almacenista',
    isRegistered: true
  },
  setUser: (newUser) => set({ user: newUser })
}))
