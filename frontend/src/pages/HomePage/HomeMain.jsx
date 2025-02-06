import StartButton from "../../components/StartButton";

const HomeMain = () => {
  

  return (
    <main className="flex flex-col items-center justify-center flex-grow text-center text-white bg-red-600 px-6 py-20">
        <div className="flex">
          <img src="/static/assets/frango.png" alt="Logo GymFrangos" className="w-32 md:w-40 lg:w-56"/>
          <img src="/static/assets/frango.png" alt="Logo GymFrangos" className="w-32 md:w-40 lg:w-56"/>
          <img src="/static/assets/frango.png" alt="Logo GymFrangos" className="w-32 md:w-40 lg:w-56"/>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-display-titan mb-6">
          Frangos sempre juntos
        </h1>
        <p className="text-xl md:text-2xl font-display-baloo mb-2">
          Entre nessa comunidade para deixar de ser FRANGO
        </p>
        <p className="text-xl md:text-2xl font-display-baloo mb-6">Todos frangos em um mesmo lugar</p>

        <div className="">
          <StartButton text="Começar Agora" route="/login" padding="px-6 py-3" textSize="text-lg" extraClasses="font-display-poetsen rounded-4xl" />
        </div>
      </main>
  );
};

export default HomeMain;