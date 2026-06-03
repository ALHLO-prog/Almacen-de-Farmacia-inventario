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
import { FormControl, InputLabel, MenuItem } from '@mui/material'
import { useUI } from '../context/UI'

function Nav() {
  const { user } = useUser()
  const [open, setOpen] = useState(false)
  const [selectedMed, setSelectedMed] = useState(null)
  const [selectedLote, setSelectedLote] = useState('')
  const { data: medData } = useMedQuery()
  const { data: loteData } = useLoteQuery(selectedMed?.id)
  const { formatDate } = useUI()

  const takeMedId = (e, newValue) => {
    const medValue = e.target.value
    if (newValue) {
      const med = medData.find(med => med.nombre === newValue)
      console.log(med)
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
            <IconButton color='inherit' onClick={() => setOpen(true)}>
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250, padding: 2, flexDirection: 'column', display: 'flex', gap: 2 }}>
          <Autocomplete freeSolo label='Medicamento' onChange={takeMedId} fullWidth margin='normal' options={medData?.map((med) => med.nombre ? med.nombre : [])} renderInput={(params) => <TextField onChange={takeMedId}  {...params} label="Medicamento" />} />
          <FormControl>
            <InputLabel id='lote-label'>Lote</InputLabel>
            <Select fullWidth disabled={!selectedMed} value={selectedLote} onChange={(e) => setSelectedLote(e.target.value)} label='Lote'>
              {loteData?.map((lote) => (
                <MenuItem key={lote.id} value={lote.codigo}>{lote.codigo + ' ' + formatDate(lote.vencimiento) + ' ' + lote.cantidad}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {
          selectedMed ? (
            <Box sx={{ width: 250, padding: 2 }}>
              <h3>{selectedMed.nombre}</h3>
            </Box>
          ) : <Box sx={{ width: 250, padding: 2 }}>
            <h3>Selecciona un medicamento para ver detalles</h3>
          </Box>
        }

      </Drawer >
    </>
  )
}

export default Nav
