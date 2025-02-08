import { useState } from "react";
import Navbar from "../components/home/HomeNavbar";
import HomeFooter from "../components/home/HomeFooter";
import HomeMain from "../components/home/HomeMain";

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
      <HomeMain menuOpen={menuOpen}/>
      <HomeFooter/>
    </div>
  );
};

export default HomePage;
