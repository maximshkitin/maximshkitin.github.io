var list = $('[data-animate]');
var firstLoad = $('[data-animate="loaded"]').length;
var	needToAnimate = list.length - firstLoad;
$(document).ready(function () {
	$('.to-top a').click(function(){
		var isSafari = /safari/.test(navigator.userAgent.toLowerCase());
		if (isSafari) {
	 		$('body').animate({ scrollTop: 0 }, 500);
		} 
	    else {
	     	$('html').animate({ scrollTop: 0 }, 500);
	    }
		return false;
	});
});
$(window).bind('load', function(){
	var scrollTop = $(window).scrollTop();
	list.map(function() {
		if (scrollTop >= $(this).offset().top - $(window).height()) {
			var cls = $(this).data('animate');
			$(this).addClass(cls);
		}
	});
});
$(window).scroll(function(){
	if (needToAnimate > 0) {
		var scrollTop = $(window).scrollTop();
		list.map(function() {
			if (scrollTop >= $(this).offset().top - $(window).height() - 10) {
				var cls = $(this).data('animate');
				if (!$(this).hasClass(cls)) {
					$(this).addClass(cls);
					needToAnimate--;
				}
			}
		});
	}
});