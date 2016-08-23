var list = $('[data-animate]');
var needToAnimate = $('[data-animate]').length;
var deviceWidth = $(window).width();
$(document).ready(function () {
	if ($(window).height() > 850 && deviceWidth >= 1240) {
		$('html, body').addClass('fullscreen');
	}
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
	$('.click-button').click(function(){
		if ($(this).hasClass('share')) {
			$('.pop-up.share-networks').addClass('active');
		}
	});
	// $('.pop-up .go-back').click(function(){
	// 	$('.pop-up.share-link').fadeOut(500);
	// 	setTimeout(function(){
	// 		$('.pop-up.share-link').removeClass('active');
	// 		$('.pop-up.share-networks').addClass('active');
	// 	},500);
	// 	return false;
	// });
	// $('.mail-link').click(function(){
	// 	$('.pop-up.share-link').addClass('active');
	// 	return false;
	// });
	$('.pop-up .done').click(function(){
		$('.pop-up.share-link').fadeOut(500);
		$('.pop-up.share-networks').fadeOut(500);
		setTimeout(function(){
			$('.pop-up').removeClass('active');
		},500);
		
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
	$('.modal').fadeOut(1200);
});
$(window).on('resize', function(){
	deviceWidth = $(window).width();
});
$(window).scroll(function(){
	var scrollTop = $(window).scrollTop();
	if (needToAnimate > $('[class*="fadeIn"]').length) {
		list.map(function() {
			if (scrollTop >= $(this).offset().top - $(window).height() + 30) {
				var cls = $(this).data('animate');
				if (!$(this).hasClass(cls)) {
					$(this).addClass(cls);
				}
			}
		});
	}
});