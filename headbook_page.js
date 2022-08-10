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

room_name = localStorage.getItem("room_name");
user_name = localStorage.getItem("user_name");

var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
var msg = document.getElementById("msg");
var Msg = "";
var Content = "";

function start()
{
      msg.innerHTML = "";
    recognition.start();
}

recognition.onresult = function(event) {

    console.log(event);

    Content = event.results[0] [0].transcript;
    console.log(Content);

      Msg = Content;
      msg.innerHTML = Msg;
}

var s = 0;

function send()
{
      s = 0;
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0,
            love:0
      });

      document.getElementById("msg").value = "";
}

function reply()
{
      s=1;
      Msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:Msg,
            like:0,
            love:0
      });

      document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
      
       console.log(firebase_message_id);
       console.log(message_data);
       name = message_data['name'];
       message  = message_data['message'];
       like = message_data['like'];
       love = message_data['love'];
      if(s == 0)
      {
            name_with_tag = "<h4> "+ name + "<img class ='user_tick' src = 'tick.png'></h4>";
            message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
            like_button = "<button class='btn btn-primary' id=" + firebase_message_id+" value="+ like+" onclick='updateLike(this.id)'>";
            span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><br><br>";
            reply_button = "<button class 'btn btn-info' onclick='reply()'>"
            love_button = "<button class='btn btn-danger' id=" + firebase_message_id+" value="+ love+" onclick='updateLove(this.id)'><span class='glyphicon glyphicon-heart-empty'>Love: " + love + "</span></button><hr>"
      
            row = name_with_tag + message_with_tag + like_button + span_with_tag + love_button;
            document.getElementById("output").innerHTML += row;
      
      }

      else{
            reply_tag = "<h3>Reply:</h3>";
            name_with_tag = "<h4> "+ name + "<img class ='user_tick' src = 'tick.png'></h4>";
            message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
            like_button = "<button class='btn btn-primary' id=" + firebase_message_id+" value="+ like+" onclick='updateLike(this.id)'>";
            span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><br><br>";
            reply_button = "<button class 'btn btn-info' onclick='reply()'>"
            love_button = "<button class='btn btn-danger' id=" + firebase_message_id+" value="+ love+" onclick='updateLove(this.id)'><span class='glyphicon glyphicon-heart-empty'>Love: " + love + "</span></button><hr>"
      
            row = reply_tag + name_with_tag + message_with_tag + like_button + span_with_tag + love_button;
            document.getElementById("output").innerHTML += row;
      
      }

//End code
      } });  }); }
getData();

var updated_likes = 0;

function updateLike(message_id)
{
            console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);


      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
      });
}


function updateLove(message_id2)
{
      loves = Number(love) + 1;
      updated_likes = 0;
       console.log("clicked on love button - " + message_id2);
      button_id1 = message_id2;
      love = document.getElementById(button_id1).value;
      updated_love = loves;
      console.log(updated_love);


      firebase.database().ref(room_name).child(message_id2).update({
            love : updated_love
      });
}

function logout()
{
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "headbook.html";
}