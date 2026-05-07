import { useQuery } from '@tanstack/react-query'

const URL_BASE = import.meta.env.VITE_API_URL

const fetchReqs = async () => {
  const response = await fetch(URL_BASE + '/pedido/por-fecha')
  if (!response.ok) throw new Error('Hubo un error con las solicitudes')
  return response.json()
}

export const useReqQuery = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['pedidos'],
    queryFn: fetchReqs
  })

  return { data, isLoading, isError, error }
}
