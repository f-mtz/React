import React, { Component } from 'react';
import './Main.css';

// Form
import { FaPlus } from 'react-icons/fa';

// Tarefas
import { FaEdit, FaWindowClose } from 'react-icons/fa';

export default class Main extends Component {
  state = {
    novaTarefa: '',
    tarefas: [],
    indice: -1,
  };

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
        <h1>
          Lista de Tarefas
        </h1>
        <form onSubmit={this.handleSubmit} action="#" className="form">
          <input
            onChange={this.handleChange}
            type="text"
            value={novaTarefa}
          />
          <button type="submit">
            <FaPlus />
          </button>
        </form>

        <ul className="tarefas">
          {tarefas.map((tarefa, indice) => (
            <li key={tarefa}>
              {tarefa}
              <span>
                <FaEdit
                  onClick={(e) => this.handleEdit(e, indice)}
                  className="edit"
                />

                <FaWindowClose
                  onClick={(e) => this.handleDelete(e, indice)}
                  className="delete"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
