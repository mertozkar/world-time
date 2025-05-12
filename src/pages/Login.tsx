/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import usersData from '../users.json';

const Container = styled.div`
  background: #22318c;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 300px;
  height: auto;
  margin-bottom: 32px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 360px;
  max-width: 90vw;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 24px;
  padding: 0 16px;
  height: 48px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgba(34,49,140,0.08);
`;

const InputIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #22318c;
  margin-right: 12px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 18px;
  color: #22318c;
  background: transparent;
  flex: 1;
  height: 100%;
`;

const Button = styled.button<{secondary?: boolean}>`
  width: 80%;
  height: 42px;
  border: ${({secondary}) => (secondary ? 'none' : '2px solid #fff')};
  border-radius: 28px;
  font-size: 18px;
  font-weight: 600;
  color: ${({secondary}) => (secondary ? '#22318c' : '#fff')};
  background: ${({secondary}) => (secondary ? '#fff' : '#22318c')};
  margin-top: 8px;
  margin-bottom: ${({secondary}) => (secondary ? '8px' : '0')};
  box-shadow: 0 2px 12px 0 rgba(34,49,140,0.08);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: ${({secondary}) => (secondary ? '#f0f2fa' : '#1a256b')};
  }
`;

const ForgotLink = styled.a`
  color: #fff;
  font-size: 12px;
  margin-top: 24px;
  text-decoration: underline;
  cursor: pointer;
  opacity: 0.85;
  &:hover {
    opacity: 1;
  }
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = (usersData as any[]).find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      localStorage.setItem("id", user.id.toString());
      navigate("/home");
    } else {
      setError("Kullanıcı adı veya şifre hatalı.");
    }
  };

  const handleGuest = () => {
    localStorage.setItem("id", "guest");
    navigate("/home");
  };

  return (
    <Container>
      <Logo src={logo} alt="Optimus Logo" />
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <InputIcon>
            <FontAwesomeIcon icon={faUser} />
          </InputIcon>
          <Input
            type="text"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <InputIcon>
            <FontAwesomeIcon icon={faLock} />
          </InputIcon>
          <Input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </InputWrapper>
        {error && <div style={{ color: '#c00', fontSize: 16, marginBottom: 8 }}>{error}</div>}
        <Button type="submit">Giriş Yap</Button>
        <Button type="button" secondary onClick={handleGuest}>Misafir Girişi</Button>
      </Form>
      <ForgotLink href="#">Şifremi Unuttum</ForgotLink>
    </Container>
  );
};

export default Login; 