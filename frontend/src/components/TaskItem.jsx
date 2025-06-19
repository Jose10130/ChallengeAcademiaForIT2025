
import React from 'react';

function TaskItem({ task, onToggleComplete, onDelete, onEdit }) {
  
    const createdAtDate = task.createdAt ? new Date(task.createdAt) : null;

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            {createdAtDate && <small>Creada: {createdAtDate.toLocaleString()}</small>}
            <div className="task-actions">
                <button onClick={() => onToggleComplete(task.id, !task.completed)}>
                    {task.completed ? 'Marcar Pendiente' : 'Marcar Completada'}
                </button>
                <button onClick={() => onEdit(task)}>Editar</button>
                <button onClick={() => onDelete(task.id)}>Eliminar</button>
            </div>
        </div>
    );
}

export default TaskItem;