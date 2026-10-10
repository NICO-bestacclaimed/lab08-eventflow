const API_URL = 'http://127.0.0.1:8000/api/';

document.addEventListener('DOMContentLoaded', () => {
    cargarEspacios();
    cargarRecursos();

    document.getElementById('form-espacio').addEventListener('submit', guardarEspacio);
    document.getElementById('form-recurso').addEventListener('submit', guardarRecurso);
});

// Función para mostrar alertas en pantalla
function mostrarAlerta(mensaje, tipo = 'error') {
    const alerta = document.getElementById('alert-box');
    alerta.textContent = mensaje;
    alerta.className = `alert-box alert-${tipo}`;
    
    setTimeout(() => {
        alerta.className = 'alert-box hidden';
    }, 4000);
}

// Obtener Espacios (GET)
async function cargarEspacios() {
    try {
        const response = await fetch(`${API_URL}espacios/`);
        const data = await response.json();
        
        const contenedor = document.getElementById('lista-espacios');
        const select = document.getElementById('recurso-espacio');
        
        contenedor.innerHTML = '';
        // Reiniciar el select conservando la opción por defecto
        select.innerHTML = '<option value="" disabled selected>Selecciona el espacio de destino...</option>';

        data.forEach(espacio => {
            // Llenar listado visual
            contenedor.innerHTML += `
                <div class="item-card">
                    <div class="item-details">
                        <h4>${espacio.nombre}</h4>
                        <p><i class="ph ph-map-pin"></i> ${espacio.ubicacion}</p>
                    </div>
                    <div class="item-badge">Aforo: ${espacio.aforo_maximo}</div>
                </div>
            `;
            // Llenar el <select> del formulario de recursos
            select.innerHTML += `<option value="${espacio.id}">${espacio.nombre} (${espacio.ubicacion})</option>`;
        });
    } catch (error) {
        mostrarAlerta('Error de conexión al servidor.', 'error');
    }
}

// Obtener Recursos (GET)
async function cargarRecursos() {
    try {
        const response = await fetch(`${API_URL}recursos/`);
        const data = await response.json();
        
        const contenedor = document.getElementById('lista-recursos');
        contenedor.innerHTML = '';

        data.forEach(recurso => {
            const espacioNombre = recurso.espacio_detalle ? recurso.espacio_detalle.nombre : 'Sin asignar';
            contenedor.innerHTML += `
                <div class="item-card recurso">
                    <div class="item-details">
                        <h4>${recurso.nombre}</h4>
                        <p>Cod: ${recurso.codigo_inventario} | Ubicación: ${espacioNombre}</p>
                    </div>
                    <div class="item-badge">S/ ${recurso.costo_mantenimiento}</div>
                </div>
            `;
        });
    } catch (error) {
        console.error(error);
    }
}

// Crear Espacio (POST)
async function guardarEspacio(e) {
    e.preventDefault();
    
    const payload = {
        nombre: document.getElementById('espacio-nombre').value,
        ubicacion: document.getElementById('espacio-ubicacion').value,
        aforo_maximo: parseInt(document.getElementById('espacio-aforo').value),
        estado_operativo: true
    };

    try {
        const response = await fetch(`${API_URL}espacios/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            // Manejar validación defensiva (Ej. aforo negativo)
            const errorMsg = data.aforo_maximo ? data.aforo_maximo[0] : 'Error al guardar el espacio.';
            throw new Error(errorMsg);
        }

        document.getElementById('form-espacio').reset();
        mostrarAlerta('Espacio creado con éxito.', 'success');
        cargarEspacios(); // Refrescar lista

    } catch (error) {
        mostrarAlerta(error.message, 'error');
    }
}

// Crear Recurso (POST)
async function guardarRecurso(e) {
    e.preventDefault();
    
    const payload = {
        nombre: document.getElementById('recurso-nombre').value,
        codigo_inventario: document.getElementById('recurso-codigo').value,
        costo_mantenimiento: parseFloat(document.getElementById('recurso-costo').value),
        stock: parseInt(document.getElementById('recurso-stock').value),
        espacio: parseInt(document.getElementById('recurso-espacio').value)
    };

    try {
        const response = await fetch(`${API_URL}recursos/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            // Mostrar error del backend si el costo es negativo, o código duplicado
            const errorMsg = data.costo_mantenimiento ? data.costo_mantenimiento[0] : 
                           data.codigo_inventario ? 'El código de inventario ya existe.' : 'Error al guardar el recurso.';
            throw new Error(errorMsg);
        }

        document.getElementById('form-recurso').reset();
        mostrarAlerta('Recurso asignado con éxito.', 'success');
        cargarRecursos(); // Refrescar lista

    } catch (error) {
        mostrarAlerta(error.message, 'error');
    }
}