window.onload = function() {
  var url = "http://hp-api.herokuapp.com/api/characters";
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

