# Todo List

A simple and efficient todo list application to help you manage your tasks and projects.

## Features

- Add, edit, and delete todos
- Organize todos into projects
- Mark todos as complete
- View and filter todos by project
- Save todos using localStorage for persistence

## Getting Started

### Prerequisites

- Node.js and npm installed on your local machine

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ayyubiy90/todo-list.git
   ```

2. Navigate into the project directory:
   ```bash
   cd todo-list
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start Webpack in development mode:
   ```bash
   npx webpack --watch
   ```

2. Open `dist/index.html` in your browser to see the application.

## Project Structure

```
todo-list/
├── dist/
│   ├── index.html
│   ├── main.js
├── src/
│   ├── components/
│   │   ├── Todo.js
│   │   ├── Project.js
│   │   ├── TodoList.js
│   │   ├── ProjectList.js
│   │   ├── Storage.js
│   │   ├── UI.js
│   ├── index.js
│   ├── style.css
├── .gitignore
├── webpack.config.js
├── package-lock.json
├── package.json
├── README.md
```

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.