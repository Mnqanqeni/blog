import React from "react";
import Login from "../components/Login";
import PagesContainer from "../components/containers/PagesContainer";

function LoginPage() {
  return (
    <PagesContainer>
      <div className="py-8">
        <Login />
      </div>
    </PagesContainer>
  );
}

export default LoginPage;
