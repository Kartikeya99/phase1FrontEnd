$(document).ready(function(){
	generateIssuerNavbar(sessionStorage.issuerName);
})

//this generates the issuer navbar according to the issuer data
function generateIssuerNavbar(issuerData){
	$("#issuerName").innerHTML = issuerData.issuerName;
}

