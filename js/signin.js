/* var baseUrl = 'http://quzebackend-dev.us-east-1.elasticbeanstalk.com'; */
var baseUrl = 'http:localhost:8080';

function signin() {
    var userId = $("#inputUserName").val();
    var password = $("#inputPassword").val();

    var data = {'userId':userId,'password':password};
    data = JSON.stringify(data);

    var headers = {'Content-Type':'application/json;charset=utf8'};

    $.ajax({
        url: baseUrl+'/login',
        type:"POST",
        data:data,
        headers:headers,
        success: function(result){
            console.log(result);

            if(result.token === "error")
            {
                alert(result.type)
            }
            else
            {
                localStorage.setItem('token',result.token);
                localStorage.setItem('type',result.type);
                if(localStorage.type ==='issuer')
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
    });
}


$(document).ready(function(){

});