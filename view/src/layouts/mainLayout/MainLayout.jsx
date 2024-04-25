import React from "react";
import Navbar from "../../components/navbar/Navbar";
import SideMenu from "../../components/sideMenu/SideMenu";
import LoginForm from "../../components/loginForm/LoginForm";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <SideMenu />
      <LoginForm />
      {children}
    </>
  );
};

export default MainLayout;
