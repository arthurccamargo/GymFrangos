import Sidebar from "../components/Sidebar";

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar/>
      {/* Conteúdo Principal */}
      <div className="flex-grow bg-red-600 flex justify-center items-center text-9xl text-white font-bold text-center p-4">
        <h1>Bem-vindo ao Dashboard!</h1>
      </div>
    </div>
  );
};

export default DashboardPage;