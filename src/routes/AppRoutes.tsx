import { Routes, Route, useLocation } from "react-router-dom";
import {
  AboutPage,
  LoginPage,
  ContactPage,
  PortfolioPage,
  ProductsPage,
  ProfilePage,
  HomePage,
} from "@/pages";
import { MainLayout } from "@/components";
import { PrivateRoute, PublicRoute } from "./Guards";
import { useGoogleAnalytics } from "@/hooks";
import { useEffect } from "react";

export const AppRoutes = () => {
  const location = useLocation();
  useGoogleAnalytics();

  useEffect(() => {
    const GA_ID = import.meta.env.VITE_GA_ID;
    if (!GA_ID || typeof window.gtag !== "function") return;

    window.gtag("config", GA_ID, {
      page_path: location.pathname + location.search,
    });
  }, [location]);

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="login" element={<LoginPage />} />
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="products" element={<ProductsPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<>not found</>} />
    </Routes>
  );
};
