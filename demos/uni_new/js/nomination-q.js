var list = $('[data-animate]');
var needToAnimate = $('[data-animate]').length;
var deviceWidth = $(window).width();
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
	// $('form').submit(function(){
	// 	$('.modal').fadeIn(700);
	// 	setTimeout(function(){
	// 		window.location.replace('../4/index.html');
	// 	},700);
	// 	return false;
	// });
	$('.rating .star').on('click', function() {
      var selectedCssClass = 'selected';
      var $this = $(this);
      var eval;
      $this.siblings('.' + selectedCssClass).removeClass(selectedCssClass);
      $this
        .addClass(selectedCssClass)
        .parent().addClass('vote-cast');
        $this.parent().find('input:checked').prop('checked', false);
        $this.find('input[type="radio"]').prop('checked', true);
    	switch($this.find('input[type="radio"]').attr('value')) {
	    	case '1':
	    		eval = "Bad";
	    		break;
	    	case '2':
	    		eval = "Not Bad";
	    		break;
	    	case '3':
	    		eval = "Average";
	    		break;
	    	case '4': 
	    		eval = "Good";
	    		break;
	    	case '5': 
	    		eval = "Excellent";
	    		break;
	    	default: 
	    		eval = 'wsd';
	    }
	    $('.eval span').html(eval);
	    $('.bottom-position .submit-button').removeClass('disabled');
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
});