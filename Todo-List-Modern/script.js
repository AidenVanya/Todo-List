// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".fiter-todos");

// alerts
const todoWarning = document.querySelector(".alert-warning");
const todoSuccess = document.querySelector(".alert-success");
const todoDelete = document.querySelector(".alert-delete");

// event
document.addEventListener("DOMContentLoaded", function () {
  getTodos();
});
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteItem);
todoFilter.addEventListener("click", filterTodo);

// functions
function addHtml() {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoList.appendChild(todoDiv);

  const completedButton = document.createElement("button");
  completedButton.classList.add("complete-btn");
  completedButton.innerHTML = "<i class='fas fa-check-circle'></i>";
  todoDiv.appendChild(completedButton);

  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerText = todoInput.value;
  todoDiv.appendChild(newTodo);

  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-btn");
  trashButton.innerHTML = "<i class='fas fa-minus-circle'></i>";
  todoDiv.appendChild(trashButton);

  todoInput.value = "";
  todoInput.focus();
}
function addTodo(e) {
  e.preventDefault();
  const isEmpty = (str) => !str.trim().length;

  if (isEmpty(todoInput.value)) {
    todoWarning.style.display = "block";
    setTimeout(() => {
      todoWarning.style.display = "none";
    }, 2000);
    todoInput.value = "";
    todoInput.focus();
  } else {
    todoSuccess.style.display = "block";
    setTimeout(() => {
      todoSuccess.style.display = "none";
    }, 2000);

    saveLocalTodos(todoInput.value);

    addHtml();
  }
}
function deleteItem(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalStorage(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
      todoDelete.style.display = "block";
      setTimeout(() => {
        todoDelete.style.display = "none";
      }, 1000);
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (item) {
    switch (e.target.value) {
      case "all":
        item.style.display = "flex";
        break;
      case "completed":
        if (item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
    }
  });
}

//! locale Storage
function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoList.appendChild(todoDiv);

    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn");
    completedButton.innerHTML = "<i class='fas fa-check-circle'></i>";
    todoDiv.appendChild(completedButton);

    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-btn");
    trashButton.innerHTML = "<i class='fas fa-minus-circle'></i>";
    todoDiv.appendChild(trashButton);
  });
}

function removeLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[1].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
