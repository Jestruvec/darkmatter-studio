import { FaBars } from "react-icons/fa";
import { CustomBtn, UserMenu } from "@/components";
import { useTranslation } from "react-i18next";
import { getNavItems } from "@/utils";
import { useIsMobile } from "@/hooks";

export const MainHeader = ({ onToggleMenu }: { onToggleMenu: () => void }) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const navItems = getNavItems(t);

  return (
    <header className="bg-gray-50 dark:bg-gray-700 shadow-lg dark:border-b border-gray-500 fixed top-0 left-0 right-0 p-2 h-16 flex justify-between items-center z-10">
      <CustomBtn variant="text" onClick={onToggleMenu} className="md:hidden">
        <FaBars />
      </CustomBtn>

      <nav className="hidden md:flex gap-2">
        {navItems.map((link) => (
          <CustomBtn
            key={link.to}
            as="link"
            to={link.to}
            variant="text"
            aria-hidden={!isMobile}
          >
            {link.label}
          </CustomBtn>
        ))}
      </nav>

      <UserMenu />
    </header>
  );
};
