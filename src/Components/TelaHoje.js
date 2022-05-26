import styled from "styled-components";
import React from "react";

import Header from "./Header";
import Footer from "./Footer";

function Habitos() {
  const [corIcone, setCorIcone] = React.useState("#e7e7e7");

  function habitoConcluido() {
    if (corIcone === "#e7e7e7") {
      setCorIcone("#8fc549");
    } else if (corIcone === "#8fc549") {
      setCorIcone("#e7e7e7");
    }
  }

  return (
    <CaixaHabito>
      <NomeHabito>
        <h3>Ler 1 capítulo de livro</h3>
        <p>Sequência atual: 3 dias</p>
        <p>Seu recorde: 5 dias</p>
      </NomeHabito>
      <IconeHabito color={corIcone}>
        <ion-icon name="checkbox" onClick={habitoConcluido}></ion-icon>
      </IconeHabito>
    </CaixaHabito>
  );
}

export default function TelaHoje({token}) {

  return (
    <TelaHojeStyle>
      <Header />
      <Cabecalho>
        <h2>Segunda, 17/05</h2>
        <p>Nenhum hábito concluído ainda</p>
      </Cabecalho>
      <div>
        <Habitos />
        <Habitos />
        <Habitos />
      </div>
      <Footer />
    </TelaHojeStyle>
  );
}

const TelaHojeStyle = styled.div`
  background-color: var(--cor-fundo);
  margin-top: 70px;
  margin-bottom: 70px;
  height: 100%;
`;

const Cabecalho = styled.div`
  padding: 28px 20px;

  h2 {
    font-size: 23px;
    color: var(--cor-header);
  }

  p {
    color: #bababa;
    font-size: 18px;
    line-height: 25px;
  }
`;

const CaixaHabito = styled.div`
  background-color: var(--cor-branca);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px;
  margin: 10px 20px;
  border-radius: 5px;
`;

const NomeHabito = styled.div`
  color: var(--cor-texto);

  h3 {
    font-size: 20px;
    margin-bottom: 7px;
  }

  p {
    font-size: 13px;
    margin-bottom: 4px;
  }
`;

const IconeHabito = styled.div`
  ion-icon {
    font-size: 69px;
    color: ${(props) => props.color};

    &:hover {
      filter: brightness(0.8);
      cursor: pointer;
    }
  }
`;
