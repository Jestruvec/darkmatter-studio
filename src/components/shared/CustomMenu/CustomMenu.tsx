import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CustomBtn } from "@/components";

interface Props {
  activatorChildren?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export const CustomMenu = ({
  activatorChildren,
  children,
  className,
}: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const activatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showMenu) {
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);
    }
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [showMenu]);

  const updatePosition = () => {
    if (activatorRef.current) {
      const rect = activatorRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom, right: rect.right });
    }
  };

  const toggleMenu = () => {
    setShowMenu((prev) => {
      const next = !prev;
      if (next) updatePosition();
      return next;
    });
  };

  return (
    <>
      <CustomBtn variant="text" onClick={toggleMenu}>
        {activatorChildren}
      </CustomBtn>

      {showMenu &&
        createPortal(
          <div
            className={`fixed dark:border rounded-lg bg-gray-50 text-gray-800 dark:text-white border-gray-500 dark:bg-gray-800 shadow-md z-50 ${className}`}
            style={{
              top: position.top + 50,
              right: position.right + 10,
              position: "fixed",
            }}
          >
            {children}
          </div>,
          document.body
        )}
    </>
  );
};
