window.onload = function() {
  var url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDcewjcNWr02P6fuioswBb5sya93AasbWc&cx=010284551349995783765:wkbvm2xpi5m&searchType=image&q=Charmeleon";
  
  var request = new XMLHttpRequest();

  request.open("Get", url);
   var result;
   
  request.onload = function() {
    
    if(request.status === 200) {
     console.log("got the data");
     var jsonString = request.responseText;
      result = JSON.parse(jsonString);
      console.log(result);
    }
  }
 request.send(null);
}


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

