$(document).ready(function () {

    var onSuccess = function (position) {
        //alert('Latitude: ' + position.coords.latitude + '\n' +
        //    'Longitude: ' + position.coords.longitude + '\n' +
        //    'Altitude: ' + position.coords.altitude + '\n' +
        //    'Accuracy: ' + position.coords.accuracy + '\n' +
        //    'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
        //    'Heading: ' + position.coords.heading + '\n' +
        //    'Speed: ' + position.coords.speed + '\n' +
        //    'Timestamp: ' + position.timestamp + '\n');

        var custom = 'https://maps.gstatic.com/mapfiles/ms2/micons/man.png';

        window.map = new GMaps({
            div: '#map',
            zoom: 6,
            lat: position.coords.latitude,
            lng: position.coords.longitude
            
            
        });

        window.map.addMarker({
                    icon: custom, 
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    infoWindow: {
                        content: "<p style='color:black'>You location in this point is: " + position.coords.latitude + " latitude and " + position.coords.longitude + " longitude</p>"
                    }
        });


        $.get("http://localhost:4200/api/Clients/GetAllClients", function (data) {
            console.log(data);


            $.each(data, function (i, client) {


                $.each(client.Disputes, function (j, dispute) {



                    window.map.addMarker({

                        lat: dispute.Latitude,
                        lng: dispute.Longitude
                    });
                    window.map.drawRoute({
                        origin: [position.coords.latitude, position.coords.longitude],
                        destination: [dispute.Latitude, dispute.Longitude],
                        travelMode: 'driving',
                        strokeColor: '#131540',
                        strokeOpacity: 0.6,
                        strokeWeight: 3
                    });


                });





            });


        });

        
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);


    

   
    goBack();

});





   

function goBack() {
    $("#BackToClientList").click(function () {
        window.location.href = "/View2.html";


    });
}







