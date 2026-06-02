import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const URL_BASE = import.meta.env.VITE_API_URL

const fetchLotes = async (medId) => {
  const response = await fetch(URL_BASE + `/lote/med/${medId}`)
  if (!response.ok) throw new Error('Hubo un error con los lotes')
  return response.json()
}

const createNewLote = async (newLoteData) => {
  const response = await fetch(URL_BASE + '/lote/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newLoteData)
  })
  if (!response.ok) throw new Error('Hubo un error al crear el lote')
  return response.json()
}

export const useLoteQuery = (medId) => {
  const queryClient = useQueryClient()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['lotes', medId],
    queryFn: () => fetchLotes(medId),
    enabled: !!medId
  })

  const {
      mutate,
      isError: isNewLoteError,
      error: newLoteError,
      isPending
    } = useMutation({
      mutationFn: (newLoteData) => createNewLote(newLoteData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['lotes', medId] })
      }
    })


  return {
    data,
    isLoading,
    isError,
    error,
    mutate,
    isNewLoteError,
    newLoteError,
    isPending
  }
}
