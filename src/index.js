import "./style.css";
import UI from "./components/UI";

document.addEventListener("DOMContentLoaded", () => {
  UI.displayProjects();

  // Example usage:
  const defaultProjectIndex = 0;
  UI.addProject("Default Project");
  UI.addTodo(
    defaultProjectIndex,
    new Todo("Example Todo", "Description", "2024-07-20", "High")
  );
});
