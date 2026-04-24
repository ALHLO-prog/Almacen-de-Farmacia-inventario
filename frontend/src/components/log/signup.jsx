import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

function SignUp() {
  return (
    <Box className='flex flex-col items-center justify-center h-full w-full px-4'>
      <h2 className='text-2xl font-bold mb-4'>Registrarse</h2>
      <form className='flex flex-col gap-4 w-full max-w-sm'>
        <TextField
          type='text'
          id='nombre'
          label='Nombre y Apellido'
          name='nombre'
          required
        />
        <TextField
          type='text'
          id='ci'
          label='Cedula de Identidad'
          name='ci'
          required
        />
        <TextField
          type='password'
          id='contraseña'
          label='Contraseña'
          name='contraseña'
          required
        />
        <Button type='submit' variant='contained' color='primary'>
          Registrate
        </Button>
      </form>
    </Box>
  )
}

export default SignUp
