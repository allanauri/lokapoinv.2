(function($){
  $(function(){

    document.querySelector('#submithost').addEventListener('click', function (){
      var email = $('#email').val();
      var nama = $('#nama').val();
      var alamat = $('#alamat').val();
      var phone = $('#phone').val();
      var nama_pro = $('#nama_pro').val();
      var alamat_pro = $('#alamat_pro').val();
      if(confirm('The data was right and your fully responsible with it?')) {
        $.ajax({
        	type: "post",
        	url:  "/host",
          data: {email: email, nama: nama, alamat: alamat, phone: phone, nama_pro: nama_pro, alamat_pro: alamat_pro},
          datatype: "json",
        	success: function(msg){
              	alert(msg.alert);
                window.location.replace('/host');
        	},
        	error: function(XMLHttpRequest, textStatus, errorThrown) {
           		alert("Please fill the form first!");
      		    console.log(errorThrown);
        	}
        });
        } else {
        // Do nothing!
        }
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space
