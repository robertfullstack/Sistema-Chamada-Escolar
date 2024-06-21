import React, { useEffect, useState } from 'react';
import { db } from '../firebase';

export const CadastrarAluno = () => {

    const submitCadastrarAluno = (e) => {
        e.preventDefault();

        let nomeAluno = document.getElementById("nomeAluno").value;
        let turmaAluno = document.getElementById("turmaAluno").value;
        // let turmaALunoID = document.getElementById("turmaAluno").accessKey;

        db.collection('alunos').add({
            nomeAluno: nomeAluno,
            turmaAluno: turmaAluno,
            // turmaALunoID: turmaALunoID,
            time: new Date()
        });

        alert("Aluno Cadastrado com Sucesso!")
    };

    const [turmasCadastradas, setTurmasCadastradas] = useState([]);
    useEffect(() => {
        const unsubscribe = db.collection('turmasCadastradas').orderBy('time', 'desc').onSnapshot((val) => {
            const todasTurmasAqui = val.docs.map((valores) => {
                return {
                    id: valores.id,
                    nomeTurma: valores.data().nomeTurma
                };
            });

            setTurmasCadastradas(todasTurmasAqui);
        });

        return () => unsubscribe();
    }, []);


    const [listaAlunos, setListaAlunos] = useState([]);
    useEffect(() => {
        const listaTodosAlunos = db.collection('alunos').orderBy('time', 'desc').onSnapshot((val) => {
            const listaAlunos = val.docs.map((valores) => {
                return {
                    id: valores.id,
                    aluno: valores.data().nomeAluno
                }
            })
            setListaAlunos(listaAlunos)
        })
        return () => {
            listaTodosAlunos()
        }
    }, [])

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '500px',
            margin: '0 auto',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f9f9f9'
        },
        title: {
            textAlign: 'center',
            marginBottom: '20px',
            color: '#333'
        },
        formGroup: {
            marginBottom: '15px'
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            color: '#555'
        },
        input: {
            width: '100%',
            padding: '8px',
            boxSizing: 'border-box',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '16px'
        },
        select: {
            width: '100%',
            padding: '8px',
            boxSizing: 'border-box',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '16px'
        },
        button: {
            display: 'block',
            width: '100%',
            padding: '10px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '20px'
        }
    };

    const exluirAluno = (e, idAluno) => {
        db.collection('alunos').doc(idAluno).delete().then(() => {
            alert("Aluno excluído com sucesso!");
        }).catch((error) => {
            console.error("Erro ao excluir aluno: ", error);
        })
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Cadastrar Aluno</h2>
            <form onSubmit={(e) => submitCadastrarAluno(e)}>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="nomeAluno">Nome do Aluno:</label>
                    <input style={styles.input} type='text' id='nomeAluno' />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="turmaAluno">Qual turma o aluno pertence?</label>
                    <select style={styles.select} id="turmaAluno">
                        <option selected disabled>Nenhuma</option>
                        {turmasCadastradas.map((turma) => (
                            <option key={turma.id} value={turma.nomeTurma}>{turma.nomeTurma}</option>
                        ))}
                    </select>

                </div>
                <button style={styles.button}>Cadastrar Turma</button>
            </form >

            <div>
                <h3 style={styles.title}>Excluir Alunos</h3>
                <ul style={{ listStyle: 'none' }}>
                    {listaAlunos.map((aluno) => (
                        <li key={aluno.id} style={{ margin: '10px' }}>
                            <button onClick={(e) => exluirAluno(e, aluno.id)}>Excluir</button> -  {aluno.aluno}
                        </li>
                    ))}
                </ul>
            </div>
        </div >
    );
};

export default CadastrarAluno;
