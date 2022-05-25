import styled from "styled-components";
import React from "react";

import Header from "./Header";
import Footer from "./Footer";

function DiaSemana({ dia }) {
  const [corDiaSelecionado, setCorDiaSelecionado] = React.useState("#dbdbdb");
  const [backgroundDiaSelecionado, setBackgroundDiaSelecionado] =
    React.useState("#ffffff");

  function selecionarDia() {
    if (corDiaSelecionado === "#dbdbdb") {
      setCorDiaSelecionado("#ffffff");
      setBackgroundDiaSelecionado("#cfcfcf;");
    } else if (corDiaSelecionado === "#ffffff") {
      setCorDiaSelecionado("#dbdbdb");
      setBackgroundDiaSelecionado("#ffffff;");
    }
  }

  return (
    <CaixaDiaSemana
      onClick={selecionarDia}
      color={corDiaSelecionado}
      background={backgroundDiaSelecionado}
    >
      {dia}
    </CaixaDiaSemana>
  );
}

function HabitosCriados() {
  const dias = ["D", "S", "T", "Q", "Q", "S", "S"];

  return (
    <CaixaHabito>
      <CaracteristicasHabitos>
        <p>Ler 1 capítulo de livro</p>
        <div>
          {dias.map((dia, index) => (
            <DiaSemana key={index} dia={dia} />
          ))}
        </div>
      </CaracteristicasHabitos>
      <BotaoDeletar>
        <ion-icon name="trash-outline"></ion-icon>
      </BotaoDeletar>
    </CaixaHabito>
  );
}

export default function TelaHabitos() {
  const dias = ["D", "S", "T", "Q", "Q", "S", "S"];

  const [novoHabito, setNovoHabito] = React.useState(null);
  const [habitos, setHabitos] = React.useState([]);

  function criarNovoHabito() {
    if (novoHabito === null) {
      setNovoHabito("criado");
    } else {
      setNovoHabito(null);
    }
  }

  function salvarHabito() {
    setHabitos([...habitos, "novo"]);
    setNovoHabito(null);
  }

  function cancelarHabito(){
    setNovoHabito(null);
  }

  console.log(habitos);

  return (
    <TelaHabitosStyle>
      <Header />
      <Cabecalho>
        <p>Meus hábitos</p>
        <button onClick={criarNovoHabito}>+</button>
      </Cabecalho>

      {/* Lógica para abrir a caixa para criar um hábito quando clicado no + */}
      {novoHabito ? (
        <HabitoStyle>
          <input
            type="text"
            name="nomeHabito"
            id="nomeHabito"
            placeholder="nome do hábito"
          />
          <BotoesDiasStyle>
            {dias.map((dia, index) => (
              <DiaSemana key={index} dia={dia} />
            ))}
          </BotoesDiasStyle>
          <BotoesAcoes>
            <p onClick={cancelarHabito}>Cancelar</p>
            <button onClick={salvarHabito}>Salvar</button>
          </BotoesAcoes>
        </HabitoStyle>
      ) : null}

      {/* LÓGICA PARA RENDERIZAR OS HÁBITOS CRIADOS, SE HOUVE */}
      {habitos.length === 0 ? (
        <Paragrafo>
          <p>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </p>
        </Paragrafo>
      ) : (
        <div>
          <HabitosCriados />
        </div>
      )}

      <Footer />
    </TelaHabitosStyle>
  );
}

const TelaHabitosStyle = styled.div`
  background-color: var(--cor-fundo);
  margin-top: 70px;
  margin-bottom: 70px;
  height: 100%;
`;

const Cabecalho = styled.div`
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  p {
    font-size: 23px;
    color: var(--cor-header);
  }

  button {
    width: 40px;
    height: 35px;
    border: 1px solid var(--cor-detalhes);
    background-color: var(--cor-detalhes);
    font-size: 27px;
    color: var(--cor-branca);
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      filter: brightness(0.8);
    }
  }
`;

const HabitoStyle = styled.div`
  background-color: var(--cor-branca);
  margin: 0 20px 20px 20px;
  padding: 18px;
  border-radius: 5px;

  input {
    margin-bottom: 6px;
    width: 100%;
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
`;

const BotoesDiasStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  padding-bottom: 18px;
`;

const CaixaDiaSemana = styled.button`
  margin: 0 2px;
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.background};
  border: 1px solid var(--cor-input);
  border-radius: 5px;
  color: ${(props) => props.color};
  font-size: 20px;

  &:hover {
    filter: brightness(0.8);
    cursor: pointer;
  }
`;

const BotoesAcoes = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: right;

  p {
    color: var(--cor-detalhes);
    margin-right: 23px;
    font-size: 16px;

    &:hover {
      filter: brightness(0.8);
      cursor: pointer;
    }
  }

  button {
    width: 84px;
    height: 35px;
    background-color: var(--cor-detalhes);
    border: 1px solid var(--cor-detalhes);
    border-radius: 5px;
    color: var(--cor-branca);
    font-size: 16px;

    &:hover {
      filter: brightness(0.8);
      cursor: pointer;
    }
  }
`;

const Paragrafo = styled.div`
  margin: 0 20px;

  p {
    color: var(--cor-texto);
    font-size: 18px;
    line-height: 25px;
  }
`;

const CaixaHabito = styled.div`
  background-color: var(--cor-branca);
  margin: 20px;
  padding: 18px;
  border-radius: 5px;
  position: relative;
`;

const CaracteristicasHabitos = styled.div`
  p {
    margin-bottom: 12px;
    font-size: 20px;
    color: var(--cor-texto);
  }
`;

const BotaoDeletar = styled.div`
  ion-icon {
    position: absolute;
    top: 18px;
    right: 18px;
    font-size: 18px;

    &:hover {
      cursor: pointer;
    }
  }
`;
