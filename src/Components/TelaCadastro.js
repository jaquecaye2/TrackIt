import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import Button from "./shared/Button";

import logo from "../assets/images/logo.png";

export default function TelaCadastro() {
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [foto, setFoto] = React.useState("");

  const [disabled, setDisabled] = React.useState(false);
  const [corBackgroundInput, setCorBackgroundInput] = React.useState("#ffffff");
  const [carregando, setCarregando] = React.useState(false);

  const navigate = useNavigate();

  function submitForm(event) {
    event.preventDefault();

    setDisabled(true);
    setCorBackgroundInput("#f2f2f2");
    setCarregando(true);

    const dadosCadastro = {
      email,
      name: nome,
      image: foto,
      password: senha,
    };

    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
      dadosCadastro
    );

    promise
      .then((response) => {
        console.log(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("Os dados foram inseridos incorretamente. Tente novamente!");
        setEmail("");
        setSenha("");
        setNome("");
        setFoto("");
        setDisabled(false);
        setCorBackgroundInput("#ffffff");
        setCarregando(false);
      });
  }

  return (
    <>
      <LogoStyle>
        <img src={logo} alt="logo" />
      </LogoStyle>
      <FormStyle onSubmit={submitForm} corBackgroundInput={corBackgroundInput}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={disabled}
          required
        />
        <input
          type="password"
          name="senha"
          id="senha"
          placeholder="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          disabled={disabled}
          required
        />
        <input
          type="text"
          name="nome"
          id="nome"
          placeholder="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          disabled={disabled}
          required
        />
        <input
          type="url"
          name="foto"
          id="foto"
          placeholder="foto"
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
          disabled={disabled}
          required
        />

        {carregando ? (
          <Button disabled={disabled}>
            <ThreeDots color="#ffffff" height={45} width={80}/>
          </Button>
        ) : (
          <Button disabled={disabled}>Cadastrar</Button>
        )}
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
    background-color: ${(props) => props.corBackgroundInput};

    &::placeholder {
      color: var(--cor-input);
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
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
