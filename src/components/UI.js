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
        expandTodoDetails(todo);
      });
      todoContainer.appendChild(todoElement);
    });
  };

  const expandTodoDetails = (todo) => {
    // Function to expand and display todo details
    // Implement the UI for viewing/editing details
    console.log(todo);
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
