import {
  FaStore,
  FaEnvelope,
  FaUsers,
  FaFolderOpen,
  FaHome,
} from "react-icons/fa";
import { TFunction } from "i18next";
import { NavItem } from "@/types";

export const getNavItems = (t: TFunction): NavItem[] => [
  {
    label: t("navMenu.home"),
    icon: <FaHome />,
    to: "/",
  },
  {
    label: t("navMenu.products"),
    icon: <FaStore />,
    to: "/products",
  },
  {
    label: t("navMenu.portfolio"),
    icon: <FaFolderOpen />,
    to: "/portfolio",
  },
  {
    label: t("navMenu.about"),
    icon: <FaUsers />,
    to: "/about",
  },
  {
    label: t("navMenu.contact"),
    icon: <FaEnvelope />,
    to: "/contact",
  },
];
