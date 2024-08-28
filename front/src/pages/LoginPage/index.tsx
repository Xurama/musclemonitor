import React from "react";
import LoginForm from "../../components/LoginForm";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideMenu from "../../components/SideMenu";

const LoginPage: React.FC = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <div>You are already logged in!</div>;
  }

  return (
    <div>
      <Header />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default LoginPage;
