/* var baseUrl = 'http://quzebackend-dev.us-east-1.elasticbeanstalk.com'; */
var baseUrl = 'http:localhost:8080';

function signup() {
    var email = $("#inputEmail").val();
    var userId = $("#inputUserName").val();
    var password = $("#inputPassword").val();
    var type = '';
    if($("#issuerYesNo").prop('checked') === true)
    {
        type = 'issuer';
    }
    else
    {
        type = 'recipient';
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
    });}


$(document).ready(function(){

});