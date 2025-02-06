import { useNavigate } from "react-router-dom";

const HomeMain = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center justify-center flex-grow text-center text-white bg-red-600 px-6 py-20">
        <img src="/static/assets/frango.png" alt="Logo GymFrangos" className="w-32 md:w-40 lg:w-56"/>

        <h1 className="text-5xl md:text-7xl font-display-titan mb-6">
          Frangos sempre juntos
        </h1>
        <p className="text-xl md:text-2xl font-display-baloo mb-2">
          Entre nessa comunidade para deixar de ser FRANGO
        </p>
        <p className="text-xl md:text-2xl font-display-baloo mb-6">Todos frangos em um mesmo lugar</p>

        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 text-lg font-display-poetsen text-red-700 bg-white rounded-4xl shadow-md transition-transform transform hover:scale-105 hover:bg-gray-100"
        >
          Começar Agora
        </button>
      </main>
  );
};

export default HomeMain;