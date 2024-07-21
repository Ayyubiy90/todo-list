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
      todoContainer.appendChild(todoElement);
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

  return {
    displayProjects,
    displayTodos,
    addProject,
    addTodo,
  };
})();

export default UI;
