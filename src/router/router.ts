import { lazy } from "react";

export const Home = lazy(() => import("../pages/Home/Home"));
export const About = lazy(() => import("../pages/About/About"));
export const Contact = lazy(() => import("../pages/Contact/Contact"));
export const CreateAccount = lazy(() => import("../pages/CreateAccount/CreateAccount"));
export const SignUp = lazy(() => import("../pages/SignUp/SignUp"));
export const ProductsCatalog = lazy(() => import("../pages/ProductsCatalog/ProductsCatalog"));
export const Account = lazy(() => import("../pages/Account/Account"));
export const Wishlist = lazy(() => import("../pages/Wishlist/Wishlist"));
export const ProductDetail = lazy(() => import("../pages/ProductDetail/ProductDetail"));
export const Cart = lazy(() => import("../pages/Cart/Cart"));
export const Checkout = lazy(() => import("../pages/Checkout/Checkout"));