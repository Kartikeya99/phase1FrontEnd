$(document).ready(function(){

    $.ajax({
        url: "http:localhost:8080/viewIssuerInfo/njnisarg",
        success: function(result){
            var issuerData = JSON.parse(result);
            console.log(issuerData);
            sessionStorage.setItem("issuerId",issuerData.issuerId);
            generateIssuerDashboard(issuerData);
        },
        statusCode : {200 : function (argument) {
                // body...
            }}
    });

    $.ajax({
        url: "http:localhost:8080/issuerCertList/"+ sessionStorage.issuerId+'/'+sessionStorage.batchId,
        success: function(result){
            var batchListData = result;
            console.log(batchListData);

            $.map(batchListData,function(batchListDataElement,index){
                var newAddedField = $("<tr onclick=\"callImage(this)\" id="+ batchListDataElement.certName +" data-toggle=\"modal\" data-target=\"#certModal\">\n" +
                    "\t\t\t\t\t\t<td>" + batchListDataElement.recipientId +"</td>\n" +
                    "\t\t\t\t\t\t<td>" + batchListDataElement.certName+ "</td>\n" +
                    "\t\t\t\t\t</tr>");
                $("#BatchInfoTable").append(newAddedField);
            });

        }
    });



});


var data;

function generateIssuerDashboard(issuerData)
{
    $("#issuerName").append("<a href='#'>" +issuerData.issuerName + "<span class='sr-only'>(current)</span></a>");
}

function callImage(element) {
    var myNode = document.getElementById("certImg");
    while (myNode.firstChild) { myNode.removeChild(myNode.firstChild); }
    $.ajax({
        url: "http:localhost:8080/S3FileOperations/FileDownload/"+ sessionStorage.issuerId + "/" + sessionStorage.batchId + "/" + element.id,
        success: function(result){
            console.log(result);
            data = result;
            var image = new Image();
            image.src = result.badge.image;
            $("#certImg").append(image);
            const cert = Verifier.Certificate.parseJson(result);
            console.log(cert)
        }
    });
}

function verifyCert()
{

}