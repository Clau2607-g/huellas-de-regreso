// ==========================================
// MAPA - HUELLAS DE REGRESO
// ==========================================

const contenedorMapa = document.getElementById("mapa");

if (contenedorMapa) {

    // Centro inicial (Cartago, Valle del Cauca)
    const mapa = L.map("mapa").setView([4.7464, -75.9117], 13);

    // Mapa de OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {

        attribution: "&copy; OpenStreetMap"

    }).addTo(mapa);

    // Marcador principal
    L.marker([4.7464, -75.9117])
        .addTo(mapa)
        .bindPopup("<b>Huellas de Regreso</b><br>Cartago, Valle del Cauca.")
        .openPopup();

}