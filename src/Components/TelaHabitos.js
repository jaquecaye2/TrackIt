import styled from "styled-components";
import React from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

import Header from "./Header";
import Footer from "./Footer";

function DiaSemana({ dia, setDiasSelecionados, diasSelecionados, disabled }) {
  const [corDiaSelecionado, setCorDiaSelecionado] = React.useState("#dbdbdb");
  const [backgroundDiaSelecionado, setBackgroundDiaSelecionado] =
    React.useState("#ffffff");

  function selecionarDia() {
    if (corDiaSelecionado === "#dbdbdb") {
      setCorDiaSelecionado("#ffffff");
      setBackgroundDiaSelecionado("#cfcfcf;");
      setDiasSelecionados([...diasSelecionados, dia.id]);
    } else if (corDiaSelecionado === "#ffffff") {
      setCorDiaSelecionado("#dbdbdb");
      setBackgroundDiaSelecionado("#ffffff;");
      for (let i = 0; i < diasSelecionados.length; i++) {
        if (diasSelecionados[i] === dia.id) {
          diasSelecionados.splice(diasSelecionados.indexOf(dia.id), 1);
        }
      }
    }
  }

  return (
    <CaixaDiaSemana
      onClick={selecionarDia}
      color={corDiaSelecionado}
      background={backgroundDiaSelecionado}
      disabled={disabled}
    >
      {dia.name}
    </CaixaDiaSemana>
  );
}

function DiaSemanaSelecionado({ dia, diasSelecionados }) {
  const [corDiaSelecionado, setCorDiaSelecionado] = React.useState("#dbdbdb");
  const [backgroundDiaSelecionado, setBackgroundDiaSelecionado] =
    React.useState("#ffffff");

  React.useEffect(() => {
    for (let i = 0; i < diasSelecionados.length; i++) {
      if (diasSelecionados[i] === dia.id) {
        setCorDiaSelecionado("#ffffff");
        setBackgroundDiaSelecionado("#cfcfcf;");
      }
    }
  }, []);

  return (
    <CaixaDiaSemanaSelecionado
      color={corDiaSelecionado}
      background={backgroundDiaSelecionado}
    >
      {dia.name}
    </CaixaDiaSemanaSelecionado>
  );
}

function HabitoCriados({ token, habito, habitos, setHabitos }) {
  const dias = [
    { name: "D", id: 0 },
    { name: "S", id: 1 },
    { name: "T", id: 2 },
    { name: "Q", id: 3 },
    { name: "Q", id: 4 },
    { name: "S", id: 5 },
    { name: "S", id: 6 },
  ];

  function removerHabito() {
    let resultado = window.confirm("Você deseja confirmar a remoção?");

    if (resultado === true) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const promise = axios.delete(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}`,
        config
      );

      promise
        .then((response) => {
          let listaHabitosRestantes = habitos.filter(
            (habitonovo) => habitonovo.id !== habito.id
          );
          setHabitos(listaHabitosRestantes);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <CaixaHabito>
      <CaracteristicasHabitos>
        <p>{habito.name}</p>
        <div>
          {dias.map((dia, index) => (
            <DiaSemanaSelecionado
              key={index}
              dia={dia}
              diasSelecionados={habito.days}
            />
          ))}
        </div>
      </CaracteristicasHabitos>
      <BotaoDeletar>
        <ion-icon name="trash-outline" onClick={removerHabito}></ion-icon>
      </BotaoDeletar>
    </CaixaHabito>
  );
}

export default function TelaHabitos({ token, imagemPerfil }) {
  const [novoHabito, setNovoHabito] = React.useState(null);
  const [habitos, setHabitos] = React.useState([]);

  const dias = [
    { name: "D", id: 0 },
    { name: "S", id: 1 },
    { name: "T", id: 2 },
    { name: "Q", id: 3 },
    { name: "Q", id: 4 },
    { name: "S", id: 5 },
    { name: "S", id: 6 },
  ];

  const [nomeHabito, setNomeHabito] = React.useState("");
  const [diasSelecionados, setDiasSelecionados] = React.useState([]);

  const [corInput, setCorInput] = React.useState("#666666");
  const [backgroundInput, setBackgroundInput] = React.useState("#ffffff");
  const [disabled, setDisabled] = React.useState(false);
  const [carregando, setCarregando] = React.useState(false);

  React.useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      config
    );

    promise
      .then((response) => {
        setHabitos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function criarNovoHabito() {
    if (novoHabito === null) {
      setNovoHabito("criado");
    } else {
      setNovoHabito(null);
    }
  }

  function salvarHabito() {
    setCorInput("#B3B3B3");
    setBackgroundInput("#D4D4D4");
    setDisabled(true);
    setCarregando(true);

    const habitoCriado = {
      name: nomeHabito,
      days: diasSelecionados,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      habitoCriado,
      config
    );

    promise
      .then((response) => {
        setDiasSelecionados([]);
        setHabitos([...habitos, response.data]);
        setNomeHabito("");
        setNovoHabito(null);
        setCorInput("#666666");
        setBackgroundInput("#ffffff");
        setDisabled(false);
        setCarregando(false);
      })
      .catch((error) => {
        alert(`${error} - Tente novamente`);
        setCorInput("#666666");
        setBackgroundInput("#ffffff");
        setDisabled(false);
        setCarregando(false);
      });
  }

  function cancelarHabito() {
    setNovoHabito(null);
  }

  return (
    <TelaHabitosStyle>
      <Header imagemPerfil={imagemPerfil} />
      <Container>
        <Cabecalho>
          <p>Meus hábitos</p>
          <button onClick={criarNovoHabito}>+</button>
        </Cabecalho>

        {novoHabito ? (
          <HabitoStyle color={corInput} background={backgroundInput}>
            <input
              type="text"
              name="nomeHabito"
              id="nomeHabito"
              placeholder="nome do hábito"
              value={nomeHabito}
              onChange={(e) => setNomeHabito(e.target.value)}
              required
              disabled={disabled}
            />
            <BotoesDiasStyle>
              {dias.map((dia, index) => (
                <DiaSemana
                  key={index}
                  dia={dia}
                  setDiasSelecionados={setDiasSelecionados}
                  diasSelecionados={diasSelecionados}
                  disabled={disabled}
                />
              ))}
            </BotoesDiasStyle>
            <BotoesAcoes>
              <p onClick={cancelarHabito}>Cancelar</p>

              {
                carregando ?
                <button><ThreeDots color="#ffffff" height={20} width={35} /></button> :
                <button onClick={salvarHabito}>Salvar</button>
              }
              
            </BotoesAcoes>
          </HabitoStyle>
        ) : null}

        {habitos.length === 0 ? (
          <Paragrafo>
            <p>
              Você não tem nenhum hábito cadastrado ainda. Adicione um hábito
              para começar a trackear!
            </p>
          </Paragrafo>
        ) : (
          <div>
            {habitos.map((habito, index) => (
              <HabitoCriados
                key={index}
                token={token}
                habito={habito}
                setHabitos={setHabitos}
                habitos={habitos}
              />
            ))}
          </div>
        )}
      </Container>

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

const Container = styled.div`
  padding-bottom: 70px;
  background-color: var(--cor-fundo);
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
    color: ${(props) => props.color};
    background-color: ${(props) => props.background};
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

const CaixaDiaSemanaSelecionado = styled.button`
  margin: 0 2px;
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.background};
  border: 1px solid var(--cor-input);
  border-radius: 5px;
  color: ${(props) => props.color};
  font-size: 20px;
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
    display: flex;
    align-items: center;
    justify-content: center;

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
