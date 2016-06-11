window.onload = function() {
  console.log("App started");

  requestCall("http://pokeapi.co/api/v2/",main);
}

//MAIN FUNCTION **************************

var main = function(pokemonsWorld) {
 console.log(pokemonsWorld);
 requestCall(pokemonsWorld["pokemon-species"]+"?limit=721&offset=0", getPokemons);
 printPersist();
 
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
  console.log(pokemon.name);

  requestImage(pokemon.name);
  persist(pokemon)
}

//****************************************

//ADD IMAGE TO BACKGROUND*****************
var addImage = function(object, pokemonName) {
  var body = document.getElementsByTagName('body')[0];
  console.log(body);
  var http;
 for (var i = 0; i < object.body.length; i++) {
   if(object.body[i]["pokemon-name"].toLowerCase() === pokemonName) {
    body.style.backgroundImage = "url(" + object.body[i]['image-url'] + ")"
    http = object.body[i]['image-url'];
    
    var pokemon = JSON.parse(localStorage.getItem('pokemon')) || {};
    pokemon.imageUrl = http;
    pokemon.imageUrl = JSON.stringify(http);
    localStorage.setItem('pokemon-imageUrl', pokemon.imageUrl );
   }
 }
  
 
}
//****************************************

//PERSIST DATA****************************
var printPersist = function() {
  var pokemon = JSON.parse(localStorage.getItem('pokemon')) || "";
  var imageUrl = JSON.parse(localStorage.getItem('pokemon-imageUrl')) || "";
  if(pokemon) {
     //Get and  create HTML elements
     var body = document.getElementsByTagName('body')[0];
     var div = document.getElementById("description");
     var heading = document.getElementById("heading");
     var parHabitat = document.getElementById("habitat");
     var parGrowthRate = document.getElementById("growth-rate");
     var parColor = document.getElementById("color");
     var parCaptureRate = document.getElementById("capture-rate");
     var parFlavorText = document.getElementById("description-text");
     

     //Update HTML elements

     heading.innerText = pokemon.name;
     parHabitat.innerText = pokemon.habitat;
     parGrowthRate.innerText = pokemon.growthRate;
     parColor.innerText = pokemon.color;
     parCaptureRate.innerText = pokemon.captureRate;
     parFlavorText.innerText = pokemon.flavorText;

     body.style.backgroundImage = "url(" + imageUrl + ")"
     div.style.display = "inline-block";
     
  } 


}

var persist = function( value ) {
  var pokemon = JSON.parse(localStorage.getItem('pokemon')) || {};
  pokemon.name = value.names[0].name;
  pokemon.habitat = value.habitat.name;
  pokemon.growthRate = value.growth_rate.name;
  pokemon.color = value.color.name;
  pokemon.captureRate = value.capture_rate;
  pokemon.flavorText = value.flavor_text_entries[1].flavor_text;
  pokemon = JSON.stringify(pokemon);
  localStorage.setItem('pokemon', pokemon );
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

//REQUEST POKEMONS IMAGE ***********
var requestImage = function(pokemonName) {
   var url = "https://www.tablerig.com/tables/calpaterson/pokemon-with-images";
   var request = new XMLHttpRequest();

   request.open("Get", url);
    var result;
    
   request.onload = function() {
     
     if(request.status === 200) {
      console.log("got the data");
      var jsonString = request.responseText;
       result = JSON.parse(jsonString);
       addImage(result,pokemonName);
     }
   }
  request.send(null);
}
//*********************************



















