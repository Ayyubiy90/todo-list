const saveToLocalStorage = (projects) => {
  localStorage.setItem("projects", JSON.stringify(projects));
};

const loadFromLocalStorage = () => {
  const projects = JSON.parse(localStorage.getItem("projects"));
  return projects ? projects : [];
};

export { saveToLocalStorage, loadFromLocalStorage };
