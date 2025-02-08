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

// alert('Hello there, welcome to  Make Your Meme. INSTRUCTIONS choose a gif or image of your choice copy and paste its link in the first field. Next, add captions. You can add top and bottom, but If you did not enjoy your new creation you can double click in the image and it will disappear. The trash button on the right will delete all your memes, so be careful or not...');

renderPage(allObjs, memeDisplay);

// EVENTS
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    // USER INPUTS VALUE
    const imageLink    = imgLink.value;
    const topString    = topTxt.value;
    const btmString    = btmTxt.value;
    
    // Create new obj
    const newObj = objectFactory(imageLink, topString, btmString);    
    
    // Setting the IndexNumber to the current array length
    const indexNumber  = allObjs.length;

    // Storing new object
    allObjs.push(newObj);
    
    // Create new IMAGE
    const newImg = imgCreator(allObjs[indexNumber].img, indexNumber, allObjs[indexNumber].captionOne, allObjs[indexNumber].captionTwo);
    console.log(topString);
     // Saving to Local Storage
    saveToLocalStorage(LS_NAME,allObjs);
    
    memeDisplay.append(newImg);

    // Render the whole page displaying all images stored in allObjs/localStorage
    renderPage(allObjs, memeDisplay);

    // Clearing Input Fields
    imgLink.value = '';
    topTxt.value  = '';
    btmTxt.value  = '';

});

// REMOVE EACH MEME EVENT
memeDisplay.addEventListener('dblclick', (e)=>{
    e.preventDefault();
    const memeIndex = e.target.dataset.indxNum;

    if(e.target.tagName === 'IMG'){
        deleteMeme(memeIndex, allObjs);
        renderPage(allObjs, memeDisplay);
    }
    else {
        return;
    }
    
});

// REMOVE EACH MEME FUNCTION
// Parameter 1: index number
// Parameter 2: arrayOfObjects
function deleteMeme(idxNum, arrayOfObjects){
    arrayOfObjects.splice(idxNum, 1);
    saveToLocalStorage(LS_NAME, arrayOfObjects);
};

// REMOVE ALL MEMES EVENT
deleteButton.addEventListener('click', (e)=>{
    localStorage.clear();
    location.reload();
});


// LOOP AND DISPLAY IMGS
// Parameter 1: the array where the objects are stored
// Parameter 2: the area where the images must be displayed
// Return: nothing;
function renderPage(arrayOfObjects, displayArea){
    displayArea.innerHTML = '';

    for(let i = 0; i < arrayOfObjects.length; i++){
        displayArea.append(imgCreator(arrayOfObjects[i].img, i, arrayOfObjects[i].captionOne, arrayOfObjects[i].captionTwo));
    };

};

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
function imgCreator(imgSrc, indexNumber, objText1, ObjText2){
    const newDiv = document.createElement('DIV');
    newDiv.classList.add('memeCard');

    const newImg = document.createElement('IMG');
    newImg.classList.add('imgClass');
    newImg.dataset.indxNum = indexNumber;
    newImg.setAttribute("src", imgSrc);
    newDiv.append(newImg);

    const topMsg = document.createElement('P');
    topMsg.classList.add('memeCard', 'topMsg');
    topMsg.innerHTML = objText1;
    newDiv.append(topMsg);

    const btmMsg = document.createElement('P');
    btmMsg.classList.add('memeCard','btmMsg');
    btmMsg.innerHTML = ObjText2;
    newDiv.append(btmMsg);   
    
    

    return newDiv;

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

// AREA FOR TESTING ---------------------------------------------------------



