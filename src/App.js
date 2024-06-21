import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PageInit from './screens/PageInit';
import Home from './screens/Home';
import CadastrarTurma from './screens/CadastrarTurma.js';
import CadastrarAluno from './screens/CadastrarAluno.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageInit />} />
        <Route path="/home" element={<Home />} />
        <Route path="/CadastrarTurma" element={<CadastrarTurma/>} />
        <Route path="/CadastrarAluno" element={<CadastrarAluno />} />
        {/* <Route path="/Turmas" element={<Home />} />
        <Route path="/Alunos" element={<Home />} />
        <Route path="/Lixeira" element={<Home />} /> */}

      </Routes>
    </Router>
  )
}

export default App;