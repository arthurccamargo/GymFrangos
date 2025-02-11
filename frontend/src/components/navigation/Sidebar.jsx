import { Link } from "react-router-dom";
import { menuItems } from './navData';

const Sidebar = () => {

  return (
    <div className="hidden h-screen lg:block bg-gray-800 text-white w-80  flex-shrink-0 overflow-y-auto sticky top-0">
      <div className="p-10">
        <h2 className="text-2xl font-bold">GymFrangos</h2>
      </div>
      <nav>
        <ul className="flex flex-col gap-5 ml-3">
          {menuItems.map((item) => (
            <li key={item.path}> {/* propriedade key é obrigatória no React para otimizar renderizações e evitar warnings */}
            {/* <Link> para navegação rápida sem recarregar a página */}
              <Link
                to={item.path}
                className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded transition duration-200" 
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
