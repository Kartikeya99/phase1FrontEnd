var baseUrl = 'https://backend.quze.co';

$(document).ready(function(){

	if (localStorage.getItem("type") === "issuer" && localStorage.getItem("issuerId") !== "" && localStorage.getItem("token") !== "") {
		window.location.replace("issuerHome.html");
	}
	else if (localStorage.getItem("type") === "recipient" && localStorage.getItem("recipientId") !== "" && localStorage.getItem("token") !== "") {
	}
	else {
		var i = localStorage.length;
		var key;
		while (i--) {
			key = localStorage.key(i);
			localStorage.removeItem(key);
		}

		var j = sessionStorage.length;
		var key2;
		while (j--) {
			key2 = sessionStorage.key(j);
			sessionStorage.removeItem(key2);
		}

		window.location.replace("signin.html");
	}

	$("#welcomeRecipientHomeUserName").text(localStorage.recipientId);
	// from this function we dynamically add the username of the issuer 
	generateRecipientNavbar(localStorage.recipientId);
	displayCerts(localStorage.recipientId);

	// we are making the next call so as to show the certificates that have been issued inside the batch by the issuer
	/*$.ajax({
		url: baseUrl + "/recipientCertList/"+ localStorage.recipientId,
		success: function(result){
			var batchListData = result;
			console.log(batchListData);

			//this map function is the code that adds those fields to the table
			$.map(batchListData,function(batchListDataElement,index){
				var newAddedField = $("<tr onclick=\"callImage(this);\" id="+ batchListDataElement.certName +" data-toggle=\"modal\" data-target=\"#certModal\">\n" +
					"\t\t\t\t\t\t<td>" + batchListDataElement.issuerId +"</td>\n" +
					"\t\t\t\t\t\t<td>" + batchListDataElement.certName+ "</td>\n" +
					"\t\t\t\t\t</tr>");
				$("#BatchInfoTable").append(newAddedField);
			});
		}
	});*/
});// document.ready method ends

function generateRecipientNavbar(recipientId){
	$("#recipientId").prepend("<span>"+recipientId+"</span>");
}

function displayCerts(recipientId)
{
	$.ajax({
		url:baseUrl + "/recipientCertList/"+recipientId ,
		headers:{"Content-Type":"application/json","Authorization":localStorage.token},
		type:"GET"
	}).done(function (response) {
		console.log(response);
		for(var i=0;i<response.length;i++)
		{
            $.ajax({
				url:baseUrl+"/viewBatchInfo"+'/'+response[i].batchId,
				headers:{"Authorization":localStorage.token},
				certificateId : response[i].certId,
				success: function(data) {
                    // language=HTML
                    var certInfo = $("<div class=\"row\">\n" +
                        "\t\t<div class=\"certificate col-md-12\" data-toggle=\"modal\" data-target=\"#certModal\" id=\"" + data.batchId+"_"+ this.certificateId + "\" onclick=\"certificateVerifier(this.id)\"\">\n" +
                        "\t\t\t\t<div class=\"container-fluid\"" +
                        "\t\t\t\t\t\t<div class=\"row\">" +
                        "\t\t\t\t\t\t\t\t<img src=\"\" class=\"certificateImage certImg\" id=\"" + data.batchId + "institutionImage" + "\">\n" +
                        "\t\t\t\t\t\t\t\t<div class=\"infoOfCertificate\">\n" +
                        "\t\t\t\t\t\t\t\t\t\t<p>" + data.issuerId + "</p>\n" +
                        "\t\t\t\t\t\t\t\t\t\t<p>" + data.title + "</p>\n" +
                        "\t\t\t\t\t\t\t\t\t\t<p>" + data.description + "</p>\n" +
                        "\t\t\t\t\t\t\t\t</div>\n" +
                        "\t\t\t\t\t\t\t\t<i class=\"fa fa-check-circle-o tickIcon\" aria-hidden=\"true\"></i>\t\n" +
                        "\t\t\t\t\t\t</div>\n" +
                        "\t\t\t\t\t\t<div class=\"row addedInformation\" id=\"" + data.batchId + "certificateAddedInformation\"></div>" +
                        "\t\t\t\t</div>" +
                        "\t\t</div>" +
                        "</div>");
                    //certInfo.attr("onclick", "certificateVerifier("+ "abc" + ","+ idOfCertificate+")");
                    $("#certDisplayContainer").append(certInfo);

                    $.ajax({
                        url: baseUrl + "/getPic/" + data.issuerId,
                        headers: {'Authorization': localStorage.token},
                        success: function (response) {
                            $("#" + data.batchId + "institutionImage").attr('src', "data:image/png;base64, " + response);
                        }
                    });
                }})
		}
	});
}

var data;

// this is the dynamically calls the image through the api call as the user clicks on the row of the table
function callImage(id) {
	console.log(id);
	$.ajax({
		url: baseUrl+"/downloadCert/"+id,
        headers: {'Authorization': localStorage.token},
		success: function(result){
			//image.src = result.badge.image;
			//$("#"+id).attr('src', result.badge.image);
			document.getElementById(id).src= result.badge.image;
		}
	});
}

// this is used to verify the certificates that have been uploaded
function verifyCert(){

}

// this is used for the collapsing and showing the certificate image and verifying it
var imageStatus = 0;

function certificateVerifier(id){
	var ids = id.split("_");
	var batchId = ids[0];
	var certificateId = ids[1];
    if(!imageStatus){
        $("#"+batchId+"certificateAddedInformation").css("display", "block");
        $("#"+batchId+"certificateAddedInformation").append("<img class=\"addedCertificateImage col-xs-10 col-xs-offset-1\" id=\""+certificateId +"\"><br /><button type=\"button\" class=\"btn verifyButton btn-lg\" onclick=\"verifyCert()\">VERIFY</button>");
        imageStatus=1;
        callImage(certificateId);
        $("#"+id).css("box-shadow", "2px 2px 2px blue");
    }
    else{
        $("#"+batchId+"certificateAddedInformation").empty();
        $("#"+batchId+"certificateAddedInformation").css("display", "none");
        imageStatus=0;
    }
}

function logOut()
{
	var i = localStorage.length, key;
	while (i--)
	{
		key = localStorage.key(i);
		localStorage.removeItem(key);
	}

	var j = sessionStorage.length, key2;
	while(j--)
	{
		key2 = sessionStorage.key(j);
		sessionStorage.removeItem(key);
	}

	window.location.replace("signin.html");
}