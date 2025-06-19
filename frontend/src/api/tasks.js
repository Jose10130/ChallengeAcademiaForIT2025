
const API_URL = import.meta.env.VITE_API_URL; // Obtiene la URL base de la API desde .env

export const getTasks = async () => {
    try {
        const response = await fetch(`${API_URL}/tasks`); // GET /api/tasks
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error; 
    }
};

export const createTask = async (taskData) => {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });
        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};

export const updateTask = async (id, taskData) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        return await response.json(); // Devuelve la tarea actualizada
    } catch (error) {
        console.error(`Error updating task with ID ${id}:`, error);
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE', // DELETE /api/tasks/:id
        });
        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        return;
    } catch (error) {
        console.error(`Error deleting task with ID ${id}:`, error);
        throw error;
    }
};