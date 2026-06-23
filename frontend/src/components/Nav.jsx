import { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AddIcon from '@mui/icons-material/Add';
import useUser from '../context/useUser'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useMedQuery } from '../Queries/medQuery'
import { useLoteQuery } from '../Queries/lotQuery'
import Select from '@mui/material/Select'
import { FormControl, Input, InputLabel, List, MenuItem } from '@mui/material'
import { useUI } from '../context/UI'

function Nav() {
  const { user } = useUser()
  const [open, setOpen] = useState(false)
  const [selectedMed, setSelectedMed] = useState('')
  const [selectedLote, setSelectedLote] = useState('')
  const [cantidad, setCantidad] = useState(0)
  const { data: medData } = useMedQuery()
  const { data: loteData } = useLoteQuery(selectedMed?.id)
  const { formatDate, menuOpen, toggleMenu, setPedidoData, pedidoData, menuPedido, setMenuPedido } = useUI()
  const agregarAlPedido = () => {
    if (selectedMed && selectedLote) {
      const lote = loteData.find(l => l.codigo === selectedLote)
      setPedidoData({
        medicamento_id: selectedMed.id,
        lote_id: lote.id,
        cantidad: cantidad || 1
      })
      setMenuPedido({
        nombre: selectedMed.nombre,
        lote: selectedLote,
        cantidad: cantidad || 1
      })
      console.log(pedidoData)
    }
  };

  const takeMedId = (e, newValue) => {
    const medValue = e.target.value
    if (newValue) {
      const med = medData.find(med => med.nombre === newValue)
      setSelectedMed(med)
    }
    else if (!newValue && medValue) {
      const med = medData.find(med => med.nombre.toLowerCase() === medValue.toLowerCase())
      console.log(med)
      setSelectedMed(med)
    }
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {user.isRegistered ? (
              <Button color='inherit' startIcon={<AccountCircleIcon />}>
                {user.name}
              </Button>
            ) : (
              <h2>Inventario de Farmacia HLO</h2>
            )}
            <IconButton color='inherit' onClick={toggleMenu}>
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer anchor='left' open={menuOpen} onClose={toggleMenu} PaperProps={{ sx: { width: '100%' } }}>
        <Box sx={{ height: '100%', width: '100%', flexDirection: 'column', display: 'flex' }}>
          <Box sx={{ width: 'full', padding: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Autocomplete freeSolo label='Medicamento' onChange={takeMedId} fullWidth margin='normal' options={medData?.map((med) => med.nombre ? med.nombre : [])} renderInput={(params) => <TextField onChange={takeMedId}  {...params} label="Medicamento" />} />
            <FormControl>
              <InputLabel id='lote-label'>Lote</InputLabel>
              <Select fullWidth disabled={!selectedMed} value={selectedLote} onChange={(e) => setSelectedLote(e.target.value)} label='Lote'>
                {loteData?.map((lote) => (
                  <MenuItem key={lote.id} value={lote.codigo}>{lote.codigo}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField label="Cantidad" type="number" onChange={(e) => {setCantidad(parseInt(e.target.value) || 0)}} />
            <Button variant='outlined' onClick={agregarAlPedido}>Agregar</Button>
          </Box>
          <Box sx={{ width: 'full', overflowY: 'auto' }}>

            {
              pedidoData.items ? (
                <List sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: 'full', overflowY: 'auto', }}>
                  {pedidoData.items.map((item, i) => (
                    <li key={i} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{`${i + 1}. ${menuPedido[i]?.nombre} ${menuPedido[i]?.lote} ${menuPedido[i]?.cantidad}`}</span>
                    </li>
                  ))

                  }
                </List>
              ) : <Box sx={{ width: 250, padding: 2 }}>
                <h3>Selecciona un medicamento para ver detalles</h3>
              </Box>
            }
          </Box>
          <Box sx={{ width: 250, padding: 2, display: 'flex', flexDirection: 'column', gap: 1, position: 'relative', bottom: 0 }}>
            <Button fullWidth variant='outlined'>Guardar pedido</Button>
            <Button fullWidth variant='outlined' color='error' onClick={toggleMenu}>Cerrar</Button>
          </Box>
        </Box>
      </Drawer >
    </>
  )
}

export default Nav
