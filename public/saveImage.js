// var sendMess = document.getElementById("sendMess");
var textArea = document.getElementById("messText");
var modified = document.getElementById("modified");
var sendMess = document.getElementById("sendMess");
var phNum = document.getElementById("phoneNum");
var uploadImageBtn = document.getElementById("uploadImage");

function completedCheck(error) {
  if (error) {
    alert("Data could not be saved." + error);
  } else {
    alert("Message added to Comments List.");
    textArea.value = "";
  }
}
``;
var modComments = {
  init: function() {
    sendMess.addEventListener("click", function() {
      var message = textArea.value;
      var num = phNum.value;
      modComments.writeUserData(num, message);
    });
    // var imageFiles = [];
    // const inputElement = document.getElementById("input");
    // inputElement.addEventListener("change", handleFiles, false);
    // function handleFiles() {
    //   console.log(this.files);
    //   imageFiles.push(this.files);
    //   console.log(imageFiles, "img files");
    //   const fileList = this.files; /* now you can work with the file list */
    // }
    // uploadImageBtn.addEventListener("click", function() {
    //   var file = imageFiles[0][0];
    //   var name = imageFiles[0][0].name;
    //   modComments.uploadImage(name, file);
    // });
    setTimeout(function() {
      modComments.removePulse();
    }, 1500);
  },
  removePulse: function() {
    sendMess.classList.remove("pulse");
  },
  writeUserData: function(destNum, message) {
    var db = firebase.database();
    var ref = db.ref("send/sms/");
    var newPostRef = ref.push();
    var postKey = newPostRef.key;
    console.log(postKey, "before");
    newPostRef.set(
      {
        number: destNum,
        text: message
      },
      completedCheck
    );
    // this.addToList(postKey);
  },
  addToList: function(postKey) {
    this.writeModifiedText(postKey);
  },
  uploadImage: function(name, image) {
    var storageRef = firebase.storage().ref();

    // Create a reference to image'
    var mountainsRef = storageRef.child(name);

    mountainsRef.put(image).then(function(snapshot) {
      console.log("Uploaded a blob or file!");
    });
  },
  writeModifiedText: function(key) {
    var db = firebase.database();
    var entry = "send/sms/" + key;
    var ref = db.ref(entry);

    ref.on(
      "value",
      function(snapshot) {
        modified.classList.remove("hidden");
        modified.parentElement.classList.remove("hidden");
        console.log(snapshot.val());
        var snap = snapshot.val();
        var listItem = document.createElement("li");
        listItem.classList.add("collection-item");
        listItem.innerText = snap.text;
        modified.appendChild(listItem);
      },
      function(error) {
        console.log("Error: " + error.code);
      }
    );
  }
};

document.addEventListener("DOMContentLoaded", function(event) {
  modComments.init();
});
