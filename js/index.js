var selDiv = "";
		
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

	// $(document).ready(function(){
	// 	$("#issueButton").click(function(){
	// 		$.ajax({
	// 			url: "https://bdpfgo9tr7.execute-api.us-east-1.amazonaws.com/testing/cert-create/namanhr/batch1", 
	// 			success: function(result){console.log(result);}, 
	// 			statusCode : {200 : function(){console.log("Cool request done!")}}
	// 		});
	// 	});
	// });

	function issue(){
		console.log("event triggered")
		$.ajax({
				url: "https://bdpfgo9tr7.execute-api.us-east-1.amazonaws.com/testing/cert-create/namanhr/batch1", 
				success: function(result){console.log(result);}, 
				statusCode : {200 : function(){window.location.replace("verify.html");}}
			});
		//window.location.replace("verify.html");
		// .replace behaves as a http redirect protocol. .href as it behaves similar to clicking a link, but the user gets stuck into a neve rending back button loop 
	}