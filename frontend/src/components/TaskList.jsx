
import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem'; 
import TaskForm from './TaskForm'; 
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks'; 

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);

   
    useEffect(() => {
        fetchTasks();
    }, []);

  
    const fetchTasks = async () => {
        try {
            const data = await getTasks(); 
            setTasks(data); 
        } catch (error) {
            console.error("Error al cargar las tareas:", error);
            alert("No se pudieron cargar las tareas. Verifica que el backend esté corriendo.");//mejorar esto
        }
    };

    
    const handleFormSubmit = async (taskData) => {
        try {
            if (taskToEdit) {
                
                await updateTask(taskToEdit.id, taskData);
                setTaskToEdit(null); 
            } else {
               
                await createTask(taskData);
            }
            fetchTasks();
        } catch (error) {
            console.error("Error al guardar la tarea:", error);
            alert("No se pudo guardar la tarea. Inténtalo de nuevo.");
        }
    };

  
    const handleToggleComplete = async (id, completed) => {
        try {
            await updateTask(id, { completed }); 
            fetchTasks(); 
        } catch (error) {
            console.error(`Error al actualizar el estado de la tarea ${id}:`, error);
            alert("No se pudo actualizar el estado de la tarea.");
        }
    };

 
    const handleDeleteTask = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            try {
                await deleteTask(id);
                fetchTasks(); // Vuelve a cargar las tareas
            } catch (error) {
                console.error(`Error al eliminar la tarea ${id}:`, error);
                alert("No se pudo eliminar la tarea.");
            }
        }
    };

    
    const handleEditTask = (task) => {
        setTaskToEdit(task);
    };

    
    const handleCancelEdit = () => {
        setTaskToEdit(null);
    };

    return (
        <div className="task-list-container">
            <h1>Mis Tareas</h1>
            {}
            <TaskForm onSubmit={handleFormSubmit} taskToEdit={taskToEdit} onCancelEdit={handleCancelEdit} />
            <div className="tasks-display">
                {tasks.length === 0 ? (
                    <p>No hay tareas en la lista</p>
                ) : (
                    tasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggleComplete={handleToggleComplete}
                            onDelete={handleDeleteTask}
                            onEdit={handleEditTask}
                        />
                    ))//branca1990
                )}
            </div>
        </div>
    );
}

export default TaskList;