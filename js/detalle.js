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
        mostrar(pokemon.id + " " + pokemon.name);
    }
}

function mostrar (pokemon){
    let div = document.getElementById("resultado");
    let t = 
    div.innerHTML = pokemon;

}

cargarDatosPokemon();