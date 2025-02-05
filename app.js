// SELECTORS
const form          = document.getElementById('mainForm');
const imgLink       = document.getElementById('imgLink');
const topTxt        = document.getElementById('topTxt');
const btmTxt        = document.getElementById('btmTxt');
const memeDisplay   = document.getElementById('memesContainer');
const deleteButton  = document.getElementById('dltBtm');
const LS_NAME       = "allImgObjs";


// Array of Objects
const allObjs = retrieveFromLocalStorage(LS_NAME);

renderPage(allObjs, memeDisplay);


form.addEventListener('submit',(e)=>{
    e.preventDefault();

    // USER INPUTS VALUE
    const imageLink    = imgLink.value;
    const topString    = topTxt.value;
    const btmString    = btmTxt.value;
    
    // Create new obj
    const newObj = objectFactory(imageLink, topString, btmString);    
    
    // Storing new object
    allObjs.push(newObj);
    saveToLocalStorage(LS_NAME,allObjs);
    
    // Create a new Image, append it to memepage and refresh page with allmemes.
    
    renderPage(allObjs, memeDisplay);

    // Clearing Input Fields
    imgLink.value = '';
    topTxt.value  = '';
    btmTxt.value  = '';

});

// REMOVE ALL MEMES EVENT
deleteButton.addEventListener('click', (e)=>{
    localStorage.clear();
    location.reload();
});


// LOOP AND DISPLAY IMGS
// Parameter 1: the array where the objects are stored
// Parameter 2: the area where the images must be displayed
function renderPage(arrayOfObjects, displayArea){
    displayArea.innerHTML = '';

    for(let links of arrayOfObjects){
        displayArea.append(imgCreator(links.img));
    };

}

// CREATE OBJECT FROM USERINPUT
// Parameter 1, 2, 3: image src, string1, string2;
// return: a new object with three keys to be accessed
function objectFactory(imgSrc, txt1, txt2){
    const newObj = {
        img        : imgSrc,
        captionOne : txt1,
        captionTwo : txt2,

    };

    return newObj;
};

// CREATE IMG AND DIV from OBJECT
// Parameter 1: object.img >> imgSrc
// Return: new img element.
function imgCreator(imgSrc){
    const newDiv = document.createElement('DIV');
    const newImg = document.createElement('IMG');
    newImg.setAttribute("src", imgSrc);
    newDiv.innerHTML = newImg;  

    return newImg;

};


//ADD TO LOCAL STORAGE
//Parameter 1: storage name and the objecs to be saved
//Parameter 2: Objets to be stored in local storage
//Return: nothing.
function saveToLocalStorage(storageName, objectToBeSaved) {
    localStorage.setItem(storageName, JSON.stringify(objectToBeSaved));

    return;
};

//RETRIEVE FROM LOCAL STORAGE
//Parameter:
//Return: objects stored in session storage;
function retrieveFromLocalStorage(storageName){
    return JSON.parse(localStorage.getItem(storageName)) || [];

};