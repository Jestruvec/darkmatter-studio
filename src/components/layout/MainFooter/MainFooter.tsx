import { CustomBtn } from "@/components/shared/CustomButton/CustomBtn";
import { getNavItems } from "@/utils";
import { useTranslation } from "react-i18next";

export const MainFooter = ({ isOpen }: { isOpen: boolean }) => {
  const { t } = useTranslation();
  const navItems = getNavItems(t);

  const baseClasses =
    "md:hidden z-50 bg-white dark:bg-gray-800 fixed bottom-0 right-0 left-0 z-10 border-t border-gray-300 dark:border-gray-600 transition-all duration-300 ease-in-out";
  const componentClasses = `${baseClasses} ${!isOpen && "translate-y-full"}`;

  return (
    <ul className={componentClasses} aria-hidden={!isOpen}>
      {navItems.map((item, index) => (
        <li
          key={index}
          className="h-12 flex items-center border-b border-gray-300 dark:border-gray-600"
        >
          <CustomBtn
            className="w-full h-full"
            as="link"
            to={item.to}
            variant="text"
          >
            <div className="flex items-center gap-2 h-full">
              {item.icon}
              {item.label}
            </div>
          </CustomBtn>
        </li>
      ))}
    </ul>
  );
};
