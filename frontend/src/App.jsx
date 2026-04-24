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
import SignUp from './components/log/signup.jsx'
import SignIn from './components/log/signin.jsx'

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
            <Route
              index
              element={
                user.isRegistered ? (
                  <Navigate to='/inventario' replace />
                ) : (
                  <Navigate to='/registrate' replace />
                )
              }
            />
            <Route path='/registrate' element={<SignUp />} />
            <Route path='/iniciasesion' element={<SignIn />} />
            <Route
              path='/inventario'
              element={
                user.isRegistered ? (
                  <Fade in timeout={500}>
                    <div>
                      <Inventario />{' '}
                    </div>
                  </Fade>
                ) : (
                  <Navigate to='/registrate' replace />
                )
              }
            />
            <Route
              path='/pedidos'
              element={
                user.isRegistered ? (
                  <Fade in timeout={500}>
                    <div>
                      <Pedidos />
                    </div>
                  </Fade>
                ) : (
                  <Navigate to='/registrate' replace />
                )
              }
            />
            <Route
              path='/registros'
              element={
                user.isRegistered ? (
                  <Fade in timeout={500}>
                    <div>
                      <Registros />
                    </div>
                  </Fade>
                ) : (
                  <Navigate to='/registrate' replace />
                )
              }
            />
          </Routes>
        </Box>
      </Box>

      {user.isRegistered ? (
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
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default App
