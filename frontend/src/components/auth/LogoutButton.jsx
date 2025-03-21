import { useNavigate } from "react-router-dom";

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
                throw new Error("Erro ao fazer logout");
            }
    
            console.log("Logout realizado com sucesso!");
            navigate("/login");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };    

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
