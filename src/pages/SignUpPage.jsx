import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useState } from "react";
import axios from "axios";
import MyWalletLogo from "../components/MyWalletLogo"

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  function signUp (ev) {
    ev.preventDefault();
    if(password !== confirmPassword) return alert('As senhas digitadas não correspondem');

    const userData = { name, email, password };

    axios.post(`${import.meta.env.VITE_API_URL}/cadastro`, userData)
      .then((res) => { alert(res.data); navigate('/') })
      .catch((e) => alert(e.response.data));
  }

  return (
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input 
          placeholder="Nome" 
          type="text" 
          required 
          onChange={(ev) => setName(ev.target.value)} 
          value={name}
        />
        <input 
          placeholder="E-mail" 
          type="email" 
          required 
          onChange={(ev) => setEmail(ev.target.value)} 
          value={email}
        />
        <input 
          placeholder="Senha" 
          type="password" 
          autocomplete="new-password" 
          minLength={3}
          required 
          onChange={(ev) => setPassword(ev.target.value)} 
          value={password}
          />
        <input 
          placeholder="Confirme a senha"
          type="password"
          minLength={3}
          required
          onChange={(ev) => setConfirmPassword(ev.target.value)}
          value={confirmPassword}
        />
        <button>Cadastrar</button>
      </form>

      <Link to={'/'}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
