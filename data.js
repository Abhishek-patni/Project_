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

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

// let's code  //Register user 
var datab  = firebase.database().ref('data');
function UserRegister(){
    var email = document.getElementById('eemail').value;
    var password = document.getElementById('lpassword').value;
    var name = document.getElementById('nname').value;
    firebase.auth().createUserWithEmailAndPassword(email,password).then(function(){
        datab.push().set({
            name: name,
            email: email,
            password: password,
        });
        window.location.href = "Store_Gender/reg2.html";
    }).catch(function (error){
        var errorcode = error.code;
        var errormsg = error.message;
        if (errorcode === 'auth/wrong-password') {
            alert('Invalid login credentials');
        } else if (errorcode === 'auth/user-not-found') {
            alert('User not found');
        } else {
            alert(errormsg);
        }
    });
}

//User login 
const auth = firebase.auth();
function SignIn(){
    var email = document.getElementById('eemail').value;
    var password = document.getElementById('lpassword').value;
    const promise = auth.signInWithEmailAndPassword(email,password);
    promise.then(() => {
        datab.orderByChild('email').equalTo(email).once('value', function(snapshot) {
            if (snapshot.exists()) {
                window.location.href = "Store_Gender/reg2.html";
            } else {
                alert('Invalid login credentials');
            }
        });
    }).catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('Invalid login credentials');
        } else if (errorCode === 'auth/user-not-found') {
            alert('User not found');
        } else {
            alert(errorMessage);
        }
    });
}

//document code
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    var userInfo = datab.push();
    userInfo.set({
        name: getId('nname'),
        email : getId('eemail'),
        password : getId('lpassword')
    });
    console("Succesfull")
    console.log("sent");
    document.getElementById('form').reset();
});
function  getId(id){
    return document.getElementById(id).value;
}


//Gogogle
//Sign in with google
const googleSigninButton = document.querySelector('#google-signin');
  googleSigninButton.addEventListener('click', () => {
    // Create a new Google auth provider object
    const provider = new firebase.auth.GoogleAuthProvider();

    // Sign in with Google using Firebase Authentication
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // Signed in with Google
        const user = result.user;
        console.log(user);

        // Redirect to google.com
        window.location.href = "https://www.google.com";
      })
      .catch((error) => {
        console.error(error);
      });
  });

