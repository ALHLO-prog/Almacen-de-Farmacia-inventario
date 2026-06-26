import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const URL_BASE = import.meta.env.VITE_API_URL

const fetchReqs = async () => {
  const response = await fetch(URL_BASE + '/pedido/por-fecha')
  if (!response.ok) throw new Error('Hubo un error con las solicitudes')
  return response.json()
}

const createNewReq = async (newReqData) => {
  const response = await fetch(URL_BASE + '/pedido/add-bulk', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newReqData)
  })
  if (!response.ok) throw new Error('Hubo un error al crear el pedido')
  return response.json()
}

export const useReqQuery = () => {
  const queryClient = useQueryClient()
  const { data, isLoading, isError: isNewReqError, error: newReqError } = useQuery({
    queryKey: ['pedidos'],
    queryFn: fetchReqs
  })
  const { mutate, isError, error, isPending, isSuccess } = useMutation({
    mutationFn: (newReqData) => createNewReq(newReqData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pedidos'] })
    }
  })
  return { data, isLoading, isError, error, mutate, isNewReqError, newReqError, isPending, isSuccess }
}

