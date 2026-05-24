// React default import removed (not needed with new JSX transform)
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner"; // 1. Add this import

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer /> 
      <Toaster position="top-center" richColors />
    </>
  )
}