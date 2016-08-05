var list = $('[data-animate]');
var needToAnimate = $('[data-animate]').length;
$(document).ready(function () {
	console.log($('.right-side')[0].clientHeight);
	var contentHeight = $('.right-side')[0].clientHeight;
	$('#hero').css('height', contentHeight);
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
	$('#create-account').submit(function(e){
		e.preventDefault();
		$('#log-in').removeClass('active');
		$('#check-number').addClass('active');
	});
	$('#phone-number').submit(function(e){
		if ($('#number')[0].value === '') {
			e.preventDefault();
			$('.atten-box').addClass('active');
		}
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
$(window).scroll(function(){
	if (needToAnimate > $('[class*="fadeIn"]').length) {
		var scrollTop = $(window).scrollTop();
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