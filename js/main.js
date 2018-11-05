function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}


// look for elements

let createPostButton = document.getElementById('plus');
let submit = document.getElementById('saveForm');
let form = document.getElementById('activityform');
let logOutButton = document.getElementById('logout');
let statusbar = document.getElementById('status');
let alertArea = document.getElementsByClassName('alerts');
let more = document.getElementById('tools');
let editor;


// firebase logout

function logOut() {
    firebase.auth().signOut()
        .then(() => {
            GetNotification(`signedOut`, `Thank you come again - Apu`)
            window.location.reload();
        })
}




//DELETE BUTTON

DeletePost = (id) => {
    var ref = firebase.database().ref('content');
    ref.orderByChild('id').equalTo(id).on('child_added', (snapshot) => {

        console.log(id);
        var d = document.getElementById(id);
        d.className += " hidden";

        snapshot.ref.remove();

    })
        .then(() => {
            GetNotification(`Deleted i see - Yoda`)
            document.getElementById('feed-item').innerHTML = ""

        })
        .catch(error => alert('error'));
}
   



// edit post

EditPost = (e) => {
    document.querySelector('#activityform').style.cssText = "height: 500px; padding: 20px; opacity: 1; z-index: 110; ";
    form.disabled = true;
    e.stopPropagation();


    var ref = firebase.database().ref('content');
    ref.orderByChild('id').equalTo(id).on('child_added', (snapshot) => {

        document.querySelector('#formHolder #name').value = ref.name;
        myEditor.setData(comment);
        document.getElementById(id).value = firebase.auth().currentUser.uid;
    });
}



// CLICK ANYWHERE TO HIDE FORM

function closest(e, t) {
    return !e ? false : e === t ? true : closest(e.parentNode, t);
}

createPostButton.addEventListener("click", function (e) {
    document.querySelector('#activityform').style.cssText = "height: 500px; padding: 20px; opacity: 1; z-index: 110;";
    createPostButton.disabled = true;
    e.stopPropagation();

});

document.body.addEventListener("click", function (e) {
    if (!closest(e.target, form)) {
        form.style.display = "none";
        open.disabled = false;
    }
});


// SUBMIT FORM BUTTON: RESET FORM AND HIDE THE FORM
var ref = new Firebase("https://lab5-51c5e.firebaseio.com/content");


function timeStamp() {
    var now = new Date();
    var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];
    var time = [now.getHours(), now.getMinutes()];
    var suffix = (time[0] < 12) ? "AM" : "PM";
    time[0] = (time[0] < 12) ? time[0] : time[0] - 12;

    for (var i = 1; i < 3; i++) {
        if (time[i] < 10) {
            time[i] = "0" + time[i];
        }
    }

    return date.join("/") + ", " + time.join(":") + " " + suffix;
}

ref.on("child_added", function (snapshot) {
    var comment = snapshot.val();
    addComment(comment.id, comment.name, comment.comment, comment.time, comment.author, comment.uid);
});



function postComment() {
    const name = document.getElementById("name").value;
    const comment = myEditor.getData();
    const time = timeStamp();
    const author = firebase.auth().currentUser.displayName;
    const uid = firebase.auth().currentUser.uid;

    var myRef = firebase.database().ref().push();

    database.collection('feed-items').add({
        id: myRef.key,
        name: name,
        comment: comment,
        time: time,
        author: author,
        uid: uid
    })

    if (name && comment && author && uid) {
        ref.push({
            id: myRef.key,
            name: name,
            comment: comment,
            time: time,
            author: author,
            uid: uid
        });
    }

    document.getElementById("name").value = '';
    // document.getElementById("comment").value = '';
}

function addComment(id, name, comment, timeStamp, author, doc) {
    let comments = document.getElementById("comments");
    comments.innerHTML = `
  
  <div id="${id}" class="feed-item">
  <div class="icon-holder"><div class="icon"></div></div>
  <div class="text-holder col-3-5">
    <div class="feed-title">${name}</div>
    <div class="feed-description"> ${comment}   </div>      
    <div class="meta">${timeStamp} <b>${author}</b>  </div>
    <div class='post-actions'>
    </div>
   
  </div><!--end of text-holder--> 
  <div class="post-options-holder">
    <div id= "tools" class="" >
    <i class="fa fa-ellipsis-v " id="postsettings" onclick= "EditPost('${id}');"></i>
    </div><!--End Tools-->
    <div id= "tools" class="" >
    <i class="fa fa-trash " id="trashsettings" onclick= "DeletePost('${id}');"></i>
    </div><!--End Tools-->
 
 
  </div><!--End Post Options Holder -->
</div><!--end of feed item--></div> 
${comments.innerHTML}
`;

}


// ADD CK EDITOR
var myEditor;

ClassicEditor.create(document.querySelector('#comment'))
    .then(editor => {
        console.log('Editor was initialized', editor);
        myEditor = editor;
    })
    .catch(err => {
        console.error(err.stack);
    });




// WHEN USER IS ACTIVE

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        statusbar.innerHTML = `<div id="logoutbut"><a href="#" id="logout">Log Out</a></div><!--End of Logout -->`
        createPostButton.classList.remove('hidden');
        more.classList.remove('hidden');

        //        console.log(user.displayName);

        if (!user.emailVerified) {
            alertArea.innerHTML = `
            <div class='alerts_warning'><strong><i class="fas fa-exclamation-triangle"></i>Verification: </strong> Make sure to verify your email address. <a href='' id='verifyMe'>Re-send verification email</a><button type='button' class='btn' id='closeAlert'><i class="fas fa-times"></i></button></div>
            `
            setTimeout(() => {
                alertArea.innerHTML = ``;
            }, (2 * 60 * 1000));
        }
    } else {
        statusbar.innerHTML = `<a href='pages/login.html'><button type='button' class='btn primary'>Log in / Sign up</button></a>`
        createPostButton.classList.add('hidden');
        more.classList.add('hidden');


    }
});
// ADD eventlisteners when element is created

document.addEventListener('click', (event) => {
    if (event.target) {
        if (event.target.id == 'logout') {
            logOut();
        }
        if (event.target.classList.contains('editPost')) {
            let post_id = event.target.id.split('_')[1];
            editPost(post_id);
        }
        if (event.target.classList.contains('deletePost')) {
            let post_id = event.target.id.split('_')[1];
            deletePost(post_id);
        }
    }
})
