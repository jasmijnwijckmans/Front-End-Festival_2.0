// fucntion for loading the info of the stages
function GetTracks() {
    fetch(baseurl + "/api/Track", {
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey')
            }
        })
        .then((response) => response.json()) //What's the difference 
        .then(function (returndata) {
            console.log(returndata);
            // if loading is correct, a card with data will be provided
            if (returndata.success) {
                $("#Tracks").empty();
                var row = "";
                returndata.data.forEach(function (track) {
                    console.log(track)
                    row += "<tr>";
                    row += "<td style = \" font-weight: bold\">" + track.trackID + "</td>";
                    row += "<td class = \"cursor-pointer\" style=\"font-weight: lighter\" >" + track.trackName + "</td>";
                    row += "<td style=\"font-weight: lighter\">" + track.trackSource + "</td>";
                    row += "<td style=\"font-weight: lighter\"> <button class='btn' onclick='DeleteTrack(" + track.trackID + ")'> Delete</button></td>";
                  


                });
                document.getElementById("Tracks").innerHTML += row;

            } else {
                ProcessErrors(json.errorMessage)
            }
        }) // if loading failed, error message is shown on screen
    // .catch(error => {
    //     console.error("Error", error);

    // });
}

function DeleteTrack(TrackID) {
    fetch(baseurl + "/api/Track/" + TrackID, {
            method: "delete",
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey')
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            if (json.success) {
                GetTracks();

            } else {
                ProcessErrors(json.ErrorMessageS)

            }
        })
        .catch(error => {console.error("Error Deleting Message", error)});

}


function EditTrack(TrackID) {

    if (localStorage.getItem('UserRole') == "artist") {
        var myEdit = {}
        myEdit.trackID = TrackID;
        myEdit.trackSource = document.getElementById("trackSource").value;

        //var myEdit = "{\"UserID\": " + document.getElementById("userID").value+ ",\"UserRole\": \"+ document.getElementById("userRole").value + \" }";
        console.log(myEdit);
        fetch(baseurl + "/api/Track", {
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
                    GetTracks();
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

function AddTrack() {
    if (localStorage.getItem('UserRole') == "artist") {
        var newTrack = {}
        newTrack.trackName = document.getElementById("tracknamefield").value;
        newTrack.trackSource = document.getElementById("tracksourcefield").value;
        newTrack.trackGenre = document.getElementById("trackgenrefield").value;
    
        console.log(newTrack);
        fetch(baseurl + "/api/Track", {
            method: "post",
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey'),
                "success": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTrack)
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                if (json.success) {

                    GetTracks();

                } else {
                    ProcessErrors(json.errorMessage)
                }
            })
            .catch(error => {
                ProcessErrors(json.errorMessage)
            });
    }
    else {
        alert("This user is not an artist")
    }
}

