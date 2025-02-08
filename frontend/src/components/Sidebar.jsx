const Sidebar = () => {
    return (
        <div>
            {/* Sidebar */} {/*flex-shrink-0 é usado para garantir que a largura da barra lateral (w-64) não seja reduzida */}
            <div className="bg-gray-800 text-white w-80 flex-shrink-0 h-screen">
                <div className="p-10">
                    <h2 className="text-2xl font-bold">GymFrangos</h2>
                </div>
                <nav>
                    <ul className="flex flex-col gap-5 ml-8">
                        <li>
                            <a
                                href="#"
                                className="block p-2 hover:bg-gray-700 rounded transition duration-200"
                            >
                                Página Inicial
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block p-2 hover:bg-gray-700 rounded transition duration-200"
                            >
                                Pesquisa
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block p-2 hover:bg-gray-700 rounded transition duration-200"
                            >
                                Treinos
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block p-2 hover:bg-gray-700 rounded transition duration-200"
                            >
                                Meus Treinos
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block p-2 hover:bg-gray-700 rounded transition duration-200"
                            >
                                Meus Grupos
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block p-2 hover:bg-gray-700 rounded transition duration-200"
                            >
                                Criar
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block p-2 hover:bg-gray-700 rounded transition duration-200"
                            >
                                Mensagens
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block p-2 hover:bg-gray-700 rounded transition duration-200"
                            >
                                Notificações
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block p-2 hover:bg-gray-700 rounded transition duration-200"
                            >
                                Perfil
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block p-2 hover:bg-gray-700 rounded transition duration-200"
                            >
                                Mais
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar