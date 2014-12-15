$(document).ready(function () {

    /*
     * scroll down btn
     * */
    var scrollPos = parseInt($('.header-slide').outerHeight(true));
    $('#scroll-down').on('click', function () {
        $('html, body').animate({scrollTop: scrollPos}, {duration: '2000', easing: 'swing'});
        return false;
    });

    $.easing.easeInOutQuint = function (x, t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t * t * t + 2) + b;
    };

    $('#to-feedback-btn').on('click', function () {
        var feedbackOffset = $('#feedback-line').offset();
        if ($(window).width() >= 800) {
            $('html, body').animate({scrollTop: feedbackOffset.top}, {duration: 1500, easing: 'easeInOutQuint'});
        } else {
            $('html, body').animate({scrollTop: feedbackOffset.top}, {duration: 0, easing: 'linear'});
        }

        return false;
    });


/*
 * slider
 * temporay disabled , no client reviews
 */

var options = {
    horizontal: 1,
    itemNav: 'forceCentered',
    smart: 1,
    activateMiddle: 1,
    mouseDragging: 1,
    touchDragging: 1,
    releaseSwing: 1,
    startAt: 0,
    scrollBy: 1,
    speed: 300,
    elasticBounds: 1,
    dragHandle: 1,
    dynamicHandle: 1,
    clickBar: 1,
    prevPage: '#slider-prev',
    nextPage: '#slider-next',
    cycleBy: 'items',
    cycleInterval: 20000
};
$('#slider').sly(options);


/*
 simple parallax
 */

var i = 0;
var spreadRange = $(window).height();
var parallaxRange = 50;
var elGroup = $('.app-slide, .webdev-slide, .design-slide');
var elLength = $(elGroup).length;
var elArray = [[0, 0]];
elArray.pop();

if ($(window).width() >= 800) {
    $(elGroup).find('.wrap').css('top', parallaxRange);
}


$(elGroup).each(function () {
    var elOffset = $(this).offset();
    var elStart = parseInt(elOffset.top - spreadRange);
    var elEnd = parseInt(elStart + $(this).outerHeight(true) + spreadRange);
    elArray.push([elStart, elEnd]);
    //alert( $(this).attr('class') + ' - ' + parseInt(elOffset.top));
});

function parallax() {
    var scrolled = $(window).scrollTop();
    for (i = 0; i < elLength; i++) {
        if ((scrolled > elArray[i][0]) && (scrolled < elArray[i][1])) {
            var scrolledI = scrolled - elArray[i][0];
            var scrolledK = parallaxRange / ( elArray[i][1] - elArray[i][0] );
            var el = $(elGroup).get(i);
            $(el).find('.wrap').css('top', parallaxRange - scrolledI * scrolledK + 'px');
        }
    }
}

$(window).scroll(function (e) {
    if ($(window).width() >= 800) {
        parallax();
    }
});
    /*
     * form animation
     */
    var formDelay = 3000;

    /*
     * form validation
     */

    var validator = $('#feedback-form').validate({
        rules: {
            'order_promotion[name]': {
                required: true,
                minlength: 3,
                maxlength: 64
            },
            'order_promotion[email]': {
                required: true,
                minlength: 3,
                maxlength: 72
            },
            'order_promotion[message]': {
                required: true,
                minlength: 30,
                maxlength: 5000
            }
        },
        messages: orderApplicationFormMessages,
        errorPlacement: function (label, element) {
            label.addClass('error-pad');
            label.insertAfter(element);
        },
        wrapper: 'div',
        debug: false,
        submitHandler: function (form) {

            $.ajax({
                url: $(form).attr('action'),
                type: "POST",
                dataType: "json",
                data: $(form).serialize(),
                beforeSend: function () {
                    $(form).find("button").prop('disabled', true);
                },
                success: function (response) {
                    if (response.status == "success") {
                        if (window.ga) {
                            ga('send', 'event', 'order', 'landing');
                        }

                        $('#feedback-form').find('.form-pad').animate({opacity: 0}, 300).delay(formDelay).animate({opacity: 1}, 300);
                        $('#feedback-form').find('.form-success').fadeIn(300).delay(formDelay).fadeOut(300);
                        $(form).trigger('reset');
                        $(form).find("button").prop('disabled', false);
                    } else {
                        alert('Error!');
                    }
                }
            });

            return false;
        }
    });

});