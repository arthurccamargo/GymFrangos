import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const HomePage = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/login') // Navega para página de login
  }

  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <div>
        <main>
          <div className="flex flex-col justify-center text-center py-40 px-4">
            <h1>Sua jornada começa aqui</h1>
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
          </div>
        </main>
      </div>
    </div>
  )
}

export default HomePage