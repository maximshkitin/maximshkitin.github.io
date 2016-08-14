var list = $('[data-animate]');
var needToAnimate = $('[data-animate]').length;
var deviceWidth = $(window).width();
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
	$('form').submit(function(){
		$('.modal').fadeIn(700);
		setTimeout(function(){
			window.location.replace('../4/index.html');
		},700);
		return false;
	});
	$('.variant.radio').click(function(){
		$(this).find('input:checked').prop('checked', false);
		$(this).find('input').prop('checked', true);
	});
	$('.variant.checkbox').click(function(){
		var checked = $(this).find('input').prop('checked');
		checked = !checked;
		$(this).find('input').prop('checked', checked);
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