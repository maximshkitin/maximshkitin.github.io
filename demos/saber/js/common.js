$(document).ready(function(){
	$(window).click(function(){
		if ($('.fake-select').hasClass('open')) {
			$('.fake-select').removeClass('open');
		}
	});
	function slideDown() {
		$('.categories > li').addClass('open');
		$('.categories > li').find('.submenu').slideDown('fast');
		$('.categories > li').find('.fa').removeClass('fa-caret-right').addClass('fa-caret-down');
	}

	function slideUp() {
		$('.categories > li').removeClass('open');
		$('.categories > li').find('.submenu').slideUp('fast');
		$('.categories > li').find('.fa').removeClass('fa-caret-down').addClass('fa-caret-right');
	}
	// function isNumberKey(e) {
	//     var charCode = (e.which) ? e.which : event.keyCode
	//     if (charCode != 43 && charCode > 31 && (charCode < 48 || charCode > 57))
	//         return false;
	//     return true;
	// }
	// livefilter
	$('#livefilter-list .submenu').liveFilter('#livefilter-input', 'li');

	$('#livefilter-input').on('input paste propertychange',function(){
		var val = $(this).val();
		console.log($(this).parent().find('.fa'))
		if (val == '') {
			$(this).parent().find('.fa').removeClass('fa-close').addClass('fa-search');
			slideUp();
		}
		else {
			if ($(this).parent().find('.fa').hasClass('fa-search')) {
				$(this).parent().find('.fa').removeClass('fa-search').addClass('fa-close');
			}
			slideDown();
		}
	});
	$('.livefilter .fa').click(function(){
		if ($(this).hasClass('fa-close')) {
			$('#livefilter-input').val('');
			slideUp();
			$('.categories > li .submenu li').css('display', 'list-item');
			$(this).parent().find('.fa').removeClass('fa-close').addClass('fa-search');
		}
		
	});

	$('.add-img').click(function(){
		$(this).parent().find('.get-photo').click();
		return false;
	});
	$('.pinned-images .item a').click(function(){
		$(this).closest('.item').remove();
		return false;
	});
	$('.submit-wrap i').click(function(){
		if ($('#message-form').hasClass('validate')) {
			$(this).parent().find('input[type="submit"]').click();
		}
	});
	$('#message-form .submit-button').click(function(){
		if ($('#message-form').hasClass('novalidate')) {
			return false;
		}
	});
	$('.to-top').click(function(){
		var isSafari = /safari/.test(navigator.userAgent.toLowerCase());
		if (isSafari) {
	 		$('body').animate({ scrollTop: 0 }, 1000);
		} 
    else {
     	$('html').animate({ scrollTop: 0 }, 1000);
    }
	});
	$('.list-categories .categories > li').click(function(){
		$(this).toggleClass('open');
		$(this).find('.submenu').slideToggle('fast');
		if ($(this).hasClass('open')) {
			$(this).find('.fa').removeClass('fa-caret-right').addClass('fa-caret-down');
		}
		else {
			$(this).find('.fa').removeClass('fa-caret-down').addClass('fa-caret-right');
		}
	});
	$('.expand-all').click(function(){
		var len = $('.categories > li').length;
		var flag = false;
		for (var i = 0; i < len; i++) {
			var current = $('.categories > li').eq(i);
			if (!current.hasClass('open')) {
				flag = true;
				break;
			}
		}
		if (flag) {
			slideDown();
		}
		else {
			slideUp();
		}
		return false;
	});

	$('.show-form').click(function(){
		$('#right-side section.active').fadeOut(300);
		setTimeout(function(){
			$('#contact-form').fadeIn(300);
			if (isSafari) {
		 		$('body').animate({ scrollTop: $('#right-side').offset().top - 100 }, 500);
			} 
	    else {
	     	$('html').animate({ scrollTop: $('#right-side').offset().top - 100 }, 500);
	    }
		},300);
		var isSafari = /safari/.test(navigator.userAgent.toLowerCase());
		return false;
	});
	$('.fake-select').click(function(e){
		$(this).toggleClass('open');
		e.stopPropagation();
	});
	$('.fake-select li a').click(function(){
		var text = $(this).text();
		$('.fake-select > span').html(text);
		$('.fake-select').addClass('validate');
		$('.fake-select').removeClass('open');
		return false;
	});

	$('.fake-select a, #checkbox-confirm').click(function(){
		if ($('#checkbox-confirm').is(':checked')
			  && $('.fake-select').hasClass('validate')) {
			$('#message-form').addClass('validate');
			$('#message-form').removeClass('novalidate');
		}
		else {
			$('#message-form').removeClass('validate');
			$('#message-form').addClass('novalidate');
		}
	});
	$('.close-pop').click(function(){
		$(this).closest('.pop-up').fadeOut(300);
		return false;
	});
	// $('.check-numeric').bind('keydown', function (e) {
	//     var regex = new RegExp("^[0-9]+$");
	//     var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
	//     if (!regex.test(key) && e.keyCode != 8 && e.keyCode != 43) {
	//        e.preventDefault();
	//        return false;
	//     }
	// });


	// product 

});
$(window).load(function(){
	$('#modal .loader-icon').fadeOut(400);
	$('#modal').fadeOut(1000);
	var descrBoxTitle = $('.right-line.first .title > div').width();
	var descrBoxTitleLast = $('.right-line.last .title > div').width();
	$('.right-line.first .title b').css('left', descrBoxTitle + 20);
	$('.right-line.last .title b').css('left', descrBoxTitleLast + 20);
});