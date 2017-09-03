$(document).ready(function() {


	$.getJSON("assets/data.json", function(result){
        var arr = [];

        result.data.forEach(function(val){
        	arr.push(val.keyword);
        });
        
        initAutocomplete(arr);
    });


	$('.tab-item a').click(function(){

		if (!$(this).hasClass('active')) {

			var tabType = $(this).data('tab-name');
			$('.tab-item a').removeClass('active');
			$(this).addClass('active');

			$('.form-wrapper').fadeOut(300);
			setTimeout(function(){
				$('.form-wrapper-' + tabType).fadeIn(300);
			},300);
		}
		
		return false;
	});

	function initAutocomplete(arr) {
		$( ".autocomplete" ).autocomplete({
	      source: arr,
	      delay: 100
	    });
	}



});