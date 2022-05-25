import styled from "styled-components";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <FooterStyle>
      <div>
        <Link to="/habitos">Hábitos</Link>
      </div>
      <div><Link to="/hoje">Hoje</Link></div>
      <div><Link to="/historico">Histórico</Link></div>
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

    &:visited{
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
`;
