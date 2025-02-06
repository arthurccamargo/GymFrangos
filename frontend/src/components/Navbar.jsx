import { IoMenu } from "react-icons/io5";
//import logoImage from '../assets/frango.png'

function Navbar() { 
    return (
      <header>
      <div className="flex fixed w-full px-3 md:px-20 py-4 bg-red-600">
        <div className="container flex items-center mx-auto">
          
          <div className="w-full text-3xl font-bold text-white">GymFrangos</div>
          <div className="items-end flex-1 text-white font-bold hidden md:flex">
            <nav className="flex-1">
            <ul className="flex justify-end flex-1">
              <li className="p-4 hover:text-yellow-200">Features</li>
              <li className="p-4 hover:text-yellow-200">Pricing</li>
              <li className="p-4 hover:text-yellow-200">Contact</li>
              <li className="p-4 hover:text-yellow-200">
                <span className="border-r border-white"></span>
              </li>
              <li className="p-4 hover:text-yellow-200">Começar</li>
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