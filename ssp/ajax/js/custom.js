/* 
 * The following jQuery function gets called when the HTML DOM is ready to be inspected and manipulated
 * by javascript.
 */
$(document).ready(function(){
 
  /*
   * I like to create a variable that holds the URL of the server that I am going to make the
   * Ajax calls to. If every I change server I just need to change this variable. Notice the 
   * URL doesn't start with 'http:' this is because the user may be viewing hthe web site on 
   * 'https:' which means my Ajax calls have to be over https also. By doing what I do below, 
   * whatever protocol is being used by the user will also be used for the Ajax call.
   */
  var endPoint = "//obscure-forest-2112.herokuapp.com";
  
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

});