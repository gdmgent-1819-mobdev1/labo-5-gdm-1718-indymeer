
function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

let createPostButton = document.getElementById('plus');
let submit = document.getElementById('saveForm');
let form = document.getElementById('activityform');
let anna = document.querySelectorAll('#postsettings');




function closest(e, t){ 
    return !e? false : e === t ? true : closest(e.parentNode, t);
  }

createPostButton.addEventListener("click", function(e){
    document.querySelector('#activityform').style.cssText="height: 500px; padding: 20px; opacity: 1; z-index: 110;"; 
    createPostButton.disabled = true;
    e.stopPropagation();
  
});

document.body.addEventListener("click", function(e) {
    if (!closest(e.target, form)) {
        form.style.display = "none";
        open.disabled = false;
    }
});


// SUBMIT FORM BUTTON: RESET FORM AND HIDE THE FORM

submit.addEventListener("click", function(e){
    e.preventDefault();
    console.log('button clicked');
    createItems();
    document.getElementById("newActivity").reset();
    form.style.display = "none";
    });



const ul = document.querySelector('#feed');

function createItems(){

    // GENERATE DIVS FOR CONTAINERS
    let container = createNode("div");
    let iconHolder = createNode("div");
    let icon = createNode("div");
    let textHolder = createNode("div");
    let title = createNode("div");
    let description = createNode("div");
    let postOption = createNode("div");
    let tools = createNode("div");
    let ellipsis = createNode("i");

    // CLASSNAMES 

    container.className = "feed-item";
    iconHolder.className = "icon-holder";
    icon.className = "icon";
    textHolder.className = "text-holder col-3-5";
    title.className = "feed-title";
    description.className = "feed-description";
    postOption.className = "post-options-holder";
    tools.className = "tools";
    ellipsis.className = "fa fa-ellipsis-v";
    ellipsis.id = "postsettings";

    
    append(tools, ellipsis);
    append(postOption, tools);
    append(textHolder, title);
    append(textHolder, description);
    append(container, textHolder);
    append(iconHolder, icon);
    append(container, postOption);
    append(container, iconHolder);
    append(ul, container);

    


    title.innerHTML = document.querySelector('#activityTitle').value;
    description.innerHTML =" <div id=\"editable0\" contenteditable=\"false\" onDblClick=\"editorInit('editable0');\">" + document.querySelector('#activityDescription').value + "</div>";


}


anna.addEventListener("click", function(e){
    e.preventDefault();
    insertEditorScript();
})
var editor, html = '';

function createEditor() {
    if ( editor )
        return;
    
    var config = {};
    editor = CKEDITOR.appendTo( 'editor', config, html );
}

function insertEditorScript(){
    var externalScript = document.createElement( 'script' );
    externalScript.setAttribute( 'src','https://cdn.ckeditor.com/4.9.2/standard/ckeditor.js' );
    document.head.appendChild( externalScript );

var createCKE = window.setInterval( function() {
 if( CKEDITOR ) {
   createEditor();
   clearInterval( createCKE );
 }
}, 100 );
}