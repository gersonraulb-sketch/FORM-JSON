const form = document.getElementById('formulario');
const desc = document.getElementById('descripcion');
const contador = document.getElementById('contador');
const enviar = document.getElementById('enviarbtn');
const borrar = document.getElementById('borrarbtn');

desc.addEventListener('input', () => {
    contador.textContent = desc.value.length;
});

borrar.addEventListener('click', () => {
    form.reset();
    contador.textContent = '0';

    document.querySelectorAll('.error').forEach(e => e.textContent = '');
});


function validarYDescargar(event) {
    event.preventDefault(); 

    let valido = true;

    document.querySelectorAll('.error').forEach(e => (e.textContent = ''));

    if (document.getElementById('nombre').value.trim() === '') {
        document.getElementById('error-nombre').textContent = 'El nombre es obligatorio.';
        valido = false;
    }

    if (document.getElementById('apellido').value.trim() === '') {
        document.getElementById('error-apellido').textContent = 'El apellido es obligatorio.';
        valido = false;
    }

    const email = document.getElementById('email').value.trim();
    if (email === '' || !email.includes('@')) {
        document.getElementById('error-email').textContent = 'Ingrese un correo válido.';
        valido = false;
    }

    const edad = document.getElementById('edad').value;
    if (edad === '' || isNaN(edad) || edad < 1 || edad > 120) {
        document.getElementById('error-edad').textContent = 'Ingrese una edad válida.';
        valido = false;
    }

    if (document.getElementById('nacimiento').value === '') {
        document.getElementById('error-nacimiento').textContent = 'La fecha de nacimiento es obligatoria.';
        valido = false;
    }

    if (document.getElementById('genero').value === '') {
        document.getElementById('error-genero').textContent = 'Seleccione un género.';
        valido = false;
    }

    if (document.getElementById('pais').value.trim() === '') {
        document.getElementById('error-pais').textContent = 'El país es obligatorio.';
        valido = false;
    }

    if (document.getElementById('descripcion').value === '') {
        document.getElementById('error-desc').textContent = 'Debe agregar una descripción.';
        valido = false;
    }

    if (document.getElementById('terminos').checked === false) {
        document.getElementById('error-terminos').textContent = 'Debe aceptar los términos y condiciones.';
        valido = false;
    }

    if (valido === true) {
        const datos = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            email: document.getElementById('email').value,
            edad: document.getElementById('edad').value,
            fecha_nacimiento: document.getElementById('nacimiento').value,
            genero: document.getElementById('genero').value,
            pais: document.getElementById('pais').value,
            descripcion: document.getElementById('descripcion').value
        };

        const blob = new Blob([JSON.stringify(datos, null, 2)], {
            type: 'application/json'
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "datos_formulario.json";
        a.click();
        URL.revokeObjectURL(url);

        alert('Su información se ha enviado correctamente');
    }
}

enviar.addEventListener('click', validarYDescargar);

