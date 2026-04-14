import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { DataGrid } from '@mui/x-data-grid'
import tablas from '../../JSON/tablas.json'

function MedsTable() {
  const colums = [
    {
      field: 'Medicamento',
      headerName: 'Medicamento',
      minWidth: 130,
      flex: 1,
      resizable: false,
      editable: false
    },
    {
      field: 'Concentracion',
      headerName: 'Concentración',
      minWidth: 130,
      flex: 1,
      resizable: false,
      editable: false
    },
    {
      field: 'Tipo',
      headerName: 'Tipo',
      minWidth: 130,
      flex: 1,
      resizable: false,
      editable: false,
      valueOptions: ['Tableta', 'Ampolla', 'Jarabe', 'Crema', 'Cápsula'],
      type: 'singleSelect'
    }
  ]

  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <Stack
        direction='row'
        spacing={1}
        sx={{
          mb: 1
        }}
      >
        <Button size='small'>Agregar medicamento</Button>
      </Stack>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <DataGrid
          columns={colums}
          rows={tablas}
          hideFooterPagination={true}
          pagination={false}
          hideFooter
          slotProps={{
            panel: {
              sx: {
                '& .MuiDataGrid-filterFormColumnInput': { display: 'none' },
                '& .MuiDataGrid-filterFormOperatorInput': { display: 'none' },
                '& .MuiDataGrid-filterForm': {
                  display: 'flex',
                  justifyContent: 'center'
                }
              }
            }
          }}
        />
      </div>
    </Box>
  )
}

export default MedsTable
