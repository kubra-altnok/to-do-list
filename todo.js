// elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();
function eventListeners() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
}

function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "silindi");
  }
}

function deleteTodoFromStorage(deletetodo) {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (todo === deletetodo) {
      todos.splice(index, 1);
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

// local storage ekleme
function loadAllTodosToUI() {
  let todos = getTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}
function addTodo(e) {
  const newTodo = todoInput.value.trim(); // başında yada sonunda boşluk varsa alıcak.
  if (newTodo === "") {
    //<div class="alet alert-danger" role="alert">
    // <strong>oh nap</strong> change
    // </div>
    // showAlert(type,message);
    showAlert("danger", "Lütfen bir todo girin"); // danger olduğu için kırmızı oldu
  } else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success", "eklendi");
  }

  e.preventDefault();
}
// bu fuction storage den bütün todo'ları almış olacak
function getTodosFromStorage() {
  let todos; // todos elementi ekledik fonksiyonun içine locale ekleyebilmek için
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    // todos = localStorage.getItem("todos") // bu şekilde yazarsak string olarak gelir o yüzden bizim bunu array'e çevirmemiz gerekiyor.
    todos = JSON.parse(localStorage.getItem("todos")); // bu şekilde array e çevirmiş olduk
  }
  return todos;
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo); // newTodo yu eklemiş olduk todos a
  // artık burdaki değerimizi güncellememiz gerekiyor. aşağıdaki gibi yaparak;
  localStorage.setItem("todos", JSON.stringify(todos)); //arraylerimizi stringe çevirmek için JSONi.stringify kullanırız.
}

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alet alert-${type}`;
  alert.textContent = message;
  firstCardBody.appendChild(alert);

  // setTimeout

  setTimeout(function () {
    alert.remove();
  }, 1000);
}

function addTodoToUI(newTodo) {
  // string değerini list item olarak UI'ya(ara yüze) ekleyecek.

  // List Item oluşturma
  const listItem = document.createElement("li");
  // link oluşturma
  const link = document.createElement("a");

  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = `<i class = "fa fa-remove"> </i>`;

  listItem.className = "list-group-item d-flex justify-content-between";

  // Text Node Ekleme

  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  // todo liste'e List  Item'
  todoList.appendChild(listItem);
  todoInput.value = ""; // ekledikten sonra input boş olsun diye koyduk.
}
