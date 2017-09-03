$(document).ready(function() {


	$.getJSON("../data.json", function(result){
        // $.each(result, function(i, field){
        //     $("div").append(field + " ");
        // });
        console.log(result);
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
	      source: arr
	    });
	}



});