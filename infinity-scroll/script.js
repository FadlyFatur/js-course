const imageCont = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photoArrays = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let isInitialized = true;

// Unsplash API
let initialCount = 5;
const apiKey = '2fMQjbrugbRk5FwkeGpZwg46qXDUVstbHf8YVuD3qXs';
// const topic = 'indonesia'
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}&orientation=squarish`;

// Helper function for repeting use
function setAttributes(ele, att) {
    for(const key in att){
        ele.setAttribute(key, att[key]);
    }
}

function updateInitialCount(newCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${newCount}&orientation=squarish`;
}

// Check if image is loaded 
function imageLoaded() {
    imagesLoaded++;
    console.log('image is Loaded');
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready : ' + ready);
    }
}

// Create element to display photo
function displayPhoto() {
    imagesLoaded = 0;
    totalImages = photoArrays.length;
    console.log('total images : ', totalImages);
    //Run func for each photo
    photoArrays.forEach((photo) => {
        // Create <a> to link to unspalsh
        const item = document.createElement('a');
        setAttributes(item, {
            href : photo.links.html,
            target: '_blank',
        });
        
        // Create <img> for photo
        const img = document.createElement('img');  
        setAttributes(img, {
            src : photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description,
        });

        // Event listener 
        img.addEventListener('load', imageLoaded());

        // Put the image inside ancor element and put both inside img-container element
        item.appendChild(img);
        imageCont.appendChild(item);
    });
}

// Get photo from unsplah API
async function getPhotos() {
    try {
        const respone = await fetch(apiUrl);
        photoArrays = await respone.json();
        console.log(photoArrays);
        displayPhoto()
        //Cek jika sudah di inisialisasi
        if(isInitialized){
            updateInitialCount(30);
            isInitialized = false;
        }
    } catch (error) {
        //catch errors
        console.log('Error happens :( :\n' + error );
    }
}

//infinite scrool if near bottom of the page using scroll event
window.addEventListener('scroll', () => {
    // console.log(window.innerHeight );
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        // console.log('----------- REQUEST ----------');
        // const x = window. innerHeight + window.scrollY;
        // const y = document.body.offsetHeight - 1000;
        // console.log('window.innerHeight : ' + window.innerHeight);
        // console.log('window.scrollY : ' + window.scrollY);
        // console.log('window.innerHeight + window.scrollY : ' + x);
        // console.log('document.body.offsetHeight - 1000 : ' + y);
        // console.log('----------- END REQUEST ----------');
        ready = false;
        console.log('ready', ready);
        getPhotos()
        console.log('Request foto');
    }
    // else{
    //     console.log('----------- NOT REQUEST ----------');
    //     const x = window. innerHeight + window.scrollY;
    //     const y = document.body.offsetHeight - 1000;
    //     console.log('window.innerHeight : ' + window.innerHeight);
    //     console.log('window.scrollY : ' + window.scrollY);
    //     console.log('window.innerHeight + window.scrollY : ' + x);
    //     console.log('document.body.offsetHeight - 1000 : ' + y);
    //     console.log('----------- END NOT REQUEST ----------');
    // }
});

// Onload 
getPhotos();