
//1)Local URL
const actualurl = "localhost:44338";

//2) Proefaccount URL
//const actualurl = "festivalapplication20211001092547.azurewebsites.net";


//3) Private Account URL
//const actualurl = "festivalbackend.azurewebsites.net";
let websocketurl;
if(actualurl=="localhost:44338")
{
 baseurl="http://"+actualurl;
}
else
{
 websocketurl="https://"+actualurl;
}

//!!IMPORTANT!!: Use only API 1,2 or 3!

function GoToHome() {
    
    window.location.href = 'Index.html';
}

function GoToLogin() {
    window.location.href = 'LoginPage.html';
}

function GoToHelp() {
    window.location.href = 'Help.html';
}

function GoToCreateStage() {
    window.location.href = 'CreateStage.html';
}

function GoToSwitch() {
    window.location.href = 'ChatSwitch.html';
}

function GoToStage() {
    window.location.href = 'ChatScreen.html';
}

function GoToManageUsers() {
    window.location.href = "ManageUser.html";
}


function Login() {
    //let dataReceived = "";
    mijnlogin = {}
    mijnlogin.Username = document.getElementById("Username").value;
    mijnlogin.Password = document.getElementById("Password").value;

    //var myJSON = "{\"Username\": \"" + document.getElementById("Username").value + "\",\"Password\":\"" + document.getElementById("Password").value + "\"}"

    fetch(baseurl + "/api/Login", {
            method: "post",
            headers: {
                "success": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mijnlogin)
        })
        .then(response => response.json())
        .then(json => {
            if (json.success) {
                localStorage.setItem('AuthenticationKey', json.data.authenticationKey);
                localStorage.setItem('UserID', json.data.userID);
                localStorage.setItem('UserName', json.data.userName);
                localStorage.setItem('UserRole', json.data.userRole);
                GoToSwitch();
            } else {
                ProcessErrors(json.errorMessage)
                document.getElementById("ErrorMessage").innerHTML = json.responseMessage[0];
            }
        })
}

// script to register new user
function Register() {
    // create request body
    myJson = {}
    myJson.Username = document.getElementById("Username").value;
    myJson.Password = document.getElementById("Password").value;
    fetch(baseurl + "/api/User", {
            method: "post",
            headers: {
                "success": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(myJson)
        })

        // response as Json
        .then(response => response.json())
        .then(json => {
            if (json.success) {
                // if response is is true, log the returning user ID
                console.log(json.data)
                //create alert to notify if regiter was succesful to do!!!
                alert("You have been registered succesfully!, click Login to proceed");
                //GoToSwitch();
            } else {
                // errormessage
                ProcessErrors(json.errorMessage)
                document.getElementById("ErrorMessage").innerHTML = json.responseMessage[0];
                alert("something went wrong, try agian!")
            }
        })
}


function UpdateActivity(StageID) {
    update = {}
    update.stageID = StageID;
    update.userID = localStorage.getItem('UserID');
    console.log(update);
    fetch(baseurl + "/api/UserActivity", {
            method: "put",
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey'),
                "accept": "text/plain",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(update)
        })
        .then(response => response.json())
        .then(function (returndata) {
            console.log(returndata);

            if (returndata.success) {
                if (StageID == 0) {
                    localStorage.setItem('current-StageID', StageID);
                    GoToSwitch();

                } else {
                    localStorage.setItem('current-StageID', StageID);
                    GoToStage();
                }
            }
            else{
                ProcessErrors(returndata.errorMessage)
            }
        })
        .catch(error => {
            console.error("Error", error);
        });
}

function UpdateActivityLogout(StageID) {
    update = {}
    update.stageID = StageID;
    update.userID = localStorage.getItem('UserID');
    console.log(update);
    fetch(baseurl + "/api/UserActivity", {
            method: "put",
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey'),
                "accept": "text/plain",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(update)
        })
        .then(response => response.json())
        .then(function (returndata) {
            console.log(returndata);

            if (returndata.success) {
                if (StageID == 0) {
                    localStorage.setItem('current-StageID', StageID);
                    Logout();

                } else {
                    localStorage.setItem('current-StageID', StageID);
                    GoToStage();
                }
            }
            else{
                ProcessErrors(returndata.errorMessage)
            }
        })
        .catch(error => {
            console.error("Error", error);
        });
}


function Logout() {
    DeleteAuthenticationKey();
    localStorage.clear();
    GoToHome();

}

function ProcessErrors(errorCodes) {
    if (errorCodes != null) {
        //var AlertMessage = " this errorcode:" + errorCodes;
        //alert(AlertMessage)

        if (errorCodes.includes(1)) {
            alert("Server Error, try again later");
        }

        if (errorCodes.includes(2)) {
            alert("This request cannot be taken into account");
        }
        if (errorCodes.includes(3)) {
            alert("You do not have acces to enter this resource");
            Logout()
        }
        if (errorCodes.includes(4)) {
            alert("The data you provided is not correct, try again");
        }
        if (errorCodes.includes(5)) {
            alert("you're not a validated user, proceed to login");
            Logout()
        }
    }
}


function DeleteAuthenticationKey() {
    fetch(baseurl + "/api/login/" + localStorage.getItem("UserID"), {
            method: "delete",
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey'),
                "accept": "text/plain",
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then(json => {
            if (json.success == false) {
                //when errorcodes get this error.
                ProcessErrors(json.errorMessage)
            }
        })
        .catch(error => {
            console.log("Failed to send request");
        });
}

