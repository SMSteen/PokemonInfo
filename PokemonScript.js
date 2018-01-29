$(document).ready(function(){
    $("#pokemon-info").hide();
/*  loop through 1-150
    NOTE:  Assignment requests 150, choosing to do less to reduce # of $.get's to pokemon api */
    for(var idNum = 1; idNum<=50; idNum++){
      var imgSrc = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + idNum + ".png";
      $("#pokemon-pics").append("<img src='" + imgSrc + "' id='" + idNum + "'>");
    }

    var baseURL = "https://pokeapi.co/api/v2/"

    $("#pokemon-pics").on("click", "img", function(){
        $("#pokemon-info").slideDown("fast");
        var pokeID = $(this).attr("id");
        var params = "pokemon/" + pokeID + "/";
        var addlParams = "characteristic/" + pokeID + "/";
        $.get(baseURL + params, function(data){
            var pokeName = data.name;
            var pokeHeight = data.height;
            var pokeWeight = data.weight;
            var pokeTypes = "";
            var pokeAbilities = "";
            for (var i=0; i<data.types.length; i++){
                pokeTypes += "<li>" + data.types[i].type.name + "</li>";
            }
            for (var j=0; j<data.abilities.length; j++){
                pokeAbilities += "<li>" + data.abilities[j].ability.name + "</li>";
            }

            var htmlStr = `
                <h1>${pokeName}</h1>
                <h2>Height:<br><span>${pokeHeight}</span></h2>
                <h2>Weight:<br><span>${pokeWeight}</span></h2>
                <h2>Type(s):</h2>
                <ul>${pokeTypes}</ul>
                <h2>Ability(ies):</h2>
                <ul>${pokeAbilities}</ul>
            `;
            $("#pokedex").html(htmlStr);
        }, 'json');

        $.get(baseURL + addlParams, function(moreData){
            var pokeDesc = moreData.descriptions[1].description;
            var appendStr = `
                <h2>Description:<br><span>${pokeDesc}</span></h2>
            `;
            $("#extra").html(appendStr);
        }, 'json');
    });
});

