function GetPoints() {
    fetch(baseurl + "/api/Loyalty/" + localStorage.getItem("UserID"), {
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey')
            }
        })
        .then((response) => response.json())
        .then(function (returndata) {
            console.log(returndata);
            if (returndata.success) {
                username = returndata.data.userName;
                points = returndata.data.userID;
                var x = username + "(" + points + ")";
                document.getElementById("UserName").innerHTML = x
            } else {
                console.log("else error")
                ProcessErrors(returndata.errorMessage)
            }
        })
        .catch(error => {
            console.error("Error getting Loyalty Points", error)
        })
}