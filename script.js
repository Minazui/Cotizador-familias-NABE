const software = document.getElementById("software");
const parametrica = document.getElementById("parametrica");
const tipos = document.getElementById("tipos");

software.addEventListener("change", () => {
  if (software.value === "externo") {
    parametrica.value = 0;
    tipos.value = 0;

    parametrica.disabled = true;
    tipos.disabled = true;
  } else {
    parametrica.disabled = false;
    tipos.disabled = false;
  }
});

document.getElementById("cotizadorForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch("https://script.google.com/macros/s/AKfycbzzZNQp8E-T85c6wgtUPGr4cZrR8kVVAYIgkNw7M6Do0QOuqjfMDjbqWhGUXt1rqYelJQ/exec", {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(() => {
    alert("Cotización enviada correctamente.");
    this.reset();
  })
  .catch(() => {
    alert("Error al enviar. Intente nuevamente.");
  });
});

//AKfycbzzZNQp8E-T85c6wgtUPGr4cZrR8kVVAYIgkNw7M6Do0QOuqjfMDjbqWhGUXt1rqYelJQ
//ID de IMPLEMENTACION