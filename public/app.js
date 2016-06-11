window.onload = function() {
  console.log("App started");

  requestCall("http://pokeapi.co/api/v2/",main)

  // var url = "http://pokeapi.co/api/v2/";
  // var request = new XMLHttpRequest();

  // request.open("Get", url);
   
  // request.onload = function() {
    
  //   if(request.status === 200) {
  //    console.log("got the data");
  //    var jsonString = request.responseText;
  //    var pokemons = JSON.parse(jsonString);
  //    main(pokemons);
  //   }
  // }

  // request.send(null);
  
}

//MAIN FUNCTION **************************

var main = function(pokemonsWorld) {
 console.log(pokemonsWorld);
 requestCall(pokemonsWorld["pokemon-species"]+"?limit=721&offset=0", getPokemons)
 
}
//******************************************

//CREATE POKEMONS LIST**************

var getPokemons = function(pokemonsWorld) {
  var pokemonListDiv = document.getElementById("pokemons-list");
  for (var i = 0; i < pokemonsWorld.results.length; i++) {
    var par = document.createElement('p');
    par.innerText = pokemonsWorld.results[i].name;
    par.classList.add( i + 1 );

    par.addEventListener("click", function() {
      url ="http://pokeapi.co/api/v2/pokemon-species/" + this.classList[0];
      requestCall(url,getPokemonDescription)
    });

    pokemonListDiv.appendChild(par);
  }
}

//************************************

//CREATE POKEMONS DESCRIPTION****************

var getPokemonDescription = function(pokemon) {
  //Get and  create HTML elements
  var div = document.getElementById("description");
  var heading = document.getElementById("heading");
  var parHabitat = document.getElementById("habitat");
  var parGrowthRate = document.getElementById("growth-rate");
  var parColor = document.getElementById("color");
  var parCaptureRate = document.getElementById("capture-rate");
  var parFlavorText = document.getElementById("description-text");
  

  //Update HTML elements

  heading.innerText = pokemon.names[0].name;
  parHabitat.innerText = pokemon.habitat.name;
  parGrowthRate.innerText = pokemon.growth_rate.name;
  parColor.innerText = pokemon.color.name;
  parCaptureRate.innerText = pokemon.capture_rate;
  parFlavorText.innerText = pokemon.flavor_text_entries[1].flavor_text;

  div.style.display = "inline-block";
 
}

//****************************************







//REQUEST FUNCTION ****************

var requestCall = function(url,callBack) {
  var url = url;
  var request = new XMLHttpRequest();

  request.open("Get", url);
   var result;
   request.send(null);
  request.onload = function() {
    
    if(request.status === 200) {
     console.log("got the data");
     var jsonString = request.responseText;
      result = JSON.parse(jsonString);
      callBack(result);
    }
  }

}

//***************************************
