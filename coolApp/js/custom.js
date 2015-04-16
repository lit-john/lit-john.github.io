$(document).ready(function() {
  
  function getAllNames() {
    $.ajax({
      method: "GET",
      url: "//obscure-tundra-3047.herokuapp.com/api/allNames"
    }).done(function(response) {
      console.log(response.allNames);
      
      var theNamesHtml = "<ul id=\"allNames\">";
      
      for (var i=0; i < response.allNames.length; i++) {
        theNamesHtml += "<li>" + response.allNames[i] + "</li>";
      }
      
      theNamesHtml += "</ul>"
      
      $('div#my-name-response').html(theNamesHtml);
      
      setTimeout(getAllNames, 1000);
      
    }).fail(function(msg) {
      console.log(msg);
    });
    
    
  }
  
  getAllNames();
  
  
  
  
  $('button#your-name-button').click(function(){
    
    console.log("your-name-button clicked");
    
    $.ajax({
      method: "GET",
      url: "//obscure-tundra-3047.herokuapp.com/api/yourName"
    }).done(function(response) {
      
      console.log(response.name);
      
      $('div#your-name').html("<p>"+response.name+"</p>");
      
    }).fail(function(mgs) {
      
    });
    
  });
  
  
  
  
  $('button#button-my-name').click(function() {
    console.log("button-my-name clicked");
    
    var theName = $('input#myName').val();
    $('input#myName').val("");
    
    $.ajax({
      method: "POST",
      data : {myName: theName},
      url: "//obscure-tundra-3047.herokuapp.com/api/myName"
    }).done(function(response) {
      console.log(response.allNames);
      
      var theNamesHtml = "<ul id=\"allNames\">";
      
      for (var i=0; i < response.allNames.length; i++) {
        theNamesHtml += "<li>" + response.allNames[i] + "</li>";
      }
      
      theNamesHtml += "</ul>"
      
      $('div#my-name-response').html(theNamesHtml);
    }).fail(function(msg) {
      console.log(msg);
    });
  });
  
});






