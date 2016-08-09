var list;
var needToAnimate;
var deviceWidth = $(window).width();
var topHeight = $('.top-navbar').outerHeight();


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


$(document).ready(function () {
	list = $('[data-animate]');

	$('.hamburger-menu').click(function(){
		$('#main-nav').toggleClass('open');
		$('.navbar').toggleClass('menu-open');
	});
	$('#sidebar a').hover(function(){
		$(this).parent().find('.hint').toggleClass('active');
	});
	$('.cloud-link').hover(function(){
		var left = $(this).position().left;
		if (deviceWidth < 600) {
			$('.cloud').css('left', 0);
		}
		else {
			$('.cloud').css('left', left);
		}
		$(this).closest('.text-box').find('.cloud').addClass('active');
		
	}, function(){
		var left = $(this).position().left;
		setTimeout(function(){
			if (deviceWidth < 600) {
				$('.cloud').css('left', 'auto');
			}
			else {
				$('.cloud').css('left', 'auto');
			}
		},600); 
		
		$(this).closest('.text-box').find('.cloud').removeClass('active');
	});
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
	if (deviceWidth < 1199) {
		if (scrollTop >= topHeight) {
			$('.navbar').addClass('sticky');
			$('.heading').addClass('has-sticky');
		}
		else {
			$('.navbar').removeClass('sticky');
			$('.heading').removeClass('has-sticky');
		}
	}
});