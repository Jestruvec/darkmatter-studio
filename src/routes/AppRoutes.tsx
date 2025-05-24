import { Routes, Route } from "react-router-dom";
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

export const AppRoutes = () => (
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
