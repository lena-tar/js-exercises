const formIn = document.querySelector("#name-input");
const nameOut = document.querySelector("#name-output");
formIn.addEventListener("input", helloName);
function helloName() {
  const textValue = (nameOut.textContent = formIn.value.trim());
  if (textValue === "") {
    nameOut.textContent = "Anonymous";
  } else {
    nameOut.textContent = textValue;
  }
}
