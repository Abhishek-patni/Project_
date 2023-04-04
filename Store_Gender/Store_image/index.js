const firebaseConfig = {
    apiKey: "AIzaSyDTuXtTS2MIJv4bW-XnUeeNbtCGVJj0hpo",
    authDomain: "dating-web-c6ce9.firebaseapp.com",
    databaseURL: "https://dating-web-c6ce9-default-rtdb.firebaseio.com",
    projectId: "dating-web-c6ce9",
    storageBucket: "dating-web-c6ce9.appspot.com",
    messagingSenderId: "622569066360",
    appId: "1:622569066360:web:76def5dd380d5ad812428d",
    measurementId: "G-5HWWGSE4VB"
  };
firebase.initializeApp(firebaseConfig);

var fileText = document.querySelector(".fileText");
var uploadPercentage = document.querySelector(".uploadPercentage");
var progress =  document.querySelector(".progress");
var percentVal;
var fileItem;
var fileName;
var img = document.querySelector(".img");
 function getFile(e){
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    fileText.innerHTML = fileName;
}


function uploadImage(){
    let storageRef = firebase.storage().ref("images/"+fileName);
    let uploadTask = storageRef.put(fileItem);
    uploadTask.on("state_changed",(snapshot)=>{
        console.log(snapshot);
        percentVal = Math.floor((snapshot.bytesTransferred/snapshot.totalBytes)*100);
        console.log(percentVal);
        uploadPercentage.innerHTML = percentVal+"%";
        progress.style.width=percentVal+"%";
    },(error)=>{
        console.log("Error is ", error);
    },()=>{
        uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
            console.log("URL", url);
            if(url != ""){
                img.setAttribute("src",url);
                img.style.display="block";
                alert("Your Card will be added soon"),
                setTimeout(function(){
                    window.location.href = "../reg2.html"; // Redirect to Google after 10 seconds
                }, 10000);
            }
        })
    })
}
