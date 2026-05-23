import React from 'react'
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