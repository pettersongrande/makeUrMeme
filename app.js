// SELECTORS
const form = document.getElementById('mainForm');
const imgLink = document.getElementById('imgLink');
const topTxt = document.getElementById('topTxt');
const btmTxt = document.getElementById('btmTxt');
const memeContainer = document.getElementById('memesContainer');

const allObjs = [];


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const newObj = objectFactory(imgLink.value, topTxt.value, btmTxt.value);
    const newImg = imgCreator(newObj.img);
    memeContainer.appendChild(newImg);

});

// This function creates an object extracting data from an user input.
// Parameter: image src, string1, string2;
// return: a new object with three keys to be accessed
function objectFactory(imgSrc, txt1, txt2){
    const newObj = {
        img        : imgSrc,
        captionOne : txt1,
        captionTwo : txt2,

    };

    return newObj
};

// Extracting data from an object to create a new DIV & IMG element.
// Parameter: object.img >> imgSrc
// Return: new img element.
function imgCreator(imgSrc){
    const newDiv = document.createElement('DIV');
    const newImg = document.createElement('IMG');
    newImg.setAttribute("src", imgSrc);
    newDiv.innerHTML = newImg;  

    return newImg;

};

// APPEND NEW IMAGE TO IMAGE CONTAINER