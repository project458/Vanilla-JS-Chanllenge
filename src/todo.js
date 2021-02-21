//import "./styles.css";

const pendingList = document.getElementById("js-pending"),
  finishedList = document.getElementById("js-finished"),
  form = document.getElementById("js-toDoform"),
  input = form.querySelector("input");

const PENDING = "PENDING";
const FINISEHED = "FINISHED";

let pendingTasks, finishedTasks;

function getTaskObject(text) {
  return {
    id: String(Date.now()),
    text,
  };
}

function savePendigTask(task) {
  pendingTasks.push(task);
}

function findInPending(taskId) {
  return pendingTasks.find(function (task) {
    return task.id === taskId;
  });
}

function findInFinished(taskId) {
  return finishedTasks.find(function (task) {
    return task.id === taskId;
  });
}

function removeFromPending(taskId) {
  pendingTasks = pendingTasks.filter(function (task) {
    return task.id !== taskId;
  });
}

function removeFromFinished(taskId) {
  finishedTasks = finishedTasks.filter(function (task) {
    return task.id !== taskId;
  });
}

function addToFinished(task) {
  finishedTasks.push(task);
}

function addToPending(task) {
  pendingTasks.push(task);
}

function deleteTask(event) {
  const li = event.target.parentNode;
  li.parentNode.removeChild(li);
  removeFromFinished(li.id);
  removeFromPending(li.id);
  saveState();
}

function handleFinishClick(event) {
  const li = event.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInPending(li.id);
  removeFromPending(li.id);
  addToFinished(task);
  paintfinishedTask(task);
  saveState();
}

function handleBackClick(event) {
  const li = event.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInFinished(li.id);
  removeFromFinished(li.id);
  addToPending(task);
  paintPendingTask(task);
  saveState();
}

function builedGenericLi(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");
  span.innerText = task.text;
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", deleteTask);
  li.append(span, deleteBtn);
  li.id = task.id;
  return li;
}

function paintPendingTask(task) {
  const genericLi = builedGenericLi(task);
  const completeBtn = document.createElement("button");
  completeBtn.innerText = "✅";
  completeBtn.addEventListener("click", handleFinishClick);
  genericLi.append(completeBtn);
  pendingList.append(genericLi);
}

function paintfinishedTask(task) {
  const genericLi = builedGenericLi(task);
  const backBtn = document.createElement("button");
  backBtn.innerText = "⏪";
  backBtn.addEventListener("click", handleBackClick);
  genericLi.append(backBtn);
  finishedList.append(genericLi);
}

function saveState() {
  localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
  localStorage.setItem(FINISEHED, JSON.stringify(finishedTasks));
}

function loadState() {
  pendingTasks = JSON.parse(localStorage.getItem(PENDING)) || [];
  finishedTasks = JSON.parse(localStorage.getItem(FINISEHED)) || [];
}

function restoreState() {
  pendingTasks.forEach(function (task) {
    paintPendingTask(task);
  });
  finishedTasks.forEach(function (task) {
    paintfinishedTask(task);
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  const taskObj = getTaskObject(input.value);
  input.value = "";
  paintPendingTask(taskObj);
  savePendigTask(taskObj);
  saveState();
}

function init() {
  form.addEventListener("submit", handleFormSubmit);
  loadState();
  restoreState();
}

init();
