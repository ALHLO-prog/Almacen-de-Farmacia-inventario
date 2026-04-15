import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { DataGrid } from '@mui/x-data-grid'
import tablas from '../../JSON/tablas.json'
import { useState } from 'react'
import TextField from '@mui/material/TextField'

function CustomToolbar({ buscarMed, setBuscarMed }) {
  return (
    <Box sx={{ p: 1 }}>
      <TextField
        fullWidth
        size='small'
        variant='outlined'
        placeholder='Buscar medicamento.'
        value={buscarMed}
        onChange={(e) => setBuscarMed(e.target.value)}
      />
    </Box>
  )
}

function MedsTable() {
  const [buscarMed, setBuscarMed] = useState('')
  const filasFiltradas = tablas.filter((fila) =>
    fila.Medicamento.toLowerCase().includes(buscarMed.toLowerCase())
  )
  const colums = [
    {
      field: 'Medicamento',
      headerName: 'Medicamento',
      minWidth: 130,
      flex: 1,
      resizable: false,
      editable: false,
      disableColumnMenu: true
    },
    {
      field: 'Concentracion',
      headerName: '%',
      minWidth: 130,
      flex: 1,
      resizable: false,
      editable: false,
      disableColumnMenu: true
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
        <CustomToolbar buscarMed={buscarMed} setBuscarMed={setBuscarMed} />
      </Stack>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <DataGrid
          columns={colums}
          rows={filasFiltradas}
          hideFooterPagination={true}
          pagination={false}
          hideFooter
          initialState={{
            sorting: {
              sortModel: [{ field: 'Medicamento', sort: 'asc' }]
            }
          }}
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
