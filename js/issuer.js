
$(document).ready(function(){

		$.ajax({
				url: "http:localhost:8080/viewIssuerInfo/njnisarg", 
				success: function(result){
					var issuerData = JSON.parse(result)
					console.log(issuerData);
					sessionStorage.setItem("issuerId",issuerData.issuerId);
					sessionStorage.setItem("issuerName",issuerData.issuerName);
					generateIssuerDashboard(issuerData);
				}, 
				statusCode : {200 : function (argument) {
					// body...
				}}
			});

		/*$("#submitNewBatch").click(function(){
			var info1Val = $("#info1").val();
			var newAddedDiv = $("<div class='col-md-5 cardDisplayingBatches'><h2>Batch #</h2><hr /><h3>Info related to Kartikeya</h3></div>");
			$("#containerDisplayingBatches").prepend(newAddedDiv);
		});*/
		
});

/* ======================== index =================================== */

	function generateIssuerDashboard(issuerData)
	{
		$("#issuerName").append("<a href='#'>" +issuerData.issuerName + "<span class='sr-only'>(current)</span></a>");
		$.map(issuerData.batchIds,function(batchId,index){
				$.ajax({
					url: "http:localhost:8080/viewBatchInfo/"+batchId,
					success: function(result){batchData = JSON.parse(result)},
					statusCode : {200 : function(){
							console.log(batchData);

							var newAddedDiv = $("<div class='col-md-5 cardDisplayingBatches' onclick='redirect(this);'><h2>" + batchData.title + "</h2><hr /><h3>" + batchData.description + "</h3></div>");
							newAddedDiv.attr('id',batchData.batchId);
							$("#containerDisplayingBatches").prepend(newAddedDiv);
						}}
				});
			}
		);
	}

	function redirect(element)
	{
		batchId = element.id;
		sessionStorage.setItem("batchId",batchId);
		window.location.replace("verify.html");
	}


	document.addEventListener("DOMContentLoaded", init, false);
	
	function init() {
		document.querySelector('#imageUpload').addEventListener('change', handleImageFileSelect, false);
		selImgDiv = document.querySelector("#selectedImageFiles");
		document.querySelector('#CSVUpload').addEventListener('change', handleCSVFileSelect, false);
		selCSVDiv = document.querySelector("#selectedCSVFiles");
	}
		
	function handleImageFileSelect(e) {
		
		if(!e.target.files) return;
		
		selImgDiv.innerHTML = "";

		var files = e.target.files;
		for(var i=0; i<files.length; i++) {
			var f = files[i];
			
			selImgDiv.innerHTML += f.name + "<br/>";
		}
	}

	function handleCSVFileSelect(e) {
		
		if(!e.target.files) return;
		
		selCSVDiv.innerHTML = "";

		var files = e.target.files;
		for(var i=0; i<files.length; i++) {
			var f = files[i];
			
			selCSVDiv.innerHTML += f.name + "<br/>";
		}
	}

	function issue(){

		var title = String($("#title").val());
		var description = String($("#description").val());
		var numCerts = $("#numCerts").val();
		var dataObj = JSON.stringify({"title":title,"description":description,"numCerts":parseInt(numCerts,10),"batchId":"","issuerId":sessionStorage.issuerId});
		var headers = {"Content-Type":"application/json;charset=UTF-8"};
		console.log(dataObj);

		$.ajax({
		    type: 'POST',
		    url: 'http://localhost:8080/createBatch',
		    data: dataObj,
		    headers:headers,
		    success: function(resp) {
				sessionStorage.setItem("newBatchId",resp.batchId);

				var formData = new FormData();
				var imgFiles = document.forms['fileUploadForm'].imageUpload.files;
				var CSVFiles = document.forms['fileUploadForm'].CSVUpload.files;
				
				for(var i = 0; i<imgFiles.length;i++)
				{
					formData.append("file",imgFiles[i]);
				}
				for(var i = 0; i<CSVFiles.length;i++)
				{
					formData.append("file",CSVFiles[i]);
				}

                $.ajax({
                    type: "POST",
                    enctype: 'multipart/form-data',
                    url: "http://localhost:8080/S3FileOperations/FileUpload/"+sessionStorage.issuerId+'/'+sessionStorage.newBatchId,
                    data: formData,
                    processData: false,
                    contentType: false,
                    cache: false,
                    timeout: 600000,
                    success: function (data) {
                        console.log("SUCCESS : ", data);
                        $.ajax({
							url: "http:localhost:8080/CertToolsTrigger/"+sessionStorage.issuerId+'/'+sessionStorage.newBatchId, 
							success: function(result){
								console.log("Done!");
							}
						});
                    },
                    error: function (e) {
                        console.log("ERROR : ", e);
                    }
                });
		    }
		  })	

		/*var newAddedDiv = $("<div class='col-md-5 cardDisplayingBatches'><h2>Batch #</h2><hr /><h3>Info related to Kartikeya</h3></div>");
		$("#containerDisplayingBatches").prepend(newAddedDiv);*/
	}