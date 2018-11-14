/*************************************************************************************************
 * https://stackoverflow.com/questions/39349671/how-to-maintain-firebase-auth-for-multiple-pages-on-the-web
 * 
 * 
 */

/* Variables
 */
const signupButton = document.getElementById('signup-button');
const loginButton = document.getElementById('login-button');
const userForms = document.getElementById('user_options-forms');
const Goback = document.getElementById('goBack');
const submitLogin = document.getElementById('btn_login');
const submitRegister = document.getElementById('btn_signup');
const googleButton = document.getElementById('googlebttn');
const LostSubmit = document.getElementById('lost_send');


// google login
var provider = new firebase.auth.GoogleAuthProvider();
googleLogIn = () => {
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

}


googleButton.addEventListener('click', googleLogIn);


// turn back to blog
function toHome () {
    window.location.replace('../index.html');
}

function toLogin() {
    window.location.replace('../pages/login.html');
}


// LOGIN 

function login(e) {
    e.preventDefault();
    const email = document.getElementById("login_email").value;
    const password = document.getElementById("login_password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            GetNotification('You are now logged in successfully!');
            toHome();

        })
    /*  .catch(function (error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;

      console.log(errorCode, errorMessage);
      document.getElementsByClassName('alerts').innerHTML = errorCode + " - " + errorMessage;
    });*/
}


// SIGNUP 

function signup(e) {
    e.preventDefault();

    const email = document.getElementById("signup_email").value;
    const password = document.getElementById("signup_password").value;
    const username = document.getElementById('username').value;
    const auth = firebase.auth();

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            auth.currentUser.updateProfile({
                displayName: username
            })
            auth.currentUser.sendEmailVerification()
                .then(() => {
                    GetNotification(`Thanks for signing up to our website! Check your e-mail for account verification!`);
                    toHome();
                })
        })
    /*  .catch(function (error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;

      console.log(errorCode, errorMessage);
      document.getElementsByClassName('alerts').innerHTML = errorCode + " - " + errorMessage;
    });*/
}

// PASSWORD

function PasswordLost() {
    const email = document.getElementById('emailForgot').value;
    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            GetNotification(`HELP IS ON THE WAY`, `Get something to drink in the meantime `);
            toHome();
        })
        .catch(function (error) {
    
        });
}

function showUserInfo(user) {
    document.getElementById('user_info').innerHTML = "<h1> Welcome " + user.email + " ! </h1>";
}

/**

/**
 * Add event listener to the "Sign Up" button
 */
signupButton.addEventListener('click', () => {
    userForms.classList.remove('bounceRight')
    userForms.classList.add('bounceLeft')
}, false)

/**
 * Add event listener to the "Login" button
 */
loginButton.addEventListener('click', () => {
    userForms.classList.remove('bounceLeft')
    userForms.classList.add('bounceRight')
}, false)

Goback.addEventListener('click', toHome);
submitLogin.addEventListener('click', login);
submitRegister.addEventListener('click', signup);
