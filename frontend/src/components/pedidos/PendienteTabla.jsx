import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { DataGrid } from '@mui/x-data-grid'
import pedidos from '../../JSON/pendientes.json'

function PendienteTabla({ data, isLoading, isError, error }) {
  const columns = [
    {
      field: 'nombre_medicamento',
      headerName: 'Medicamento',
      width: 150,
      resizable: false,
      editable: false,
      disableColumnMenu: true
    },
    {
      field: 'codigo_lote',
      headerName: 'Lote',
      width: 150,
      resizable: false,
      editable: false,
      disableColumnMenu: true,
      sortable: false
    },
    {
      field: 'cantidad',
      headerName: 'Cantidad',
      width: 150,
      resizable: false,
      editable: true,
      disableColumnMenu: true,
      sortable: false
    },
    {
      field: 'fecha',
      headerName: 'Fecha de Pedido',
      width: 150,
      resizable: false,
      editable: false,
      disableColumnMenu: true
    }
  ]
  console.log('Datos de pendientes:', data)
  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction='row' spacing={1} sx={{ mb: 1 }}></Stack>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <DataGrid
          columns={columns}
          rows={data}
          hideFooterPagination={true}
          pagination={false}
          hideFooter
        />
      </div>
    </Box>
  )
}

export default PendienteTabla
