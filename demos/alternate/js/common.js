$(document).ready(function(){
	$('#main-trg-bg').css({'border-top-width': $('#stn-trg').outerHeight(), 'border-left-width': $('#stn-trg').outerWidth()});
	
	if ($(window).width() >= 992) {
			$('.dif-height').map(function(){
			$(this).css('height', $(this).closest('.row').height());
		});
	}
	$('.hamb-menu-btn').click(function(){
		$('#main-nav nav').slideToggle();
		return false;
	});
	var rotate_words = $('.rotate-words'),
			interval = 3000;
		if(rotate_words.length) {
			
		var next_word_index = 0;
		interval = rotate_words.data("interval");
		
			rotate_words.each(function(index, element) {
				$(element).find('span').eq(0).addClass('active');
				setInterval(function(){
					next_word_index = $(element).find('.active').next().length ? $(element).find('.active').next().index() : 0;
					$(element).find('.active').addClass('rotate-out').removeClass('rotate-in active');
					$(element).find('span').eq(next_word_index).addClass('rotate-in active').removeClass('rotate-out');
				},interval);
			});
		}
	
});

$(window).resize(function(){
	$('#main-trg-bg').css({'border-top-width': $('#stn-trg').outerHeight(), 'border-left-width': $('#stn-trg').outerWidth()});
	if ($(window).width() >= 992) {
			$('.dif-height').map(function(){
			$(this).css('height', $(this).closest('.row').height());
		});
	}
});