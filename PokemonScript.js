function showPokemonInfo(results){
    let pokeTypes = "";
    for (let i = 0; i < results[0].types.length; i++) {
        pokeTypes += "<li>" + results[0].types[i].type.name + "</li>";
    }
    let pokeAbilities = "";
    for (let i = 0; i < results[0].abilities.length; i++) {
        pokeAbilities += "<li>" + results[0].abilities[i].ability.name + "</li>";
    }
    var htmlStr = `
    <h1>${results[0].name}</h1>
    <h2>Height:<br><span>${results[0].height}</span></h2>
    <h2>Weight:<br><span>${results[0].weight}</span></h2>
    <h2>Type(s):</h2>
    <ul>${pokeTypes}</ul>
    <h2>Ability(ies):</h2>
    <ul>${pokeAbilities}</ul>
    <h2>Description:<br><span>${results[1].descriptions[1].description}</span></h2>
    `;
    $("#pokedex").html(htmlStr);
    $("#pokemon-info").slideDown("fast");
    console.log(htmlStr)
}

$(document).ready(function(){
    $("#pokemon-info").hide();
/*  loop through 1-150
    NOTE:  Assignment requests 150, choosing to do less to reduce # of $.get's to pokemon api */
    for(var idNum = 1; idNum<=50; idNum++){
      var imgSrc = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + idNum + ".png";
      $("#pokemon-pics").append("<img src='" + imgSrc + "' id='" + idNum + "'>");
    }

    var baseURL = "https://pokeapi.co/api/v2/"
    let errorMsg = `
        <p class="text-danger">Oops, something went wrong with this request. If the URL is correct, there could be an issue with the server. Please try again at a later time.</p>
    `;

    $("#pokemon-pics").on("click", "img", function(){
        //get data to append to urls
        let pokeID = $(this).attr("id");
        let params = "pokemon/" + pokeID + "/";
        let addlParams = "characteristic/" + pokeID + "/";
        
        //create a promise for get (pokemon) request
        var getPokemonData = Promise.resolve($.get(baseURL+params));
        //create a promise for get (characteristic) request
        var getCharacteristicData = Promise.resolve($.get(baseURL+addlParams));

        Promise.all([getPokemonData, getCharacteristicData]).then(function(values){ // process the data, show on page
            showPokemonInfo(values);
        }).catch(function(xhrObj){ // show error message
            $("#pokedex").html(errorMsg);
            $("#pokemon-info").slideDown("fast");
        });
    });
});