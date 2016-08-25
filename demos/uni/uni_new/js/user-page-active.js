var list = $('[data-animate]');
var needToAnimate = $('[data-animate]').length;
var deviceWidth = $(window).width();
var topHeight = $('.top-navbar').outerHeight();
var activityItems;
$(document).ready(function () {
	if (deviceWidth >= 1200 && $('#main-content').outerHeight() > 925) {
		var asideHeight = $('#main-content').outerHeight();
		$('aside').css('height', asideHeight);
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
	$('.pop-up .okay').click(function(){
		$('html').removeClass('overflow');
		$('.share-link').fadeOut(300);
		setTimeout(function(){
			$('.share-link').removeClass('active');
		},300);
		return false;
	});


	// json parsing

	$.getJSON( "js/activity-data.json", function( data ) {
		  activityItems = data;
		  $.each( data, function( key, val ) {
		    activityItems[key] = val;
		  });
	});
	console.log(activityItems);


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
	if (deviceWidth >= 1200 && $('#main-content').outerHeight() > 925) {
		var asideHeight = $('#main-content').outerHeight();
		$('aside').css('height', asideHeight);
	}
	else {
		$('aside').css('height', 'auto');
	}
});

