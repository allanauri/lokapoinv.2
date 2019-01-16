(function($){
  $(function(){
    var now = new Date();
    var month = (now.getMonth() + 1);
    var day = now.getDate();
    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;
    var today = now.getFullYear() + '-' + month + '-' + day;
    $('#date').val(today);

    document.querySelector('#book').addEventListener('click', function (){
      $.ajax({
      	type: "post",
      	url:  "/house",
      	success: function(msg){
            	alert(msg.alert);
      	},
      	error: function(XMLHttpRequest, textStatus, errorThrown) {
         		alert("Username tidak terdaftar");
    		    console.log(errorThrown);
      	}
      });
      //window.location.replace("/house/book");
    });

    document.querySelector('#tanggalan').addEventListener('change', function (){
      var tanggal = document.getElementById('tanggalan').value;
      var id_rumah = document.getElementById('id_rumah').value;
      var tanggal2 = tanggal.toString();
      var id_rumah2 = parseInt(id_rumah);
      $.ajax({
      	type: "post",
        data: {tanggal: tanggal2, id_rumah: id_rumah2},
        dataType: "json",
      	url:  "/house/cekava",
      	success: function(msg){
          if(msg.alert=="ada"){
          $("#cekava").html('<h6 class="white-text center">Not Available</h6>');
          $("#cekava").css("background-color", "red");
          }
          else{
            $("#cekava").html('<h6 class="white-text center">Available</h6>');
            $("#cekava").css("background-color", "green");
          }
      	},
      	error: function(XMLHttpRequest, textStatus, errorThrown) {
         		alert("data error");
    		    console.log(errorThrown);
      	}
      });
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space
