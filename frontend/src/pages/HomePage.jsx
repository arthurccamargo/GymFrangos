import { useState } from "react";
import HomeHeader from "../components/home/HomeHeader";
import HomeFooter from "../components/home/HomeFooter";
import HomeMain from "../components/home/HomeMain";

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <HomeMain menuOpen={menuOpen}/>
      <HomeFooter/>
    </div>
  );
};

export default HomePage;
