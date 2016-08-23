var list = $('[data-animate]');
var needToAnimate = $('[data-animate]').length;
var deviceWidth = $(window).width();
var topHeight = $('.top-navbar').outerHeight();
var judgeDescriptions = ['Professor of Business Administration, Ross School of Business, University of Michigan & Chairman of Global Advisory Board, Six Capital',
						 'Dean of Business School, SIM University', 
						 'Rektor, Universitas Gadjah Mada',
						 'Chair of Investment and Divestment Committee, Heliconia Capital Management Pte Ltd Board',
						 'Commissioner at PT Metropolitan Kentjana Tbk',
						 'Fintech & Data Science Specialist Founder of Hippo Data & Scheduit',
						 'Chairman 4J Studios',
						 'Chairman of Truscott Group'];
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
	$('.position-item').click(function(){
		var img = $(this).find('img').attr('src');
		var title = $(this).find('p.title').text();
		var i = $(this).index();
		var popUp = '.judge-pop-up';
		$(popUp + ' .title').html(title);
		$(popUp + ' .descr').html(judgeDescriptions[i]);
		$(popUp + ' img').attr('src', img);
		$('.judge-pop-up').fadeIn(300);
		$('html').addClass('overflow');
	});
	$('.judge-pop-up .okay').click(function(){
		$('.judge-pop-up').fadeOut(300);
		$('html').removeClass('overflow');
		return false;
	});
	if (deviceWidth < 768) {
		$('.judge-pop-up').addClass('small-device');
	}
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
			$('.heading').addClass('has-sticky');
		}
		else {
			$('.navbar').removeClass('sticky');
			$('.heading').removeClass('has-sticky');
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