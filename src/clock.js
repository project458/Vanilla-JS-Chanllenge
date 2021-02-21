const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h2");

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const miniuets = date.getMinutes();
  const seconds = date.getSeconds();
  const hoursText = `${hours < 9 ? `0${hours}` : hours}`;
  const miniutesText = `${miniuets < 9 ? `0${miniuets}` : miniuets}`;
  const secondsText = `${seconds < 9 ? `0${seconds}` : seconds}`;

  clockTitle.innerHTML = `${hoursText}:${miniutesText}:${secondsText}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
