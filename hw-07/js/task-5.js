function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const btn = document.querySelector(".change-color");
const colorSpan = document.querySelector(".color");
const bodyEl = document.body;

btn.addEventListener("click", changeBackgroundColor);

function changeBackgroundColor() {
  const randomColor = getRandomHexColor();

  bodyEl.style.backgroundColor = randomColor;
  colorSpan.textContent = randomColor;
}
