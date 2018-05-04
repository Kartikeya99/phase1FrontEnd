$(document).ready(function(){

    $.ajax({
        url: "http:localhost:8080/viewIssuerInfo/njnisarg",
        success: function(result){
            var issuerData = JSON.parse(result)
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
                var newAddedField = $("<tr data-toggle=\"modal\" data-target=\"#myModalJohn\">\n" +
                    "\t\t\t\t\t\t<td>" + batchListDataElement.recipientId +"</td>\n" +
                    "\t\t\t\t\t\t<td>" + batchListDataElement.certName+ "</td>\n" +
                    "\n" +
                    "\t\t\t\t\t\t<div class=\"modal fade\" id=\"myModalJohn\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n" +
                    "\t\t\t\t\t\t\t<div class=\"modal-dialog modal-lg\" role=\"document\">\n" +
                    "\t\t\t\t\t\t\t\t<div class=\"modal-content\">\n" +
                    "\t\t\t\t\t\t\t\t\t<div class=\"modal-header\">\n" +
                    "\t\t\t\t\t\t\t\t\t\t<h4 class=\"modal-title\" id=\"myModalLabel\">John</h4>\n" +
                    "\t\t\t\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t\t\t\t\t<div class=\"modal-body\">\n" +
                    "\t\t\t\t\t\t\t\t\t\t<img src=\"./images/imgtemplate.jpg\">\n" +
                    "\t\t\t\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t\t\t\t\t<div class=\"modal-footer\">\n" +
                    "\t\t\t\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n" +
                    "\t\t\t\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-success\">Verify</button>\n" +
                    "\t\t\t\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t\t</div>\n" +
                    "\t\t\t\t\t</tr>");
                $("#BatchInfoTable").append(newAddedField);
            });

        },
        statusCode : {200 : function (argument) {
                // body...
            }}
    });



});

function generateIssuerDashboard(issuerData)
{
    $("#issuerName").append("<a href='#'>" +issuerData.issuerName + "<span class='sr-only'>(current)</span></a>");
}