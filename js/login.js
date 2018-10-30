/*************************************************************************************************
 * https://stackoverflow.com/questions/39349671/how-to-maintain-firebase-auth-for-multiple-pages-on-the-web
 * 
 * 
 */
(function () {
  var el = document.getElementById('btn_signup');
if(el){
  el.addEventListener('click', signup, false);
}
var ee = document.getElementById('btn_login');
if(ee){
  el.addEventListener('click', login, false);
}
  requestNotificationPermission();
})();

function signup(e) {
  e.preventDefault();

  let email = document.getElementById("signup_email").value;
  let password = document.getElementById("signup_password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (response) {
    window.location = "pages/blog.html";
   // let createButton = document.getElementById('plus');
  //  createButton.style.cssText = "opacity: 1; z-index: 110;";
    sendNotification('Thanks for signing up to our website! Check your e-mail for account verification!');
    sendVerificationEmail(response.user);
  })
    .catch(function (error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message; 

    console.log(errorCode, errorMessage);
    document.getElementById('signup_error').innerHTML = errorCode + " - " + errorMessage;
  });
}

function login(e) {
  e.preventDefault();

  let email = document.getElementById("login_email").value;
  let password = document.getElementById("login_password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (response) {
   // window.location = "pages/blog.html";
    sendNotification('You are now logged in successfully!');
    showUserInfo(response.user);
    
    //let createButton = document.getElementById('plus');
    //createButton.style.cssText = "opacity: 1; z-index: 110;";

  })
    .catch(function (error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;

    console.log(errorCode, errorMessage);
    document.getElementById('login_error').innerHTML = errorCode + " - " + errorMessage;
  });
}

function sendVerificationEmail(user) {
  user.sendEmailVerification()
    .then(function () {
    // Email sent.
  }).catch(function (error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;

    console.log(errorCode, errorMessage);
  });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
   window.location = 'pages/blog.html';
   createButton.style.cssText = "opacity: 1; z-index: 110;";

  }
});

function sendNotification(msg) {
  let notif = new Notification(msg);
}

function requestNotificationPermission() {
  if (Notification && Notification.permission === 'default') {
    Notification.requestPermission(function (permission) {
      if (!('permission' in Notification)) {
        Notification.permission = permission;
      }
    });
  }
}

function showUserInfo(user) {
  document.getElementById('user_info').innerHTML = "<h1> Welcome " + user.email + " ! </h1>";
}

/**
 * Variables
 */
const signupButton = document.getElementById('signup-button'),
    loginButton = document.getElementById('login-button'),
    userForms = document.getElementById('user_options-forms')

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