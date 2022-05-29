import styled from "styled-components";

import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function Footer({ porcentagemConcluida }) {
  return (
    <FooterStyle>
      <div>
        <Link to="/habitos">Hábitos</Link>
      </div>
      <div className="divHoje">
        <Link to="/hoje">
          <CircularProgressbar
            value={porcentagemConcluida}
            className="barraProgresso"
            strokeWidth={8}
            text={`Hoje`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#52B6FF",
              textColor: "#ffffff",
              pathColor: "#ffffff",
              trailColor: "transparent",
              strokeLinecap: "round",
              textSize: "19px",
              pathTransitionDuration: 0.3,
            })}
          />
        </Link>
      </div>
      <div>
        <Link to="/historico">Histórico</Link>
      </div>
    </FooterStyle>
  );
}

const FooterStyle = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  background-color: var(--cor-branca);
  padding: 0 20px;

  a {
    text-decoration: none;

    &:visited {
      color: var(--cor-detalhes);
    }
  }

  div {
    width: 33%;
    font-size: 18px;
    color: var(--cor-detalhes);
    text-align: center;
    cursor: pointer;

    &:hover {
      filter: brightness(0.4);
    }
  }

  div.divHoje {
    width: 91px;
    height: 91px;
    margin-bottom: 50px;
  }

  .barraProgresso {
    dominant-baseline: middle;
    text-anchor: middle;
  }
`;
