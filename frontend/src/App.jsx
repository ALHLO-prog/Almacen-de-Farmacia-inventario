import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import BotNav from './components/BotNav.jsx'
import { Box, Paper } from '@mui/material'
import Inventario from './components/inventario/Inventory.jsx'
import Registros from './components/registros/Registros.jsx'
import Pedidos from './components/pedidos/pedidos.jsx'
import Nav from './components/Nav.jsx'
import { Fade } from '@mui/material'
import useUser from './context/useUser.jsx'

function App() {
  const { user } = useUser()

  return (
    <div className='flex flex-col h-screen w-screen overflow-hidden bg-gray-50'>
      <header className='flex-none'>
        <Nav />
      </header>
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            overflowY: 'auto',
            px: 1,
            pb: 10
          }}
        >
          <Routes>
            {user.ci ? (
              <Route index element={<Navigate to='/inventario' />} />
            ) : (
              <Route
                path='/signIn'
                element={<Navigate to='/signIn' />}
              />
            )}
            <Route path='/signIn' element={<SignIn />} />
            <Route path='/logIn' element={<SignIn />} />
            <Route index element={<Navigate to='/inventario' />} />
            <Route
              path='/inventario'
              element={
                <Fade in timeout={500}>
                  <div>
                    <Inventario />{' '}
                  </div>
                </Fade>
              }
            />
            <Route
              path='/pedidos'
              element={
                <Fade in timeout={500}>
                  <div>
                    <Pedidos />
                  </div>
                </Fade>
              }
            />
            <Route
              path='/registros'
              element={
                <Fade in timeout={500}>
                  <div>
                    <Registros />
                  </div>
                </Fade>
              }
            />
          </Routes>
        </Box>
      </Box>

      <footer className='flex-none'>
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000
          }}
        >
          <BotNav />
        </Paper>
      </footer>
    </div>
  )
}

export default App
