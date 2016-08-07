var list = $('[data-animate]');
var	needToAnimate = list.length;
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
	var currentForm = 0;
	var forms = $('.question');
	$('.question form').submit(function(e){
		e.preventDefault();
		$('.question.active').removeClass('active');
		forms.eq(currentForm + 1).addClass('active');
		currentForm++;
	});
	$('.question button.button').click(function(){
		$('.active-form').removeClass('active');
		resetForms();
		forms.eq(0).addClass('active');
		currentForm = 0;
	});
	$('.go-back a').click(function(e){
		e.preventDefault();
		$('.active-form').removeClass('active');
		forms.eq(currentForm - 1).addClass('active');
		currentForm--;
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
			if (scrollTop >= $(this).offset().top - $(window).height() - 10) {
				var cls = $(this).data('animate');
				if (!$(this).hasClass(cls)) {
					$(this).addClass(cls);
				}
			}
		});
	}
});