import { Link } from "react-router-dom";
import { menuItems } from './navData';

const Mobilebar = () => {
    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-800 text-white">
            <nav className="px-4 py-2">
                <ul className="flex justify-around items-center">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className="flex flex-col items-center p-2 hover:bg-gray-700 rounded transition duration-200"
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

export default Mobilebar