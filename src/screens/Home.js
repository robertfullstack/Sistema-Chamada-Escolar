import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Menu from '../components/Menu';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';

export const Home = () => {
    const [turmasCadastradas, setTurmasCadastradas] = useState([]);
    const [alunosCadastrados, setAlunosCadastrados] = useState([]);

    useEffect(() => {
        const unsubscribeTurmas = db.collection('turmasCadastradas').orderBy('time', 'desc').onSnapshot((snapshot) => {
            const todasTurmasAqui = snapshot.docs.map(doc => ({
                id: doc.id,
                dados: doc.data(),
                totalAlunos: 0 // Inicializa o contador de alunos para cada turma
            }));
            setTurmasCadastradas(todasTurmasAqui);
        });

        const unsubscribeAlunos = db.collection('alunos').orderBy('time', 'desc').onSnapshot((snapshot) => {
            const todosAlunosAqui = snapshot.docs.map(doc => ({
                id: doc.id,
                dados: doc.data()
            }));
            setAlunosCadastrados(todosAlunosAqui);
        });

        return () => {
            unsubscribeTurmas();
            unsubscribeAlunos();
        };
    }, []);

    // Atualizar o número total de alunos para cada turma
    useEffect(() => {
        const updatedTurmas = turmasCadastradas.map(turma => {
            const totalAlunos = alunosCadastrados.filter(aluno => aluno.dados.turmaAluno === turma.dados.nomeTurma).length;
            return {
                ...turma,
                totalAlunos
            };
        });
        setTurmasCadastradas(updatedTurmas);
    }, [alunosCadastrados]);

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '800px',
            margin: '0 auto',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f9f9f9',
            fontFamily: 'Arial, sans-serif'
        },
        menu: {
            marginBottom: '20px'
        },
        header: {
            textAlign: 'center',
            color: '#333'
        },
        section: {
            marginBottom: '20px'
        },
        title: {
            marginBottom: '10px',
            color: '#555'
        },
        list: {
            listStyleType: 'none',
            paddingLeft: '0'
        },
        listItem: {
            padding: '10px',
            borderBottom: '1px solid #ddd',
            color: '#666'
        },
        chartContainer: {
            marginTop: '20px'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.menu}>
                <Menu />
            </div>

            <div className="home-content">
                <div>
                    <h1 style={styles.header}>Secretaria</h1>

                    <div style={styles.section}>
                        <h3 style={styles.title}>Turmas Matriculadas</h3>
                        <ul style={styles.list}>
                            {turmasCadastradas.map((turma) => (
                                <li key={turma.id} style={styles.listItem}>
                                    {turma.dados.nomeTurma} - Sala: {turma.dados.numeroTurma} - Alunos: {turma.totalAlunos}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={styles.section}>
                        <h3 style={styles.title}>Alunos Matriculados</h3>
                        <ul style={styles.list}>
                            {alunosCadastrados.map((aluno) => (
                                <li key={aluno.id} style={styles.listItem}>
                                    {aluno.dados.nomeAluno} - Escola: {aluno.dados.turmaAluno}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div style={styles.chartContainer}>
                <h1 style={styles.header}>Gráfico Aluno Por Sala</h1>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={turmasCadastradas}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="dados.nomeTurma" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="totalAlunos" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Home;
