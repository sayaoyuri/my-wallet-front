import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import MyWalletLogo from "../components/MyWalletLogo";

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function signIn(ev) {
    ev.preventDefault();

    const requestBody = { email, password };

    axios.post(`${import.meta.env.VITE_API_URL}/login`, requestBody)
      .then((res) => { console.log(res.data), navigate('/home') })
      .catch(e => alert(e.response.data));
  };

  return (
    <SingInContainer>
      <form onSubmit={signIn}>
        <MyWalletLogo />
        <input 
          placeholder="E-mail" type="email"
          required
          onChange={(ev) => setEmail(ev.target.value)} 
          value={email}
        />
        <input 
          placeholder="Senha" type="password" 
          minLength={3}
          required
          onChange={(ev) => setPassword(ev.target.value)}
          value={password}
        />
        <button>Entrar</button>
      </form>

      <Link to={'/cadastro'}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
};

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
