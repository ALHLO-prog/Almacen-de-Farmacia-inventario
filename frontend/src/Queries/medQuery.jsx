import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const URL_BASE = import.meta.env.VITE_API_URL

const fetchMeds = async () => {
  const response = await fetch(URL_BASE + '/med')
  if (!response.ok) throw new Error('Hubo un error con los medicamentos')
  return response.json()
}

const createNewMed = async (newMedData) => {
  const response = await fetch(URL_BASE + '/med/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' // Indispensable para que el backend lea el body
    },
    body: JSON.stringify(newMedData)
  })
  if (!response.ok) throw new Error('Hubo un error al crear el medicamento')
  return response.json()
}

export const useMedQuery = () => {
  const queryClient = useQueryClient()
  const {
    data,
    isLoading,
    isError: isMedError,
    error: medError
  } = useQuery({
    queryKey: ['medicamentos'],
    queryFn: fetchMeds
  })

  const {
    mutate,
    isError: isNewMedError,
    error: newMedError,
    isPending
  } = useMutation({
    mutationFn: (newMedData) => createNewMed(newMedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicamentos'] })
    }
  })

  return {
    data,
    isLoading,
    isMedError,
    medError,
    mutate,
    isNewMedError,
    newMedError,
    isPending
  }
}
