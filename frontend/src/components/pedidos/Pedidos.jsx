import CompletadoTabla from './CompletadoTabla'
import PendienteTabla from './PendienteTabla'

function Pedidos() {
  return (
    <div className='w-full flex flex-col items-center pt-2 pb-2'>
      <h2 className='text-xl font-semibold mb-2'>Pendientes</h2>
      <PendienteTabla />
      <h2 className='text-xl font-semibold mb-2 mt-4'>Completados</h2>
      <CompletadoTabla />
    </div>
  )
}

export default Pedidos
