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
import lotes from '../../JSON/lotes.json'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useMedQuery } from '../../Queries/medQuery'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

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
  const {
    data: meds,
    isLoading: medIsLoading,
    isError: medIsError,
    error: medError
  } = useMedQuery()
  const [open, setOpen] = useState(false)
  const [openLote, setOpenLote] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [openMed, setOpenMed] = useState(false)
  const [type, setType] = useState('')

  const handleTypeOnChange = (event) => {
    setType(event.target.value)
  }

  const createLote = () => {
    console.log('Crear nuevo lote para el medicamento:', selectedRow)
  }

  const handleRowClick = (params) => {
    setSelectedRow(params.row)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)
  const handleLoteDialog = () => setOpenLote(!openLote)
  const handleMed = () => setOpenMed(!openMed)

  const [buscarMed, setBuscarMed] = useState('')
  const filasFiltradas = !medIsLoading
    ? meds.filter((fila) =>
        fila.nombre.toLowerCase().includes(buscarMed.toLowerCase())
      )
    : meds

  const colums = [
    {
      field: 'nombre',
      headerName: 'Medicamento',
      minWidth: 130,
      flex: 1,
      resizable: false,
      editable: false,
      disableColumnMenu: true
    },
    {
      field: 'tipo',
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
          <Button size='small' onClick={handleMed}>
            Agregar medicamento
          </Button>
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
      <Dialog open={openMed} onClose={handleMed} fullWidth maxWidth='xs'>
        <DialogTitle>Agregar lote</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            label='Nombre'
            variant='outlined'
            margin='normal'
          />
          <FormControl fullWidth>
            <InputLabel id='label-med'>Presentación</InputLabel>
            <Select
              labelId='label-med'
              id='selec-med'
              variant='outlined'
              value={type}
              onChange={handleTypeOnChange}
              label='Presentación'
            >
              <MenuItem value='Ampolla'>Ampolla</MenuItem>
              <MenuItem value='Solución'>Solución</MenuItem>
              <MenuItem value='Tableta'>Tableta</MenuItem>
              <MenuItem value='Suspensión'>Suspensión</MenuItem>
              <MenuItem value='Jarabe'>Jarabe</MenuItem>
              <MenuItem value='Gota'>Gota</MenuItem>
              <MenuItem value='Crema'>Crema</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 2, py: 2 }}>
          <Button variant='outlined' onClick={createLote}>
            Crear
          </Button>
          <Button variant='outlined' onClick={handleMed} color='primary'>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

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
        <DialogActions sx={{ justifyContent: 'space-between', px: 2, py: 2 }}>
          <Button variant='outlined' onClick={handleLoteDialog}>
            Agregar lote
          </Button>
          <Button variant='outlined' onClick={handleClose} color='primary'>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openLote}
        onClose={handleLoteDialog}
        fullWidth
        maxWidth='xs'
      >
        <DialogTitle>Agregar lote</DialogTitle>
        <DialogContent dividers>
          <TextField
            required
            label='Lote'
            variant='outlined'
            fullWidth
            margin='normal'
          />

          <DatePicker
            label='Fecha de Vencimiento'
            slotProps={{ textField: { fullWidth: true } }}
          />

          <TextField
            required
            label='Cantidad'
            variant='outlined'
            fullWidth
            margin='normal'
            type='number'
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 2, py: 2 }}>
          <Button variant='outlined' onClick={createLote}>
            Crear
          </Button>
          <Button variant='outlined' onClick={handleLoteDialog} color='primary'>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MedsTable
