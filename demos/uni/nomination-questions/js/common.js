var list = $('[data-animate]');
var needToAnimate = $('[data-animate]').length;
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

	$('[name="log-in"]').submit(function(e){
		e.preventDefault();
		$('#log-in').removeClass('active');
		$('#check-number').addClass('active');
	});
	$('[name="phone-number"]').submit(function(e){
		e.preventDefault();
		if ($('#number')[0].value === '') {
			$(this).parent().find('.atten-box').addClass('active');
		}
		else {
			$('#check-number').removeClass('active');
			$('#check-code').addClass('active');
			$('#hero')[0].className = 'img-2';
			$('#forms').removeClass('active');
			$('#questionnaire').addClass('active');
		}
		
	});
	$('[name="verification-code"]').submit(function(e){
		e.preventDefault();
		if ($('#code')[0].value === '') {
			$(this).parent().find('.atten-box').addClass('active');
		}
		else {
			$('#check-code').removeClass('active');
			$('#refer').addClass('active');
		}
		
	});
	$('#skip').click(function(){
		$('.modal').fadeIn(500);
		setTimeout(function(){
			$('#hero')[0].className = 'img-3';
			$('#refer').removeClass('active');
			$('#done').addClass('active');
			$('.modal').fadeOut(1000);
		}, 600);
		return false;
	});
	// questionaire

	var currentForm = 0;
	var forms = $('#content .question');
	$('#content .question form').not('#last-form').submit(function(e){
		e.preventDefault();
		$('.question.active').removeClass('active');
		forms.eq(currentForm + 1).addClass('active');
		$('#progress').removeClass('q-' + (currentForm + 1));
		$('.step').eq(currentForm).removeClass('current').addClass('done');
		currentForm++;
		$('.step').eq(currentForm).addClass('current');
		$('#progress').addClass('q-' + (currentForm + 1));
	});
	$('#last-form').submit(function(e){
		e.preventDefault();
		$('#questionnaire').removeClass('active');
		$('#forms').addClass('active');
	});
	$('#questionnaire .go-back').click(function(e){
		e.preventDefault();
		$('.question.active').removeClass('active');
		$('.step.current').removeClass('current');
		$('#progress').removeClass('q-' + (currentForm + 1));
		currentForm--;
		$('#progress').addClass('q-' + (currentForm + 1));
		$('.step').eq(currentForm).removeClass('done');
		$('.step').eq(currentForm).addClass('current');
		forms.eq(currentForm).addClass('active');
	});
	$('.variant.radio i').click(function(){
		$(this).parent().parent().find('input:checked').prop('checked', false);
		$(this).parent().find('input').prop('checked', true);
	});
	$('.variant.checkbox i').click(function(){
		var checked = $(this).parent().find('input').prop('checked');
		checked = !checked;
		$(this).parent().find('input').prop('checked', checked);
	});

	// end questionaire
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