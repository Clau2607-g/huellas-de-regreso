// ==========================================
// HUELLAS DE REGRESO
// SCRIPT PRINCIPAL
// ==========================================

// ==========================================
// VISTA PREVIA DE LA IMAGEN
// ==========================================

const foto = document.getElementById("foto");
const preview = document.getElementById("preview");

if (foto && preview) {

    foto.addEventListener("change", function () {

        const archivo = this.files[0];

        if (!archivo) return;

        const lector = new FileReader();

        lector.onload = function (e) {

            preview.src = e.target.result;
            preview.style.display = "block";

        };

        lector.readAsDataURL(archivo);

    });

}

// ==========================================
// GUARDAR REPORTE
// ==========================================

const formulario = document.getElementById("formMascota");

if (formulario) {

    formulario.addEventListener("submit", function (e) {

        e.preventDefault();

        const mascota = {

            nombre: document.getElementById("nombre").value,
            estado: document.getElementById("estado").value,
            especie: document.getElementById("especie").value,
            raza: document.getElementById("raza").value,
            color: document.getElementById("color").value,
            ciudad: document.getElementById("ciudad").value,
            barrio: document.getElementById("barrio").value,
            fecha: document.getElementById("fecha").value,
            descripcion: document.getElementById("descripcion").value,
            telefono: document.getElementById("telefono").value,
            correo: document.getElementById("correo").value,
            foto: preview.src

        };

        let mascotas = JSON.parse(localStorage.getItem("mascotas")) || [];

        mascotas.push(mascota);

        localStorage.setItem("mascotas", JSON.stringify(mascotas));

        alert("🐾 ¡Reporte publicado correctamente!");

        formulario.reset();

        preview.src = "";
        preview.style.display = "none";

    });

}

// ==========================================
// FUNCIÓN VER DETALLE
// ==========================================

function verDetalle(indice){

    localStorage.setItem("detalleMascota", indice);

    window.location.href = "detalle.html";

}

// ==========================================
// BUSCADOR DE MASCOTAS
// ==========================================

const listaMascotas = document.getElementById("listaMascotas");

if (listaMascotas) {

    const buscarNombre = document.getElementById("buscarNombre");
    const filtroEstado = document.getElementById("filtroEstado");
    const filtroEspecie = document.getElementById("filtroEspecie");

    let mascotas = JSON.parse(localStorage.getItem("mascotas")) || [];

    mostrarMascotas(mascotas);

    function mostrarMascotas(lista) {

        listaMascotas.innerHTML = "";

        if (lista.length === 0) {

            listaMascotas.innerHTML = `
                <h2 style="text-align:center;">
                    No se encontraron mascotas.
                </h2>
            `;

            return;

        }

        lista.forEach((m, indice) => {

            listaMascotas.innerHTML += `

                <div class="tarjeta">

                    <img src="${m.foto}" alt="${m.nombre}">

                    <div class="contenidoTarjeta">

                        <h3>${m.nombre}</h3>

                        <span class="estado ${m.estado.toLowerCase()}">
                            ${m.estado}
                        </span>

                        <p>📍 ${m.ciudad}</p>

                        <p>🐾 ${m.especie}</p>

                        <button
                            class="btnVer"
                            onclick="verDetalle(${indice})">

                            Ver información

                        </button>

                    </div>

                </div>

            `;

        });

    }

    function filtrar() {

        let nombre = buscarNombre.value.toLowerCase();
        let estado = filtroEstado.value;
        let especie = filtroEspecie.value;

        let resultado = mascotas.filter(function (m) {

            return (

                m.nombre.toLowerCase().includes(nombre) &&
                (estado === "" || m.estado === estado) &&
                (especie === "" || m.especie === especie)

            );

        });

        mostrarMascotas(resultado);

    }

    buscarNombre.addEventListener("keyup", filtrar);
    filtroEstado.addEventListener("change", filtrar);
    filtroEspecie.addEventListener("change", filtrar);

}

// ==========================================
// REPORTES EN LA PÁGINA DE INICIO
// ==========================================

const reportesInicio = document.getElementById("reportesInicio");

if (reportesInicio) {

    let mascotas = JSON.parse(localStorage.getItem("mascotas")) || [];

    reportesInicio.innerHTML = "";

    if (mascotas.length === 0) {

        reportesInicio.innerHTML = `
            <h2 style="text-align:center;color:white;">
                Aún no hay reportes publicados.
            </h2>
        `;

    } else {

        mascotas.slice().reverse().forEach((m, indice) => {

            reportesInicio.innerHTML += `

                <div class="tarjeta">

                    <img src="${m.foto}" alt="${m.nombre}">

                    <div class="contenidoTarjeta">

                        <h3>${m.nombre}</h3>

                        <span class="estado ${m.estado.toLowerCase()}">
                            ${m.estado}
                        </span>

                        <p>📍 ${m.ciudad}</p>

                        <p>🐾 ${m.especie}</p>

                        <button
                            class="btnVer"
                            onclick="verDetalle(${mascotas.length-1-indice})">

                            Ver información

                        </button>

                    </div>

                </div>

            `;

        });

    }

}

// ==========================================
// DETALLE DE LA MASCOTA
// ==========================================

const detalle = document.getElementById("detalle");

if (detalle) {

    let mascotas = JSON.parse(localStorage.getItem("mascotas")) || [];

    const indice = localStorage.getItem("detalleMascota");

    if (indice !== null && mascotas[indice]) {

        const m = mascotas[indice];

        detalle.innerHTML = `

            <img src="${m.foto}" alt="${m.nombre}">

            <div class="infoDetalle">

                <h1>${m.nombre}</h1>

                <p><strong>Estado:</strong> ${m.estado}</p>

                <p><strong>Especie:</strong> ${m.especie}</p>

                <p><strong>Raza:</strong> ${m.raza}</p>

                <p><strong>Color:</strong> ${m.color}</p>

                <p><strong>Ciudad:</strong> ${m.ciudad}</p>

                <p><strong>Barrio:</strong> ${m.barrio}</p>

                <p><strong>Fecha:</strong> ${m.fecha}</p>

                <p><strong>Descripción:</strong> ${m.descripcion}</p>

                <p><strong>Teléfono:</strong> ${m.telefono}</p>

                <p><strong>Correo:</strong> ${m.correo}</p>

                <a href="tel:${m.telefono}" class="btnPrincipal">
                    📞 Llamar
                </a>

            </div>

        `;

    } else {

        detalle.innerHTML = `
            <h2 style="text-align:center;">
                No se encontró la información de esta mascota.
            </h2>
        `;

    }

}

// ==========================================
// FORMULARIO DE CONTACTO
// ==========================================

const formContacto = document.getElementById("formContacto");

if (formContacto) {

    formContacto.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("✅ Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo lo antes posible.");

        formContacto.reset();

    });

}

// ==========================================
// BOTÓN VOLVER ARRIBA
// ==========================================

const botonArriba = document.getElementById("btnArriba");

if (botonArriba) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {

            botonArriba.style.display = "flex";

        } else {

            botonArriba.style.display = "none";

        }

    });

    botonArriba.addEventListener("click", function () {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}

// ==========================================
// MENSAJE SI NO HAY REPORTES
// ==========================================

function noHayReportes(contenedor) {

    contenedor.innerHTML = `

        <div class="sinReportes">

            <h2>🐾 Aún no hay reportes publicados</h2>

            <p>
                Sé la primera persona en publicar una mascota perdida o encontrada.
            </p>

            <a href="reportar.html" class="btnPrincipal">
                Publicar reporte
            </a>

        </div>

    `;

}

// ==========================================
// UTILIDAD
// ==========================================

function obtenerMascotas() {

    return JSON.parse(localStorage.getItem("mascotas")) || [];

}

function guardarMascotas(lista) {

    localStorage.setItem("mascotas", JSON.stringify(lista));

}

console.log("✅ Huellas de Regreso cargado correctamente.");


// ==========================================
// ESTADÍSTICAS
// ==========================================

const estadisticas = document.querySelector(".estadisticas");

if (estadisticas) {

    const mascotas = JSON.parse(localStorage.getItem("mascotas")) || [];

    const totalReportes = mascotas.length;

    const totalEncontradas = mascotas.filter(function(m) {
        return m.estado === "Encontrado";
    }).length;

    const totalReunidas = mascotas.filter(function(m) {
        return m.estado === "Encontrado";
    }).length;

    document.getElementById("totalReportes").textContent = totalReportes;
    document.getElementById("totalEncontradas").textContent = totalEncontradas;
    document.getElementById("totalReunidas").textContent = totalReunidas;

}
