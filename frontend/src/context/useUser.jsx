import { create } from 'zustand'

const useUser = create((set) => ({
  user: {
    ci: 30911509,
    name: 'Andres Rodriguez',
    cargo: 'Almacenista',
    isRegistered: true
  },
  setUser: (newUser) => set({ user: newUser })
}))

export default useUser
