var viewport = $(window).height(),
	delay = 1500,
	counterOfAnimated = 1;
	header = $('header'),
	headerHeight = header.outerHeight();
var docHeight;
$(document).ready(function(){
	$('#main').css('height', viewport);
	docHeight = $(document).height();
	$('.img-hover').removeClass('active');
	$('#logo a').click(function(){
		var isSafari = /safari/.test(navigator.userAgent.toLowerCase());
		if (isSafari) {
	 		$('body').animate({ scrollTop: 0 }, delay);
		} 
	    else {
	     	$('html').animate({ scrollTop: 0 }, delay);
	    }
		return false; 
	});
	$('#navigation li a').click(function(){
		if ($('.hamburger-menu').hasClass('active')) {
			$('.hamburger-menu').removeClass('active');
			header.removeClass('menu-open');
		}
		var id = $(this).attr('href');
		var isSafari = /safari/.test(navigator.userAgent.toLowerCase());
		var destination = $(id).offset().top;
		if (isSafari) {
	 		$('body').animate({ scrollTop: destination }, delay);
		} 
	    else {
	     	$('html').animate({ scrollTop: destination }, delay);
	    }
		return false; 
	});
	$('.hamburger-menu').click(function(){
		$(this).toggleClass('active');
		header.toggleClass('menu-open');
	});
	$('.portfolio-item').hover(function(){
		$(this).find('.img-hover').toggleClass('active');
		$(this).find('.img').toggleClass('active');
	});
	$('#submit').click(function(e){
		e.preventDefault();
		alert('This form isn\'t available now. The website is under development. Sorry about that.\nUse maxim.shkitin@gmail.com to contact me.');
	});

	function moveMouseCircle() {
		$('#ie-circle')
		.animate({'top': '10px', 'opacity': '0'}, 0)
		.animate({'top': '15px', 'opacity': '1'},500)
		.animate({'top': '23px', 'opacity': '0'},1000)
		.animate({'top': '10px', 'opacity': '0'}, moveMouseCircle);

	}
	var isIE = (function() {
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");
    	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    		return true;
    	}
    	else {
    		return false;
    	}
	})();
	if (isIE) {
		$('#mouse-circle').css({'display':'none'});
		$('#ie-circle').css({'display':'block'});
		moveMouseCircle();
	}
});

$(window).bind('load', function(){
	$('.loader img').fadeOut();
	$(".loader").delay(300).fadeOut(delay);
	setTimeout(function(){
		$('#main').addClass('animated');
		$('body').removeClass('noscroll');
	}, 2000);
});

$(window).on('resize', function(){
	viewport = $(window).height();
	docHeight = $(document.body).height();
	$('#main').css('height', viewport);
});

$(window).scroll(function() {
	var scrollTop = $(window).scrollTop();

	// sticky menu bg
	if (scrollTop > 0) {
		header.addClass('white-bg');
		if (scrollTop > viewport - headerHeight) {
			header.addClass('shadow');
		}
		else {
			header.removeClass('shadow');
		}
	}
	else {
		header.removeClass('white-bg');
	}

	// class "animated" appearence
	for (var i = toAnimate; i <= noAnimate; i++) {
		if(scrollTop > $('.section').eq(i).offset().top - $(window).height() + 120) {
			$('.section').eq(i).addClass('animated');
			toAnimate++;
		}
	}
	navActive(scrollTop);
});
var toAnimate = 1,
	noAnimate = 3;
function navActive(scrollTop){
	$('.section').each(function(){
		var position = parseInt($(this).offset().top);
		var height = $(this).outerHeight();
		if (viewport < $('.section').last().outerHeight()) {
			if (position <= scrollTop + headerHeight && position + height >= scrollTop) {
				var href = '#' + $(this)[0].id;
				if (!$('li a[href="' + href + '"]').parent().hasClass('active')) {
					$('li a[href="' + href + '"]').parent().addClass('active');
					if ($('#navigation li.active').length > 1) {
						$('#navigation li.active').removeClass('active');
						$('li a[href="' + href + '"]').parent().addClass('active');
					}
				}
			}
		}
		else {
			if (scrollTop + viewport >= docHeight - 20) {
				if ($('#navigation li.active').length > 1) {
					$('#navigation li.active').removeClass('active');
				}
				$('#navigation li').last().addClass('active');
			}
			else if (position <= scrollTop + headerHeight && position + height >= scrollTop) {
				console.log(scrollTop, position);
				var href = '#' + $(this)[0].id;
				if (!$('li a[href="' + href + '"]').parent().hasClass('active')) {
					$('li a[href="' + href + '"]').parent().addClass('active');
					if ($('#navigation li.active').length > 1) {
						$('#navigation li.active').removeClass('active');
						$('li a[href="' + href + '"]').parent().addClass('active');
					}
				}
			}
		}
	});
}

// form validation

var form = document.getElementById('send-form');
form.noValidate = true;
form.addEventListener('submit', function(e){
	if (!e.target.checkValidity()) {
		e.preventDefault();
		alert('Please, fill the form.');
	}
}, false);
