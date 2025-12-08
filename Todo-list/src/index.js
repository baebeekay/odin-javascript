/**
 * This module handles all DOM manipulation and rendering logic.
 */
import { format, parseISO } from 'date-fns';
import { getProjects, getCurrentProjectIndex, getTodoById, deleteProject } from './dataManager.js';

const dom = {
    projectsList: document.getElementById('projects-list'),
    todosList: document.getElementById('todos-list'),
    currentProjectTitle: document.getElementById('current-project-title'),
    todoModal: document.getElementById('todo-modal'),
    todoForm: document.getElementById('todo-form'),
    todoTitleInput: document.getElementById('todo-title'),
    todoDescriptionInput: document.getElementById('todo-description'),
    todoDueDateInput: document.getElementById('todo-due-date'),
    todoPriorityInput: document.getElementById('todo-priority'),
    todoNotesInput: document.getElementById('todo-notes'),
    modalTitle: document.getElementById('modal-title'),
    deleteModal: document.getElementById('delete-modal'),
    confirmDeleteBtn: document.getElementById('confirm-delete-btn'),
};

/**
 * Renders all projects in the sidebar.
 */
function renderProjects() {
    dom.projectsList.innerHTML = '';
    const projects = getProjects();
    const currentProjectIndex = getCurrentProjectIndex();
    
    projects.forEach((project, index) => {
        const projectItem = document.createElement('button');
        projectItem.textContent = project.name;
        projectItem.dataset.projectId = project.id;
        projectItem.dataset.projectIndex = index;
        projectItem.classList.add('w-full', 'text-left', 'py-2', 'px-4', 'rounded-lg', 'font-medium', 'transition', 'relative', 'group');
        if (index === currentProjectIndex) {
            projectItem.classList.add('bg-blue-200', 'text-blue-800');
        } else {
            projectItem.classList.add('bg-gray-100', 'hover:bg-gray-200');
        }

        dom.projectsList.appendChild(projectItem);
    });
}

/**
 * Renders all todos for the current project.
 */
function renderTodos() {
    dom.todosList.innerHTML = '';
    const projects = getProjects();
    const currentProjectIndex = getCurrentProjectIndex();
    
    const currentProject = projects[currentProjectIndex];
    if (!currentProject) {
        dom.todosList.innerHTML = '<p class="text-center text-gray-500 mt-8">No projects found. Please add one.</p>';
        return;
    }
    dom.currentProjectTitle.textContent = currentProject.name;

    const currentTodos = currentProject.todos || [];

    if (currentTodos.length === 0) {
        dom.todosList.innerHTML = '<p class="text-center text-gray-500 mt-8">No to-dos yet. Add one!</p>';
        return;
    }

    currentTodos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.dataset.todoId = todo.id;
        
        // Determine priority color
        let priorityClass = '';
        switch(todo.priority) {
            case 'low':
                priorityClass = 'priority-low';
                break;
            case 'medium':
                priorityClass = 'priority-medium';
                break;
            case 'high':
                priorityClass = 'priority-high';
                break;
        }

        const formattedDate = todo.dueDate ? format(parseISO(todo.dueDate), 'MMM dd, yyyy') : 'No due date';

        todoItem.classList.add('todo-item', 'p-4', 'rounded-xl', 'shadow-md', 'cursor-pointer', 'transition', 'hover:shadow-lg', priorityClass);
        todoItem.innerHTML = `
            <div class="flex justify-between items-center">
                <h3 class="font-bold text-lg">${todo.title}</h3>
                <span class="text-sm font-medium">${formattedDate}</span>
            </div>
            <div class="details hidden mt-2 space-y-2">
                <p class="text-sm text-gray-700"><strong>Description:</strong> ${todo.description || 'N/A'}</p>
                <p class="text-sm text-gray-700"><strong>Notes:</strong> ${todo.notes || 'N/A'}</p>
                <div class="flex space-x-2">
                    <button class="edit-btn text-white bg-blue-500 py-1 px-3 rounded-lg text-sm transition hover:bg-blue-600" data-id="${todo.id}">Edit</button>
                    <button class="delete-btn text-white bg-red-500 py-1 px-3 rounded-lg text-sm transition hover:bg-red-600" data-id="${todo.id}">Delete</button>
                </div>
            </div>
        `;
        dom.todosList.appendChild(todoItem);
    });
}

/**
 * Shows the to-do modal for creating or editing.
 * @param {string} title The title for the modal.
 * @param {object} todo The todo object to edit, or null for a new todo.
 */
function showTodoModal(title, todo = null) {
    dom.modalTitle.textContent = title;
    dom.todoForm.reset();
    dom.todoForm.dataset.mode = todo ? 'edit' : 'add';
    dom.todoForm.dataset.todoId = todo ? todo.id : '';

    if (todo) {
        dom.todoTitleInput.value = todo.title;
        dom.todoDescriptionInput.value = todo.description;
        dom.todoDueDateInput.value = todo.dueDate;
        dom.todoPriorityInput.value = todo.priority;
        dom.todoNotesInput.value = todo.notes;
    }

    dom.todoModal.classList.remove('hidden');
    dom.todoModal.classList.add('block');
}

/**
 * Hides the to-do modal.
 */
function hideTodoModal() {
    dom.todoModal.classList.remove('block');
    dom.todoModal.classList.add('hidden');
}

/**
 * Shows the delete confirmation modal.
 * @param {string} todoId The ID of the todo to delete.
 */
function showDeleteModal(todoId) {
    dom.deleteModal.classList.remove('hidden');
    dom.confirmDeleteBtn.dataset.todoId = todoId;
}

/**
 * Hides the delete confirmation modal.
 */
function hideDeleteModal() {
    dom.deleteModal.classList.add('hidden');
    dom.confirmDeleteBtn.dataset.todoId = '';
}

export {
    renderProjects,
    renderTodos,
    showTodoModal,
    hideTodoModal,
    showDeleteModal,
    hideDeleteModal,
};
