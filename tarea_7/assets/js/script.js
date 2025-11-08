
document.addEventListener('DOMContentLoaded', function() {
    
    // cargo los elementos del html
    const btnCargar = document.getElementById('btnCargarDatos');
    const contenedorDatos = document.getElementById('contenedorDatos');
    const RECURSO_JSON = 'assets/data/recurso.json'; // ruta del json

    // funcion para la carga de datos
    function actualizarUI(estado, data = null) {
        contenedorDatos.innerHTML = ''; // clean
        
        if (estado === 'loading') {
            // estado de carga
            contenedorDatos.innerHTML = '<p>Cargando datos... por favor, espere.</p>';
        
        } else if (estado === 'success' && data) {
            // estado de exito
            let htmlContent = `
                <h3>${data.titulo}</h3>
                <p>${data.descripcion}</p>
                <h4>Juegos Cargados:</h4>
                <ul class="data-list">
            `;

            // hago la lista de juegos
            data.juegos.forEach(juego => {
                htmlContent += `
                    <li>
                        <strong>${juego.nombre}</strong> (${juego.genero}) - Lanzado en ${juego.lanzamiento}
                    </li>
                `;
            });
            
            htmlContent += '</ul>';
            
            // pongo la lista en el contenedor
            contenedorDatos.innerHTML = htmlContent;

        } else if (estado === 'error') {
            // estado de error
            contenedorDatos.innerHTML = '<p class="error-msg">Error al cargar los datos. Verifique la ruta del archivo JSON.</p>';
        }
    }

    // lo del fetch
    function cargarDatos() {
        // mostrar el estado
        actualizarUI('loading');
        
        // fetch para obtener los datos
        fetch(RECURSO_JSON)
            // conversion a json
            .then(response => {
                // verifico si la respuesta es ok
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                return response.json();
            })
            // exito
            .then(data => {
                // actulizacion
                actualizarUI('success', data); 
            })
            // error
            .catch(error => {
                console.error("Fetch/Parse Error:", error);
                actualizarUI('error');
            });
    }

    // el click
    if (btnCargar) {
        btnCargar.addEventListener('click', cargarDatos);
    }
});
