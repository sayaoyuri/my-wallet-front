import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { AuthContext } from "../context/AuthContext"
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const { authContext, getAuth, setGetAuth } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([])
  const [balance, setBalance] = useState(0.00)
  const navigate = useNavigate();

  useEffect(() => {
    if(!authContext || !authContext.token) return navigate('/');

    const config = { headers: { token: authContext.token } };
    axios.get(`${import.meta.env.VITE_API_URL}/transactions`, config)
      .then(res => {
        setTransactions(res.data);

        const newBalance = res.data.reduce((balance, current) => {
          if(current.type === 'income') return balance + Number(current.amount);
          return balance + (Number(current.amount) * -1);
        }, 0);
        
        setBalance((newBalance).toFixed(2));
      })
      .catch(e => alert(e.response.data));
  }, [ authContext ]);

  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">{`Olá, ${authContext && authContext.name}`}</h1>
        <BiExit
          onClick={() => {
            localStorage.removeItem('auth');
            setGetAuth(getAuth + 1);
            // navigate('/');
          }}
          data-test="logout"
        >
        </BiExit>
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map(t => (
            <ListItemContainer key={t._id}>
              <div>
                <span>{t.date}</span>
                <strong data-test="registry-name">{t.description}</strong>
              </div>
              <Value color={t.type === 'income' ? true : false} data-test="registry-amount">{String(t.amount).replace('.', ',')}</Value>
            </ListItemContainer>
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={balance > 0 ? true : false} data-test="total-amount">{String(balance).replace('.', ',')}</Value>
        </article>
      </TransactionsContainer>

      <ButtonsContainer>
        <button onClick={() => navigate('/nova-transacao/entrada')} data-test="new-income">
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate('/nova-transacao/saida')} data-test="new-expense">
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === true ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`