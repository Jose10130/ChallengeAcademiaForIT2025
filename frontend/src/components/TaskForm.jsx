import React, { useState, useEffect } from 'react';

function TaskForm({ onSubmit, taskToEdit, onCancelEdit }) {
    const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '');
    const [description, setDescription] = useState(taskToEdit ? taskToEdit.description : '');

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [taskToEdit]); 

    const handleSubmit = (event) => {
        event.preventDefault(); 

        if (!title.trim()) {
            alert('El título de la tarea es obligatorio.');
            return;
        }

        // Prepara los datos de la tarea
        const taskData = {
            title: title.trim(),
            description: description.trim(),
           
            completed: taskToEdit ? taskToEdit.completed : false,
        };

        onSubmit(taskData);
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <h2>{taskToEdit ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h2>
            <div>
                <label htmlFor="title">Título:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Descripción (opcional):</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div> 
            <button type="submit">{taskToEdit ? 'Guardar Cambios' : 'Añadir Tarea'}</button>
            {taskToEdit && (
                <button type="button" onClick={onCancelEdit} className="cancel-button">
                    Cancelar Edición
                </button>
            )}
        </form>
    );//branca1990
}

export default TaskForm;