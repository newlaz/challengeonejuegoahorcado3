const modalGanaste = document.getElementById('modalGanaste');
const modalPerdiste = document.getElementById('modalPerdiste');
const modalAgregarPalabras = document.getElementById('modalAgregarPalabras');
const btnCerrarModalGanaste = document.getElementById('btnCerrarModalGanaste');
const btnCerrarModalPerdiste = document.getElementById('btnCerrarModalPerdiste');
const btnCerrarModalPalabras = document.getElementById('btnCerrarModalPalabras');

const mostrarModalGanaste = () => {
    modalGanaste.showModal();
}

const mostrarModalPerdiste = () => {
    modalPerdiste.showModal();
}

const cerrarModal = () => {
    modalGanaste.close();
    modalPerdiste.close();
    modalAgregarPalabras.close();
}

btnCerrarModalGanaste.addEventListener('click', cerrarModal);
btnCerrarModalPerdiste.addEventListener('click', cerrarModal);

// AGREGAR PALABRAS NUEVAS 
function agregarPalabras() {
    const nuevaPalabra = document.getElementById('txtPalabras').value;

    if (!listadoPalabras.includes(nuevaPalabra) && nuevaPalabra.match(/^[a-zñ$]/i)) {
        listadoPalabras.push(nuevaPalabra);
        console.log(listadoPalabras);
    }

    document.getElementById('txtPalabras').value = '';
    cerrarModal();
}

const mostrarModalAgregar = () => {
    modalAgregarPalabras.showModal();
}

btnPalabras.addEventListener('click', mostrarModalAgregar);
btnCerrarModalPalabras.addEventListener('click', agregarPalabras)