$(document).ready(function () {


    setInterval(function () {

        function onSuccess(acceleration) {
            //alert('Acceleration X: ' + acceleration.x + '\n' +
            //    'Acceleration Y: ' + acceleration.y + '\n' +
            //    'Acceleration Z: ' + acceleration.z + '\n' +
            //    'Timestamp: ' + acceleration.timestamp + '\n');

            $('#TextBoxX').val(acceleration.x);
            $('#TextBoxY').val(acceleration.y);
            $('#TextBoxZ').val(acceleration.z);
            window.x = acceleration.x;
            window.y = acceleration.y;
            window.z = acceleration.z;

            $("#storlekslider").slider({
                range: "max",
                min: -9.8,
                max: +9.8,
                value: acceleration.x,
                slide: function (event, ui) {
                    $("#storlek_testet").val(ui.value);
                    $(ui.value).val($('#storlek_testet').val());
                }
            });
            $("#storlek_testet").val($("#storlekslider").slider("value"));
        }

        function onError() {
            alert('onError!');
        }

        var options = { frequency: 1000 };  // Update every 1 second

        var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);


    }, 1000);

    $("#clientList").click(function () {
        window.location.href = "/View2.html";
    });
    $("#battery").click(function () {
        window.addEventListener("batterystatus", onBatteryStatus, false);


        function onBatteryStatus(status) {
            if (status.isPlugged == false) {
                status.isPlugged = ", be aware that the phone is not plugged."
            }
            if (status.isPlugged == true) {
                status.isPlugged = ", the phone is connected to the plague."
            }

            alert("Level of your phone battery is: " + status.level + ' %' + status.isPlugged);



        }
    });
    $("#Camera").click(function () {
        

        // Cordova is ready to be used!
        //
       
            
       
            // Take picture using device camera and retrieve image as base64-encoded string
            navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
                quality: 100,
                
                destinationType : navigator.camera.DestinationType
            });
       
        function onPhotoDataSuccess(imageData) {
            // Uncomment to view the base64 encoded image data
            // console.log(imageData);

            // Get image handle
            //
            var smallImage = document.getElementById('smallImage');

            // Unhide image elements
            //
            smallImage.style.display = 'block';

            // Show the captured photo
            // The inline CSS rules are used to resize the image
            //
            smallImage.src = "data:image/jpeg;base64," + imageData;
            }
        function onFail(message) {
            alert('Failed because: ' + message);
        }

    })
});