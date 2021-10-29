// fucntion for loading the info of the stages
function GetTracks() {
    fetch(baseurl + "/api/Track", {
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey')
            }
        })
        .then((response) => response.json()) //What's the difference 
        .then(function (returndata) {
 
            // if loading is correct, a card with data will be provided
            if (returndata.success) {

                $("#tracks").empty();
                //console.log(returndata);
                var row = ""
                returndata.data.forEach(function (track) {
                    //console.log(track)
                    row += "<tr>";
                    row += "<td style = \" font-weight: bold\">" + track.trackID + "</td>";
                    row += "<td class = \"cursor-pointer\" style=\"font-weight: lighter\">" + track.trackName + "</td>";
                    row += "<td style=\"font-weight: lighter\">" + track.playing + "</td>";
                    row += "<td style=\"font-weight: lighter\"> <button class='btn' onclick='DeleteTrack(" + track.trackID + ")'> Delete</button></td>";
                

                });
                document.getElementById("tracks").innerHTML += row;
             

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
            //console.log(json);
            if (json.success) {
            GetTracks();
            GetMusicLists(); 
            } else {
                console.log(json)
                ProcessErrors(json.errorMessage)

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
        //console.log(myEdit);
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
                //console.log(json)
                if (json.success) {
                    //console.log(json);
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
        newTrack.trackGenre = 'no';
    
        //console.log(newTrack);
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
                //console.log(json);
                if (json.success) {
                    GetTracks();
                    document.getElementById('tracknamefield').value=null;
                    document.getElementById('tracksourcefield').value=null;
                    
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

function GetMusicLists() {
    fetch(baseurl + "/api/Playlist", {
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey')
            }
        })
        .then((response) => response.json()) //What's the difference 
        .then(function (returndata) {
           //console.log(returndata);
            // if loading is correct, a card with data will be provided
            if (returndata.success) {
                $("#MusicList").empty();
                var music = document.createElement("h2");
                music.className = "font-weight-bold"
                music.innerHTML = "MusicLists"
                $("#MusicList").append(music)
              

                returndata.data.forEach(function (musiclist) {
                   // console.log(musiclist)
                   
                    
                    var List = document.createElement("div");
                    List.id = musiclist.id;
                    $("#MusicList").append(List)

                    

                    List.className = "mt-2 col-md-12"
                    var nameList = document.createElement("div");
                    nameList.className = "font-weight-bold"
                    nameList.innerHTML = musiclist.name;
                    $("#" + musiclist.id).append(nameList)
           
                    musiclist.playlistTracks.forEach(function(track){
                       // console.log(track)
                        var divTrack = document.createElement("p");
                        divTrack.id = track.id;

                        var name = document.createElement("div");
                        name.innerHTML = track.trackName;
     
                        var source = document.createElement("div");
                        source.className = "font-weight-light";
                        source.innerHTML = track.trackSource;

                        var length = document.createElement("div");
                        length.className = "font-weight-light";
                        length.innerHTML = track.length;

                        $("#" + musiclist.id).append(name);
                        $("#" + musiclist.id).append(source);
                        //$("#" + musiclist.id).append(length);
                       

                    })
                    var space1 = document.createElement("div")
                    space1.className = "p-2";
                    
                    var addtrack = document.createElement("div")
                    addtrack.innerHTML = "Add a track to the List"
                    addtrack.className = "font-weight-bold"
                    $("#" + musiclist.id).append(addtrack)

                    $("#" + musiclist.id).append(space1);

                    var trackid = document.createElement("input")
                    trackid.id = musiclist.id+"trackidfield"
                    trackid.placeholder = "Enter track ID"
                    trackid.type = "number"
                   
                    $("#" + musiclist.id).append(trackid);
                 
                    var trackposition = document.createElement("input");
                    trackposition.id = musiclist.id+"trackpositionfield"
                    trackposition.placeholder = "Enter position of track";
                    trackposition.type = "number";
    
              
                    //$("#" + musiclist.id).append(trackposition);
                   
                    $("#" + musiclist.id).append(space1);

                    var addTrackList = document.createElement("button");
                    addTrackList.innerHTML = "Add Track";
                    addTrackList.className = "btn";
                    addTrackList.classList.add("newTrack")

                    $("#" + musiclist.id).append(addTrackList);
                   
                    addTrackList.onclick = function () {
                        AddTrackToList(musiclist.id, parseInt(document.getElementById(musiclist.id + "trackidfield").value))

                     
                    }

                    var space2 = document.createElement("div")
                    space2.className = "mt-2";
                    $("#" + musiclist.id).append(space2)

                    var deleteList = document.createElement("button");
                    deleteList.innerHTML = "Delete "+musiclist.name;
                    deleteList.className = "btn";
                    $("#" + musiclist.id).append(deleteList);
                    
                    deleteList.onclick = function () {
                        DeleteMusicList(musiclist.id)
                    }

                    


                });

            } else {
                ProcessErrors(json.errorMessage)
            }
        }) // if loading failed, error message is shown on screen
}

function DeleteMusicList(MusicListID) {
    fetch(baseurl + "/api/Playlist/" + MusicListID, {
            method: "delete",
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey')
            }
        })
        .then(response => response.json())
        .then(json => {
            //console.log(json);
            if (json.success) {
               
                GetMusicLists();

            } else {
                ProcessErrors(json.ErrorMessageS)

            }
        })
        .catch(error => {console.error("Error Deleting Message", error)});

}

function AddMusicList() {
    if (localStorage.getItem('UserRole') == "artist") {
        var newMusicList = {}
        newMusicList.listName = document.getElementById("listnamefield").value;
       
       
        fetch(baseurl + "/api/Playlist", {
            method: "post",
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey'),
                "success": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMusicList)
        })
            .then(response => response.json())
            .then(json => {
                //console.log(json);
                if (json.success) {

                    GetMusicLists();
                    document.getElementById('listnamefield').value=null;

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

function AddTrackToList(MusicListID, TrackID) {

        //console.log(MusicListID)
        var addTrack = {}
        addTrack.playListId = MusicListID;
        var array = {}
        array.trackID = TrackID;
        array.trackPosition = 1;

        addTrack.trackPositionArray = [array];
        
        //console.log(JSON.stringify(addTrack))

        fetch(baseurl + "/api/Playlist", {
            method: "put",
            headers: {
                "Authorization": localStorage.getItem('AuthenticationKey'),
                "success": true,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(addTrack)
        })
            .then(response => response.json())
            .then(json => {
                //console.log(json);
                if (json.success) {

                    GetMusicLists();

                } else {
                    ProcessErrors(json.errorMessage)
                }
            })
            .catch(error => {
                ProcessErrors(json.errorMessage)
            });
   
}
