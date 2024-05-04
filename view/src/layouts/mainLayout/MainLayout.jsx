import React from "react";
import Navbar from "../../components/navbar/Navbar";
import SideMenu from "../../components/sideMenu/SideMenu";
import LoginForm from "../../components/loginForm/LoginForm";
import Footer from "../../components/footer/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <SideMenu />
      <LoginForm />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
