import React from "react";
import Signup from "../components/Signup";
import PagesContainer from "../components/containers/PagesContainer";
function SignupPage() {
  return (
    <PagesContainer>
      <div className="m-4">
        <Signup />
      </div>
    </PagesContainer>
  );
}

export default SignupPage;
