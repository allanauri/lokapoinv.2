(function($){
  $(function(){
    document.querySelector('#showpass').addEventListener('click', function (){
      var x = document.getElementById("passlogin");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    });

    document.querySelector('#showpass2').addEventListener('click', function (){
      var x = document.getElementById("passsignup");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    });

    document.querySelector('#login').addEventListener('click', function (){
      var email = $('#emaillogin').val();
      var password = $('#passlogin').val();
      $.post("/",{
        email: email,
        pass: password
      }, function(data){
        //$.redirect("/", {email: email, pass: password}, "POST");
        window.location.replace("/");
      });
    });

    document.querySelector('#register').addEventListener('click', function (){
      var email = $('#emailsignup').val();
      var password = $('#passsignup').val();
      var fname = $('#fnamesignup').val();
      var lname = $('#lnamesignup').val();
      $.post("/register",{
        email: email,
        pass: password,
        fname: fname,
        lname: lname
      }, function(data){
        alert('User berhasil terdaftar!');
      });
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space
