# 🏋️‍♂️ GymFrangos

A plataforma definitiva para entusiastas de fitness, com **mais de 1000 exercícios** catalogados de forma inteligente e um sistema de autenticação seguro e moderno.

🚧 Este projeto está em desenvolvimento e novas funcionalidades serão adicionadas em breve.

## 📸 Screenshots

| Tela Inicial | Autenticação | Autenticação |
|------------------|-----------------------|--------------|
| ![Dashboard](https://github.com/user-attachments/assets/fdea36c6-1b64-46f6-b177-8bdd1df5f265) | ![Exercise Details](https://github.com/user-attachments/assets/be14de2e-e777-491a-be36-c08aa6b9ac0e) | ![Auth Flow](https://github.com/user-attachments/assets/903bea75-2e30-47b3-bc37-f4fa5f0d30b7) |

| Filtros Avançados | Execução do Exercício |
|-------------------|------------------|
| ![Filters](https://github.com/user-attachments/assets/daf6db99-8efa-4e6f-958f-901f9e038b8f) | ![Profile](https://github.com/user-attachments/assets/4a6b9d95-3141-465b-bbd5-78c100f578c2) |


## ✨ Destaques Técnicos

### ⚡ Stack
- **Frontend**: React + Vite + Tailwind CSS (Design responsivo)
- **Backend**: Django REST Framework (API robusta)
- **Infraestrutura**: Firebase (Auth + Storage) + SQLite (Dev)
### 🔐 Autenticação Avançada
- **Firebase Authentication** com integração perfeita entre frontend e backend
- Validação de **tokens JWT** no backend Django para máxima segurança
- Login social com **Google OAuth 2.0**
- Verificação de e-mail automatizada
- Fluxo completo de autenticação protegido
### 🎥 Biblioteca Multimídia de Exercícios
- Catálogo completo com **gifs animados** demonstrando cada movimento
- Thumbnails otimizadas para carregamento rápido
- Armazenamento eficiente no **Firebase Storage**
- Visualização em alta qualidade com diálogos modais elegantes (shadcn/ui)



## 🚀 Funcionalidades Principais

### 💪 Biblioteca de Exercícios
- +1000 exercícios cadastrados
- Detalhes: nome, grupo muscular, equipamento, dificuldade
- GIF de execução e thumbnail armazenados no Firebase Storage
- Visualização intuitiva via Dialog com animação
- Busca e filtros avançados para encontrar o exercício ideal
### 🔐 Sistema de Autenticação
- Registro e login de usuários via Firebase Authentication
- Login Social com Google
- Verificação de e-mail obrigatória antes de acessar as funcionalidades
- JWT token gerado e validado pelo backend Django para cada usuário autenticado

## Instalacao

### Pre-requisitos
- Python 3.8+
- Node.js 14+
- pip
- npm ou yarn
