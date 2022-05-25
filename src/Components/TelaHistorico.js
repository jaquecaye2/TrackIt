import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";

export default function TelaHistorico() {
  return (
    <TelaHistoricoStyle>
      <Header />
      <Cabecalho>
        <p>Histórico</p>
      </Cabecalho>
      <Paragrafo>
        <p>
          Em breve você poderá ver o histórico dos seus hábitos aqui!
        </p>
      </Paragrafo>
      <Footer />
    </TelaHistoricoStyle>
  );
}

const TelaHistoricoStyle = styled.div`
  background-color: var(--cor-fundo);
  margin-top: 70px;
  margin-bottom: 70px;
  height: 100%;
`;

const Cabecalho = styled.div`
  height: 84px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  p {
    font-size: 23px;
    color: var(--cor-header);
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