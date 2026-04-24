import { Box, Stack, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import registros from '../../JSON/registros.json'

function Registros() {
  const columns = [
    {
      field: 'medicamento',
      headerName: 'Medicamento',
      width: 150,
      resizable: false,
      editable: false,
      disableColumnMenu: true
    },
    {
      field: 'lote',
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
      width: 100,
      resizable: false,
      editable: true,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        const entrada = params.row.entrada || 0
        const salida = params.row.salida || 0
        if (entrada > 0) {
          return (
            <div className='flex items-center size-full '>
              <Typography sx={{ color: 'success.main', fontWeight: 'bold' }}>
                +{entrada}
              </Typography>
            </div>
          )
        }

        if (salida > 0) {
          return (
            <div className='flex items-center size-full '>
              <Typography sx={{ color: 'error.main', fontWeight: 'bold' }}>
                -{salida}
              </Typography>
            </div>
          )
        }

        return <Typography color='text.secondary'>0</Typography>
      }
    },
    {
      field: 'fecha_pedido',
      headerName: 'Fecha',
      width: 100,
      resizable: false,
      editable: false,
      disableColumnMenu: true
    },
    {
      field: 'nota',
      headerName: 'Nota',
      width: 150,
      resizable: false,
      editable: false,
      disableColumnMenu: true
    }
  ]

  return (
    <div className='w-full flex flex-col items-center pt-2 pb-2'>
      <h1>Registros</h1>
      <Box sx={{ width: '100%' }}>
        <Stack direction='row' spacing={1} sx={{ mb: 1 }}></Stack>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <DataGrid
            columns={columns}
            rows={registros}
            hideFooterPagination={true}
            pagination={false}
            hideFooter
          />
        </div>
      </Box>
    </div>
  )
}

export default Registros
