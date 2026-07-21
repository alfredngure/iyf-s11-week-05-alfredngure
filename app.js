// DOM Elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// State
let todos = [];
let currentFilter = "all";

// Rendering Logic
function renderTodos() {
  todoList.innerHTML = "";

  const filteredTodos = todos.filter((todo) => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.dataset.id = todo.id;
    if (todo.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.className = "todo-text";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.className = "delete-btn";

    li.append(span, deleteBtn);
    todoList.appendChild(li);
  });

  updateStats();
}

// Action Handlers
function addTodo(text) {
  if (!text.trim()) return;
  todos.push({
    id: Date.now(),
    text: text.trim(),
    completed: false
  });
  input.value = "";
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

function updateStats() {
  const activeCount = todos.filter((todo) => !todo.completed).length;
  itemsLeft.textContent = `${activeCount} item${activeCount === 1 ? "" : "s"} left`;
}

// Event Listeners
form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTodo(input.value);
});

todoList.addEventListener("click", (event) => {
  const li = event.target.closest("li");
  if (!li) return;
  const id = Number(li.dataset.id);

  if (event.target.classList.contains("delete-btn")) {
    deleteTodo(id);
  } else {
    toggleTodo(id);
  }
});

// Editing Bonus
todoList.addEventListener("dblclick", (event) => {
  if (!event.target.classList.contains("todo-text")) return;
  const li = event.target.closest("li");
  const id = Number(li.dataset.id);
  const todo = todos.find((t) => t.id === id);

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = todo.text;
  li.innerHTML = "";
  li.appendChild(editInput);
  editInput.focus();

  const save = () => {
    if (editInput.value.trim()) {
      todo.text = editInput.value.trim();
    }
    renderTodos();
  };

  editInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") save();
    if (e.key === "Escape") renderTodos();
  });
  editInput.addEventListener("blur", save);
});

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((f) => f.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTodos();
  });
});

clearCompletedBtn.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.completed);
  renderTodos();
});

// Initial Render
renderTodos();
