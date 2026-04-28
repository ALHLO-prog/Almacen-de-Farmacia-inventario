import { useQuery } from '@tanstack/react-query'

const URL_BASE = import.meta.env.VITE_API_URL

const fetchMeds = async () => {
  const response = await fetch(URL_BASE + '/med')
  if (!response.ok) throw new Error('Hubo un error con los medicamentos')
  return response.json()
}

export const useMedQuery = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['id'],
    queryFn: fetchMeds
  })

  return { data, isLoading, isError, error }
}
