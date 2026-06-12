// Select DOM Elements
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const taskCount = document.getElementById("task-count");

// Load saved todos
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

// Save todos
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Update task count
function updateTaskCount() {
    const count = todos.length;

    taskCount.textContent =
        count === 1
            ? "1 Task"
            : `${count} Tasks`;
}

// Create a todo item
function createTodoNode(todo, index) {

    const li = document.createElement("li");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    // Todo text
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;

    if (todo.completed) {
        textSpan.style.textDecoration = "line-through";
    }

    // Complete task
    checkbox.addEventListener("change", () => {

        todo.completed = checkbox.checked;

        textSpan.style.textDecoration =
            todo.completed
                ? "line-through"
                : "";

        saveTodos();
    });

    // Edit task on double click
    textSpan.addEventListener("dblclick", () => {

        const newText = prompt("Edit Todo", todo.text);

        if (newText !== null && newText.trim() !== "") {

            todo.text = newText.trim();

            textSpan.textContent = todo.text;

            saveTodos();
        }
    });

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";

    delBtn.addEventListener("click", () => {

        todos.splice(index, 1);

        render();

        saveTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);

    return li;
}

// Render all todos
function render() {

    list.innerHTML = "";

    todos.forEach((todo, index) => {

        const node = createTodoNode(todo, index);

        list.appendChild(node);
    });

    updateTaskCount();
}

// Add new todo
function addTodo() {

    const text = input.value.trim();

    if (!text) {
        return;
    }

    todos.push({
        text: text,
        completed: false
    });

    input.value = "";

    render();

    saveTodos();
}

// Add button click
addBtn.addEventListener("click", addTodo);

// Enter key support
input.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        addTodo();
    }
});

// Initial render
render();
