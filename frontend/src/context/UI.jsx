import { create } from 'zustand'

export const useUI = create((set) => ({
  menuOpen: false,
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
  pedidoData: {
    user_id: null,
    items: []
  },
  setPedidoData: (data) => set((state) => {
    console.log({ ...state.pedidoData, items: [...state.pedidoData.items, data ] })
    return { pedidoData: { ...state.pedidoData, items: [...state.pedidoData.items, data ] }}
  }),
  menuPedido: [],
  setMenuPedido: (data) => set((state) => ({ menuPedido: [...state.menuPedido, data ] })),
  formatDate: (dateString) => {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return ''
    }
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
}))