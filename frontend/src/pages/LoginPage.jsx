import { useState } from 'react'
import { useNavigate } from "react-router-dom"; 

const LoginPage = () => {
  const navigate = useNavigate(); //Hook do React Router para navegação entre páginas
  const [formData, setFormData] = useState({ //Hook para gerenciar estado do form
    email: '',
    password: ''
  })

  const [error, setError] = useState('') //estado para mensagens de erro

  const handleSubmit = async (e) => {
    //Quando um formulário é submetido, o comportamento padrão do navegador é recarregar a página
    e.preventDefault() //impede que recarregue a página, ent, + controle após envio do from
    try {
      // await pausa a execução da função até que a Promise seja resolvida e retorna o valor resolvido
      const response = await fetch('http://localhost:8000/login/', { //onde estamos enviando a requisição
        method: 'POST', //estamos fazendo uma requisição POST
        headers: {
          'Content-Type': 'application/json' //corpo da requisição será enviado no formato JSON
        },
        body: JSON.stringify({ //JSON.stringify converte o objeto JavaScript em uma string JSON
          email: formData.email, //é o corpo da requisição, dados do formulário enviados
          password: formData.password
        })
      })

      //Converte a resposta da requisição (que está no formato JSON) em um objeto JavaScript
      const data = await response.json() //await é usado para esperar que a conversão seja concluída

      if (!response.ok) {
        setError(data.message || 'Login falhou. Tente novamente!')
        return //para sair da função imediatamente após definir o erro
      }

      //Armazena os tokens no localStorage ou state
      // localStorage é uma forma de armazenamento persistente no navegador, 
      // o que significa que os dados permanecem lá mesmo após o navegador ser fechado
      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)

      navigate("/dashboard"); //redireciona para o Dashboard, após um login bem-sucedido
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
            value={formData.email} //controle de componente
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
            value={formData.password} //controle de componente
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
            fontWeight: 'bold' //redireciona o usuário para a página /register
          }} onClick={() => window.location.href = '/register'}> 
            Criar conta
          </button>
        </form>
        
      </div>
    </div>
  )
}

export default LoginPage
