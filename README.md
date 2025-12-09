# Todo List App — React Training Project

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge\&logo=vite\&logoColor=FFD62E)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)

A responsive and polished Todo List application built as part of my React practice and skill refresh.

[Live Demo](https://your-demo-url.com) •
[Report Bug](https://github.com/yourusername/todo-app/issues) •
[Request Feature](https://github.com/yourusername/todo-app/issues/new?template=feature_request.md)

</div>

---

## About the Project

This app was built to sharpen my React understanding and practice modern UI patterns. I focused on clean components, simple state management, and a smooth user experience. The app supports dark/light mode, looks great on all screen sizes, and includes essential task-management features.

---

## Features

* Add, delete, and complete tasks
* Dark and light mode with saved user preference
* Fully responsive layout
* Navy blue themed UI with soft gradients
* Real-time interactions with no lag
* Completion counter in the footer
* Efficient state handling and fast rendering
* Unfinished tasks automatically appear first

---

## Getting Started

### Requirements

* Node.js 18+
* npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
npm install
npm run dev
```

Open your browser at `http://localhost:5173`.

### Build

```bash
npm run build
```

The production build will be available in the `dist/` folder.

---

## Tech Stack

* React 19.2.0
* Vite
* CSS Modules
* Modern JavaScript (ES6+)
* Local Storage for theme persistence
* Responsive layout using Grid and Flexbox

---

## Folder Structure

```
todo-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Form.jsx
│   │   ├── Header.jsx
│   │   ├── TodoItem.jsx
│   │   ├── TodoList.jsx
│   │   ├── Footer.jsx
│   │   └── ThemeToggle.jsx
│   ├── styles/
│   │   ├── App.css
│   │   └── *.module.css
│   ├── App.jsx
│   ├── main.jsx
│   └── Todo.jsx
├── vite.config.js
└── package.json
```

---

## Design Notes

* Functional components using React hooks
* Reusable, focused components
* Mobile-first CSS with scalable typography
* Semantic markup and keyboard-friendly interactions
* Light bundle and optimized re-renders

---

## How It Works

### State Handling

* Local state via `useState`
* Simple parent–child data flow
* Clean array operations for all task updates

### Theme System

* Theme switching based on CSS variables
* Saves user preference automatically
* Smooth transitions on toggle

### Responsiveness

* Scales well across phone, tablet, and desktop
* Uses `clamp()` for typography
* Breakpoints for tablet (768px) and mobile (480px)

---

## Using the App

**Add a task:** Type and hit Enter or click “Add”.
**Complete a task:** Click the task text.
**Delete a task:** Click the “x”.
**Switch theme:** Use the toggle in the header.

![Light Mode](./assets/screenshot-light.png)
![Dark Mode](./assets/screenshot-dark.png)

---

## What I Learned

* Building UI with reusable components
* Managing state without external libraries
* Modern CSS features (variables, gradients, transitions)
* Creating responsive layouts
* Improving app performance
* Testing layouts across browsers

---

## Future Ideas

* Drag and drop for task ordering
* Categories or tags
* Reminder and due-date system
* Search and filters
* Backend storage (API)
* User accounts
* Unit tests and integration tests

---

## Contributing

Suggestions are welcome.

1. Fork the repo
2. Create a new branch
3. Commit your changes
4. Push the branch
5. Open a pull request

---

## License

This project is under the MIT License.

---

<h2>Contact</h2>
<p><strong>Abdiweli Jama</strong></p>
<p>
  <a href="https://www.linkedin.com/in/abdiweli-jamac-60ab44207" target="_blank">
    LinkedIn Profile
  </a>
  <br>
  Email: <a href="mailto:abdiwelijamac@gmail.com">abdiwelijamac@gmail.com</a>
</p>

<p>
  <strong>Project Repository:</strong><br>
  <a href="https://github.com/developer-abdiweli-jama/TodoApp-2" target="_blank">
    github.com/developer-abdiweli-jama/TodoApp-2
  </a>
</p>


---

<div align="center" style="margin-top: 20px;">
  <p>⭐ If this project was useful, consider giving it a star.</p>
  <p>Built with ❤️ as a learning project.</p>
</div>

