// Avoid `console` errors in browsers that lack a console.
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}
// jQuery.event.swipe


// jQuery.event.swipe
// 0.5
// Stephen Band

// Dependencies
// jQuery.event.move 1.2

// One of swipeleft, swiperight, swipeup or swipedown is triggered on
// moveend, when the move has covered a threshold ratio of the dimension
// of the target node, or has gone really fast. Threshold and velocity
// sensitivity changed with:
//
// jQuery.event.special.swipe.settings.threshold
// jQuery.event.special.swipe.settings.sensitivity

(function(module) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], module);
    } else {
        // Browser globals
        module(jQuery);
    }
})(function(jQuery, undefined) {
    var add = jQuery.event.add,

        remove = jQuery.event.remove,

        // Just sugar, so we can have arguments in the same order as
        // add and remove.
        trigger = function(node, type, data) {
            jQuery.event.trigger(type, data, node);
        },

        settings = {
            // Ratio of distance over target finger must travel to be
            // considered a swipe.
            threshold: 0.4,
            // Faster fingers can travel shorter distances to be considered
            // swipes. 'sensitivity' controls how much. Bigger is shorter.
            sensitivity: 6
        };

    function moveend(e) {
        var w, h, event;

        w = e.target.offsetWidth;
        h = e.target.offsetHeight;

        // Copy over some useful properties from the move event
        event = {
            distX: e.distX,
            distY: e.distY,
            velocityX: e.velocityX,
            velocityY: e.velocityY,
            finger: e.finger
        };

        // Find out which of the four directions was swiped
        if (e.distX > e.distY) {
            if (e.distX > -e.distY) {
                if (e.distX / w > settings.threshold || e.velocityX * e.distX / w * settings.sensitivity > 1) {
                    event.type = 'swiperight';
                    trigger(e.currentTarget, event);
                }
            } else {
                if (-e.distY / h > settings.threshold || e.velocityY * e.distY / w * settings.sensitivity > 1) {
                    event.type = 'swipeup';
                    trigger(e.currentTarget, event);
                }
            }
        } else {
            if (e.distX > -e.distY) {
                if (e.distY / h > settings.threshold || e.velocityY * e.distY / w * settings.sensitivity > 1) {
                    event.type = 'swipedown';
                    trigger(e.currentTarget, event);
                }
            } else {
                if (-e.distX / w > settings.threshold || e.velocityX * e.distX / w * settings.sensitivity > 1) {
                    event.type = 'swipeleft';
                    trigger(e.currentTarget, event);
                }
            }
        }
    }

    function getData(node) {
        var data = jQuery.data(node, 'event_swipe');

        if (!data) {
            data = {
                count: 0
            };
            jQuery.data(node, 'event_swipe', data);
        }

        return data;
    }

    jQuery.event.special.swipe = jQuery.event.special.swipeleft = jQuery.event.special.swiperight = jQuery.event.special.swipeup = jQuery.event.special.swipedown = {
        setup: function(data, namespaces, eventHandle) {
            var data = getData(this);

            // If another swipe event is already setup, don't setup again.
            if (data.count++ > 0) {
                return;
            }

            add(this, 'moveend', moveend);

            return true;
        },

        teardown: function() {
            var data = getData(this);

            // If another swipe event is still setup, don't teardown.
            if (--data.count > 0) {
                return;
            }

            remove(this, 'moveend', moveend);

            return true;
        },

        settings: settings
    };
}); 

// Place any jQuery/helper plugins in here.
$(document).ready(function() {
 
  $("#quote").owlCarousel({
    navigation: true,
    items: 1,      
    itemsDesktop : false,
    itemsDesktopSmall : false,
    itemsTablet: false,
    itemsMobile : false,
    pagination: true,
    goToFirst: false
  }); 

  $("#instagram").owlCarousel({
    navigation: false,
    items: 4,      
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [979,3],
    itemsTablet: [768, 2],
    itemsMobile : [480, 1],
    pagination: true,
    goToFirst: false
  });
 
  $("#flickr").owlCarousel({
    navigation: true,
    items: 2,      
    itemsDesktop : [1199,2],
    itemsDesktopSmall : [979,1],
    itemsTablet: [768, 1],
    itemsMobile : [480, 1],
    pagination: true,
    goToFirst: false
  });
 
});