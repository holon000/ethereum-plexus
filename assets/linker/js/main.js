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
        until: $.countdown.UTCDate(0, new Date(2014, 03-1, 01)),
        timezone: 0,
        padZeroes: true,
        layout: '<b><span class="timer-unit">{dnn}</span><span class="timer-unit-desc">{dl}</span> <span class="timer-unit-sep">:</span> <span class="timer-unit">{hnn}</span> <span class="timer-unit-desc">{hl}</span> <span class="timer-unit-sep">:</span> <span class="timer-unit">{mnn}</span> <span class="timer-unit-desc">{ml}</span> <span class="timer-unit-sep">:</span> <span class="timer-unit">{snn}</span> <span class="timer-unit-desc">{sl}</span></b>',
    });
    
        // bind using "data-key" as a mapKey, and select four states

    $('#philosophymap')
        .mapster({
            mapKey: 'data-key'
        })
        .mapster('set',true,'1,2,3,4,5');
    

    $('#how button.prev').click(function(){updateFeature(-1)});
    $('#how button.next').click(function(){updateFeature(1)});

    var updateFeature = function(direction) {
      // console.log('direction', direction);
      //direction should be a positive or negative value to indicate how many elements to walk, i.e. 2 for forwards 2, -1 for backwards
      var children = $('#content-circle').children();
      // console.log(children);
      var maxIndex = children.length - 1;
      // console.log('maxIndex', maxIndex);
      var currentIndex = 0;

      // get shown item. does nit handle multiple shown well yet
      $.each(children, function(index, value){
        // console.log(index, value);
        if (! $(value).hasClass('hidden')) {
          currentIndex = index;
          $(value).addClass('hidden');
          return;
        }
      });
      // console.log('currentIndex', currentIndex);

      var newIndex = currentIndex + direction;
      // console.log('newIndex', newIndex);
      if (newIndex <= 0) {
        // console.log('newIndex <= 0');
        newIndex = 0;
        $('#how button.prev').prop('disabled', true);
      } else if (newIndex >= maxIndex) {
        // console.log('newIndex >= maxIndex');
        newIndex = maxIndex;
        $('#how button.next').prop('disabled', true);
      } else {
        // console.log('else');
        $('#how button.prev').prop('disabled', false);
        $('#how button.next').prop('disabled', false);
      }

      $(children[newIndex]).removeClass('hidden');

    }
});
