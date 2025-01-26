import React, { useState } from 'react'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login attempt:', formData)
  }

  return (
    <div className="login-page" style={{
      backgroundColor: '#DC143C',
      margin: 0,
      padding: 0,
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box',
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0
    }}>
      <div className="login-container" style={{
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: '2rem',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ marginBottom: '2rem' }}>Olá!</h1>
        
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={{
              padding: '0.8rem',
              borderRadius: '5px',
              border: 'none'
            }}
          />
          
          <input
            type="password"
            placeholder="Senha"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            style={{
              padding: '0.8rem',
              borderRadius: '5px',
              border: 'none'
            }}
          />
          
          <button type="submit" style={{
            padding: '0.8rem',
            backgroundColor: 'white',
            color: '#DC143C',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Entrar
          </button>
          <button type="submit" style={{
            padding: '0.8rem',
            backgroundColor: 'white',
            color: '#DC143C',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Criar conta
          </button>
        </form>
        
      </div>
    </div>
  )
}

export default LoginPage