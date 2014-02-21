$( document ).ready( function() {
    
    $(".scroll").click(function (event) {
        event.preventDefault();
        //calculate destination place
        var dest = 0;
        if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
            dest = $(document).height() - $(window).height();
        } else {
            dest = $(this.hash).offset().top;
        }
        //go to destination
        console.log(dest);
        $('html,body').animate({
            scrollTop: dest
        }, 400, 'swing');
    });

    $(".scrolltop").click(function() {
      $("html, body").animate({ scrollTop: 0 }, 400, "swing");
      return false;
    });
    $('#countdown').countdown({
        until: new Date(2014, 03-1, 01),
        padZeroes: true,
    });
});
