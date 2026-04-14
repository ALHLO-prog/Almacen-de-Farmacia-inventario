import './App.css'
import BotNav from './components/BotNav.jsx'
import Inventory from './components/inventory/Inventory.jsx'
import Nav from './components/Nav.jsx'

function App() {
  return (
    <div className='flex flex-col h-screen w-screen overflow-hidden bg-gray-50'>
      <header className='flex-none'>
        <Nav />
      </header>

      <main className='grow overflow-hidden relative'>
        <div className='absolute inset-0 overflow-y-auto px-2'>
          <Inventory />
        </div>
      </main>

      <footer className='flex-none'>
        <BotNav />
      </footer>
    </div>
  )
}

export default App
