import React, { Component } from 'react';
import './Main.css';
import Form from './Form';
import Tarefas from './Tarefas';

export default class Main extends Component {
  state = {
    novaTarefa: '',
    tarefas: [],
    indice: -1,
  };

  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));

    if (!tarefas) return;

    this.setState({ tarefas });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;
    if (tarefas === prevState.tarefas) return;

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas, indice } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();

    if (tarefas.indexOf(novaTarefa) !== -1) return;

    const novasTarefas = [...tarefas];
    if (indice === -1) {
      this.setState({
        tarefas: [...novasTarefas, novaTarefa],
        novaTarefa: '',
      });
    } else {
      novasTarefas[indice] = novaTarefa;

      this.setState({
        tarefas: [...novasTarefas],
        indice: -1,
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  }

  handleEdit = (e, indice) => {
    const { tarefas } = this.state;
    this.setState({
      indice,
      novaTarefa: tarefas[indice],
    });
  }

  handleDelete = (e, indice) => {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];
    novasTarefas.splice(indice, 1);

    this.setState({
      tarefas: [...novasTarefas],
    });
  }

  render() {
    const { novaTarefa, tarefas } = this.state;
    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>
        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          novaTarefa={novaTarefa}
        />

        <Tarefas
          tarefas={tarefas}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
        />

      </div>
    );
  }
}
