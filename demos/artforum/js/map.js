function initMap() {
        // Styles a map in night mode.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 50.4476955, lng: 30.51358},
          zoom: 15,
          scrollwheel: false,
        });
        var marker = new google.maps.Marker({
          position: {lat: 50.4476955, lng: 30.49958},
          map: map,
          title: 'Hello World!'
        });
      }