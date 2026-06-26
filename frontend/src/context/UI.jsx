import { create } from 'zustand'

export const useUI = create((set) => ({
  menuOpen: false,
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
  pedidoData: {
    usuario_id: '',
    items: [],
    fecha: ''
  },
  setPedidoUser: (ci) => set((state) => ({ pedidoData: { ...state.pedidoData, usuario_id: ci } })),
  setPedidoDate: () => set((state) => ({ pedidoData: { ...state.pedidoData, fecha: state.formatDate(new Date) } })),
  setInitialPedidoData: () => set((state) => {
    return {
      pedidoData: {
        ...state.pedidoData,
        items: [],
        fecha: state.formatDate(new Date())
      }
    }
  }),
  setPedidoData: (data) => set((state) => {
    return { pedidoData: { ...state.pedidoData, items: [...state.pedidoData.items, data] } }
  }),
  menuPedido: [],
  setInitialMenuPedido: () => set((state) => { return { menuPedido: [] } }),
  setMenuPedido: (data) => set((state) => ({ menuPedido: [...state.menuPedido, data] })),

  formatDate: (datestring) => {
    let date
    if (typeof datestring == 'string') { date = new Date(datestring) }
    else if (typeof datestring == 'object') { date = datestring }

    if (isNaN(date.getTime())) {
      return ''
    }
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
}))