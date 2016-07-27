ymaps.ready(function () {
	    var myMap = new ymaps.Map('map', {
	            center: [50.4853 , 30.4879],
	            zoom: 15,
	            controls: []
	        }, {
	            searchControlProvider: 'yandex#search'
	        }),
	        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
	            hintContent: 'Офiс Vitatone',
	            balloonContent: 'Україна, Київ, вулиця Вікентія Хвойки, 21'
	        }, 
	        {
	            // Опции.
	            // Необходимо указать данный тип макета.
	            iconLayout: 'default#image',
	            // Своё изображение иконки метки.
	            iconImageHref: 'img/logo.png',
	            // Размеры метки.
	            iconImageSize: [60, 35],
	            iconImageOffset: [-23, -23]
	        });
	    myMap.geoObjects.add(myPlacemark);
	    myMap.setCenter([50.4788,30.48], 14, {
	});
});