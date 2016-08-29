var list = $('[data-animate]');
var needToAnimate = $('[data-animate]').length;
var deviceWidth = $(window).width();
function checkURL(s) { 
  // var regexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/   
  var regexp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  return regexp.test(s);    
}
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
		// $('.modal').fadeIn(700);
		// setTimeout(function(){
		// 	window.location.replace('../5/index.html');
		// },700);
		var currentURL = $(this).find('input').val();
		if (!checkURL(currentURL)) {
			$('form .atten-box').addClass('active');
			return false;
		}
	});
	// $('.go-back').click(function(){
	// 	$('.modal').fadeIn(700);
	// 	setTimeout(function(){
	// 		window.location.replace('../3/index.html');
	// 	},700);
	// 	return false;
	// });
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