    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBClVw87bbB4rzjSrTyy-DDs24YSizdsqQ",
        authDomain: "lab5-51c5e.firebaseapp.com",
        databaseURL: "https://lab5-51c5e.firebaseio.com",
        projectId: "lab5-51c5e",
        storageBucket: "lab5-51c5e.appspot.com",
        messagingSenderId: "254036744848"
      };
      firebase.initializeApp(config);
      
      const database = firebase.firestore();
database.settings({
    timestampsInSnapshots: true
});