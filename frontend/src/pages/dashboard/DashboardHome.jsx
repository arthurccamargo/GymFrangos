import { useAuth } from "../../hooks/userAuth";


const DashboardHome = () => {
  const { userProfile, loading } = useAuth();

  // Mostra um estado de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return <h1 className="text-3xl font-bold">Carregando...</h1>;
  }

    return (
    <h1 className="text-3xl font-bold">
      Bem-vindo{userProfile?.username ? `, ${userProfile.username}` : ' ao Dashboard'}!
    </h1>  
  );
};
  
  export default DashboardHome;