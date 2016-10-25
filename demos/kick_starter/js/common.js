$(document).ready(function(){
	$('.bxslider').bxSlider({
		controls: false,
		auto: true,
		pause: 6000
	});
	$('.clear-field').click(function(){
		$(this).closest('.input-field').find('input').val('');
		return false;
	});
	$('.close-message').click(function(){
		$(this).closest('div').hide();
		return false;
	});
	$('.hamb').click(function(){
		$('.menu-wrapper').slideToggle();
		if ($('body').hasClass('no-scroll')) {
			$('body').removeClass('no-scroll');
		}
		else {
			$('body').addClass('no-scroll');
		}
	});
});