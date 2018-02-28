function cambia(objeto) {
    /*var array = [
     'blue',
     'cyan',
     'red',
     'green',
     'yellow',
     'black',
     'pink',
     'brown',
     'gray',
     'purple',
     'white'
     ];
     */
    for (var i in objeto.childNodes) {
        if (objeto.childNodes[i].tagName) {
            //objeto.childNodes[i].setAttribute('style', '');
            //var pos = Math.floor(Math.random() * (array.length + 1));
            //objeto.childNodes[i].setAttribute('fill', array[pos]);
            if (objeto.childNodes[i].getAttribute('fill') === 'white') {

                objeto.childNodes[i].setAttribute('style', '');
                objeto.childNodes[i].setAttribute('stroke', 'black');
                objeto.childNodes[i].setAttribute('fill', 'green');
                objeto.childNodes[i].setAttribute('stroke-width', 2);

            } else {

                objeto.childNodes[i].setAttribute('style', '');
                objeto.childNodes[i].setAttribute('stroke', 'black');
                objeto.childNodes[i].setAttribute('fill', 'white');
                objeto.childNodes[i].setAttribute('stroke-width', 2);

            }
        }
    }
}
function cargaInicial() {
    rellena(document.getElementById('SVG_Circulos'));
}

function rellenar() {
    var listaElementos = document.getElementsByTagName('use');
    for (var i in listaElementos) {
        if (typeof listaElementos[i] === "object") {
            listaElementos[i].setAttribute('id', i);
            listaElementos[i].appendChild(crearNodo('TITLE', 'ID:' + i, null, null));
        }
    }
    mostrarReservas();
    //tippy('use')
}
function rellena(objeto) {
    // <use x="0" y="0" xlink:href="#circulito" >
    var v = document.getElementById('SVG_Circulos');
    document.getElementsByTagName('body')[0].removeChild(v);
    var nuevoSVG = crearNodo('svg', null, ['id', 'onclick', 'height', 'width', 'style'], ["SVG_Circulos", "rellena(this)", 300, 300, "border:5px solid black"])
    for (var i = 0; i < 25; i++) {
        var nuevoNodo = crearNodo('use', null, ['x', 'y', 'id', 'xlink:href'], ["" + 25 * i, "" + 25 * i, 'circulo-' + i, '#circulito'])
        console.log(nuevoNodo);
        nuevoSVG.appendChild(nuevoNodo);
    }
    document.getElementsByTagName('body')[0].appendChild(nuevoSVG);

}
function crearNodo(tipo, texto, atributos, valores) {
    var nodoTexto;
    var nodoP = document.createElement(tipo);
    if (texto) {
        nodoTexto = document.createTextNode(texto);
        nodoP.appendChild(nodoTexto);
    }
    for (var i in atributos) {
        nodoP.setAttribute(atributos[i], valores[i]);
    }

    return nodoP;
}
var X = 0;
var Y = 0;
var HEIGHT = 500;
var WIDTH = 500;
function tam(tam) {
    var v = document.getElementById('SVG_Circulos');
    HEIGHT += tam;
    WIDTH += tam;
    v.setAttribute("viewBox", X + " " + Y + " " + HEIGHT + " " + WIDTH + "");
}
function move(move, dir) {
    var moveX = 0;
    var moveY = 0;
    switch (dir) {
        // Arriba, abajo, izquierda, derecha
        case 1:
            moveY = move;
            break;
        case 2:
            moveY = move;
            moveY *= -1;
            break;
        case 3:
            moveX = move;
            break;
        case 4:
            moveX = move;
            moveX *= -1;
            break;
    }
    console.log(move, dir, moveY);
    var v = document.getElementById('SVG_Circulos');
    X += moveX;
    Y += moveY;
    v.setAttribute("viewBox", X + " " + Y + " " + HEIGHT + " " + WIDTH + "");
}
function colorearEstados() {
    var todos = document.getElementsByTagName('use');
    for (var i in todos) {
        if (typeof todos[i] === "object") {
            var objeto = todos[i];
            switch (objeto.getAttribute('estado')) {
                case "ocupado":
                    objeto.setAttribute('style', '');
                    objeto.setAttribute('stroke', 'black');
                    objeto.setAttribute('fill', 'red');
                    objeto.setAttribute('stroke-width', 1);
                    break;
                case "reservando":
                    objeto.setAttribute('style', '');
                    objeto.setAttribute('stroke', 'black');
                    objeto.setAttribute('fill', 'green');
                    objeto.setAttribute('stroke-width', 1);
                    break;
                case "libre":
                    objeto.setAttribute('style', '');
                    objeto.setAttribute('stroke', 'black');
                    objeto.setAttribute('fill', 'white');
                    objeto.setAttribute('stroke-width', 1);
                    break;
            }
        }
    }
}
function cambiaColor(objeto) {
    var estado = objeto.getAttribute('estado');
    switch (estado) {
        case "ocupado":
            return;
        case "reservando":
            objeto.setAttribute('estado', 'libre');
            break;
        case "libre":
            objeto.setAttribute('estado', 'reservando');
            break;
    }
    colorearEstados();
}
function reservar(objeto){
    var estado = objeto.getAttribute('estado');
    if(estado === "ocupado"){
        // Sacar mensaje de error
        return;
    } else {
        location.replace("paginaPagos.html?Titulo="+tituloPeliculaElegida+"&Disponibilidad="+objetosJSON[tituloPeliculaElegida].Disponibilidad+"&SillaCogida="+objeto.id+"&Precio="+objetosJSON[tituloPeliculaElegida].Precio);
    }
}
function guardarButacas() {
    var todos = document.getElementsByTagName('use');
    var arrayJSON = new Array();
    for (var i in todos) {
        if (typeof todos[i] === "object") {
            var nuevoElementoJSON = {
                estado: todos[i].getAttribute('estado'),
                x: todos[i].getAttribute('x'),
                y: todos[i].getAttribute('y'),
                href: todos[i].getAttribute('href'),
                id: todos[i].getAttribute('id')
            };
            arrayJSON.push(nuevoElementoJSON);
        }
    }
    localStorage.setItem('Lista butacas', JSON.stringify(arrayJSON))
}
//function descargarJSON() {
//    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(localStorage.getItem('Lista butacas'));
//    var downloadAnchorNode = document.createElement('a');
//    downloadAnchorNode.setAttribute("href", dataStr);
//    downloadAnchorNode.setAttribute("download", "Reservas.json");
//    downloadAnchorNode.click();
//    downloadAnchorNode.remove();
//}
function mostrarReservas() {
    var aRellenar = document.getElementById('reservas');
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var symbol = document.createElementNS("http://www.w3.org/2000/svg", "symbol");
    svg.setAttribute("width", "500");
    svg.setAttribute("height", "500");
    svg.setAttribute("style", "border:5px solid black;background-color:#aaaaaa;")
    svg.setAttribute("id", "SVG_Circulos")

    symbol.setAttribute('id', 'circulito');

    var nuevoPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    nuevoPath.setAttribute('d', 'M0 30 L30 30 L30 20 L0 20 L0 30 Z');
    symbol.appendChild(nuevoPath);

    nuevoPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    nuevoPath.setAttribute('d', 'M14,23 a 3,3 0 1,0 3,0 z');
    symbol.appendChild(nuevoPath);

    nuevoPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    nuevoPath.setAttribute('d', 'M 14, 0 a 10,10 0 1,0 2,0 z');
    symbol.appendChild(nuevoPath);

    symbol.setAttribute('id', 'circulito');

    var listaObjetos = JSON.parse(localStorage.getItem('Lista butacas'));
    $.getJSON("js/butacas.json", function (data) {
        for (var i in data) {
            var nuevoUSE = document.createElementNS("http://www.w3.org/2000/svg", "use");
            if(objetosJSON[tituloPeliculaElegida].sillasCogidas.includes(parseInt(i))){
                nuevoUSE.setAttribute('estado', "ocupado");
            } else {
                nuevoUSE.setAttribute('estado', "libre");
            }
            nuevoUSE.setAttribute('x', data[i].x);
            nuevoUSE.setAttribute('y', data[i].y);
            nuevoUSE.setAttribute('href', "img/asiento2.svg#icon-1");
            nuevoUSE.setAttribute('id', i);
            nuevoUSE.setAttribute('onclick', 'mostrarLoader(this,reservar)');
            nuevoUSE.setAttribute('style', '');
            nuevoUSE.setAttribute('title', 'Asiento:'+i);
            svg.appendChild(nuevoUSE);
        }
        // Pantalla
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width",300);
        rect.setAttribute("height",10);
        rect.setAttribute("x",100);
        rect.setAttribute("y",0);
        svg.appendChild(rect);
        rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width",290);
        rect.setAttribute("height",10);
        rect.setAttribute("x",105);
        rect.setAttribute("y",10);
        rect.setAttribute("style","fill:white;stroke:#000000;stroke-width:2");
        svg.appendChild(rect);
        
        // Pasillos y paredes (Marrón y negro)
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width",70);
        rect.setAttribute("height",190);
        rect.setAttribute("x",215);
        rect.setAttribute("y",100);
        rect.setAttribute("style","fill:brown;");
        svg.appendChild(rect);
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width",70);
        rect.setAttribute("height",40);
        rect.setAttribute("x",215);
        rect.setAttribute("y",270);
        rect.setAttribute("style","fill:black;");
        svg.appendChild(rect);
        
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width",12);
        rect.setAttribute("height",230);
        rect.setAttribute("x",100);
        rect.setAttribute("y",100);
        rect.setAttribute("style","fill:brown;");
        svg.appendChild(rect);
        
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width",12);
        rect.setAttribute("height",230);
        rect.setAttribute("x",390);
        rect.setAttribute("y",100);
        rect.setAttribute("style","fill:brown;");
        svg.appendChild(rect);
        
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width",470);
        rect.setAttribute("height",15);
        rect.setAttribute("x",10);
        rect.setAttribute("y",320);
        rect.setAttribute("style","fill:brown;");
        svg.appendChild(rect);
        
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width",500);
        rect.setAttribute("height",100);
        rect.setAttribute("x",0);
        rect.setAttribute("y",405);
        rect.setAttribute("style","fill:black;");
        svg.appendChild(rect);
        
        // Salidas y entradas (Verde entrada normal, amarillo salida de emergencia)
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width",70);
        rect.setAttribute("height",10);
        rect.setAttribute("x",215);
        rect.setAttribute("y",260);
        rect.setAttribute("style","fill:green;");
        svg.appendChild(rect);
        
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width",30);
        rect.setAttribute("height",30);
        rect.setAttribute("x",470);
        rect.setAttribute("y",310);
        rect.setAttribute("style","fill:yellow;stroke:#000000;stroke-width:2");
        svg.appendChild(rect);
        
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width",30);
        rect.setAttribute("height",30);
        rect.setAttribute("x",0);
        rect.setAttribute("y",310);
        rect.setAttribute("style","fill:yellow;stroke:#000000;stroke-width:2");
        svg.appendChild(rect);
        
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width",30);
        rect.setAttribute("height",50);
        rect.setAttribute("x",0);
        rect.setAttribute("y",10);
        rect.setAttribute("style","fill:yellow;stroke:#000000;stroke-width:2");
        svg.appendChild(rect);
        
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width",30);
        rect.setAttribute("height",50);
        rect.setAttribute("x",470);
        rect.setAttribute("y",10);
        rect.setAttribute("style","fill:yellow;stroke:#000000;stroke-width:2");
        svg.appendChild(rect);
        
        // BORDES
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width",1);
        rect.setAttribute("height",500);
        rect.setAttribute("x",0);
        rect.setAttribute("y",0);
        rect.setAttribute("style","fill:black;");
        svg.appendChild(rect);
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width",500);
        rect.setAttribute("height",1);
        rect.setAttribute("x",0);
        rect.setAttribute("y",0);
        rect.setAttribute("style","fill:black;");
        svg.appendChild(rect);
        
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width",1);
        rect.setAttribute("height",500);
        rect.setAttribute("x",500);
        rect.setAttribute("y",0);
        rect.setAttribute("style","fill:black;");
        svg.appendChild(rect);

        colorearEstados();
        ponerTitles();

    });
    svg.appendChild(symbol);
    aRellenar.appendChild(svg);
    colorearEstados();
}

function ponerTitles(){
    $('use').each(function(index){
        console.log($('use').eq(index).attr('title','Asiento:'+parseInt(index+1)+" ("+$('use').eq(index).attr('estado')+")"));
    });
    $('use').tooltip({
  position: { my: "left+25 center", at: "right center" }
});
}