import { saveToLocalStorage, loadFromLocalStorage } from "./Storage";
import Project from "./Project";
import Todo from "./Todo";

const UI = (() => {
  const projects = loadFromLocalStorage();

  const displayProjects = () => {
    const projectContainer = document.getElementById("project-container");
    projectContainer.innerHTML = "";
    projects.forEach((project, index) => {
      const projectElement = document.createElement("div");
      projectElement.textContent = project.name;
      projectElement.dataset.index = index;
      projectElement.addEventListener("click", () => {
        displayTodos(index);
      });
      projectContainer.appendChild(projectElement);
    });
  };

  const displayTodos = (projectIndex) => {
    const todoContainer = document.getElementById("todo-container");
    todoContainer.innerHTML = "";
    const project = projects[projectIndex];
    project.todos.forEach((todo, index) => {
      const todoElement = document.createElement("div");
      todoElement.textContent = `${todo.title} - ${todo.dueDate}`;
      todoElement.dataset.index = index;
      todoElement.addEventListener("click", () => {
        expandTodoDetails(projectIndex, index);
      });
      todoContainer.appendChild(todoElement);
    });
  };

  const expandTodoDetails = (projectIndex, todoIndex) => {
    const project = projects[projectIndex];
    const todo = project.todos[todoIndex];
    const todoDetailsContainer = document.createElement("div");

    todoDetailsContainer.innerHTML = `
      <h3>${todo.title}</h3>
      <p>${todo.description}</p>
      <p>Due Date: ${todo.dueDate}</p>
      <p>Priority: ${todo.priority}</p>
      <p>Notes: ${todo.notes}</p>
      <button id="edit-todo">Edit</button>
    `;

    const todoContainer = document.getElementById("todo-container");
    todoContainer.innerHTML = "";
    todoContainer.appendChild(todoDetailsContainer);

    document.getElementById("edit-todo").addEventListener("click", () => {
      editTodoDetails(projectIndex, todoIndex);
    });
  };

  const editTodoDetails = (projectIndex, todoIndex) => {
    const project = projects[projectIndex];
    const todo = project.todos[todoIndex];
    const todoDetailsContainer = document.createElement("div");

    todoDetailsContainer.innerHTML = `
      <input type="text" id="edit-title" value="${todo.title}">
      <textarea id="edit-description">${todo.description}</textarea>
      <input type="date" id="edit-dueDate" value="${todo.dueDate}">
      <input type="text" id="edit-priority" value="${todo.priority}">
      <textarea id="edit-notes">${todo.notes}</textarea>
      <button id="save-todo">Save</button>
    `;

    const todoContainer = document.getElementById("todo-container");
    todoContainer.innerHTML = "";
    todoContainer.appendChild(todoDetailsContainer);

    document.getElementById("save-todo").addEventListener("click", () => {
      const updatedTitle = document.getElementById("edit-title").value;
      const updatedDescription =
        document.getElementById("edit-description").value;
      const updatedDueDate = document.getElementById("edit-dueDate").value;
      const updatedPriority = document.getElementById("edit-priority").value;
      const updatedNotes = document.getElementById("edit-notes").value;

      const updatedTodo = new Todo(
        updatedTitle,
        updatedDescription,
        updatedDueDate,
        updatedPriority,
        updatedNotes
      );

      project.todos[todoIndex] = updatedTodo;
      saveToLocalStorage(projects);
      displayTodos(projectIndex);
    });
  };

  const addProject = (name) => {
    const project = new Project(name);
    projects.push(project);
    saveToLocalStorage(projects);
    displayProjects();
  };

  const addTodo = (projectIndex, todo) => {
    projects[projectIndex].addTodo(todo);
    saveToLocalStorage(projects);
    displayTodos(projectIndex);
  };

  const handleProjectFormSubmit = (event) => {
    event.preventDefault();
    const projectNameInput = document.getElementById("project-name");
    const projectName = projectNameInput.value.trim();
    if (projectName !== "") {
      addProject(projectName);
      projectNameInput.value = "";
    }
  };

  const handleTodoFormSubmit = (event) => {
    event.preventDefault();
    const projectIndex = 0; // Assuming adding todos to the default project for now
    const title = document.getElementById("todo-title").value.trim();
    const description = document
      .getElementById("todo-description")
      .value.trim();
    const dueDate = document.getElementById("todo-dueDate").value;
    const priority = document.getElementById("todo-priority").value.trim();
    if (title !== "" && dueDate !== "") {
      const todo = new Todo(title, description, dueDate, priority);
      addTodo(projectIndex, todo);
      document.getElementById("todo-form").reset();
    }
  };

  return {
    displayProjects,
    displayTodos,
    addProject,
    addTodo,
    handleProjectFormSubmit,
    handleTodoFormSubmit,
  };
})();

export default UI;
