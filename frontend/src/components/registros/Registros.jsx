import { Box, Stack, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useRegQuery } from '../../Queries/regQuery'

function Registros() {
  const { data, isLoading, isError, error } = useRegQuery()
  const columns = [
    {
      field: 'medicamento_nombre',
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
      field: 'fecha',
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
            rows={data}
            loading={isLoading}
            error={isError ? error : null}
            hideFooterPagination={true}
            pagination={false}
            hideFooter
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10, // Cuántas filas ver por defecto
                  page: 0 // Página inicial
                }
              }
            }}
          />
        </div>
      </Box>
    </div>
  )
}

export default Registros
