(function($){
  $(function(){
    var trigger =0;
    document.querySelector('#editprofile').addEventListener('click', function (){
      if(trigger==0){
        document.getElementById('editprofile').innerHTML="<b>Save</b>";
        document.getElementById("email").disabled = false;
        document.getElementById("username").disabled = false;
        document.getElementById("date").disabled = false;
        document.getElementById("phone").disabled = false;
        trigger = 1;
      }
      else{
        var username = $('#username').val();
        var email = $('#email').val();
        var date = $('#date').val();
        var phone = $('#phone').val();
        var id = $('#id').val();

        $.post("/account",{
          id: id,
          username: username,
          email: email,
          date: date,
          phone: phone
        }, function(data){
          alert('berhasil');
          window.location.replace("/account");
        });
        document.getElementById('editprofile').innerHTML="<b>Edit Profile</b>";
        document.getElementById("email").disabled = true;
        document.getElementById("username").disabled = true;
        document.getElementById("date").disabled = true;
        document.getElementById("phone").disabled = true;
        trigger = 0;
      }
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space
