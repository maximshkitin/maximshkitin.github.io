var list;
var needToAnimate;


$(window).bind('load', function(){
	var scrollTop = $(window).scrollTop();

	$('.video-slider').removeClass('active');
	list.map(function() {
		if (scrollTop >= $(this).offset().top - $(window).height()) {
			var cls = $(this).data('animate');
			$(this).addClass(cls);
		}
	});
	$('.modal').fadeOut(1200);
});


$(document).ready(function () {
	var tab = $('[class*="-pag"]');
	tab.map(function(i, item){
		var imgItems = $(this).find('.img-item');
		var numberOfImgs = imgItems.length;
		var className = item.classList[2];
		if (numberOfImgs > 6) {
			createPages($(this), imgItems, className, numberOfImgs);
			var height = $(this).height();
			$(this).css('height', height);
			$(this).css('position', 'relative');
			$(this).css('margin-bottom', '80px');
		}
	});
	list = $('[data-animate]');
	needToAnimate = $('[data-animate]').length;
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
	$('.tab-nav li a').click(function(){
		if (!$(this).parent().hasClass('active')) {
			var ref = $(this).data('ref');
			$(this).parent().parent().find('li.active').removeClass('active');
			$(this).parent().addClass('active');
			$('.tab-item.' + ref).parent().find('.tab-item.active').removeClass('active');
			$('.tab-item.' + ref).addClass('active');
		}
		return false;
	});
	$('.pagination-ul .go-to button').click(function(){
		if (!$(this).parent().hasClass('active')) {
			var i = $(this).data('index');
			var numberOfPages = $('.page').length;
			var thisTab = $(this).parent().parent().parent().parent();
			if(i !== 1 && i !== numberOfPages) {
				thisTab.find('li.prev button').attr('disabled', false);
				thisTab.find('li.next button').attr('disabled', false);
			}
			else if (i === 1) {
				thisTab.find('li.prev button').attr('disabled', true);
				thisTab.find('li.next button').attr('disabled', false);
			}
			else if (i === numberOfPages) {
				thisTab.find('li.prev button').attr('disabled', false);
				thisTab.find('li.next button').attr('disabled', true);
			}
			$(this).parent().parent().find('li.active').removeClass('active');
			$(this).parent().addClass('active');
			thisTab.find('.page.active').removeClass('active');
			thisTab.find('.page-' + i).addClass('active');
		}
	});
	$('.pagination-ul .arrow:not([disabled])').click(function(){
		var thisTab = $(this).parent().parent().parent().parent();
		var parentUl = $(this).parent().parent();
		var currentLi = parentUl.find('li.active');
		var i = currentLi.find('button').data('index');
		if ($(this).hasClass('next')) {
			if (parentUl.find('li.go-to').eq(i)[0] !== undefined) {
				currentLi.removeClass('active');
				parentUl.find('li.go-to').eq(i).addClass('active');
				thisTab.find('.page-' + i).removeClass('active');
				thisTab.find('.page-' + (i + 1)).addClass('active');
				var disabledPrevButton = parentUl.find('li.prev button').is(':disabled');
				if (disabledPrevButton === true) {
					parentUl.find('li.prev button').attr('disabled', false);
				}
				if (parentUl.find('li.go-to').eq(i + 1)[0] === undefined) {
					$(this).find('button').attr('disabled', true);
				}
			}
		}
		else if ($(this).hasClass('prev')) {
			if (i - 2 >= 0) {
				currentLi.removeClass('active');
				parentUl.find('li.go-to').eq(i - 2).addClass('active');
				thisTab.find('.page-' + i).removeClass('active');
				thisTab.find('.page-' + (i - 1)).addClass('active');
				var disabledNextButton = parentUl.find('li.next button').is(':disabled');
				if (disabledNextButton === true) {
					parentUl.find('li.next button').attr('disabled', false);
				}
				if (i - 2 === 0) {
					$(this).find('button').attr('disabled', true);
				}
			}
		}
	});
});





var createPages = function(currentTab, imgs, className, n) {
	if (n % 6 > 0) {
		var pages = parseInt(n / 6) + 1;
	}
	else if (n % 6 === 0) {
		var pages = n / 6;
	}
	for (var i = 0; i < pages; i++) {
		if (i === 0) {
			currentTab.append('<div class="page page-' + (i + 1) +' active"></div>');
			var arr = [];
			for (var j = 0; j < 6; j++) {
				arr.push(imgs.eq(j));
				imgs.eq(j).remove();
			}
			currentTab.find('.page.active').append(arr);
		}
		else {
			currentTab.append('<div class="page page-' + (i + 1) +'"></div>');
			var arr = [];
			for (var j = 6 * i; j < 6 * (i + 1); j++) {
				if (imgs.eq(j)[0] !== undefined) {
					arr.push(imgs.eq(j));
					imgs.eq(j).remove();
				}
			}
			currentTab.find('.page').eq(i).append(arr);
		}
	}
	currentTab.append(
		'<div class="pagination col-md-10 col-md-offset-1">\
			<ul class="pagination-ul">\
			</ul>\
		</div>');
	var li = [];
	for (var i = 0; i < pages + 2; i++) {
		if (i === 0) {
			li.push('<li class="prev arrow pag-item"><button disabled><i class="fa fa-chevron-left"></i></button></li>');
		}
		else if (i === 1) {
			li.push('<li class="active pag-item go-to"><button data-index="' + i + '">' + i + '</button</li>');
		}
		else if (i !== pages + 1) {
			li.push('<li class="pag-item go-to"><button data-index="' + i + '">' + i + '</button</li>');
		}
		else {
			li.push('<li class="next arrow pag-item"><button><i class="fa fa-chevron-right"></i></button></li>');
		}
	}
	currentTab.find('.pagination-ul').append(li);
}





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