import { useState } from "react";
import Navbar from "./HomeNavbar";
import HomeFooter from "./HomeFooter";
import HomeMain from "./HomeMain";

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
