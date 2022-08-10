// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBrKS5w0R3XfCWW3AQseWMcC-qWTFcbcLc",
  authDomain: "letschat-cb221.firebaseapp.com",
  databaseURL: "https://letschat-cb221-default-rtdb.firebaseio.com",
  projectId: "letschat-cb221",
  storageBucket: "letschat-cb221.appspot.com",
  messagingSenderId: "1066051761360",
  appId: "1:1066051761360:web:f28d420f03d011c7c6dad5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

    user_name = localStorage.getItem("user_name");
    document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

    function addRoom()
    {
       room_name = document.getElementById("room_name").value;
       firebase.database().ref("/").child(room_name).update({
           purpose : "adding room"
       });

       localStorage.setItem("room_name", room_name);
    }

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
        console.log("Room Name - " + Room_names);
        row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+ Room_names +"</div><hr>";
        document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();

function redirectToRoomName(name)
{
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "headbook_page.html";
}

function logout()
{
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "headbook.html";
}