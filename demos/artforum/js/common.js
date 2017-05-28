// map

function initMap() {
// Styles a map in night mode.
var map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 50.4476955, lng: 30.51358},
  zoom: 13,
  scrollwheel: false,
});
var marker = new google.maps.Marker({
  position: {lat: 50.4476955, lng: 30.49958},
  map: map,
  title: 'Hello World!'
});
}


function drawPopUp(el) {
	$.ajax({
       url: "components/pop-up.php",
       type: "POST",
       success: function(data) {
       		$('footer').after(data);
       		var offset = $(window).scrollTop();
			$('.pop-up').css('paddingTop', offset + 70);
			var src = el.closest('.gallery-item').find('img').attr('src');
			$('.pop-up-img').attr('src', src)
       },
       error: function(jqXHR, textStatus, errorMessage) {
           console.log(errorMessage); 
       }
    });
}
function closePopUp() {
	$('.pop-up').remove();
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}



$(document).ready(function(){

	$('.open-pop').on('click',function(){

		drawPopUp($(this));

		return false;
	});

	$(window).click(function(e){
		if($('.pop-up').is(':visible')) {
			if (!$(e.target).closest('.pop-up-container').length)
				$('.pop-up').remove();
		}
	});

	$('.hamb-menu').click(function(){
		$('.mobile-navigation').slideToggle(400);
	});

	// tabs

	$('.tab').click(function(){
		if (!$(this).hasClass('active')) {

			var delay = 400

			var i = $(this).data('item');
			if (!$('#tab-content-' + i).length) {

				// upload new content

				var newEl = '<div class="tab-content" id="tab-content-' + i + '"></div>';
				$('#tab-content-1'.after(function(){
					return newEl;
				});
				$('#tab-content-' + i).load('ajax/tab-' + i + '.html', function(){

					$('.tab-content.active').fadeOut(delay);
					setTimeout(function(){
						$('.tab-content.active').removeClass('active');
						$('#tab-content-' + i).fadeIn(delay).addClass('active');
					},delay);


					$('.open-pop').on('click',function(){

						drawPopUp($(this));

						return false;
					});
				});

			}
			else {

				// show existed content

				$('.tab-content.active').fadeOut(delay);
				setTimeout(function(){
					$('.tab-content.active').removeClass('active');
					$('#tab-content-' + i).fadeIn(delay).addClass('active');
				},delay);
			}
			$('.tab.active').removeClass('active');
			$(this).addClass('active');

		}

		return false;
	});


	// validation 

	$('.validate-form').submit(function(){
		var itemsToCheck = $(this).find('.text-field');
		if(isEmpty(itemsToCheck) || validateEmail(email)) 
			return false
	});


	// slider

	if ($('.bxslider').length) {
		var sl2 = $('.bxslider').bxSlider({
			nextText: '<span class="arrow"></span>',
		    prevText: '<span class="arrow"></span>',
		});
	}

	if ($('.slider-ajax').length) {
		var ajaxSlider = $('.slider-ajax').bxSlider({
			onSliderLoad: function(){
				var titles = $('.project-slider-title');


				var arrIndex = []
				titles.map(function(){
					arrIndex.push($(this).data('title-index'))
				})
				var maxIndex = Math.max.apply(null, arrIndex);
				for (var i = 0; i < maxIndex + 1; i++){
					var currentItem = $('.project-slider-item:not(.bx-clone)');
					var titleIndex = currentItem.find('[data-title-index="' + i + '"]');
					$('[data-slide-index="' + i + '"]').html(titleIndex.text());
					$('[data-slide-index="' + i + '"]').attr('data-ajax-url', currentItem.eq(i).data('ajax-url'))
				}
			}
		});
	}

	$('.pii-heading:not(".no-click")').click(function(){
		var item = $(this).closest('.project-info-item');
		item.find('.pii-content').slideToggle(300);
		item.toggleClass('active');
		if (!item.hasClass('active')) {
			item.find('.pii-show-status').html('+');
		}
		else {
			item.find('.pii-show-status').html('–');
		}
	});

	$('.aside-accordion .accordion-title').click(function(){
		var item = $(this).closest('.accordion-element');
		item.find('.accordion-content').slideToggle(300);
		item.toggleClass('active');
	});

	if ($('.slider1.media').length) {
		var sl1 = $('.slider1').bxSlider({
		    slideWidth: 290,
		    minSlides: 1,
		    maxSlides: 4,
		    moveSlides: 1,
		    slideMargin: 0,
		    nextText: '<span class="arrow"></span>',
		    prevText: '<span class="arrow"></span>',
		  });
	}

	if ($('.media-slider').length) {
		$('.media-slider .accordion-item.video').hide();
		
	}

	$('.slider-accordions .accordion-title').click(function(){
			var item = $(this).data('name');
			var iframe = $('iframe');
			$('.media-slider .accordion-item').slideUp(400)
			if (!$(this).hasClass('active')) {
				if (item === 'photo') {
					$('.media-slider .accordion-item.' + item).slideDown(400);
						setTimeout(function(){
							sl1.reloadSlider();
						},400);
				}
				else if (item === 'video') {
					$('.media-slider .accordion-item.' + item).slideDown(400);
						setTimeout(function(){
							sl2.reloadSlider();
						},400);
				}
				$('.slider-accordions .accordion-title.active').removeClass('active')
				$(this).addClass('active')
			}
			else {
				if (item === 'photo') {
					$('.media-slider .accordion-item.' + item).slideUp(400);
						setTimeout(function(){
							sl1.reloadSlider();
						},400);
				}
				else if (item === 'video') {
					$('.media-slider .accordion-item.' + item).slideUp(400);
						setTimeout(function(){
							sl2.reloadSlider();
						},400);
				}
				$('.slider-accordions .accordion-title.active').removeClass('active')
			}
		});

	$('.props-accordion .accordion-title').click(function(){
		$(this).toggleClass('active');
		$('.props-accordion .accordion-item').slideToggle(400);
	});


	// slider ajax

	$('.slider-ajax-container .bx-pager-link').click(function(){
		var i = $(this).data('slide-index') + 1;
		var linkText = $(this).text()
		if (!$(this).hasClass('active')) {

			var delay = 400

			if (!$('#project-item-' + i).length) {

				// upload new content

				var newEl = '<div class="pii-wrapper" id="project-item-' + i + '"></div>';
				$('#project-item-1').after(function(){
					return newEl;
				});
				$('#project-item-' + i).load('ajax/project-' + i + '.html', function(){

					$('.pii-wrapper.active').fadeOut(delay);
					$('.aside-wrapper .project-title').fadeOut(delay);
					setTimeout(function(){
						$('.pii-wrapper.active').removeClass('active');
						$('#project-item-' + i).fadeIn(delay).addClass('active');
						$('.aside-wrapper .project-title').html(linkText).fadeIn(delay);
					},delay);


					$('.pii-heading:not(".no-click")').click(function(){
						var item = $(this).closest('.project-info-item');
						item.find('.pii-content').slideToggle(300);
						item.toggleClass('active');
						if (!item.hasClass('active')) {
							item.find('.pii-show-status').html('+');
						}
						else {
							item.find('.pii-show-status').html('–');
						}
					});
				});

			}
			else {

				// show existed content

				$('.pii-wrapper.active').fadeOut(delay);
				$('.aside-wrapper .project-title').fadeOut(delay);
				setTimeout(function(){
					$('.pii-wrapper.active').removeClass('active');
					$('#project-item-' + i).fadeIn(delay).addClass('active');
					$('.aside-wrapper .project-title').html(linkText).fadeIn(delay);
				},delay);
			}

		}
	});

});