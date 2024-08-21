import React from "react";
import RegisterForm from "../../components/RegisterForm";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideMenu from "../../components/SideMenu";

const RegisterPage: React.FC = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <div>You are already registered and logged in!</div>;
  }

  return (
    <div>
      <SideMenu />
      <RegisterForm />
      <Footer />
    </div>
  );
};

export default RegisterPage;
