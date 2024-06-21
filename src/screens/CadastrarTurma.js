import React, { useEffect, useState } from 'react';
import { db } from '../firebase';

export const CadastrarTurma = () => {

    const submitCadastrarTurma = (e) => {
        e.preventDefault();
        alert('Turma Cadastrada Com Sucesso!');

        let nomeTurma = document.getElementById("nomeTurma").value;
        let numeroTurma = document.getElementById("numTurma").value;

        db.collection('turmasCadastradas').add({
            nomeTurma: nomeTurma,
            numeroTurma: numeroTurma,
            time: new Date()
        });
    }

    const styles = {
        container: {
            padding: '20px',
            maxWidth: '500px',
            margin: '0 auto',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f9f9f9',
            fontFamily: 'Arial, sans-serif'
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

    const [listaTurmas, setListaTurmas] = useState([]);

    useEffect(() => {
        const listaDaTurma = db.collection('turmasCadastradas').orderBy('time', 'desc').onSnapshot((val) => {
            const listTurma = val.docs.map((valor) => {
                return {
                    id: valor.id,
                    nomeTurma: valor.data().nomeTurma
                }
            })
            setListaTurmas(listTurma)
        })
        return () => listaDaTurma()
    }, [])

    const exluirTurma = (e, turmaID) => {
        db.collection('turmasCadastradas').doc(turmaID).delete().then(() => alert('Turma Excluida com Sucesso!')).catch((error) => console.log('Erro ao Excluir a Turma ', error))
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Cadastrar Turma</h2>
            <form onSubmit={submitCadastrarTurma}>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="nomeTurma">Nome da Turma:</label>
                    <input style={styles.input} type='text' id='nomeTurma' />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="numTurma">Número da Sala da Turma:</label>
                    <input style={styles.input} type='text' id='numTurma' />
                </div>
                <button style={styles.button}>Cadastrar Turma</button>
            </form>

            <div>
                <h3 style={styles.title}>Excluir Turma</h3>
                <ul style={{ listStyle: 'none' }}>
                    {listaTurmas.map((turma) => (
                        <li key={turma.id} style={{ margin: '10px' }}>
                            <button onClick={(e) => exluirTurma(e, turma.id)}>Exluir</button> - {turma.nomeTurma}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CadastrarTurma;
