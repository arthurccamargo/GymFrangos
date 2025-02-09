import Sidebar from "../components/Sidebar";//Sidebar estará em todas as páginas dentro do dashboard
import { Outlet } from "react-router-dom";//renderiza dinamicamente as páginas dentro do layout(nesse caso dashboard)

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
