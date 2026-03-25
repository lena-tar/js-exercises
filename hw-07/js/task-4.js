const form = document.querySelector(".login-form");
form.addEventListener("submit", subClick);

function subClick(event) {
  event.preventDefault();

  const elements = event.currentTarget.elements;

  const emailValue = elements.email.value.trim();
  const passwordValue = elements.password.value.trim();

  if (emailValue === "" || passwordValue === "") {
    alert("All form fields must be filled in");
    return;
  }

  console.log({
    email: emailValue,
    password: passwordValue,
  });

  event.currentTarget.reset();
}
