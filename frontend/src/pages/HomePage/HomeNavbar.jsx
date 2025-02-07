import PropTypes from 'prop-types';
import { IoMenu } from "react-icons/io5";
import HomeButton from './HomeButton';

function HomeNavbar({ menuOpen, setMenuOpen }) { 
  return (
    <header>
      <div className="flex fixed w-full px-3 md:px-20 py-4 bg-red-600 z-50">
        <div className="container flex items-center mx-auto">
          
          <div className="flex items-center">
              <img 
                src="/static/assets/favicon.webp" 
                alt="GymFrangos Logo" 
                className="w-10 h-10 mr-2 rounded-full"
              />
              <div className="text-3xl font-display-poetsen text-white">GymFrangos</div>
          </div>

          <div className="items-end flex-1 text-white font-bold hidden lg:flex">
            <nav className="flex-1">
              <ul className="flex items-center justify-end text-lg font-display-baloo flex-1">
                <li className="p-4 hover:text-yellow-200">Funcionalidades</li>
                <li className="p-4 hover:text-yellow-200">Pacotes</li>
                <li className="p-4 hover:text-yellow-200">Contato</li>
                <li className="p-4 hover:text-yellow-200 mr-3">
                  <span className="border-r border-l-2 border-white"></span>
                </li>
                <li>
                  <HomeButton 
                  text="Iniciar" 
                  route="/login"/>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex justify-end flex-1 lg:hidden text-white text-4xl">
            <button onClick={() => setMenuOpen(!menuOpen)}>
                <IoMenu />
              </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-red-600 text-white text-center py-4 w-full absolute top-16 left-0 z-40 shadow-lg">
          <ul className="text-lg font-display-baloo">
            <li className="p-4 hover:text-yellow-200">Funcionalidades</li>
            <li className="p-4 hover:text-yellow-200">Pacotes</li>
            <li className="p-4 hover:text-yellow-200">Contato</li>
            <li className="p-4">
              <HomeButton 
              text="Iniciar" 
              route="/login"/>
            </li>
          </ul>
        </div>
      )}
    </header>
    );
  };

  HomeNavbar.propTypes = {
    menuOpen: PropTypes.bool.isRequired,
    setMenuOpen: PropTypes.func.isRequired
  };
  
  export default HomeNavbar;