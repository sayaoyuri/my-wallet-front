import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import MyWalletLogo from "../components/MyWalletLogo"

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { authContext } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    if(authContext && authContext.token) return navigate('/home');
  }, [ authContext ])

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
          minLength={3}
          required 
          onChange={(ev) => setName(ev.target.value)} 
          value={name}
          data-test="name"
        />
        <input 
          placeholder="E-mail" 
          type="email" 
          required 
          onChange={(ev) => setEmail(ev.target.value)} 
          value={email}
          data-test="email"
        />
        <input 
          placeholder="Senha" 
          type="password" 
          autoComplete="new-password" 
          minLength={3}
          required 
          onChange={(ev) => setPassword(ev.target.value)} 
          value={password}
          data-test="password"
          />
        <input 
          placeholder="Confirme a senha"
          type="password"
          minLength={3}
          required
          onChange={(ev) => setConfirmPassword(ev.target.value)}
          value={confirmPassword}
          data-test="conf-password"
        />
        <button data-test="sign-up-submit">Cadastrar</button>
      </form>

      <Link to={'/'}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
};

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
