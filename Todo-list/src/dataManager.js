/**
 * This module handles all application data and its persistence in localStorage.
 */
import { isAfter } from 'date-fns';

let projects = [];
let currentProjectIndex = 0;

/**
 * Loads data from localStorage or creates a default project if none exists.
 */
function loadData() {
    try {
        const storedProjects = JSON.parse(localStorage.getItem('todoProjects'));
        if (storedProjects && storedProjects.length > 0) {
            projects = storedProjects;
        } else {
            createDefaultProject();
        }
    } catch (error) {
        console.error("Error loading data from localStorage:", error);
        createDefaultProject();
    }
}

/**
 * Creates a default project to get the user started.
 */
function createDefaultProject() {
    projects = [{
        id: crypto.randomUUID(),
        name: 'Default Project',
        todos: [{
            id: crypto.randomUUID(),
            title: 'Welcome to your to-do app!',
            description: 'Start by creating new to-dos and projects.',
            dueDate: new Date().toISOString().split('T')[0],
            priority: 'high',
            notes: 'This is an example note.',
        }],
    }];
    saveData();
}

/**
 * Saves the current projects array to localStorage.
 */
function saveData() {
    try {
        localStorage.setItem('todoProjects', JSON.stringify(projects));
    } catch (error) {
        console.error("Error saving data to localStorage:", error);
    }
}

/**
 * Returns the current state of projects.
 * @returns {Array} The projects array.
 */
function getProjects() {
    return projects;
}

/**
 * Returns the current project's index.
 * @returns {number} The index.
 */
function getCurrentProjectIndex() {
    return currentProjectIndex;
}

/**
 * Sets the current project by its index.
 * @param {number} index The index of the project to set.
 */
function setCurrentProjectIndex(index) {
    if (index >= 0 && index < projects.length) {
        currentProjectIndex = index;
    }
}

/**
 * Creates a new to-do item.
 * @param {object} todoData The data for the new to-do.
 */
function createTodo(todoData) {
    const newTodo = {
        id: crypto.randomUUID(),
        ...todoData,
        isComplete: false,
    };
    projects[currentProjectIndex].todos.push(newTodo);
    saveData();
}

/**
 * Updates an existing to-do item.
 * @param {string} todoId The ID of the to-do to update.
 * @param {object} updatedData The new data.
 */
function updateTodo(todoId, updatedData) {
    const todoIndex = projects[currentProjectIndex].todos.findIndex(
        todo => todo.id === todoId
    );
    if (todoIndex > -1) {
        projects[currentProjectIndex].todos[todoIndex] = {
            ...projects[currentProjectIndex].todos[todoIndex],
            ...updatedData,
        };
        saveData();
    }
}

/**
 * Deletes a to-do item.
 * @param {string} todoId The ID of the to-do to delete.
 */
function deleteTodo(todoId) {
    const todos = projects[currentProjectIndex].todos;
    projects[currentProjectIndex].todos = todos.filter(
        todo => todo.id !== todoId
    );
    saveData();
}

/**
 * Creates a new project.
 * @param {string} name The name of the new project.
 */
function createProject(name) {
    const newProject = {
        id: crypto.randomUUID(),
        name: name,
        todos: [],
    };
    projects.push(newProject);
    saveData();
}

export {
    loadData,
    saveData,
    getProjects,
    getCurrentProjectIndex,
    setCurrentProjectIndex,
    createTodo,
    updateTodo,
    deleteTodo,
    createProject,
};