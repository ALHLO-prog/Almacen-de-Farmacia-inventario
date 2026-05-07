import { useQuery } from '@tanstack/react-query'

const URL_BASE = import.meta.env.VITE_API_URL

const fetchRegs = async () => {
  const response = await fetch(URL_BASE + '/registro')
  if (!response.ok) throw new Error('Hubo un error con los registros')
  return response.json()
}

export const useRegQuery = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['registros'],
    queryFn: fetchRegs
  })

  return { data, isLoading, isError, error }
}
