import PropTypes from 'prop-types';
import HomeButton from './HomeButton';

const HomeMain = ({ menuOpen }) => {
  return (
    <main className={`flex flex-col items-center justify-center flex-grow text-center text-white bg-red-600 px-6 py-20 lg:mt-0 ${menuOpen ? "mt-65" : ""}`}>
        <div className="flex">
          <img src="/static/assets/frango.png" alt="Frango malhando" className="hidden md:w-50 lg:w-56 md:block"/>
          <img src="/static/assets/frango.png" alt="Frango malhando" className="hidden md:w-50 lg:w-56 md:block"/>
          <img src="/static/assets/frango.png" alt="Frango malhando" className="w-40 md:w-50 lg:w-56"/>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-display-titan mb-6">
          Frangos sempre juntos
        </h1>
        <p className="text-xl md:text-2xl font-display-baloo mb-2">
          Entre nessa comunidade para deixar de ser FRANGO
        </p>
        <p className="text-xl md:text-2xl font-display-baloo mb-6">Todos frangos em um mesmo LUGAR</p>

        <div className="">
          <HomeButton
          text="Começar Agora" 
          route="/login" 
          paddding="px-6 py-3"
          extraClasses="rounded-4xl text-lg"/>
        </div>
      </main>
  );
};

HomeMain.propTypes = {
  menuOpen: PropTypes.bool.isRequired
};

export default HomeMain;