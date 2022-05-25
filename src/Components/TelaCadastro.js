import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import Button from "./shared/Button";

import logo from "../assets/images/logo.png";

export default function TelaCadastro() {
  const navigate = useNavigate();

  function submitForm() {
    navigate("/");
  }

  return (
    <>
      <LogoStyle>
        <img src={logo} alt="logo" />
      </LogoStyle>
      <FormStyle onSubmit={submitForm}>
        <input type="email" name="email" id="email" placeholder="email" />
        <input type="password" name="senha" id="senha" placeholder="senha" />
        <input type="text" name="nome" id="nome" placeholder="nome" />
        <input type="url" name="foto" id="foto" placeholder="foto" />
        <Button>Cadastrar</Button>
      </FormStyle>
      <FacaLogin>
        <Link to="/">
          <p>Já tem uma conta? Faça login!</p>
        </Link>
      </FacaLogin>
    </>
  );
}

const LogoStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 75px 0px 35px 0px;
`;

const FormStyle = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  input {
    margin-bottom: 6px;
    width: 80%;
    height: 45px;
    border: 1px solid var(--cor-input);
    padding: 0 10px;
    font-size: 20px;
    color: var(--cor-texto);
    border-radius: 5px;

    &::placeholder {
      color: var(--cor-input);
    }
  }

  button {
    margin-bottom: 25px;
    width: 80%;
    height: 45px;
    border: 1px solid var(--cor-detalhes);
    background-color: var(--cor-detalhes);
    padding: 0 10px;
    font-size: 20px;
    color: var(--cor-branca);
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      filter: brightness(0.8);
    }
  }
`;

const FacaLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      color: var(--cor-detalhes);
    }
  }

  p {
    font-size: 14px;
    color: var(--cor-detalhes);
  }
`;
