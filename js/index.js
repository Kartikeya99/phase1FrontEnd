$(document).ready(function(){

    if(!(localStorage.getItem("type") === "issuer"))
    {
        if(localStorage.getItem("type") === "recipient")
        {
            window.location.replace("recipient.html");
        }
        else {
            var i = localStorage.length;
            var key;
            while (i--)
            {
                key = localStorage.key(i);
                localStorage.removeItem(key);
            }

            var j = sessionStorage.length;
            var key2;
            while(j--)
            {
                key2 = sessionStorage.key(j);
                sessionStorage.removeItem(key2);
            }

            window.location.replace("signin.html");
        }
    }
    if(localStorage.getItem("issuerId")==="")
    {
        var i = localStorage.length;
        var key;
        while (i--)
        {
            key = localStorage.key(i);
            localStorage.removeItem(key);
        }

        var j = sessionStorage.length;
        var key2;
        while(j--)
        {
            key2 = sessionStorage.key(j);
            sessionStorage.removeItem(key2);
        }

        window.location.replace("signin.html");

    }
    if(localStorage.getItem("token")==="")
    {
        var i = localStorage.length;
        var key;
        while (i--)
        {
            key = localStorage.key(i);
            localStorage.removeItem(key);
        }

        var j = sessionStorage.length;
        var key2;
        while(j--)
        {
            key2 = sessionStorage.key(j);
            sessionStorage.removeItem(key2);
        }

        window.location.replace("signin.html");

    }
});