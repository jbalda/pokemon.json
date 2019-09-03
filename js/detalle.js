/**
 * Hace una llamada AJAX descargando el achivo pokedex.json
 */
function cargarDatosPokemon() {
    //Creo el objeto XMLHttpRequest 
    const xhr = new XMLHttpRequest();
    
    //Cuando se descargue el archivo...
    xhr.onload = function() {
        //Si hay error lo informo
        if (xhr.status != 200) {
            alert("Error al intentar consultar pokedex.json");
            return;
        }
        //Convierto el JSON en un array de objetos
        let dataArray = JSON.parse(xhr.responseText);
        let urlParams = new URLSearchParams(location.search);
        let id = urlParams.get('id');
        filtrarPorId(dataArray,id);
    }

    xhr.onerror = function(event) {
        console.log("error");
    };

    //Especifico el método 
    xhr.open('GET', 'data/pokedex.json', true);
    //Envío la solicitud
    xhr.send();
}

function filtrarPorId(arrPokemones, id){
    let pokemon =  arrPokemones.find(element => {
                        return element.id == id;
                    });
    if(!pokemon){
        alert("No encontro pokemon")
    }else{
        mostrar(pokemon);
    }
}

function mostrar (pokemon){
    let div = document.getElementById("resultado");
    let secImagen = document.getElementById("secImagen");
    secImagen.innerHTML ="<img class='card-img' src='" + pokemon.picture +"'>"
    let secDatos = document.getElementById("datos");
    let secBody = document.createElement("div");
    secBody.setAttribute("class","card-body");
    secDatos.appendChild(secBody);
    let titulo = document.createElement("h2");
    titulo.setAttribute("class", "card-title display-1 text-center");
    titulo.innerText = pokemon.name; 
    secBody.appendChild(titulo);
    let secTipos = document.createElement("div");
    secTipos.setAttribute("class","text-center mt-2 mb-2");
    pokemon.type.forEach(e =>{
        let spanTipo= document.createElement("span");
        spanTipo.setAttribute("class", "btn btn-primary mr-2");
        spanTipo.innerText = e;
        secTipos.appendChild(spanTipo);
    });
    secBody.appendChild(secTipos);
    let secBase = document.createElement("div");
    secBody.appendChild(secBase);
    let codTabla = "<table class='table table-striped'><caption>Listado de Bases</caption><tr><th>BASE</th><th>VALOR</th>";
    Object.keys(pokemon.base).forEach(e =>{
        codTabla+="<tr><td>"+e+"</td><td>"+pokemon.base[e]+"</td>";
    })
    codTabla +="</table>";
    secBase.innerHTML=codTabla;

    
    
    
    div.innerHTML = pokemon;

}

cargarDatosPokemon();