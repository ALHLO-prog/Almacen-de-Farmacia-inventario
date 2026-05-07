import CompletadoTabla from './CompletadoTabla'
import PendienteTabla from './PendienteTabla'
import { useReqQuery } from '../../Queries/reqQuery'

function Pedidos() {
  const { data, isLoading, isError, error } = useReqQuery()
  console.log('Datos de pedidos:', data)
  const pendientes = data
    ? data.filter((pedido) => pedido.estado === 'pendiente')
    : []
  const completados = data
    ? data.filter((pedido) => pedido.estado === 'completado')
    : []

  return (
    <div className='w-full flex flex-col items-center pt-2 pb-2'>
      <h2 className='text-xl font-semibold mb-2'>Pendientes</h2>
      <PendienteTabla
        data={pendientes}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
      <h2 className='text-xl font-semibold mb-2 mt-4'>Completados</h2>
      <CompletadoTabla
        data={completados}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </div>
  )
}

export default Pedidos
