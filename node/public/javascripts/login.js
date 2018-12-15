(function($){
  $(function(){
    document.querySelector('#login').addEventListener('click', function (){
      var email = $('#emaillogin').val();
      var password = $('#passlogin').val();
      $.post("/",{
        email: email,
        pass: password
      }, function(data){
        $.redirect("/", {email: email, pass: password}, "POST");
      });
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space
