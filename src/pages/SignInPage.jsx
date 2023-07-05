import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(email, password);

  function signIn() {
    
  }

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
          autocomplete="new-password" 
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
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
