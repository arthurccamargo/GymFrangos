import { useState } from 'react';
import { User, Mail, Key, Edit, Save, X } from 'lucide-react';

const ProfilePage = () => {
  // Estado para controlar o modo de edição
  const [isEditing, setIsEditing] = useState(false);
  // Estado para armazenar os dados do usuário
  const [userData, setUserData] = useState({
    username: 'Usuario Exemplo',
    email: 'usuario@exemplo.com',
    firstName: 'Usuario',
    lastName: 'Exemplo',
    profileImage: null
  });
  
  // Estado para armazenar os dados temporários durante a edição
  const [tempUserData, setTempUserData] = useState({...userData});
  
  // Estado para controlar o modal de redefinição de senha
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  
  // Função para lidar com a mudança de campos durante a edição
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempUserData({
      ...tempUserData,
      [name]: value
    });
  };
  
  // Função para lidar com o upload de imagem
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempUserData({
          ...tempUserData,
          profileImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Função para salvar as alterações
  const handleSaveChanges = () => {
    // Aqui seria feita a chamada para a API para atualizar os dados
    setUserData({...tempUserData});
    setIsEditing(false);
  };
  
  // Função para cancelar a edição
  const handleCancelEdit = () => {
    setTempUserData({...userData});
    setIsEditing(false);
  };
  
  // Função para lidar com a redefinição de senha
  const handleResetPassword = (e) => {
    e.preventDefault();
    // Aqui seria feita a chamada para a API para redefinir a senha
    setIsResetPasswordOpen(false);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Perfil do Usuário</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Cabeçalho do perfil com foto */}
        <div className="bg-gray-800 p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                {tempUserData.profileImage ? (
                  <img 
                    src={tempUserData.profileImage} 
                    alt="Foto de perfil" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <User className="w-16 h-16 text-gray-500" />
                )}
              </div>
              {isEditing && (
                <div className="absolute bottom-0 right-0">
                  <label 
                    htmlFor="profile-image" 
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                    <input 
                      type="file" 
                      id="profile-image" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload} 
                    />
                  </label>
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-white">
                {isEditing ? (
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      name="firstName" 
                      value={tempUserData.firstName} 
                      onChange={handleInputChange} 
                      className="bg-gray-700 text-white px-2 py-1 rounded" 
                    />
                    <input 
                      type="text" 
                      name="lastName" 
                      value={tempUserData.lastName} 
                      onChange={handleInputChange} 
                      className="bg-gray-700 text-white px-2 py-1 rounded" 
                    />
                  </div>
                ) : (
                  `${userData.firstName} ${userData.lastName}`
                )}
              </h2>
              <p className="text-gray-300 flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4" />
                {isEditing ? (
                  <input 
                    type="email" 
                    name="email" 
                    value={tempUserData.email} 
                    onChange={handleInputChange} 
                    className="bg-gray-700 text-white px-2 py-1 rounded" 
                  />
                ) : (
                  userData.email
                )}
              </p>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            {isEditing ? (
              <div className="flex gap-2">
                <button 
                  onClick={handleSaveChanges} 
                  className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  <Save className="w-4 h-4" />
                  Salvar
                </button>
                <button 
                  onClick={handleCancelEdit} 
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsEditing(true)} 
                className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                <Edit className="w-4 h-4" />
                Editar Perfil
              </button>
            )}
          </div>
        </div>
        
        {/* Conteúdo do perfil */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Informações da Conta</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 mb-1">Nome de Usuário</p>
                <p className="font-medium">{userData.username}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Email</p>
                <p className="font-medium">{userData.email}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">Segurança</h3>
            <button 
              onClick={() => setIsResetPasswordOpen(true)} 
              className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
            >
              <Key className="w-4 h-4" />
              Redefinir Senha
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal de redefinição de senha */}
      {isResetPasswordOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Redefinir Senha</h2>
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Senha Atual</label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2 border rounded" 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nova Senha</label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2 border rounded" 
                  required 
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Confirmar Nova Senha</label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2 border rounded" 
                  required 
                />
              </div>
              <div className="flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setIsResetPasswordOpen(false)} 
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Salvar Nova Senha
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;