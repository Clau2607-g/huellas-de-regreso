// ===================================
// HUELLAS DE REGRESO
// GESTIÓN DE MASCOTAS
// ===================================

function obtenerMascotas(){

    return JSON.parse(localStorage.getItem("mascotas")) || [];

}

function guardarMascotas(lista){

    localStorage.setItem("mascotas", JSON.stringify(lista));

}