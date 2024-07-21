import "./style.css";
import UI from "./components/UI";

document.addEventListener("DOMContentLoaded", () => {
  UI.displayProjects();

  const projectForm = document.getElementById("project-form");
  projectForm.addEventListener("submit", UI.handleProjectFormSubmit);

  const todoForm = document.getElementById("todo-form");
  todoForm.addEventListener("submit", UI.handleTodoFormSubmit);

  // Example usage:
  const defaultProjectIndex = 0;
  if (UI.projects.length === 0) {
    UI.addProject("Default Project");
  }
  UI.addTodo(
    defaultProjectIndex,
    new Todo("Example Todo", "Description", "2024-07-20", "High")
  );

  // Add event listeners for other interactions here
});
