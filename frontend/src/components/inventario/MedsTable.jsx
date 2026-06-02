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
import { useLoteQuery } from '../../Queries/lotQuery'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useMedQuery } from '../../Queries/medQuery'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  InputAdornment,
  FormHelperText,
  Card,
  Typography,
  Divider,
  Grid,
  Container
} from '@mui/material'

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
    isMedError,
    medError,
    mutate: createNewMed,
    isNewMedError,
    newMedError
  } = useMedQuery()
  const [open, setOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [openMed, setOpenMed] = useState(false)
  const handleRowClick = (params) => {
    setSelectedRow(params.row)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)
  const handleMed = () => setOpenMed(!openMed)

  const [buscarMed, setBuscarMed] = useState('')

  const filasFiltradas = !medIsLoading
    ? meds.filter((fila) =>
      fila.nombre
        ? fila.nombre.toLowerCase().includes(buscarMed.toLowerCase())
        : false
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
            loading={medIsLoading}
            error={isMedError ? medError : null}
            pagination={true}
            initialState={{
              sorting: {
                sortModel: [{ field: 'Medicamento', sort: 'asc' }]
              },
              pagination: {
                paginationModel: {
                  pageSize: 10, // Cuántas filas ver por defecto
                  page: 0 // Página inicial
                }
              }
            }}
            pageSizeOptions={[5, 10, 20, 50]}
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

      <CreateMedDialog
        handleMed={handleMed}
        createNewMed={createNewMed}
        openMed={openMed}
      />
      <LoteDialog
        selectedRow={selectedRow}
        handleClose={handleClose}
        open={open}
      />
    </>
  )
}

const LoteDialog = ({ selectedRow, handleClose, open }) => {
  const {
    data: lotes,
    isLoading,
    isError,
    error
  } = useLoteQuery(selectedRow?.id)
  const [lotesRow, setLotesRow] = useState(null)
  const handleRowLotesClick = (params) => {
    console.log('Lote seleccionado:', params.row)
    setLotesRow(params.row)
    setOpenLoteMenu(true)
  }
  const handleLoteDialogOpen = () => setOpenLote(true)
  const [openLote, setOpenLote] = useState(false)


  const formatDate = (dateString) => {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return ''
    }
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  const columsLotes = [
    {
      field: 'codigo',
      headerName: 'Lote',
      minWidth: 90,
      flex: 1,
      resizable: false,
      editable: false,
      disableColumnMenu: true,
      sortable: false
    },
    {
      field: 'vencimiento',
      headerName: 'F.V',
      minWidth: 90,
      flex: 1,
      resizable: false,
      editable: false,
      disableColumnMenu: true,
      sortable: false
    },
    {
      field: 'concentracion',
      headerName: 'Concentración',
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
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='xs'>
        <DialogTitle>Lotes</DialogTitle>
        <DialogContent dividers>
          {selectedRow && (
            <>
              <DataGrid
                columns={columsLotes}
                rows={lotes}
                pagination={true}
                loading={isLoading}
                error={isError ? error : null}
                initialState={{
                  sorting: {
                    sortModel: [{ field: 'fecha_de_vencimiento', sort: 'asc' }]
                  }
                }}
                hideFooterPagination={true}
                hideFooter
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
                onRowClick={handleRowLotesClick}
                sx={{ cursor: 'pointer' }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 2, py: 2 }}>
          <Button variant='outlined' onClick={handleLoteDialogOpen}>
            Agregar lote
          </Button>
          <Button variant='outlined' onClick={handleClose} color='primary'>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      <CreateLote selectedRow={selectedRow} openLote={openLote} setOpenLote={setOpenLote}S />
      <ViewLote selectedRow={selectedRow} lotesRow={lotesRow} />
    </>
  )
}



const CreateLote = ({ selectedRow, openLote, setOpenLote }) => {

  const handleLoteDialog = () => setOpenLote(false)
  const [concentrationUnit, setConcentrationUnit] = useState('')

  const [newLoteInfo, setNewLoteInfo] = useState({
    medicamento_id: selectedRow?.id,
    codigo: '',
    cantidad: '',
    vencimiento: '',
    concentracion: {
      C: '',
      U: '',
      V: '',
    }
  })
  const createLote = () => {
    const loteInfoToServer = {
      ...newLoteInfo,
      concentracion: newLoteInfo.concentracion.V.length > 0 && newLoteInfo.concentracion.V != '0' ? `${newLoteInfo.concentracion.C + newLoteInfo.concentracion.U}/${newLoteInfo.concentracion.V}ml` : `${newLoteInfo.concentracion.C + newLoteInfo.concentracion.U}`
    }
    console.log(loteInfoToServer);
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setNewLoteInfo({
      ...newLoteInfo,
      [name]: value ? value[0].toUpperCase() + value.slice(1) : ''
    })
  }
  return (
    <>
      <Dialog
        open={openLote}
        onClose={handleLoteDialog}
        fullWidth
        maxWidth='xs'
      >
        <DialogTitle>Agregar lote</DialogTitle>
        <DialogContent dividers className='flex flex-col gap-2'>
          <TextField
            required
            name='codigo'
            label='Lote'
            variant='outlined'
            fullWidth
            onChange={handleChange}
          />
          <DatePicker
            required
            name='vencimiento'
            onChange={(date) =>
              setNewLoteInfo({
                ...newLoteInfo,
                vencimiento: `${date.$y}-${date.$M + 1}-${date.$D}`
              })
            }
            label='Fecha de Vencimiento'
            slotProps={{ textField: { fullWidth: true } }}
          />
          <TextField
            required
            name='cantidad'
            label='Cantidad'
            variant='outlined'
            fullWidth
            type='number'
            onChange={handleChange}
          />
          <div className='flex gap-2'>
            <FormControl>
              <TextField required variant='outlined' fullWidth type='number' onChange={(e) => {
                const { value } = e.target
                setNewLoteInfo({
                  ...newLoteInfo,
                  concentracion: { ...newLoteInfo.concentracion, C: value }
                }
                )
              }
              } />
              <FormHelperText>%</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Unidad</InputLabel>
              <Select
                required
                value={concentrationUnit}
                label='Unit'
                onChange={(e) => {
                  const { value } = e.target
                  setConcentrationUnit(value)
                  setNewLoteInfo({
                    ...newLoteInfo,
                    concentracion: { ...newLoteInfo.concentracion, U: value }
                  }
                  )
                }}
              >
                <MenuItem value={'mg'}>mg</MenuItem>
                <MenuItem value={'gr'}>gr</MenuItem>
                <MenuItem value={'%'}>%</MenuItem>
                <MenuItem value={'UI'}>UI</MenuItem>
                <MenuItem value={'mEq'}>mEq</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <TextField
                variant='outlined'
                fullWidth
                type='number'
                onChange={(e) => {
                  const { value } = e.target
                  setNewLoteInfo({
                    ...newLoteInfo,
                    concentracion: { ...newLoteInfo.concentracion, V: value }
                  }
                  )
                }
                }
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position='end'>ml</InputAdornment>
                    )
                  }
                }}
              />
              <FormHelperText>Volumen</FormHelperText>
            </FormControl>
          </div>
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

const ViewLote = ({ selectedRow, lotesRow }) => {
  const [openLoteMenu, setOpenLoteMenu] = useState(false)

  return (
    <Dialog open={openLoteMenu} onClose={() => setOpenLoteMenu(false)}>
      <DialogTitle>{`${selectedRow?.nombre} - ${lotesRow?.codigo}`}</DialogTitle>
      <DialogContent dividers>
        <Card variant='outlined' sx={{ maxWidth: 360 }}>
          <Box sx={{ py: 1, px: 2 }}>
            <Stack
              direction='row'
              sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography gutterBottom variant='p' component='div'>
                Cantidad
              </Typography>
              <Typography gutterBottom variant='p' component='div'>
                {lotesRow?.cantidad}
              </Typography>
            </Stack>
          </Box>
          <Divider />
          <Box sx={{ p: 1, px: 2 }}>
            <Stack
              direction='row'
              sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography gutterBottom variant='p' component='div'>
                Concentración
              </Typography>
              <Typography gutterBottom variant='p' component='div'>
                {lotesRow?.concentracion}
              </Typography>
            </Stack>
          </Box>
          <Divider />
          <Box sx={{ p: 1, px: 2 }}>
            <Stack
              direction='row'
              sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography gutterBottom variant='p' component='div'>
                Fecha de vencimiento
              </Typography>
              <Typography gutterBottom variant='p' component='div'>
                {new Date(lotesRow?.vencimiento).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                })}
              </Typography>
            </Stack>
          </Box>
        </Card>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
            gap: 2,
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
            <TextField label='Entrada' fullWidth />
            <TextField label='Salida' fullWidth />
          </Box>
        </Container>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', px: 2, py: 2 }}>
        <Button variant='outlined' color='error' sx={{ mr: 1 }}>
          Cerrar
        </Button>
        <Button variant='outlined' color='primary'>
          Modificar cantidad
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const CreateMedDialog = ({ handleMed, openMed, createNewMed }) => {
  const handleNewMed = () => {
    if (newMedInfo.nombre.length == 0 || newMedInfo.tipo.length == 0) {
    } else {
      createNewMed(newMedInfo)
    }
  }
  const [newMedInfo, setNewMedInfo] = useState({
    nombre: '',
    tipo: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewMedInfo({
      ...newMedInfo,
      [name]: value ? value[0].toUpperCase() + value.slice(1) : ''
    })
  }
  return (
    <Dialog open={openMed} onClose={handleMed} fullWidth maxWidth='xs'>
      <DialogTitle>Agregar medicamento</DialogTitle>
      <DialogContent dividers>
        <TextField
          fullWidth
          onChange={handleChange}
          name='nombre'
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
            name='tipo'
            value={newMedInfo.tipo}
            onChange={handleChange}
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
        <Button variant='outlined' onClick={handleNewMed}>
          Crear
        </Button>
        <Button variant='outlined' onClick={handleMed} color='primary'>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MedsTable
