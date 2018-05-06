$(document).ready(function(){

	// from this function we dynamically add the username of the issuer 
	generateIssuerNavbar();

	// we are making the next call so as to show the certificates that have been issued inside the batch by the issuer
	$.ajax({
		url: "http:localhost:8080/issuerCertList/"+ sessionStorage.issuerId+'/'+sessionStorage.batchId,
		success: function(result){
			var batchListData = result;
			console.log(batchListData);

			//this map function is the code that adds those fields to the table
			$.map(batchListData,function(batchListDataElement,index){
				var newAddedField = $("<tr onclick=\"callImage(this);\" id="+ batchListDataElement.certName +" data-toggle=\"modal\" data-target=\"#certModal\">\n" +
					"\t\t\t\t\t\t<td>" + batchListDataElement.recipientId +"</td>\n" +
					"\t\t\t\t\t\t<td>" + batchListDataElement.certName+ "</td>\n" +
					"\t\t\t\t\t</tr>");
				$("#BatchInfoTable").append(newAddedField);
			});
		}
	});
});// document.ready method ends

function generateIssuerNavbar(){
		$("#issuerName").append("<a href='#'>" + sessionStorage.issuerName + "<span class='sr-only'>(current)</span></a>");
}

var data;

// this is the dynamically calls the image through the api call as the user clicks on the row of the table
function callImage(element) {
	var myNode = document.getElementById("certImg");
	while (myNode.firstChild) { myNode.removeChild(myNode.firstChild); } // we do this to remove the previously stored image and then append the new image that we got from the api call down below
	$.ajax({
		url: "http:localhost:8080/S3FileOperations/FileDownload/"+ sessionStorage.issuerId + "/" + sessionStorage.batchId + "/" + element.id,
		success: function(result){
			console.log(result);
			data = result;
			var image = new Image(); // in the following three lines we create a new image object and add it inside the #certImage id in the dom
			image.src = result.badge.image;
			$("#certImg").append(image);
					
		}
	});
}

// this is used to verify the certificates that have been uploaded
function verifyCert(){
	//const cert = Verifier.Certificate.parseJson(data); // in the next two lines we are verifying the certificate inside the console.
	//console.log(cert);
	setTimeout(alert("Verified!"), 2500);
}