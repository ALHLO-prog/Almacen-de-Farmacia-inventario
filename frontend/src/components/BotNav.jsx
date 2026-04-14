import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import DescriptionIcon from '@mui/icons-material/Description'
import AssignamentIconTurnedIn from '@mui/icons-material/AssignmentTurnedIn'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { useState } from 'react'

function BotNav() {
  const [value, setValue] = useState('recents')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <BottomNavigation
      sx={{ width: '100%' }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label='Inventario'
        value='inventario'
        icon={<DescriptionIcon />}
      />
      <BottomNavigationAction
        label='Pedidos'
        value='pedidos'
        icon={<AssignamentIconTurnedIn />}
      />
      <BottomNavigationAction
        label='Registros'
        value='registros'
        icon={<ReceiptIcon />}
      />
    </BottomNavigation>
  )
}

export default BotNav
