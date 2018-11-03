


function checkIfsupported(){
    return ('notification' in window) ? true : false;
} 


function GetNotification(title, text) {

    if(Notification.permission === 'granted') {
    let notification = new Notification(title, {
        icon: 'https://octodex.github.com/images/saint_nictocat.jpg',
        body: text
    });

    setTimeout(() => {
        notification.close.bind(notification)
    }, 3000);
}
}

reqPerms = () => {
    if(Notification && Notification.permission == 'default') {
       Notification.requestPermission((permission) => {
           if(!('permission' in Notification)) {
               Notification.permission = permission;
           }
       }) 
    }
}

// if supported call notifications
if(checkIfsupported) {
    reqPerms();
}