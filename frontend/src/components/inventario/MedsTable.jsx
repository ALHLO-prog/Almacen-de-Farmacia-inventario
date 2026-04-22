import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Stack from '@mui/material/Stack'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import tablas from '../../JSON/tablas.json'
import lotes from '../../JSON/lotes.json'

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
  const [open, setOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const handleRowClick = (params) => {
    setSelectedRow(params.row)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)
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
      disableColumnMenu: true,
      sortable: false
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
  const columsLotes = [
    {
      field: 'lote',
      headerName: 'Lote',
      minWidth: 90,
      flex: 1,
      resizable: false,
      editable: false,
      disableColumnMenu: true,
      sortable: false
    },
    {
      field: 'fecha_de_vencimiento',
      headerName: 'F.V',
      minWidth: 90,
      flex: 1,
      resizable: false,
      editable: false,
      disableColumnMenu: true,
      sortable: false
    },
    {
      field: 'cantidad',
      headerName: 'Cantidad',
      minWidth: 90,
      flex: 1,
      resizable: false,
      editable: false,
      disableColumnMenu: true,
      sortable: false
    }
  ]

  return (
    <>
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
            onRowClick={handleRowClick}
            sx={{ cursor: 'pointer' }}
          />
        </div>
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
        <DialogTitle>Lotes</DialogTitle>
        <DialogContent dividers>
          {selectedRow && (
            <>
              <DataGrid
                columns={columsLotes}
                rows={lotes}
                hideFooterPagination={true}
                pagination={false}
                hideFooter
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'fecha_de_vencimiento', sort: 'asc' }]
                  }
                }}
                slotProps={{
                  panel: {
                    sx: {
                      '& .MuiDataGrid-filterFormColumnInput': {
                        display: 'none'
                      },
                      '& .MuiDataGrid-filterFormOperatorInput': {
                        display: 'none'
                      },
                      '& .MuiDataGrid-filterForm': {
                        display: 'flex',
                        justifyContent: 'center'
                      }
                    }
                  }
                }}
                onRowClick={handleRowClick}
                sx={{ cursor: 'pointer' }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MedsTable
