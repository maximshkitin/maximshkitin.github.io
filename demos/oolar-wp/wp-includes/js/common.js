$(document).ready(function(){
	$('.arrow').click(function(){
		var ref = $(this).data('ref');
		var isSafari = /safari/.test(navigator.userAgent.toLowerCase());
		if (isSafari) {
	 		$('body').animate({ scrollTop: $(ref).offset().top }, 800);
		} 
	    else {
	     	$('html').animate({ scrollTop: $(ref).offset().top }, 800);
	    }
	});
	$('.input-area.required input').on('input paste propertychange',function(){
		if ($(this).val() == '') {
			$(this).closest('.input-area').addClass('novalidate');
			$(this).closest('.input-area').removeClass('validate');
		}
		else {
			$(this).closest('.input-area').addClass('validate');
			$(this).closest('.input-area').removeClass('novalidate');
		}
	});
});