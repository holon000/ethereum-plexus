$( document ).ready( function() {
    
    $(".scroll").click(function (event) {
        console.log('ready!');
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
        }, 750, 'swing');
    });
});
