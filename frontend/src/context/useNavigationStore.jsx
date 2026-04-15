import { create } from 'zustand'

const useNavigationStore = create((set) => ({
  activeTab: 0,
  setActiveTab: (newValue) => set({ activeTab: newValue })
}))

export default useNavigationStore
