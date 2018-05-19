/* var baseUrl = 'http://quzebackend-dev.us-east-1.elasticbeanstalk.com'; */
var baseUrl = 'https://backend.quze.co';

var type = '';

function signup() {
	var email = $("#inputUserEmail").val();
	var userId = $("#inputUserName").val();
	var password = $("#inputPassword").val();

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
			// if(result.token === "User Exists")
			// {
			// 	alert("User Already Exists. Please try another User Name");
			// }
			// else
			// {
			// 	localStorage.setItem('token',result.token);
			// 	localStorage.setItem('type',type);
			// 	if(type==='issuer')
			// 	{
			// 		localStorage.setItem('issuerId',userId);
			// 		window.location.replace("index.html");
			// 	}
			// 	else
			// 	{
			// 		localStorage.setItem('recipientId',userId);
			// 		window.location.replace("recipient.html");
			// 	}
			// }
		}
	});}


$(document).ready(function(){

});


function typeOfLogin(clicked_id){
	if (clicked_id === 'studentLoginButton')
		type = 'recipient';
	else if (clicked_id === 'institutionLoginButton')
		type = 'issuer';
	else
		type = 'employer';

	$("#firstPage").css("display", "none");
	$("#secondPage").css("display", "block");
}

