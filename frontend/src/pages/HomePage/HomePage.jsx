import Navbar from "../../components/Navbar";
import HomeFooter from "./HomeFooter";
import HomeMain from "./HomeMain";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HomeMain/>
      <HomeFooter/>
    </div>
  );
};

export default HomePage;
