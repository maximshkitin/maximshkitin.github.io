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

	// editable table
	var newValue;
	var input, currentValue, previousValue;
	$('td .display').click(function(){
		$(this).removeClass('active');
		if ($('td .edit.active').length > 0) {
			var editted = $('td .edit.active');
			editted.removeClass('active');
			editted.parent().find('.display').addClass('active');
			newValue = '';
		}
		
		input = $(this).parent().find('.edit').find('input');
		var text = $(this).find('span').text();
		$(this).parent().find('.edit').find('input').attr('value', text);
		$(this).parent().find('.edit').addClass('active');
	});
	$('td .edit .save').click(function(){
		currentValue = newValue;
		if ((currentValue != previousValue && newValue != '') || 
			(previousValue === undefined && newValue != '')) {
			input = $(this).parent().find('.edit').find('input');
			var text = $(this).find('span').text();
			$(this).parent().find('.edit').find('input').prop('value', text);
			$(this).parent().parent().find('.display').find('span').html(newValue);
			previousValue = currentValue;
		}
		$(this).parent().removeClass('active');
		$(this).parent().parent().find('.display').addClass('active');
	});
	$('td .edit .cncl').click(function(){
		if ($(this).parent().find('select').length > 0) {
			var select = $(this).parent().find('select');
			var val = select.val();
			var oldText = $(this).parent().parent().find('.display').find('span').text();
			select.val(oldText);
		} else if ($(this).parent().find('input').length > 0) {
			previousValue = newValue;
			var oldText = $(this).parent().parent().find('.display').find('span').text();
			$(this).parent().find('input').prop('value', oldText);
		}
		$(this).parent().removeClass('active');
		$(this).parent().parent().find('.display').addClass('active');
	});
	$('.change-data').on('input propertychange paste', function(e){
		newValue = e.target.value;
	});
	// end of editable table

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