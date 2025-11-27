import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ShopPage from "@/pages/ShopPage";
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import AuthCallback from "@/pages/auth/AuthCallback";
import { AppLayout } from "@/components/layout/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "product/:id", element: <ProductPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "dashboard", element: <AdminDashboard /> },
    ],
  },
  {
    path: "/auth",
    element: <AppLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "callback", element: <AuthCallback /> },
    ],
  },
]);

export const AppRoutes = () => <RouterProvider router={router} />;

