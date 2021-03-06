// insert the logo also on the navbar for the bootstrap menu
// this ensures that switching from portrait to landscape is without any flash since
// we can show and hide with css
window.jQuery(document).ready(function($){
    var $navbar_header = $(".navbar-header");
    $("#portal-logo-link").clone().attr('id', 'portal-logo-link-header').prependTo($navbar_header);

    $(window).one('results_ready', function() {
        // show and hide remove icon on hovering over added filters
        $("#facetview_selected_filters").on("hover", ".facetview_selection", function(){
            $(this).find('i').toggleClass('hidden');
        }, function(){
            $(this).find('i').toggleClass('hidden');
        });

        $('#facetview_rightcol').on('hover', '.eea-tileBody', function() {
            var $this = $(this);
            var $eea_tile_head = $this.prev();
            var $description = $this.find('.eea-tileDescription');
            if (!$description.html()) {
                return;
            }
            $eea_tile_head.find('.eea-tileThumb').toggleClass('eea-tileHovered');
            $description.stop().animate({
                height: "toggle",
                opacity: 'toggle'
            });
        });
    });

    if ($.fn.Lazy) {
        $(window).on('results_ready', function() {
                $(".lazyLoad").Lazy();
        });
    }

    $("#facetview_selected_filters").on("mouseenter",".facetview_selection", function (ev) {
        $(ev.target).find(".eea-icon-times").removeClass("hidden");
    }).on("mouseleave",".facetview_selection", function (ev) {
        $(ev.target).find(".eea-icon-times").addClass("hidden");
    });

    $.ajax({
        url: window.location.origin + "/marine",
        method: "GET",
        xhrFields: {
          withCredentials: true
       },
        success: function ( data,  textStatus, jqXHR) {
            $(".login-container").prepend( $(data).find(".login-container > a") );
            $(".login-container > ul").replaceWith( $(data).find(".login-container > ul") );
            $("body").append($(data).find(".footer"));

        }
    });
    
});

