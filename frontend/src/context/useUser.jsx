import { create } from 'zustand'

const useUser = create((set) => ({
  user: {
    ci: undefined,
    name: undefined,
    cargo: undefined
  },
  setUser: (newUser) => set({ user: newUser })
}))

export default useUser
