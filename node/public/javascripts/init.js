(function($){
  $(function(){

    $('.sidenav').sidenav({edge:'right'});
    $('.parallax').parallax();
    $(".dropdown-trigger").dropdown();
    $('.slider').slider({indicators: false,height: 500});
    $('.modal').modal();

    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var date = new Date(year, month, day);

    $('.datepicker').datepicker({minDate: date, autoClose : true, format: 'yyyy-mm-dd'});
    //$('.carousel').carousel();
  }); // end of document ready
})(jQuery); // end of jQuery name space
