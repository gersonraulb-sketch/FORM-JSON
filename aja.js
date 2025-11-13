// ====== VARIABLES ======
const form = document.getElementById("formulario");
const desc = document.getElementById("descripcion");
const enviar = document.getElementById("enviarbtn");
const borrar = document.getElementById("borrarbtn");
const contador = document.getElementById("contador");
const barra = document.getElementById("barra");

const campos = [
  "nombre",
  "apellido",
  "email",
  "edad",
  "nacimiento",
  "genero",
  "pais",
  "descripcion",
  "terminos",
];

// ====== VALIDAR Y DESCARGAR ======
function validarYDescargar(event) {
  event.preventDefault();

  let valido = true;
  document.querySelectorAll(".error").forEach((e) => (e.textContent = ""));

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const email = document.getElementById("email").value.trim();
  const edadValue = document.getElementById("edad").value.trim();
  const edad = edadValue === "" ? "" : Number(edadValue);
  const nacimiento = document.getElementById("nacimiento").value.trim();
  const genero = document.getElementById("genero").value;
  const pais = document.getElementById("pais").value.trim();
  const descripcionText = document.getElementById("descripcion").value.trim();
  const terminos = document.getElementById("terminos").checked;

  // ====== VALIDACIONES ======
  if (nombre === "") {
    document.getElementById("error-nombre").textContent =
      "El nombre es obligatorio.";
    valido = false;
  }

  if (apellido === "") {
    document.getElementById("error-apellido").textContent =
      "El apellido es obligatorio.";
    valido = false;
  }

  if (email === "" || !email.includes("@")) {
    document.getElementById("error-email").textContent =
      "Ingrese un correo válido.";
    valido = false;
  }

  if (edad === "" || isNaN(edad) || edad < 1 || edad > 120) {
    document.getElementById("error-edad").textContent =
      "Ingrese una edad válida.";
    valido = false;
  }

  if (nacimiento === "") {
    document.getElementById("error-nacimiento").textContent =
      "La fecha de nacimiento es obligatoria.";
    valido = false;
  }

  if (genero === "") {
    document.getElementById("error-genero").textContent =
      "Seleccione un género.";
    valido = false;
  }

  if (pais === "") {
    document.getElementById("error-pais").textContent =
      "El país es obligatorio.";
    valido = false;
  }

  if (descripcionText === "") {
    document.getElementById("error-descripcion").textContent =
      "Debe agregar una descripción.";
    valido = false;
  }

  if (!terminos) {
    document.getElementById("error-terminos").textContent =
      "Debe aceptar los términos y condiciones.";
    valido = false;
  }

  // ====== SI ES VÁLIDO ======
  if (valido) {
    const datos = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      edad: edad,
      fecha_nacimiento: nacimiento,
      genero: genero,
      pais: pais,
      descripcion: descripcionText,
    };

    alert("Su información se ha enviado correctamente");

    const blob = new Blob([JSON.stringify(datos, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "datos_formulario.json";
    a.click();
    URL.revokeObjectURL(url);
  }
}

// ====== ACTUALIZAR PROGRESO ======
function actualizarProgreso() {
  let completados = 0;
  const total = campos.length - 1; // sin "terminos"

  campos.forEach((id) => {
    const campo = document.getElementById(id);
    if (campo && campo.type !== "checkbox") {
      if (campo.value && campo.value.trim() !== "") {
        completados++;
      }
    }
  });

  const porcentaje = Math.round((completados / total) * 100);
  if (barra) {
    barra.style.width = porcentaje + "%";
  }
}

desc.addEventListener("input", () => {
  contador.textContent = desc.value.length;
  actualizarProgreso();
});

campos.forEach((id) => {
  const campo = document.getElementById(id);
  if (campo) {
    campo.addEventListener("input", actualizarProgreso);
    campo.addEventListener("change", actualizarProgreso);
  }
});

enviar.addEventListener("click", validarYDescargar);

form.addEventListener("reset", () => {
  setTimeout(() => {
    if (contador) contador.textContent = "0";
    if (barra) barra.style.width = "0%";
    document.querySelectorAll(".error").forEach((e) => (e.textContent = ""));
  }, 10);
});
