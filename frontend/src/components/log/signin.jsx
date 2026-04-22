function SignIn() {
  return (
    <div className='signin-container'>
      <h2>Iniciar Sesión</h2>
      <form className='signin-form'>
        <label htmlFor='username'>Usuario:</label>
        <input type='text' id='username' name='username' required />
        <label htmlFor='password'>Contraseña:</label>
        <input type='password' id='password' name='password' required />
        <button type='submit'>Iniciar Sesión</button>
      </form>
    </div>
  )
}

export default SignIn
