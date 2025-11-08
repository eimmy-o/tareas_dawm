
document.addEventListener('DOMContentLoaded', function() {

    const DOMElements = {
        // calculadora
        num1: document.getElementById('num1'),
        num2: document.getElementById('num2'),
        resultadoCalculadora: document.getElementById('resultadoCalculadora'),
        mensajeCalculadora: document.getElementById('mensajeCalculadora'),
        
        // form
        registroForm: document.getElementById('registroForm'), // querySelector para el submit
        nombre: document.getElementById('nombre'),
        correo: document.getElementById('correo'),
        contrasena: document.getElementById('contrasena'),
        fechaNacimiento: document.getElementById('fechaNacimiento'),
        errorNombre: document.getElementById('errorNombre'),
        errorCorreo: document.getElementById('errorCorreo'),
        errorContrasena: document.getElementById('errorContrasena'),
        mensajeGlobal: document.getElementById('mensajeGlobal'),

        // Fechas
        diasDiferencia: document.getElementById('diasDiferencia')
    };

    // funcion para mostrar los mensajes en el form 
    function mostrarMensaje(elemento, mensaje, tipo = 'error') {
        // textContent para seguridad 
        elemento.textContent = mensaje; 
        
        // manejo de los mensajes de exito y error
        if (tipo === 'success') {
            elemento.classList.add('success-msg');
            elemento.classList.remove('error-msg');
        } else {
            elemento.classList.add('error-msg');
            elemento.classList.remove('success-msg');
        }
    }


    // funcion de las operación aritmética con validaciones
    function realizarOperacion(a, b, operacion) {
        // validación: Campos vacíos
        if (isNaN(a) || isNaN(b)) {
            return "Error: Ingrese ambos números.";
        }

        switch (operacion) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': 
                // validación: No dividir entre cero 
                if (b === 0) {
                    return "Error: No se puede dividir por cero.";
                }
                return a / b;
            default: return "Error: Operación no válida.";
        }
    }

    // funcion para calcular los días segun la fecha de nacimiento
    function calcularDiferenciaDias(fechaNacimientoStr) {
        if (!fechaNacimientoStr) {
            return "Fecha no ingresada.";
        }

        // date y getTime para calcular la diferencia
        const fechaNacimiento = new Date(fechaNacimientoStr);
        const hoy = new Date();

        // diferencia en milisegundos
        const diferenciaTiempo = hoy.getTime() - fechaNacimiento.getTime();

        // conversion a días
        const msPorDia = 1000 * 60 * 60 * 24;
        const dias = Math.floor(diferenciaTiempo / msPorDia);

        return dias >= 0 ? dias : "Fecha futura no válida.";
    }


    // funcion para validar los campos del formulario
    function validarCampo(campoId, valor) {
        // campo vacío 
        if (valor.trim() === '') {
            return "Este campo no puede estar vacío.";
        }

        switch (campoId) {
            case 'nombre':
                // longitud mínima 
                if (valor.length < 3) {
                    return "El nombre debe tener al menos 3 caracteres.";
                }
                break;
            case 'correo':
                // formato de correo 
                // sacado de internet: Patrón Regex simple para formato 'user@domain.ext'
                const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
                if (!regexCorreo.test(valor)) {
                    return "El formato del correo electrónico no es válido.";
                }
                break;
            case 'contrasena':
                // longitud mínima 
                if (valor.length < 6) {
                    return "La contraseña debe tener al menos 6 caracteres.";
                }
                break;
        }
        return ""; // sin errores
    }

    // funcion para enviar los datos del formulario
    function validarFormulario(event) {
        event.preventDefault(); // sin recarga de página
        
        let formularioValido = true;
        
        // limpiar mensajes globales y de fecha
        mostrarMensaje(DOMElements.mensajeGlobal, "", 'success');
        DOMElements.diasDiferencia.textContent = "--";

        // validar y actualizar para nombre
        const errorNombre = validarCampo('nombre', DOMElements.nombre.value);
        mostrarMensaje(DOMElements.errorNombre, errorNombre);
        if (errorNombre) formularioValido = false;

        // validar y actualizar para correo
        const errorCorreo = validarCampo('correo', DOMElements.correo.value);
        mostrarMensaje(DOMElements.errorCorreo, errorCorreo);
        if (errorCorreo) formularioValido = false;
        
        // validar y actualizar para contraseña
        const errorContrasena = validarCampo('contrasena', DOMElements.contrasena.value);
        mostrarMensaje(DOMElements.errorContrasena, errorContrasena);
        if (errorContrasena) formularioValido = false;
        
        if (formularioValido) {
            // exito general
            mostrarMensaje(DOMElements.mensajeGlobal, "¡Registro Exitoso!", 'success');
            
            // fechas
            const diasVividos = calcularDiferenciaDias(DOMElements.fechaNacimiento.value);
            
            if (typeof diasVividos === 'number') {
                DOMElements.diasDiferencia.textContent = diasVividos.toLocaleString();
            } else {
                DOMElements.diasDiferencia.textContent = "Error de Fecha: " + diasVividos;
            }

        } else {
            // error general
            mostrarMensaje(DOMElements.mensajeGlobal, "Por favor, corrija los errores en el formulario.");
        }
    }

    // eventos click para la calculadora
    document.getElementById('btnSumar').addEventListener('click', () => manejarCalculadora('+'));
    document.getElementById('btnRestar').addEventListener('click', () => manejarCalculadora('-'));
    document.getElementById('btnMultiplicar').addEventListener('click', () => manejarCalculadora('*'));
    document.getElementById('btnDividir').addEventListener('click', () => manejarCalculadora('/'));

    // funcion de la calculadora
    function manejarCalculadora(operacion) {
        const num1 = parseFloat(DOMElements.num1.value);
        const num2 = parseFloat(DOMElements.num2.value);
        
        // operacion
        const resultado = realizarOperacion(num1, num2, operacion);

        // placeholder
        if (typeof resultado === 'string') {
            mostrarMensaje(DOMElements.mensajeCalculadora, resultado);
            DOMElements.resultadoCalculadora.textContent = "---";
        } else {
            mostrarMensaje(DOMElements.mensajeCalculadora, ""); // error
            DOMElements.resultadoCalculadora.textContent = resultado.toFixed(2);
        }
    }

    // eventos click para la calculadora
    DOMElements.registroForm.addEventListener('submit', validarFormulario);

    // validaciones del keyup
    DOMElements.nombre.addEventListener('keyup', () => {
        mostrarMensaje(DOMElements.errorNombre, validarCampo('nombre', DOMElements.nombre.value));
    });
    DOMElements.correo.addEventListener('keyup', () => {
        mostrarMensaje(DOMElements.errorCorreo, validarCampo('correo', DOMElements.correo.value));
    });
    DOMElements.contrasena.addEventListener('keyup', () => {
        mostrarMensaje(DOMElements.errorContrasena, validarCampo('contrasena', DOMElements.contrasena.value));
    });

});