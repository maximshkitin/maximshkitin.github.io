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
		$('body').toggleClass('no-scroll');
	});
	$('.acc-item .title').click(function(){
		if ($(this).closest('.acc-item').hasClass('active')) {
			$(this).closest('.acc-item').removeClass('active');
			$(this).closest('.acc-item').find('.content').slideUp();
		}
		else {
			$('.acc-item.active').find('.content').slideUp();
			$('.acc-item.active').removeClass('active');
			$(this).closest('.acc-item').addClass('active');
			$(this).closest('.acc-item').find('.content').slideDown();
		}
	});
	$('.tabs li a').click(function(){
		if (!$(this).parent().hasClass('active')) {
			var i = $(this).parent().index();
			$('.tab-content.active').removeClass('active');
			$('.tabs li').removeClass('active');
			$(this).parent().addClass('active');
			$('.tab-content').eq(i).addClass('active');
		}
		return false;
	});
});