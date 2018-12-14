(function($){
  $(function(){
    document.querySelector('#login').addEventListener('click', function (){
      var email = $('#email').val();
      var password = $('#password').val();
      var level = $('#level').val();
      $.post("/login",{
        email: email,
        pass: password,
        lvl: level
      }, function(data){
        if(data.alert!==undefined){
            alert(data.alert);
          }
          else{
            $.redirect("/", {email: email, pass: password, lvl: level}, "POST");
          }
      });
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space
