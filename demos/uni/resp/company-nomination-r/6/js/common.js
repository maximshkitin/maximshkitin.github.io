var list = $('[data-animate]');
var needToAnimate = $('[data-animate]').length;
var deviceWidth = $(window).width();
var topHeight = $('.top-navbar').outerHeight();
var resetForms = function() {
	var formList = $('.form-item');
	formList.map(function(){
		$(this)[0].value = '';
	});
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
	$('.hamburger-menu').click(function(){
		$('#main-nav').toggleClass('open');
		$('.navbar').toggleClass('menu-open');
	});
	$('.i-hover').hover(function(){
		$(this).parent().parent().find('.hint').toggleClass('active');
	});



	$('#last').click(function(){
		$('.modal').fadeIn(700);
		setTimeout(function(){
			window.location.replace('../7/index.html');
		},700);
	});
	$('.go-back').click(function(){
		$('.modal').fadeIn(700);
		setTimeout(function(){
			window.location.replace('../5/index.html');
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
$(window).on('resize', function(){
	deviceWidth = $(window).width();
	topHeight = $('.top-navbar').outerHeight();
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
	var scrollTop = $(window).scrollTop();
	if (deviceWidth < 1199) {
		if (scrollTop >= topHeight) {
			$('.navbar').addClass('sticky');
			$('#content').addClass('has-sticky');
		}
		else {
			$('.navbar').removeClass('sticky');
			$('#content').removeClass('has-sticky');
		}
	}


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