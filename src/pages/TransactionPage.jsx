import { useContext, useEffect, useState } from "react";
import styled from "styled-components"
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function TransactionsPage() {
  const { tipo } = useParams();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const { authContext } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(tipo !== 'entrada' && tipo !== 'saida') return navigate('/home');
    if(!authContext || !authContext.token) return navigate('/');
  }, [ authContext ]);

  function createTransaction(ev) {
    ev.preventDefault();

    const config = { headers: { token: authContext.token } };
    const requestBody = { description, amount };

    axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao/${tipo}`, requestBody, config)
      .then(res => navigate('/home'))
      .catch(e => alert(e.response.data));
  }

  return (
    <TransactionsContainer>
      <h1>{`Nova ${tipo}`}</h1>
      <form onSubmit={createTransaction}>
        <input 
          placeholder="Valor" 
          type="number" 
          minLength={1} 
          required 
          onChange={(ev) => setAmount(ev.target.value)} 
          value={amount}
          data-test="registry-amount-input"
        />
        <input 
          placeholder="Descrição" 
          type="text" 
          required 
          minLength={4} 
          onChange={(ev) => setDescription(ev.target.value)} 
          value={description}
          data-test="registry-name-input"
        />
        <button data-test="registry-save">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
