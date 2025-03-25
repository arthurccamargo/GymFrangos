import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import ExercisesPage from "../pages/dashboard/ExercisesPage";
import ProfilePage from "../pages/dashboard/ProfilePage";

const DashboardRoutes = () => {
  return (
    <Routes>
      {/* Todas as páginas do dashboard terão a Sidebar */}
      <Route path="/" element={<DashboardLayout />}>  {/* define que todas as rotas dentro do dashboard terão esse layout como base */}
        <Route index element={<DashboardHome />} /> {/* quando o usuário acessar /dashboard sem um sub-path, ele verá a DashboardHome */}
        <Route path="workouts" element={<ExercisesPage />} /> {/* sub-rota da rota do DashboardLayout */}
        <Route path="profile" element={<ProfilePage />} /> {/* rota para a página de perfil do usuário */}
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
