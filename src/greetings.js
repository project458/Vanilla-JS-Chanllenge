const greetingForm = document.querySelector(".js-nameForm"),
  greetingInput = greetingForm.querySelector("input"),
  greeting = document.querySelector(".js-greetings"),
  greetingText = greeting.querySelector("h4");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function removeNameFn() {
  localStorage.removeItem(USER_LS);
}

function backClickFn(e) {
  const btn = e.target;
  btn.parentNode.removeChild(btn);
  greetingText.classList.remove(SHOWING_CN);
  removeNameFn();
  askForNameFn();
}

function paintGreetingFn(name) {
  const backBtn = document.createElement("button");
  const span = document.createElement("span");
  backBtn.innerText = "⏪";
  backBtn.addEventListener("click", backClickFn);
  span.appendChild(backBtn);
  greetingForm.classList.remove(SHOWING_CN);
  greetingText.classList.add(SHOWING_CN);
  greetingText.innerHTML = `환영합니다! ${name}\t님`;
  greetingText.appendChild(span);
}

function saveNameFn(name) {
  localStorage.setItem(USER_LS, name);
}

function onSubmitFn(e) {
  e.preventDefault();
  const currentValue = greetingInput.value;
  greetingInput.value = "";
  paintGreetingFn(currentValue);
  saveNameFn(currentValue);
}

function askForNameFn() {
  greetingForm.classList.add(SHOWING_CN);
  greetingForm.addEventListener("submit", onSubmitFn);
}

function loadNameFn() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForNameFn();
  } else {
    paintGreetingFn(currentUser);
  }
}

function init() {
  loadNameFn();
}

init();
