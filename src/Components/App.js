import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import TelaLogin from "./TelaLogin";
import TelaCadastro from "./TelaCadastro";
import TelaHabitos from "./TelaHabitos";
import TelaHoje from "./TelaHoje";
import TelaHistorico from "./TelaHistorico";

export default function App() {
  const [token, setToken] = React.useState("");
  const [imagemPerfil, setImagemPerfil] = React.useState("");
  const [porcentagemConcluida, setPorcentagemConcluida] = React.useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <TelaLogin setToken={setToken} setImagemPerfil={setImagemPerfil} />
          }
        />
        <Route path="/cadastro" element={<TelaCadastro />} />
        <Route
          path="/habitos"
          element={
            <TelaHabitos
              token={token}
              imagemPerfil={imagemPerfil}
              porcentagemConcluida={porcentagemConcluida}
            />
          }
        />
        <Route
          path="/hoje"
          element={
            <TelaHoje
              token={token}
              imagemPerfil={imagemPerfil}
              porcentagemConcluida={porcentagemConcluida}
              setPorcentagemConcluida={setPorcentagemConcluida}
            />
          }
        />
        <Route
          path="/historico"
          element={
            <TelaHistorico
              token={token}
              imagemPerfil={imagemPerfil}
              porcentagemConcluida={porcentagemConcluida}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
