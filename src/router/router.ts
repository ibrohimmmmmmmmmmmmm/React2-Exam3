import { lazy } from "react";

export const Home = lazy(() => import("@/pages/Home/Home"));
export const About = lazy(() => import("@/pages/About/About"));
export const Contact = lazy(() => import("@/pages/Contact/Contact"));
export const CreateAccount = lazy(() => import("@/pages/CreateAccount/CreateAccount"));
export const SignUp = lazy(() => import("@/pages/SignUp/SignUp"));
