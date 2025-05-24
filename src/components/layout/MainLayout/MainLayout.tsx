import { Outlet } from "react-router-dom";
import { useState } from "react";
import { MainFooter, MainHeader } from "@/components";

export const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen text-gray-800 dark:bg-gray-800 dark:text-white">
      <MainHeader onToggleMenu={toggleMenu} />
      <MainFooter isOpen={isMenuOpen} />
      <main
        className="fixed top-16 right-0 left-0 z-10 h-[calc(100%-4rem)]"
        onClick={() => setIsMenuOpen(false)}
      >
        <Outlet />
      </main>
    </div>
  );
};
