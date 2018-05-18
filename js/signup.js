/* var baseUrl = 'http://quzebackend-dev.us-east-1.elasticbeanstalk.com'; */
var baseUrl = 'http:localhost:8080';

var type = '';

function signup() {
	var email = $("#inputEmail").val();
	var userId = $("#inputUserName").val();
	var password = $("#inputPassword").val();
	
	if($("#issuerYesNo").prop('checked') === true)
	{
		type = 'issuer';
	}
	else
	{
		type = 'recipient';
	}

	if(email === "" || userId === "" || password === "")
	{
		alert("Please Fill out all the details to proceed!");
		return;
	}

	var data = {'userId':userId,'email':email,'password':password,'type':type};
	data = JSON.stringify(data);

	var headers = {'Content-Type':'application/json;charset=utf8'};

	$.ajax({
		url: baseUrl+'/register',
		type:"POST",
		data:data,
		headers:headers,
		success: function(result){
			console.log(result);
			if(result.token === "User Exists")
			{
				alert("User Already Exists. Please try another User Name");
			}
			else
			{
				localStorage.setItem('token',result.token);
				localStorage.setItem('type',type);
				if(type==='issuer')
				{
					localStorage.setItem('issuerId',userId);
					window.location.replace("index.html");
				}
				else
				{
					localStorage.setItem('recipientId',userId);
					window.location.replace("recipient.html");
				}
			}
		}
	});}


$(document).ready(function(){

});


function typeOfLogin(cliciked_id){
	// if (id == 'loginButton1st')
	// 	type = 'issuer';
	// else if (id == 'loginButton2nd')
	// 	type = 'recipient';
	// else
	// 	type = 'employer';

	alert(cliciked_id);
}

