import styled from "styled-components";

export default function Button({ children }) {
  return (
    <ButtonStyle>
      <button type="submit">{children}</button>
    </ButtonStyle>
  );
}

const ButtonStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

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
  }

  &:hover {
    filter: brightness(0.8);
  }
`;
