import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react"

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/auth/logout/", {
                method: "POST",
                credentials: "include", // Garante que os cookies sejam enviados na requisição
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                if(response.status === 401) {
                    throw new Error("Sessão expirada. Faça login novamente.");
                } else if(response.status === 500) {
                    throw new Error("Erro no servidor. Tente novamente mais tarde.");
                } else {
                    throw new Error("Erro ao fazer logout. Verifique sua conexão.");
                }
            }
    
            console.log("Logout realizado com sucesso!");
            navigate("/login");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };    

    return <button onClick={handleLogout}
            className="flex gap-2 p-1 mt-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
            <LogOut></LogOut>
            Sair
            </button>;
};

export default LogoutButton;
