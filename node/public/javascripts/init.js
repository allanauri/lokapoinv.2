(function($){
  $(function(){

    $('.sidenav').sidenav({edge:'right'});
    $('.parallax').parallax();
    $(".dropdown-trigger").dropdown();
    $('.slider').slider({indicators: false,height: 500});
    $('.modal').modal();
    //$('.carousel').carousel();
  }); // end of document ready
})(jQuery); // end of jQuery name space
