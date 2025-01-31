const DashboardPage = () => {
  return (
    <div
      style={{
        backgroundColor: '#DC143C', // Vermelho
        minHeight: '100vh',         // Altura total da viewport
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',             // Texto branco
        fontSize: '2rem',           // Tamanho da fonte
        fontWeight: 'bold',         // Fonte em negrito
        textAlign: 'center',        // Centralizar texto
        padding: '1rem',            // Espaçamento interno
      }}
    >
      <h1>Bem-vindo ao Dashboard!</h1>
    </div>
  );
};

export default DashboardPage;