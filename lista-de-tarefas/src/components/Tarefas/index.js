import PropTypes from 'prop-types';
import React from 'react';
import { FaEdit, FaWindowClose } from 'react-icons/fa';
import './Tarefas.css';

export default function Tarefas({ tarefas, handleEdit, handleDelete }) {
  return (
    <ul className="tarefas">
      {tarefas.map((tarefa, indice) => (
        <li key={tarefa}>
          {tarefa}
          <span>
            <FaEdit
              onClick={(e) => handleEdit(e, indice)}
              className="edit"
            />

            <FaWindowClose
              onClick={(e) => handleDelete(e, indice)}
              className="delete"
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

Tarefas.propTypes = {
  tarefas: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
