/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import logo from "../assets/logo.png";

const SplashContainer = styled.div`
  background: #22318c;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 180px;
  height: auto;
`;

const Splash: React.FC = () => {
  return (
    <SplashContainer>
      <Logo src={logo} alt="Optimus Logo" />
    </SplashContainer>
  );
};

export default Splash; 