// Get references to differnt items
const inputText = document.querySelector("#input");
const addButton = document.querySelector("#add-button");
const filterText = document.querySelector("#filter");
const collectionItems = document.querySelector(".collection");
const clearAll = document.querySelector("#clear-all");

// Event handlers
// Triggered when input is added and add button clicked
addButton.addEventListener("click", addTask);
// Listen to x clicked on li items
collectionItems.addEventListener("click", deleteTask);
// clearAll tasks
clearAll.addEventListener("click", clearAllTasks);
// filter function
filterText.addEventListener("keyup", filterTasks);
// Run when the DOM content loads to retrieve all tasks from the LS
document.addEventListener("DOMContentLoaded", loadAllTasksFromLS);

// Load all tasks from LS initially
function loadAllTasksFromLS() {
  //   Check if tasks are present in LS
  let tasks = localStorage.getItem("tasks");
  if (!tasks) {
    return;
  }
  let tasksArr = JSON.parse(localStorage.getItem("tasks"));

  tasksArr.forEach((item) => createItem(item));
}

// Create li dynamically given the input value
function createItem(taskInput) {
  /*  create a <li class="collection-item">{taskInput} <a class="secondary-content delete-item" href="#>x</a> </li> */
  const li = document.createElement("li");
  li.classList.add("collection-item");
  li.appendChild(document.createTextNode(taskInput));
  //   create a tag to append to li item
  const a = document.createElement("a");
  a.classList.add("delete-item", "secondary-content");
  a.setAttribute("href", "#");
  a.setAttribute("cursor", "pointer");
  a.appendChild(document.createTextNode("x"));
  li.appendChild(a);

  //   add this created li item to collection of ul
  collectionItems.appendChild(li);
}

// Store tasks in Local Storage
function addToLocalStorage(task) {
  // Retrieve if tasks already present
  let taskArr = [];
  let tasks = localStorage.getItem("tasks");
  if (tasks) {
    taskArr = JSON.parse(tasks);
    taskArr.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskArr));
  } else {
    //   else create new array and push them
    taskArr.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskArr));
  }
}

// Delete from Local Storage
function deleteFromLocalStorage(ele) {
  //   get all tasks from LS
  let taskArr = JSON.parse(localStorage.getItem("tasks"));
  let deletedTask = ele.textContent;
  //   remove the last x attached to task name since 'x' is used for delete
  deletedTask = deletedTask.slice(0, deletedTask.length - 1);
  let index;
  taskArr.forEach((item, i) => {
    if (item == deletedTask) index = i;
  });
  //   remove 1 element from the LS array
  taskArr.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(taskArr));
}

// Clear full Local Storage
function clearLS() {
  localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
  const filterInput = e.target.value.toLowerCase();
  //   collect all the list items and check if the enterd text is present or not
  const lis = Array.from(collectionItems.children);
  lis.forEach((item) => {
    if (item.textContent.toLowerCase().indexOf(filterInput) !== -1) {
      // Not found
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Clear all tasks
function clearAllTasks() {
  collectionItems.innerHTML = "";

  clearLS();
}

// Delete task
function deleteTask(e) {
  // Listen to events only on 'x' on <a> tag
  if (e.target.classList.contains("delete-item")) {
    //   delete from LS as well
    deleteFromLocalStorage(e.target.parentElement);
    // remove the parent element as <a> inside <li>
    e.target.parentElement.remove();
  }
}

// Add tasks
function addTask() {
  const taskInput = inputText.value;

  //   check if empty string passed
  if (taskInput === "") {
    alert("Please enter some task.");
    return;
  }

  createItem(taskInput);

  // Add to Local Storage
  addToLocalStorage(taskInput);

  //   clear input
  inputText.value = "";
}
