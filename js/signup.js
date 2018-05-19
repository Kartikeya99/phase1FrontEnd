/* var baseUrl = 'http://quzebackend-dev.us-east-1.elasticbeanstalk.com'; */
var baseUrl = 'http://localhost:8080';

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
			if(result.message === "User Exists")
			{
				alert("User Already Exists. Please try another User Name");
			}
			else
			{
				$.ajax({
					url : baseUrl + '/login',
					type : 'POST',
					data : JSON.stringify({'userId':userId, 'password':password}),
					headers : headers,
					success : function(result, textStatus, request){
						console.log(request.getResponseHeader("authorization"));
						// localStorage.setItem('token',request.getResponseHeader("authorization"));
						// localStorage.setItem('type',type);
						// if(type==='issuer')
						// {
						// 	localStorage.setItem('issuerId',userId);
						// 	window.location.replace("index.html");
						// }
						// else
						// {
						// 	localStorage.setItem('recipientId',userId);
						// 	window.location.replace("recipient.html");
						// }						
					}
				});
			}
		}
	});
}


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

