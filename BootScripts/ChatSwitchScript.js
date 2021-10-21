// fucntion for loading the info of the stages
function GetInfo() {
    fetch(baseurl + "/api/Stage", {
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey')
            }
        })
        .then((response) => response.json()) //What's the difference 
        .then(function (returndata) {
            console.log(returndata);
            // if loading is correct, a card with data will be provided
            if (returndata.success) {
                var row = ""
                returndata.data.forEach(function (stage) {
                    //specific rows and the info for the card
                    row += " <div class='col-sm-4 col-lg-4'>"
                    row += " <div class='card mt-2 w-100 h-80'>"
                    row += "<img class=\"card-img-top\" src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIM3la9vbgy48Y6C_mJHPnQu_CRp1EvjnIfw&usqp=CAU\" alt=\"Card image cap\">"
                    row += "<div>" + stage.stageName + "<br>" + stage.currentSong + "<br>" + stage.numberOfUsers + "<br> <a><button class='btn' value='Join'  onclick='UpdateActivity(" + stage.stageID + ")'> Join<i class=''></i></button></a></div>"
                    row += "</div>"
                    row += "</div>"
                    //console.log(row);
                });
                if (localStorage.getItem("UserRole") == "admin") { // when userID is admin, show this table.
                    row += " <div class='col-sm-4 col-lg-4'>"
                    row += " <div class='card mt-2 w-100 h-150'>"
                    row += "<img class=\"card-img-top\" src=\"https://www.cambridgelive.org.uk/sites/default/files/public/styles/header_image/public/images/page/Empty%20Stage%202.jpg?itok=5jKheOPe\" alt=\"Card image cap\">"
                    row += "<div> Create a new Stage <br><button class='btn ' onclick='GoToCreateStage()'> Go </button></div>"
                    row += "</div>"
                    row += "</div>"

                    row += " <div class='col-sm-4 col-lg-4'>"
                    row += " <div class='card mt-2 w-70 h-80'>"
                    row += "<img class=\"card-img-top\" src=\"https://media.istockphoto.com/vectors/large-group-of-people-vector-id1158733387?k=20&m=1158733387&s=612x612&w=0&h=lOxTGhYFwMzCXg9NpDnbf8Sz6uqiIqeYM1acLfnT04Q=\" alt=\"Card image cap\">"
                    row += "<div> Manage all users <br><button class='btn' onclick='GoToManageUsers()'> Go</button></div>"
                    row += "</div>"
                    row += "</div>"
                }
                document.getElementById("stages").innerHTML += row;
            } else { 
                ProcessErrors(returndata.errorMessage)
            }
        }) // if loading failed, error message is shown on screen
        .catch(error => {
            console.error("Error", error);

        });

   
}