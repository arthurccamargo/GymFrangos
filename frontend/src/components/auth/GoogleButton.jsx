const GoogleButton = () => {
  const handleLogin = () => {
    window.location.href = "/accounts/google/login/";
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
    >
      Login com Google
    </button>
  );
};

export default GoogleButton;
