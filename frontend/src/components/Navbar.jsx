import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
//import logoImage from '../assets/frango.png'

function Navbar() { 
  const navigate = useNavigate();
    return (
      <header>
      <div className="flex fixed w-full px-3 md:px-20 py-4 bg-red-600">
        <div className="container flex items-center mx-auto">
          
        <div className="flex items-center">
            <img 
              src="/static/assets/favicon.webp" 
              alt="GymFrangos Logo" 
              className="w-10 h-10 mr-2 rounded-full"
            />
            <div className="text-3xl font-display-poetsen text-white">GymFrangos</div>
          </div>

          <div className="items-end flex-1 text-white font-bold hidden md:flex">
            <nav className="flex-1">
            <ul className="flex items-center justify-end text-lg font-display-baloo flex-1">
              <li className="p-4 hover:text-yellow-200">Características</li>
              <li className="p-4 hover:text-yellow-200">Pacotes</li>
              <li className="p-4 hover:text-yellow-200">Contato</li>
              <li className="p-4 hover:text-yellow-200 mr-3">
                <span className="border-r border-l-2 border-white"></span>
              </li>
              <li>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-red-700 bg-white rounded-3xl shadow-md transition-transform transform hover:scale-105 hover:bg-gray-100">
                  Iniciar
                </button>
              </li>
            </ul>
            </nav>
          </div>
          <div className="flex justify-end flex-1 md:hidden text-white text-4xl">
            <IoMenu />
          </div>
        </div>
      </div>
      </header>
      
    );
  };
  
  export default Navbar;