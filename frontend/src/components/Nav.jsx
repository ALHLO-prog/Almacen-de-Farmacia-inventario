import { useState, useEffect } from 'react'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AddIcon from '@mui/icons-material/Add';
import { useUser } from '../context/useUser'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useMedQuery } from '../Queries/medQuery'
import { useLoteQuery } from '../Queries/lotQuery'
import Select from '@mui/material/Select'
import { Divider, FormControl, Input, InputLabel, List, ListItem, ListItemText, MenuItem, Typography } from '@mui/material'
import { useUI } from '../context/UI'
import { useReqQuery } from '../Queries/reqQuery'

function Nav() {
  const { user } = useUser()
  const [open, setOpen] = useState(false)
  const [selectedMed, setSelectedMed] = useState({
    med: '',
    lote: '',
    cantidad: 0
  })
  const { data: medData } = useMedQuery()
  const { data: loteData } = useLoteQuery(selectedMed?.med?.id)
  const { mutate: createReq, isSuccess } = useReqQuery()
  const { formatDate, menuOpen, toggleMenu, setPedidoUser, setPedidoDate, setPedidoData, pedidoData, menuPedido, setMenuPedido, setInitialPedidoData, setInitialMenuPedido } = useUI()
  useEffect(() => {
    setPedidoUser(user.ci)
    setPedidoDate()
  }, [])
  const agregarAlPedido = () => {
    console.log(pedidoData)

    if (selectedMed && selectedMed.lote) {
      const lote = loteData.find(l => l.codigo === selectedMed.lote)
      setPedidoData({
        medicamento_id: selectedMed.med.id,
        lote_id: lote.id,
        cantidad: selectedMed.cantidad || 1
      })
      setMenuPedido({
        nombre: selectedMed.med.nombre,
        lote: lote.codigo,
        cantidad: selectedMed.cantidad || 1
      })
      setSelectedMed({
        med: '',
        lote: '',
        cantidad: 0
      })
    }
  };
  const submitOrder = () => {
    createReq(pedidoData)
    setInitialPedidoData()
    setInitialMenuPedido()
  }

  const takeMedId = (e, newValue) => {
    const medValue = e.target.value
    if (newValue) {
      const med = medData.find(med => med.nombre === newValue)
      setSelectedMed({ ...selectedMed, med: med })
    }
    else if (!newValue && medValue) {
      const med = medData.find(med => med.nombre.toLowerCase() === medValue.toLowerCase())
      console.log(med)
      setSelectedMed({ ...selectedMed, med: med })
    }
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
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
      <Drawer anchor='left' open={menuOpen} onClose={toggleMenu} PaperProps={{
        sx: {
          width: '100vw',
          height: '100vh',
          maxWidth: '100%',
          maxHeight: '100%',
        },
      }}>
        <Box
          sx={{
            height: '100vh',
            width: '100vw',
            flexDirection: 'column',
            display: 'flex',
            boxSizing: 'border-box'
          }}>
          <Box sx={{
            width: 'full',
            padding: 2,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <Autocomplete freeSolo label='Medicamento' value={selectedMed.med?.nombre || ''} onChange={takeMedId} fullWidth margin='normal' options={medData?.map((med) => med.nombre ? med.nombre : [])} renderInput={(params) => <TextField onChange={takeMedId}  {...params} label="Medicamento" />} />
            <FormControl>
              <InputLabel id='lote-label'>Lote</InputLabel>
              <Select fullWidth disabled={!selectedMed} value={selectedMed.lote} onChange={(e) => setSelectedMed({ ...selectedMed, lote: e.target.value })} label='Lote'>
                {loteData?.map((lote) => (
                  <MenuItem key={lote.id} value={lote.codigo}>{lote.codigo}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField label="Cantidad" type="number" value={selectedMed.cantidad} onChange={(e) => { setSelectedMed({ ...selectedMed, cantidad: parseInt(e.target.value) || 0 }) }} />
            <Button variant='outlined' onClick={agregarAlPedido}>Agregar</Button>
          </Box>
          <Box sx={{
            width: 'full',
            flexGrow: 1,
            overflowY: 'auto',
            position: 'relative',
          }}>
            {
              pedidoData.items.length > 0 ? (
                <>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    px: 1,
                    mb: 1,
                    flexShrink: 0,
                    position: 'sticky',
                    top: 0,
                    backgroundColor: '#fff',
                    zIndex: 1
                  }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                      Medicamento / Lote
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', textTransform: 'uppercase', pr: 1 }}>
                      Cant.
                    </Typography>
                  </Box>
                  <List>
                    {pedidoData.items.map((item, i) => (
                      <ListItem key={i} sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        px: 1,
                        py: 0.5,
                        borderBottom: '1px solid #e0e0e0'
                      }}>
                        <Box sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          pl: 2
                        }}>
                          <ListItemText>{`${menuPedido[i]?.nombre}`}</ListItemText>
                          <ListItemText sx={{ color: '#666', fontSize: '0.875rem' }}>{`${menuPedido[i]?.lote}`}</ListItemText>
                        </Box>
                        <ListItemText sx={{ fontWeight: 'bold', textAlign: 'right', pr: 2 }}>{`${menuPedido[i]?.cantidad}`}</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </>
              ) : <Box sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2
              }}>
                <Typography variant='body1' sx={{ textAlign: 'center' }}>No hay medicamentos en el pedido</Typography>
              </Box>
            }
          </Box>
          <Box sx={{
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            mt: 'auto',
            padding: 2
          }}>
            <Button fullWidth variant='outlined' onClick={submitOrder}>Guardar pedido</Button>
            <Button fullWidth variant='outlined' color='error' onClick={toggleMenu}>Cerrar</Button>
          </Box>
        </Box>
      </Drawer >
    </>
  )
}

export default Nav
