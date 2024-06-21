import React from 'react';
import '../styles/Menu.css';
import { Link } from 'react-router-dom';

export const Menu = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {/* <li>
                    <Link to="/Turmas">Turmas</Link>
                </li> */}
                {/* <li>
                    <Link to="/Alunos">Alunos</Link>
                </li> */}
                <li>
                    <Link to="/CadastrarTurma">Cadastrar Turma</Link>
                </li>
                <li>
                    <Link to="/CadastrarAluno">Cadastrar Aluno</Link>
                </li>
                {/* <li>
                    <Link to="/Lixeira">Lixeira</Link>
                </li> */}
            </ul>
        </div>
    )
}

export default Menu;