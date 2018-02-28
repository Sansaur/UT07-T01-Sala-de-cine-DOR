var objetosJSON = [];
var tituloPeliculaElegida = "Dunkirk"; // Dunkirk por default para testing
var pasoActualCompra = 0; //0, 1 y 2
//  Carga inicial
$('document').ready(function () {
    cargarJSON();
    $('#listaAsientos').hide();
    $('#procesamiento').hide();
    //mostrarReservas();
    $('#vuelta').click(function(){
        mostrarLoader(null,botonVueltaDetalle);
    });
    $('#botonCerrar').click(function(){
        $('footer').hide();
    });
});
function cargarJSON() {
    $.getJSON("js/listaPeliculas.json", function (data) {
        $.each(data, function (key, val) {
            objetosJSON[key] = val;
        });
        console.warn(objetosJSON);
        generarListaPeliculas();
    });
}
function generarListaPeliculas() {
    for (var i in objetosJSON) {
        $('#listaPeliculas').append("<div tabindex=0 aria-label=\"Contenedor para iniciar la votación por "+i+"\" id=\"" + i + "\" class=\"contenedorSombreado contenedorPeque\"><img objetivo=\"" + i + "\" src=\"" + objetosJSON[i].Imagen + "\" alt=\"" + i + "\"><button aria-label=\"Botón para iniciar la votación por "+i+"\" class=\"botonMasInformacion\" objetivo=\"" + i + "\">Más información</button></div>");
    }
    $('.contenedorPeque').click(function (e) {
        mostrarLoader(e, primerPaso);
    });
    $('.botonMasInformacion').click(function (e) {
        mostrarLoader(e, primerPaso);
    });
}

function mostrarLoader(parametros, funcion) {
    $('#procesamiento').show();
    setTimeout(function () {
        $('#procesamiento').hide();
        funcion(parametros);
    }, 1000);
}

function primerPaso(e) {
    pasoActualCompra = 1;
    tituloPeliculaElegida = e.target.getAttribute('objetivo');
    
    $('#listaPeliculas').hide();
    $('#detallePeliculas').empty();
    var nuevoContenido = "<div class=\"contenedorDetalle contenedorSombreado\">";
    nuevoContenido += "<div class=\"zonaSuperior\"><div class=\"imagenGrande\"><img src=\"" + objetosJSON[tituloPeliculaElegida].Imagen + "\" alt=\"" + tituloPeliculaElegida + "\"></div><div class=informacionEleccion ><h2>" + tituloPeliculaElegida + "</h2><h3>Sesiones entre:" + objetosJSON[tituloPeliculaElegida].Disponibilidad + "</h3><h3>Precio por entrada: " + objetosJSON[tituloPeliculaElegida].Precio + "€</h3></div></div>";
    nuevoContenido += "<p>" + objetosJSON[tituloPeliculaElegida].Sinopsis + "</p>";
    nuevoContenido += "<div id=controlesContenido>";
    nuevoContenido += "<button class=botonDetalle id=botonLista>Volver a la lista de peliculas</button>";
    nuevoContenido += "<button class=botonDetalle id=botonReserva>Reserver un asiento para esta película</button>";
    nuevoContenido += "</div>";
    $('#detallePeliculas').append(nuevoContenido);
    $('#detallePeliculas').show();
    $('#botonLista').click(function (e) {
        mostrarLoader(null,botonLista);
    });
    $('#botonReserva').click(function (e) {
        mostrarLoader(null,botonReserva);
    });
    actualizarPasoCompra();
}

function botonLista() {
    $('#detallePeliculas').empty();
    $('#detallePeliculas').hide();
    $('#listaPeliculas').show();
    pasoActualCompra = 0;
    actualizarPasoCompra();
}
function botonReserva() {
    $('#detallePeliculas').hide();
    $('#listaAsientos').show();
    mostrarReservas();
    pasoActualCompra = 2;
    actualizarPasoCompra();
}
function actualizarPasoCompra(){
    console.log();
    $('.rectPaso').css({fill:"white"});
    switch(pasoActualCompra){
        case 0:$('.rectPaso').slice(0,1).css({fill:"red"});break;
        case 1:$('.rectPaso').slice(0,2).css({fill:"red"});break;
        case 2:$('.rectPaso').slice(0,3).css({fill:"red"});break;
    }
}
function botonVueltaDetalle(){
    $('#reservas').empty();
    $('#listaAsientos').hide();
    $('#detallePeliculas').show();
    pasoActualCompra = 1;
    actualizarPasoCompra();
}