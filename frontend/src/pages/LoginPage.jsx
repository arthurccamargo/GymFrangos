import { useState } from 'react'
import { useNavigate } from "react-router-dom"; 

const LoginPage = () => {
  const navigate = useNavigate(); // Hook para navegar entre páginas
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Login falhou. Tente novamente!')
        return
      }

      // Armazena os tokens no localStorage ou state
      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)

      navigate("/dashboard"); // Redireciona para o Dashboard
    } catch (error) {
      setError(error.message);
    }
  };

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
        
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
          <button type="button" style={{
            padding: '0.8rem',
            backgroundColor: 'white',
            color: '#DC143C',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }} onClick={() => window.location.href = '/register'}>
            Criar conta
          </button>
        </form>
        
      </div>
    </div>
  )
}

export default LoginPage
