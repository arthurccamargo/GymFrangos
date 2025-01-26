import React from 'react'
import { useNavigate } from 'react-router-dom'
import logoImage from '../assets/frango.png' // Add image to assets folder

const HomePage = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/login') // Navega para página de login
  }

  return (
    <div className="home-page" style={{
      backgroundColor: '#DC143C',
      margin: 0,
      padding: 0,
      minHeight: '100vh',
      width: '100vw',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      <header>
        <img 
          src={logoImage} 
          alt="GymFrangos Logo"
          style={{
            width: '200px',
            height: 'auto',
            marginBottom: '1rem'
          }}
        />
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 'bold',
          margin: 3
        }}>Bem vindo ao GymFrangos!</h1>
      </header>
      <main>
        <section className="hero">
          <h2>Sua jornada começa aqui</h2>
          <p>Acompanhe sua evolução e alcance seus objetivos</p>
          <button 
            onClick={handleGetStarted}
            style={{
              padding: '12px 24px',
              fontSize: '1.1rem',
              backgroundColor: 'white',
              color: '#8B0000',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Começar Agora
          </button>
        </section>
      </main>
    </div>
  )
}

export default HomePage