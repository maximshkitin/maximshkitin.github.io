$(document).ready(function(){
	$('#video-overlay').click(function(){
		var video = $(this).parent().find('video');
		video[0].pause();
		video.prop('muted', false);
		video.prop('autoplay', false);
		video.prop('controls', true);
		$(this).fadeOut(300);
		video[0].currentTime = 0;
		video[0].play();
	});
	var rowH = $('#we-offer .first').closest('.row').height();
	if ($(window).width() >= 992) {
		$('#we-offer .first').css('height', rowH);
	}
	else {
		$('#we-offer .first').css('height', 400);
	}
	
});