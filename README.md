# Aplicacao GymFrangos

Uma aplicacao web para gerenciamento e visualizacao de exercicios de academia, com mais de 1000 exercicios catalogados.

## Screenshots
<img src="https://github.com/user-attachments/assets/495ed168-8b13-49a1-bc17-45b97856fc4a" width="300" alt="Image">
<img src="https://github.com/user-attachments/assets/30462047-50b3-4e02-bd05-d68aefcec7e2" width="300" alt="Image">

## Tecnologias Utilizadas

### Backend
- Django
- Django REST Framework
- SimpleJWT para autenticacao
- Django-allauth para login social
- SQLite3 (Desenvolvimento)

### Frontend
- React
- Vite
- Tailwind CSS
- Axios para requisicoes HTTP

## Funcionalidades

- Sistema de autenticacao completo:
  - Login e registro de usuários
  - Login social com Google
  - Autenticacao JWT (Access e Refresh tokens)
  - Senhas criptografadas no banco de dados

- Biblioteca de Exercicios:
  - Mais de 1000 exercicios catalogados
  - Busca e filtragem avancada
  - Categorizacao por grupos musculares
  - Descricoes detalhadas e instrucoes

## Instalacao

### Pre-requisitos
- Python 3.8+
- Node.js 14+
- pip
- npm ou yarn
