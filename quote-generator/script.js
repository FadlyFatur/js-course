const qouteContainer = document.getElementById('quote-container');
const qouteText = document.getElementById('qoute');
const authorText = document.getElementById('author');
const loader = document.getElementById('loader');

const newQouteBtn = document.getElementById('new-quote').addEventListener('click', newQoute);
const twitterBtn = document.getElementById('twitter').addEventListener('click', tweetQoute);

let apiQoutes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    qouteContainer.hidden = true;
}

function removeLoadingSpinner() {
    loader.hidden = true;
    qouteContainer.hidden = false;
}

// Show new qoute 
function newQoute() {
    showLoadingSpinner()
    // pick a random qoute from response 
    const qoute = apiQoutes[Math.floor(Math.random() * apiQoutes.length)];
    // check if author is blank replace with unknown
    !qoute.author ? authorText.textContent = 'Unknown': authorText.textContent = qoute.author;
    qoute.text.length > 75 ? qouteText.classList.add('long-qoute') : qouteText.classList.remove('long-qoute'); 
    //See qoute and hide loader
    qouteText.textContent = qoute.text;
    removeLoadingSpinner()
}

// Gets qoutes
async function getQoutes(){
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiURL);
        apiQoutes = await response.json();
        // console.log(apiQoutes[]);
        newQoute()
    } catch (error) {
        // Catch error 
        console.log(error);
        alert('Error fetching data!!')
    }
}

// tweet qoute 
function tweetQoute() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${qouteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//on Load
getQoutes();   




