/*************************************************************************************************
 * https://stackoverflow.com/questions/39349671/how-to-maintain-firebase-auth-for-multiple-pages-on-the-web
 * 
 * 
 */

/* Variables
*/
const signupButton = document.getElementById('signup-button');
const loginButton = document.getElementById('login-button');
const   userForms = document.getElementById('user_options-forms');
const   Goback = document.getElementById('goBack');
const   submitLogin = document.getElementById('btn_login');
const   submitRegister = document.getElementById('btn_signup');


 // turn back to blog
toHome = () => {
  window.location.replace('../index.html');
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


function PasswordLost(){
  const email = document.getElementById('emailForgot').value;
  firebase.auth().sendPasswordResetEmail(email)
  .then(() =>{
    GetNotification(`HELP IS ON THE WAY` , `Get something to drink in the meantime `);
    toHome();
  })
  .catch(function (error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;

    console.log(errorCode, errorMessage);
    document.getElementsByClassName('alerts').innerHTML = errorCode + " - " + errorMessage;
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