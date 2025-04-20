import Navbar from "../components/navigation/Navbar"; //Navbar estará em todas as páginas dentro do dashboard
import { Outlet } from "react-router-dom";//renderiza dinamicamente as páginas dentro do layout(nesse caso dashboard)

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      <Navbar />
      <div className="flex-grow bg-gray-100 md:px-6 md:py-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
