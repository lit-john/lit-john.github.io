/*
   * I like to create a variable that holds the URL of the server that I am going to make the
   * Ajax calls to. If every I change server I just need to change this variable. Notice the 
   * URL doesn't start with 'http:' this is because the user may be viewing hthe web site on 
   * 'https:' which means my Ajax calls have to be over https also. By doing what I do below, 
   * whatever protocol is being used by the user will also be used for the Ajax call.
   */
  var endPoint = "//obscure-forest-2112.herokuapp.com";

 /* 
 * The following jQuery function gets called when the HTML DOM is ready to be inspected and manipulated
 * by javascript.
 */
$(document).ready(function(){ 
  
  /*
   * Ok, so the DOM is ready. I'm going to make an Ajax call to my Heroku app to "wake it up" so
   * that when I make a "real" Ajax call the app will be awake and will respond quickly.
   */
  $.ajax({type: "GET", url:  endPoint + "/api/wakeup"}).done(function(response) {
    // Don't really care what the response is, I just wanted to wake up te app
    console.log("Node app message : " + response.message);
  }).fail(function (msg) {
    console.log("Ajax /wakeup fail: " + JSON.stringify(msg));
  });
  
  
  
   /*
    * The following is a click event listener for the button element with the id button-one
    */
   $('button#button-one').click(function(){
     
     $.ajax({
        type: "POST",
        url: endPoint + "/api/"
      }).done(function( data ) {
          /*
           * Remember that this javascript is running in the browser (not the server) so when
           * the code logs to the console it is logging to the browser console.
           */
          console.log( "Received server response: " + data.content );
          $('#button-one-response').html(data.htmlContent);
        }).fail(function(msg){
          console.log("Ajax fail: " + JSON.stringify(msg));
          $('#button-one-response').html('<div class="error">Oops we\'ve got an error: <pre>' + JSON.stringify(msg) + '</pre></div>');
        });
      });
  
  $('button#add-user-comment').click(function(){
    
    $.ajax({
      type: "POST",
      data: "comment=Hello how are you",
      url: endPoint + "/api/userComments"
    }).done(function(response){
       $('div#user-comments').html(response.message);
    }).fail(function(msg){
      console.log("Ajax fail for /api/userComments: " + JSON.stringify(msg));
      $('div#user-comments').html('<div class="error">Oops we\'ve got an error: <pre>' + JSON.stringify(msg) + '</pre></div>');
    });
    
  });
  
});

function getUserMessages(){
  $.ajax({
    type: "GET",
    url: endpoint + "/api/userComments"
  }).done(function(response){
    console.log("Got a response from Ajax call /api/userComments")
    $('div#user-comments').html(response.message);
  }).fail(function(msg){
     console.log("Ajax fail for /api/getUserComments: " + JSON.stringify(msg));
     $('div#user-comments').html('<div class="error">Oops we\'ve got an error: <pre>' + JSON.stringify(msg) + '</pre></div>');
  });
}