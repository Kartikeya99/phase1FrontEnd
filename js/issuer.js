
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

		/*$("#submitNewBatch").click(function(){
			var info1Val = $("#info1").val();
			var newAddedDiv = $("<div class='col-md-5 cardDisplayingBatches'><h2>Batch #</h2><hr /><h3>Info related to Kartikeya</h3></div>");
			$("#containerDisplayingBatches").prepend(newAddedDiv);
		});*/
		
});

/* ======================== index =================================== */

var selDiv = "";
var imgFiles; var csvFiles;
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
		
		imgFiles = e.target.files;
		var files = e.target.files;
		for(var i=0; i<files.length; i++) {
			var f = files[i];
			
			selImgDiv.innerHTML += f.name + "<br/>";
		}
	}

	function handleCSVFileSelect(e) {
		
		if(!e.target.files) return;
		
		selCSVDiv.innerHTML = "";
		
		csvFiles = e.target.files;
		var files = e.target.files;
		for(var i=0; i<files.length; i++) {
			var f = files[i];
			
			selCSVDiv.innerHTML += f.name + "<br/>";
		}
	}

	function redirect(element)
	{
		batchId = element.id;
		sessionStorage.setItem("batchId",batchId);
		window.location.replace("verify.html");
	}

	function issue(){
		console.log("event triggered");

		var title = $("#title").val();
		var description = $("#description").val();
		var numCerts = $("#numCerts").val();

		$.post("localhost:8080/createBatch/",
	    {
	        title: title,
	        description: description,
	        batchId: "",
	        issuerId: sessionStorage.issuerId,
	        numCerts:numCerts
	    },
	    function(data, status){
	        sessionStorage.setItem("newBatchId",(JSON.parse(data)).batchId);
	    });

		var newAddedDiv = $("<div class='col-md-5 cardDisplayingBatches'><h2>Batch #</h2><hr /><h3>Info related to Kartikeya</h3></div>");
		$("#containerDisplayingBatches").prepend(newAddedDiv);
	}

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