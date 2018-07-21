

$(document).ready(function () {
    
    
    GetAllClients();
    AddDisputeToClient();
    AddClient();
    GoDisputeMap();
    GoBack();
    UpdateDisute();
    RemoveDispute();
});
function GetAllClients() {
   
    


    $.get("http://localhost:4200/api/Clients/GetAllClients", function (data) {
        console.log(data);

        $("#clients_list").html("");
        var clientsList = " ";
            
        $.each(data, function (i, client) {
            
            clientsList += '<option value="' + client.Id + '">' + '<p style="color:black">' +client.FirstName + " " + client.LastName +'</p>' + '</option>'; 

            
            var option_cate = '<ul class="list-group"><h5 class="pushmargin" >' + "<h3><div>"+ client.FirstName + " " + client.LastName + "    -    " + "Birth info:     " + new Date(client.BirthDate).toDateString("yyyy-MM-dd") + '</div></h3></ul>';



            var details = '<ul class="details" style="margin-right:20%">';
            
            $.each(client.Disputes, function (j, dispute) {

               
                var whosMoney;
                //IGet = true "Receiveble"
                if (dispute.IGet === true) {
                    whosMoney = "Receiveble";
                    var pay = '';
                }
                else {
                    whosMoney = "Payable";
                    //var pay = '<input type="checkbox" id =' + j + ' class="SelectCheck"></input>';
                    var pay = '<span class="badge">Pay this dispute!</span><input type="checkbox" id=' + dispute.amount + '><br>';

                }
              

                details += '<li class="list-group-item active"><div >' + ' ' + '<input type="checkbox" class="SelectCheck" value="' + dispute.Id + '">' + '</input>' + "<p class='h4'>Reason/Description: " + dispute.Reason + " </p>   " + "<p class='h4'>Amount info: " + dispute.Amount + " RON " + '</p>' + '<p class="h4">' + " Dispute type: " + whosMoney + '</p>' + pay + '</div></li>';
                
            });

            details += '</ul>';

            $(option_cate).appendTo('#clients_list').append(details);




            $('.pushmargin').css({ marginleft: "20%" });

        });
        $(clientsList).appendTo("#fmm");

    });
}
function AddDisputeToClient() {
    $("#addDispute").click(function () {
        var reason = $("#reason").val();
        var amount = $("#amount").val();
        var longitude = $("#longitude").val();
        var latitude = $("#latitude").val();
        var iget = $("#iget").prop('checked');
        var clientId = $("#fmm").val();
        $.post("http://localhost:4200/api/Disputes/AddDisputeToClientId",
            {
                ClientId: clientId,
                Amount: amount,
                Reason: reason,
                Latitude: latitude,
                Longitude: longitude,
                IGet: iget
            },
            function (data, status) {
                if (status == "success") {
                    GetAllClients();
                    $("#isPostSuccess").show();
                }
                
            });

    });
}


function AddClient() {
    $("#AddClient").click(function () {
        var first = $("#firstname").val();
        var last = $("#lastname").val();
        var birth = $("#birth").val();
        var gender = $("#gender").val();

        $.post("http://localhost:4200/api/Clients/AddClient",
            {
                FirstName: first,
                LastName: last,
                BirthDate: birth,
                Gender: gender
            
            },
            function (data, status) {
                if (status == "success") {
                    GetAllClients();
                    $("#isPostSuccess2").show();
                }

            });

       

    });
}

function GoDisputeMap() {
    $("#DisputeMap").click(function () {
        window.location.href = "/View3.html";
    

    });

}
function GoBack() {
    $("#GoBack").click(function () {
        window.location.href = "/index.html";


    });

}
function UpdateDisute() {
    $("#UpdateDispute").click(function () {



       var checkValue = $('.SelectCheck:checked').val();
       var reason = $("#reasonUp").val();
       var amount = $("#amountUp").val();
       var longitude = $("#longitudeUp").val();
       var latitude = $("#latitudeUp").val();
       var iget = $("#igetUp").prop('checked');
       var clientId = $("#fmm").val();

       var URL = "http://localhost:4200/api/Disputes/UpdateDispute";

       var dataObject = { 'ClientId': clientId, 'Id': checkValue, 'Reason': reason, 'Amount': amount, 'Latitude': latitude, 'Longitude': longitude, 'IGet':iget };
       

       $.ajax({
           url: URL,
           type: 'PUT',
           data: dataObject,
           contentType: 'application/x-www-form-urlencoded',
           success: function (result) {
               GetAllClients();
           }
       });

      
        

    });

}
function RemoveDispute() {
    $("#RemoveDispute").click(function () {



        var checkValue = $('.SelectCheck:checked').val();
        var clientId = $("#fmm").val();

        var URL = "http://localhost:4200/api/Disputes/DeleteDispute";

        var dataObjectDel = { 'ClientId': clientId, 'DisputeId': checkValue };


        $.ajax({
            url: URL,
            type: 'DELETE',
            data: dataObjectDel,
            contentType: 'application/x-www-form-urlencoded',
            success: function (result) {
                GetAllClients();
            }
        });




    });

}