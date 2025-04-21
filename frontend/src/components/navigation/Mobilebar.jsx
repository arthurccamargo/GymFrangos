import { Link, useLocation } from "react-router-dom";
import { menuItems } from './navData';

const Mobilebar = () => {
    const location = useLocation(); // hook para determinar em qual página o usuário está atualmente
    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-2xl border-t border-gray-200">
          <nav className="px-2 py-2">
            <ul className="flex justify-around items-center">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path} className="w-1/3">
                    <Link
                      to={item.path}
                      className={`flex flex-col items-center py-2 px-1 rounded-xl transition duration-200 ${
                        isActive 
                          ? "text-red-600 bg-red-50" 
                          : "text-gray-500 hover:text-red-600"
                      }`}
                    >
                      <div className="mb-1">
                        {item.icon}
                      </div>
                      {isActive && (
                        <div className="h-1 w-8 bg-red-600 rounded-full mt-1"></div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      );
    };

export default Mobilebar