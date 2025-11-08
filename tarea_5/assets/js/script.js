
document.addEventListener('DOMContentLoaded', function() {

    const listaRecomendaciones = [
        "One Piece", 
        "Haikyuu", 
        "Demon Slayer", 
        "Kamisama Kiss", 
        "Run with the Wind",
        "My Hero Academia",
        "Fruits Basket",
        "Attack on Titan",
        "Jujutsu Kaisen",
        "Free!",
        "Ouran High School Host Club",
        "Yowamushi Pedal",
        "Gakuen Babysitters"
    ];
    
    const animesPorCategoria = {
        shonen: ["One Piece", "My Hero Academia", "One Punch Man", "Demon Slayer"],
        spokon: ["Haikyuu", "Kuroko no Basket", "Yowamushi Pedal", "Diamond no Ace"],
        shojo: ["Kamisama Kiss", "Fruits Basket", "Ouran High School Host Club", "Kimi ni Todoke"],
        select: ["Selecciona una categoría válida."]
    };
    
    // Selectores por ID 
    const parrafoRecomendacion = document.getElementById('parrafo-interactivo');
    const contenedorColor = document.getElementById('contenedor-color');
    const selectCategoria = document.querySelector('#whatched select'); 
    const listaContenedor = document.querySelector('#lista-animes ul'); 
    const inputTeclado = document.getElementById('input-teclado');
    const outputTeclado = document.getElementById('output-teclado');

    // Selectores por Clase
    const botonesAccion = document.querySelectorAll('.btn-accion');

    // Selector por Etiqueta 
    const todasLasSecciones = document.getElementsByTagName('section'); 
    console.log('Selectores por Etiqueta (Sections):', todasLasSecciones); 

    //funcion copiada del internet :)
    function generarColorAleatorio() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

    //funciones para la tarea
    function mostrarNuevaRecomendacion() {
        const indiceAleatorio = Math.floor(Math.random() * listaRecomendaciones.length);
        parrafoRecomendacion.textContent = listaRecomendaciones[indiceAleatorio];
    }

    function cambiarColorRandom() {
        contenedorColor.style.backgroundColor = generarColorAleatorio();
    }

    // Asignar el evento a cada botón usando su posición en el array de botones
    if (botonesAccion.length >= 2) {
        // Botón 1 (Recomendación)
        botonesAccion[0].addEventListener('click', mostrarNuevaRecomendacion);
        
        // Botón 2 (Color)
        botonesAccion[1].addEventListener('click', cambiarColorRandom);

    }

    function cargarAnimesPorCategoria() {
        const categoriaSeleccionada = selectCategoria.value; // Obtener el valor del <option>
        const animes = animesPorCategoria[categoriaSeleccionada] || animesPorCategoria['select'];

        // Limpiar la lista actual
        listaContenedor.innerHTML = ''; 

        // Rellenar la lista con nuevos <li>
        animes.forEach(anime => {
            const nuevoLi = document.createElement('li'); // Creación dinámica de elementos
            nuevoLi.textContent = `${anime}`;
            listaContenedor.appendChild(nuevoLi);
        });
    }

    // Agregar el evento 'change' al select para recargar la lista
    if (selectCategoria) {
        selectCategoria.addEventListener('change', cargarAnimesPorCategoria);
    }
    
    function manejarKeyup() {
        const textoEscrito = inputTeclado.value.toLowerCase();
        let resultado = "";

        // Replicar lo que escribe el usuario 
        resultado += `Escribiste: ${inputTeclado.value}`;
        
        // Simular autocompletado 
        if (textoEscrito.startsWith('one')) {
            resultado += ' | ¿Quizás buscas **One Piece**?';
        } else if (textoEscrito.startsWith('hai')) {
            resultado += ' | ¿Quizás buscas **Haikyuu**?';
        } else if (textoEscrito.startsWith('dem')) {
            resultado += ' | ¿Quizás buscas **Demon Slayer**?';
        } else {
            resultado += ' | Sigue escribiendo...';
        }

        // Mostrar el resultado en el control de salida 
        outputTeclado.innerHTML = resultado;
    }
    
    // Agregar el evento keyup al campo de texto
    if (inputTeclado) {
        inputTeclado.addEventListener('keyup', manejarKeyup);
    }
});