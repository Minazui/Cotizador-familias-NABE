const software = document.getElementById("software");
const parametrica = document.getElementById("parametrica");
const tipos = document.getElementById("tipos");
let historial = [];
let totalGeneral = 0; 


software.addEventListener("change", () => {
  if (software.value === "externo") {
    parametrica.value = "no";
    tipos.value = "No";

    parametrica.disabled = true;
    tipos.disabled = true;
  } else {
    parametrica.disabled = false;
    tipos.disabled = false;
  }

  calcularTotal();
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
  const resultado = calcularTotal();

  historial.push({
    entidad: document.querySelector("input[name='identificador']").value,
    horasUnidad: resultado.horasUnidad,
    horasTotales: resultado.totalHoras,
    total: resultado.total
  });

  totalGeneral += resultado.total;
  actualizarHistorial();

  // Ocultar formulario
  document.getElementById("cotizadorForm").style.display = "none";

  document.getElementById("postEnvio").scrollIntoView({
  behavior: "smooth"
  });


  // Mostrar opciones post envío
  document.getElementById("postEnvio").style.display = "block";
  this.reset();
  parametrica.disabled = false;
  tipos.disabled = false;

})

  .catch(err => {
  console.warn("Advertencia de fetch:", err);
  });
});

const VALOR_HORA = 54000;

const totalInput = document.getElementById("totalCotizacion");

const campos = document.querySelectorAll(
  "#software, #parametrica, #lod, select[name='simbolo2d'], select[name='mep'], #tipos, input[name='cantidad']"
);

campos.forEach(campo => {
  campo.addEventListener("change", calcularTotal);
});

let totalHoras = 0;
let total = 0;


function calcularTotal() {
  let horasUnidad = 2; // base fija

  const softwareVal = software.value;
  const parametricaVal = parametrica.value;
  const lodVal = document.querySelector("select[name='lod']").value;
  const simbolo2d = document.querySelector("select[name='simbolo2d']").value;
  const mepVal = document.querySelector("select[name='mep']").value;
  const tiposVal = tipos.value;
  const cantidad = parseInt(
    document.querySelector("input[name='cantidad']").value
  ) || 1;

  // Software
  if (softwareVal === "nativo") horasUnidad += 2;
  if (softwareVal === "externo") horasUnidad += 4;

  // Paramétrica
  if (parametricaVal === "no") horasUnidad += 0;
  if (parametricaVal === "basica") horasUnidad += 2;
  if (parametricaVal === "compleja") horasUnidad += 5;

  // LOD
  if (lodVal === "LOD 100") horasUnidad += 1;
  if (lodVal === "LOD 200") horasUnidad += 2;
  if (lodVal === "LOD 300") horasUnidad += 3;
  if (lodVal === "LOD 400") horasUnidad += 4;

  // Extras
  if (simbolo2d === "Sí") horasUnidad += 2;
  if (simbolo2d === "No") horasUnidad += 0;
  if (mepVal === "Sí") horasUnidad += 2;
  if (mepVal === "No") horasUnidad += 0;
  if (tiposVal === "Sí") horasUnidad += 2;
  if (tiposVal === "No") horasUnidad += 0;

  totalHoras = horasUnidad * cantidad;
  total = totalHoras * VALOR_HORA;

  totalInput.value = `$ ${total.toLocaleString("es-CO")}`;

  return { horasUnidad, totalHoras, total };
}

document.getElementById("otraEntidad").addEventListener("click", () => {
  document.getElementById("postEnvio").style.display = "none";
  document.getElementById("cotizadorForm").style.display = "block";
});

document.getElementById("finalizar").addEventListener("click", () => {
  document.getElementById("postEnvio").style.display = "none";
  document.getElementById("mensajeFinal").style.display = "block";
});

function actualizarHistorial() {
  const lista = document.getElementById("listaHistorial");
  const totalAcum = document.getElementById("totalAcumulado");
  
  lista.innerHTML = "";

  historial.forEach(item => {
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${item.entidad}</strong><br>
      Horas por unidad: ${item.horasUnidad}<br>
      Horas totales: ${item.horasTotales}<br>
      $ ${item.total.toLocaleString("es-CO")}
    `;

    lista.appendChild(li);
  });

  totalAcum.textContent = `$ ${totalGeneral.toLocaleString("es-CO")}`;
}




//ID de IMPLEMENTACION



