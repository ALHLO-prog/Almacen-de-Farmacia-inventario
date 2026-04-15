import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import BotNav from './components/BotNav.jsx'
import { Paper } from '@mui/material'
import Inventory from './components/inventory/Inventory.jsx'
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
      <main className='grow overflow-hidden relative'>
        <div className='absolute inset-0 overflow-y-auto px-2'>
          <Routes>
            {user.ci ? (
              <Route index element={<Navigate to='/inventario' />} />
            ) : (
              <Route path='/registrate' element={<Navigate to='/inventario' />} />
            )}
            <Route index element={<Navigate to='/inventario' />} />
            <Route
              path='/inventario'
              element={
                <Fade in timeout={500}>
                  <div>
                    <Inventory />{' '}
                  </div>
                </Fade>
              }
            />
            <Route
              path='/pedidos'
              element={
                <Fade in timeout={500}>
                  <div>
                    <Inventory />
                  </div>
                </Fade>
              }
            />
            <Route
              path='/registros'
              element={
                <Fade in timeout={500}>
                  <div>
                    <Inventory />
                  </div>
                </Fade>
              }
            />
          </Routes>
        </div>
      </main>

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
