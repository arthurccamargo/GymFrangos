import { FcGoogle } from 'react-icons/fc';

const GoogleButton = () => {
  const handleLogin = () => {
    window.location.href = "/accounts/google/login/";
  };

  return (
    <button
      onClick={handleLogin}
      type="button"
      className="flex items-center justify-center gap-2 w-full bg-white text-gray-700 font-medium rounded-md px-4 py-2 border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
    >
      <FcGoogle className="text-xl" />
      <span>Entre com o Google</span>
    </button>
  );
};

export default GoogleButton;