import styled from "styled-components";
import React from "react";
import axios from "axios";

import Header from "./Header";
import Footer from "./Footer";

function Habito({ token, habito, setHabitosDeHoje }) {
  const [corIcone, setCorIcone] = React.useState("#e7e7e7");

  React.useEffect(() => {
    if (habito.done === true) {
      setCorIcone("#8fc549");
    }
  }, []);

  function renderizarHabitosDiarios() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      config
    );

    promise
      .then((response) => {
        setHabitosDeHoje(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function habitoConcluido() {
    if (habito.done === false) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const body = {};

      const promise = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/check`,
        body,
        config
      );

      promise
        .then((response) => {
          setCorIcone("#8fc549");
          renderizarHabitosDiarios()
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const body = {};

      const promise = axios.post(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/uncheck`,
        body,
        config
      );

      promise
        .then((response) => {
          setCorIcone("#e7e7e7");
          renderizarHabitosDiarios()
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <CaixaHabito>
      <NomeHabito>
        <h3>{habito.name}</h3>
        <p>Sequência atual: {habito.currentSequence} dias</p>
        <p>Seu recorde: {habito.highestSequence} dias</p>
      </NomeHabito>
      <IconeHabito color={corIcone}>
        <ion-icon name="checkbox" onClick={habitoConcluido}></ion-icon>
      </IconeHabito>
    </CaixaHabito>
  );
}

export default function TelaHoje({ token, imagemPerfil }) {
  const [habitosDeHoje, setHabitosDeHoje] = React.useState([]);

  const dayjs = require("dayjs");
  dayjs().format();

  let diaSemana;

  switch (dayjs().$W) {
    case 0:
      diaSemana = "Domingo";
      break;
    case 1:
      diaSemana = "Segunda";
      break;
    case 2:
      diaSemana = "Terça";
      break;
    case 3:
      diaSemana = "Quarta";
      break;
    case 4:
      diaSemana = "Quinta";
      break;
    case 5:
      diaSemana = "Sexta";
      break;
    case 6:
      diaSemana = "Sábado";
      break;
  }

  function renderizarHabitosDiarios() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      config
    );

    promise
      .then((response) => {
        setHabitosDeHoje(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    renderizarHabitosDiarios();
  }, []);


  return (
    <TelaHojeStyle>
      <Header imagemPerfil={imagemPerfil} />
      <Cabecalho>
        <h2>
          {diaSemana}, {dayjs().$D}/{dayjs().$M + 1}
        </h2>
        <p>Nenhum hábito concluído ainda</p>
      </Cabecalho>
      <div>
        {habitosDeHoje.map((habito, index) => (
          <Habito
            key={index}
            habito={habito}
            token={token}
            setHabitosDeHoje={setHabitosDeHoje}
            habitosDeHoje={habitosDeHoje}
          />
        ))}
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
