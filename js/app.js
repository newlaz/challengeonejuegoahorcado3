const listadoPalabras = ["vuestros", "semejante", "pague", "molestes", "cultura", "comino"];

const munheco = {
    0: document.getElementsByClassName('base-horca'),
    1: document.getElementsByClassName('pilar-horca'),
    2: document.getElementsByClassName('polea-horca'),
    3: document.getElementsByClassName('soga'),
    4: document.getElementsByClassName('cabeza'),
    5: document.getElementsByClassName('cuerpo'),
    6: document.getElementsByClassName('brazo-izquierda'),
    7: document.getElementsByClassName('brazo-derecha'),
    8: document.getElementsByClassName('pierna-izquierda'),
    9: document.getElementsByClassName('pierna-derecha')
}

const btnIniciar = document.getElementById('btnIniciar');
const btnHome = document.getElementById('btnHome');

let palabraSecreta;
let erroresPermitidos = Object.keys(munheco).length;
let errores;
let aciertos;
let letrasUsadas;

const letrasEncontradasContenedor = document.getElementById('letrasEncontradas');
const letrasUsadasContenedor = document.getElementById('letrasUsadas');
document.getElementById('letrasUsadas').style.display = 'none'
document.getElementById('figure-container').style.display = 'none'
btnHome.style.display = 'none';


// FUNCIONES 

const generarPalabraSecreta = () => {
    let palabra = (listadoPalabras[Math.floor((Math.random() * listadoPalabras.length))]).toUpperCase();
    palabraSecreta = palabra.split('');
}


const mostrarPalabraSecreta = () => {
    palabraSecreta.forEach(letra => {
        const elementoLetra = document.createElement('span');
        elementoLetra.innerHTML = letra;
        elementoLetra.classList.add('letra');
        elementoLetra.classList.add('hidden-letra');
        letrasEncontradasContenedor.appendChild(elementoLetra);
    });
}

const mostrarPalabraFinal = () => {
    let palabraElemento = document.getElementsByClassName('letra');
    for (let i = 0; i < palabraElemento.length; i++) {
        palabraElemento[i].classList.remove('hidden-letra');
    }
}

const letraPresionada = letra => {
    let nuevaLetra = letra.key.toUpperCase();
    if (nuevaLetra.match(/^[a-zñ$]/i) && !letrasUsadas.includes(nuevaLetra)) {
        introducirLetra(nuevaLetra);
    }
}

const introducirLetra = (letra) => {
    if (palabraSecreta.includes(letra)) {
        letraCorrecta(letra);
    } else {
        letraIncorrecta();
    }

    agregarLetraUsada(letra);
}

const agregarLetraUsada = letra => {
    const elementoLetra = document.createElement('span');
    elementoLetra.innerHTML = letra;
    letrasUsadasContenedor.appendChild(elementoLetra);
    letrasUsadas.push(letra);
}

const letraIncorrecta = () => {
    dibujarMuneco(errores);
    errores++;

    if (errores === erroresPermitidos) {
        mostrarPalabraFinal();
        mostrarModalPerdiste();
        terminarJuego();
    }

}

const letraCorrecta = (letra) => {
    const {
        children
    } = letrasEncontradasContenedor;

    for (let i = 0; i < children.length; i++) {
        if (children[i].innerHTML === letra) {
            children[i].classList.remove('hidden-letra')
            aciertos++;
        }
    }
    if (aciertos === palabraSecreta.length) {
        terminarJuego();
        mostrarModal();
    }
}

const terminarJuego = () => {
    document.removeEventListener('keydown', letraPresionada);
    document.getElementById('letrasUsadas').style.display = 'none'
    document.getElementById('btn-contenedor').style.display = 'flex'
    btnHome.style.display = 'block';
}

const dibujarMuneco = (cantidadErrores) => {
    let elemento = munheco[cantidadErrores];
    for (let i = 0; i < elemento.length; i++) {
        elemento[i].classList.remove("hidden");
    }
}

const limpiarMuneco = () => {
    for (let j = 0; j < Object.keys(munheco).length; j++) {
        let elemento = munheco[j];
        for (let i = 0; i < elemento.length; i++) {
            elemento[i].classList.add("hidden");
        }
    }


}

const iniciarJuego = () => {
    errores = 0;
    aciertos = 0;
    letrasUsadas = [];

    letrasEncontradasContenedor.innerHTML = '';
    letrasUsadasContenedor.innerHTML = '';

    document.getElementById('figure-container').style.display = 'flex'
    document.getElementById('container').style.borderTopLeftRadius = '0'
    document.getElementById('container').style.borderTopRightRadius = '0'
    document.getElementById('letrasUsadas').style.display = 'flex'
    document.getElementById('btn-contenedor').style.display = 'none'
    btnPalabras.style.display = 'none'

    limpiarMuneco();
    generarPalabraSecreta();
    mostrarPalabraSecreta();
    document.addEventListener('keydown', letraPresionada);
}

btnIniciar.addEventListener('click', iniciarJuego);

btnHome.addEventListener('click', () => window.location.reload());