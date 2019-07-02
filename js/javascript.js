var arrayFotos = [
    'casa1.jpg',
    'casa2.jpg',
    'casa3.jpg',
    'casa4.jpg',
    'casa5.jpg',
    'casa6.jpg',
    'casa7.jpg',
    'casa8.jpg',
];


var arrayGaleria = [];


var posicionImagen;

window.onload = function () {

    mostrarFotos()

    var todasFotos = document.querySelectorAll('#fotos img')
    for (i = 0; i < todasFotos.length; i++) {
	todasFotos[i].addEventListener('dblclick', function () {
	    anadirGaleria(this);
	})
    }

    if (localStorage.getItem("galeriaStorage") !== null) {


	textoGaleria = localStorage.getItem("galeriaStorage");


	arrayGaleria = textoGaleria.split(";");

	mostrarGaleria();
    }


    document.getElementById("lightbox").addEventListener("click", cerrarLightbox);
}



function mostrarFotos() {

    var fotos = '';
    for (i = 0; i < arrayFotos.length; i++) {

	fotos += `<img src='img/${arrayFotos[i]}'>`
    }

    document.getElementById('fotos').innerHTML = fotos
}

function anadirGaleria(foto) {

    var nombreFoto = foto.getAttribute('src')
    var slash = nombreFoto.lastIndexOf('/') + 1
    nombreFoto = nombreFoto.substring(slash)


    if (arrayGaleria.indexOf(nombreFoto) >= 0) {
	alert("foto ya existe en la galeria")
    } else {

	arrayGaleria.push(nombreFoto);

	guardarStorage()

	mostrarGaleria()
    }
}

function mostrarGaleria() {
    var fotos = "";
    for (i = 0; i < arrayGaleria.length; i++) {
	fotos += `<div class='fotosGaleria'>`
	fotos += `<img class='fotoLightbox' src='img/${arrayGaleria[i]}'>`
	fotos += `<img class='borrar' src='img/borrar.png'>`
	fotos += `</div>`
    }

    document.getElementById("galeria").innerHTML = fotos;


    var borrar = document.querySelectorAll("img.borrar");

    for (i = 0; i < borrar.length; i++) {
	borrar[i].addEventListener("click", function () {
	    borrarFoto(this)
	});
    }


    var lightbox = document.querySelectorAll("img.fotoLightbox");

    for (i = 0; i < lightbox.length; i++) {
	lightbox[i].addEventListener("click", function () {
	    abrirLightbox(this)
	});

    }

}


function abrirLightbox(foto) {

    var nombreImagen = foto.getAttribute("src");

    var slash = nombreImagen.indexOf('/') + 1;
    var imagen = nombreImagen.substring(slash);

    posicionImagen = arrayGaleria.indexOf(imagen);

    var img = `<img id='anterior' src='img/flecha.png'>`
    img += `<img id='fotoLightbox' src='${nombreImagen}'>`
    img += `<img id='siguiente' src='img/flecha.png'>`

    document.getElementById("lightbox").innerHTML = img;


    document.getElementById("lightbox").style.display = "flex";


    document.getElementById("anterior").addEventListener("click", imagenAnterior);
    document.getElementById("siguiente").addEventListener("click", imagenSiguiente);

}

function imagenAnterior(event) {
    event.stopPropagation();
    if (posicionImagen == 0) {
	posicionImagen = arrayGaleria.length - 1;
    } else {
	posicionImagen--;
    }


    var foto = arrayGaleria[posicionImagen];


    document.querySelector("#fotoLightbox").src = 'img/' + foto;


}

function imagenSiguiente(event) {
    event.stopPropagation();
    if (posicionImagen == arrayGaleria.length - 1) {
	posicionImagen = 0;
    } else {
	posicionImagen++;
    }


    var foto = arrayGaleria[posicionImagen];


    document.querySelector("#fotoLightbox").src = 'img/' + foto;


}

function cerrarLightbox() {
    document.getElementById("lightbox").style.display = "none";

}

function guardarStorage() {
    if (arrayGaleria.length == 0) {
	localStorage.removeItem("galeriaStorage");
    } else {

	var arrayTexto = arrayGaleria.join(";");

	localStorage.setItem("galeriaStorage", arrayTexto);
    }
}

function borrarFoto(foto) {

    var padre = foto.parentNode;

    var primerHijo = padre.childNodes[0];

    var nombreFoto = primerHijo.getAttribute("src");

    var split = nombreFoto.indexOf("/") + 1;
    nombreFoto = nombreFoto.substring(split);

    var posicion = arrayGaleria.indexOf(nombreFoto);

    arrayGaleria.splice(posicion, 1);

    guardarStorage();

    mostrarGaleria();

}



