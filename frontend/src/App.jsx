import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import RegisterPage from './pages/RegisterPage'
import VerifyEmailPage from './pages/VerifyEmailPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verifyemail" element={<VerifyEmailPage />} />
        {/* /dashboard/* garante que todas as páginas do dashboard sejam gerenciadas pelo DashboardPage */}
        <Route path="/dashboard/*" element={<DashboardPage />} /> 
      </Routes>
    </Router>
  )
}

export default App