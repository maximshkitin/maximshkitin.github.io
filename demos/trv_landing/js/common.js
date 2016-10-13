function setHeight() {
	var types = $('#portfolio .type');
	types.map(function(i, val) {
		var th = $(val);
		var imgHeight = th.closest('.clearfix').find('.img-wrapper').height();
		th.css('height', imgHeight);
	});
}
$(document).ready(function(){
	$(window).resize(function(){
		setHeight();
	});
});
$(window).load(function() {
	setHeight();
});