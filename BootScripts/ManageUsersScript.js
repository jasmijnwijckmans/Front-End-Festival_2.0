// fucntion for loading the info of the stages
function GetUsers() {
    fetch(baseurl + "/api/User", {
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey')
            }
        })
        .then((response) => response.json()) //What's the difference 
        .then(function (returndata) {
            console.log(returndata);
            // if loading is correct, a card with data will be provided
            if (returndata.success) {
                $("#myUsers").empty();
                var temp = "";
                returndata.data.forEach(function (user) {
                    temp += "<tr>";

                    temp += "<td style = \" font-weight: bold\">" + user.userName + "</td>";
                    temp += "<td class = \"cursor-pointer\" style=\"font-weight: lighter\" onclick ='GetUserData(" + user.userID + ")'>" + user.userID + "</td>";
                    temp += "<td style=\"font-weight: lighter\">" + user.userRole + "</td></tr>";

                });
                document.getElementById("myUsers").innerHTML += temp;

            } else {
                ProcessErrors(json.errorMessage)
            }
        }) // if loading failed, error message is shown on screen
    // .catch(error => {
    //     console.error("Error", error);

    // });
}

function GetUserData(userID) {
    if (localStorage.getItem('UserRole') == "admin") {
        fetch(baseurl + "/api/User/" + userID, {
                headers: {
                    "Authorization": localStorage.getItem('AuthenticationKey')
                }
            })
            .then((response) => response.json()) //What's the difference 
            .then(function (returndata) {
                console.log(returndata);
                // if loading is correct, a card with data will be provided
                if (returndata.success) {
                    $("#userActivity").empty();
                    var temp = "";
                    var userall = returndata.data
                    //console.log(userall.userRole)
                    userall.activities.forEach(function (useractivities) {
                        temp += "<tr>";
                        temp += "<td style = \" font-weight: bold\">" + userall.userName + "</td>";
                        temp += "<td style = \" font-weight: bold\">" + useractivities.stageID + "</td>";
                        temp += "<td style = \"font-weight: lighter\">" + new Date(useractivities.entry + "Z").toLocaleTimeString([], {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        }); + ":" + "</td>";
                        if (useractivities.exit == null) {
                            temp += "<td style = \" font-weight: bold\">  The User is still in this stage </td>";
                        } else(
                            temp += "<td style = \"font-weight: lighter\">" + new Date(useractivities.exit + "Z").toLocaleTimeString([], {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            }) + ":" + "</td>"
                        )
                        //console.log(useractivities)
                        useractivities.messageHistory.forEach(function (messages) {
                            //console.log(messages)
                            //console.log(messages.messageText)
                            temp += "<td style= \" font-weight: lighter\">" + new Date(messages.timestamp + "Z").toLocaleTimeString([], {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            }); + ":" + "</td>";
                            temp += "<td style= \" font-weight: lighter\">" + messages.messageText + "</td>";
                            temp += "<td style=\"font-weight: lighter\"> <button class='btn' onclick='DeleteMessage(" + messages.messageID + ")'> Delete</button></td></tr>";
                        })
                    })
                    // temp += "<tr>";
                    // temp += "<td style=\"font-weight: lighter\">" + userall.stageID + "</td></tr>";
                    document.getElementById("userActivity").innerHTML = temp;
                    //document.getElementById("username").innerhtml += user.userName;

                } else {
                    ProcessErrors(json.errorMessage)
                }
            })
    }
}

function DeleteMessage(MessageID) {
    fetch(baseurl + "/api/User/" + MessageID, {
            method: "delete",
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey')
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            if (json.success) {
                GetUserData();


            } else {
                ProcessErrors(json.ErrorMessageS)

            }
        })
        .catch(error => {});

}

function DeleteUser() {
    //var myDelete = {}
    //myDelete.userID = document.getElementById("userID").value;
    fetch(baseurl + "/api/user/" + document.getElementById("userID").value, {
            method: "delete",
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey'),
                "accept": "text/plain",
                "Content-Type": "application/json"
            }
            //body: JSON.stringify(myDelete)
        })
        .then(response => response.json())
        .then(json => {
            if (json.success == false) {
                ProcessErrors(json.errorMessage)
            } else {
                GetUsers();
                console.log(json);
                onload
            }
        })
        .catch(error => {
            console.log("Failed to send request");
        });
}
function EditUser() {
    //localStorage.setItem('UserRole', "admin") //deze lijn is tijdelijk om te laten werken
    if (localStorage.getItem('UserRole') == "admin") {
        var myEdit = {}
        myEdit.userID = document.getElementById("userID").value
        myEdit.userRole = document.getElementById("userRole").value

        //var myEdit = "{\"UserID\": " + document.getElementById("userID").value+ ",\"UserRole\": \"+ document.getElementById("userRole").value + \" }";
        console.log(myEdit);
        fetch(baseurl + "/api/User", {
                method: "put",
                headers: {
                    "Authorization": localStorage.getItem('AuthenticationKey'),
                    "success": true,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(myEdit)
            })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                if (json.success) {
                    console.log(json);
                    GetUsers();
                } else {
                    ProcessErrors(json.errorMessage)
                }
            })
            .catch(error => {
                console.error("Error", error);
            });

    } else {
        console.log(error)
    }

}