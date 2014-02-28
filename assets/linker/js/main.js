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

    var map = $('#philoimg');
    var inArea = false;
    var single_opts = {};
    var all_opts = {};
    var initial_opts = {
      mapKey: 'data-name',
      isSelectable: false,
      onMouseover: function (data) {
        inArea = true;
        var target = '#' + data.key;
        setChildrenHidden('#philotexts');
        $(target).fadeToggle(700).removeClass('hidden');
      },
      onMouseout: function (data) {
        inArea = false;
      }
    };
    opts = $.extend({}, all_opts, initial_opts, single_opts);
    map.mapster('unbind')
        .mapster(opts)
        .bind('mouseover', function () {
            if (!inArea) {
                map.mapster('set_options', all_opts)
                    .mapster('set', true, 'all')
                    .mapster('set_options', single_opts);
            }
        }).bind('mouseout', function () {
            if (!inArea) {
                map.mapster('set', false, 'all');
            }
            
        });

    var setChildrenHidden = function(selector) {
      var children = $(selector).children();
      $.each(children, function(index, value){
        if (! $(value).hasClass('hidden')) {
          $(value).addClass('hidden');
        }
      });
    }

    $('#how button.paging.prev').click(function(){updateFeature(-1)});
    $('#how button.paging.next').click(function(){updateFeature(1)});

    var updateFeature = function(direction) {
      //direction should be a positive or negative value to indicate how many elements to walk, i.e. 2 for forwards 2, -1 for backwards
      var children = $('#content-circle').children();
      var maxIndex = children.length - 1;
      var currentIndex = 0;

      // get shown item. does nit handle multiple shown well yet
      $.each(children, function(index, value){
        if ($(value).hasClass('active')) {
          currentIndex = index;
          $(value).fadeOut('fast',function(){
            $(value).removeClass('active');
            $(children[newIndex]).fadeIn('slow',function(){
              $(children[newIndex]).addClass('active');
            });
          });
        }
      });

      var newIndex = currentIndex + direction;
      if (newIndex <= 0) {
        newIndex = 0;
        $('#how button.paging.prev').prop('disabled', true);
      } else if (newIndex >= maxIndex) {
        newIndex = maxIndex;
        $('#how button.paging.next').prop('disabled', true);
      } else {
        $('#how button.paging.prev').prop('disabled', false);
        $('#how button.paging.next').prop('disabled', false);
      }
     
    }
    $('img[usemap]').rwdImageMaps();
    $(".video-responsive").fitVids();
    $('#news-slider').liquidSlider({
       autoSlide: false,
       dynamicTabs: true,
       dynamicArrows: false,
    });
    $('#who-slider').liquidSlider({
       autoSlide: true,
       dynamicTabs: false,
       dynamicArrows: true,
    });
    
});
