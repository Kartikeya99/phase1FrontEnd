var i = 0;

function certificateVerifier(id){
	if(!i){
		$(".addedInformation").css("display", "block")
		$(".addedInformation").append("<img src=\"images/placeholder.png\" class=\"addedCertificateImage col-xs-10 col-xs-offset-1 \"><br /><button type=\"button\" class=\"btn verifyButton btn-lg\">VERIFY</button>");
		i=1;
	}
	else{
		$(".addedInformation").empty();
		$(".addedInformation").css("display", "none")
		i=0;
	}

}