import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useNavbar = () => {
  const location = useLocation();
  const [menu, setMenu] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setMenu(
      location.pathname === "/" ? "home" : location.pathname.replace("/", ""),
    );
  }, [location]);

  const handleScroll = (sectionId) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return {
    menu,
    isOpen,
    showDropdown,
    setMenu,
    setIsOpen,
    setShowDropdown,
    handleScroll,
  };
};
