var list = $('[data-animate]');
var needToAnimate = $('[data-animate]').length;
var deviceWidth = $(window).width();
var topHeight = $('.top-navbar').outerHeight();
$(document).ready(function () {
	if (deviceWidth >= 1200) {
		var asideHeight = $('#main-content').outerHeight();
		$('aside').css('height', asideHeight + 200);
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
	$('.hamburger-menu').click(function(){
		$('#main-nav').toggleClass('open');
		$('.navbar').toggleClass('menu-open');
	});
	$('#upload-avatar').click(function(){
		$('#get-photo').click();
	});
	$('.faq').click(function(){
		$(this).toggleClass('active');
	});



	// popups

	var reffersAmount = $('#live-filter-list li').length;
	$('.referred-friends .corner .num').html(reffersAmount);
	$('.invite-friends .title span').html('(' + reffersAmount + ')');
	$('.view-all-friends span').html('(' + reffersAmount + ')');
	$('.invite-friends .close').click(function(){
		$('.invite-friends').fadeOut('fast');
		$('html').removeClass('overflow');
		return false;
	});
	$('.view-all-friends').click(function(){
		$('.invite-friends').fadeIn('fast');
		$('html').addClass('overflow');
		return false;
	});
	$('.pop-up .close').click(function(){
		$(this).closest('.pop-up').fadeOut('fast');
		$('html').removeClass('overflow');
		return false;
	});
	$('.share-btn').click(function(){
		$('.share-networks').fadeIn('fast');
		$('html').addClass('overflow');
		return false;
	});
	$('.remind-btn').click(function(){
		$('.remind-pop-up').fadeIn('fast');
		$('html').addClass('overflow');
		return false;
	});
	$('.invite-friends .input-field .fa-times').click(function(){
		$('#live-filter-input').val('');
		$('#live-filter-list li').css('display', 'list-item');
		$('.invite-friends .input-field .fa-times').css('display', 'none');
		$('.invite-friends .input-field .fa-search').css('display', 'inline-block');
	});
	$('#live-filter-input').on('input paste propertychange',function(){
		if ($(this).val() != '') {
			// if ($('.input-field .fa-search').is(':visible')) {

			// }
			$('.invite-friends .input-field .fa-search').css('display', 'none');
			$('.invite-friends .input-field .fa-times').css('display', 'inline-block');
		}
		else {
			$('.invite-friends .input-field .fa-times').css('display', 'none');
			$('.invite-friends .input-field .fa-search').css('display', 'inline-block');
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
	if (deviceWidth < 1199) {
		if (scrollTop >= topHeight) {
			$('.navbar').addClass('sticky');
			$('.overlay-shapes').addClass('has-sticky');
		}
		else {
			$('.navbar').removeClass('sticky');
			$('.overlay-shapes').removeClass('has-sticky');
		}
	}
});

$(window).on('resize', function(){
	deviceWidth = $(window).width();
	if (deviceWidth >= 1200) {
		var asideHeight = $('#main-content').outerHeight();
		$('aside').css('height', asideHeight + 200);
	}
	else {
		$('aside').css('height', 'auto');
	}
});

