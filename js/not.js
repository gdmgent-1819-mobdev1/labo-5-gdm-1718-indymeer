var permission = Notification.permission;

function Permission (){
  if(Notification && Notification.permission == 'default') {
     Notification.requestPermission((permission) => {
         if(!('permission' in Notification)) {
             Notification.permission = permission;
         }
     }) 
  }
}
    function GetNotification(title,text){
      if(Notification.permission === 'granted') {
        let notification = new Notification(title,{
          body: text,
        }); 
        notification.onclick=function(){
          window.open('https://google.com');
        };
        setTimeout(notification.close.blind(notification),3000);
      }
    };

Permission();