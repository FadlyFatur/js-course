const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day =  hour * 24;


//Set date input Min with today date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today);

//Populate Countdown / Complete UI
function updateDOM() {
    countdownActive = setInterval(() =>{
        // get time in second  
        const now = new Date().getTime(); 
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        // Hide input 
        inputContainer.hidden = true;

        if (distance < 0 ){
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false; 
        }else {
            //else, show countdown in porgreess and Populate Countdown
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    }, second);
}

// Take value from input 
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title : countdownTitle,
        date : countdownDate,
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    // Check validate date 
    if (countdownDate === ''){
        alert('Plese select a date for countdown!');
    }else{
        // Get number version of current date 
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Reset all value 
function reset() {
    // Hide countdown and show input 
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    clearInterval(countdownActive);
    // Reset Value 
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

function restorePrevCount() {
    //get countdown from local storage if exist
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// event listener 
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On load check local storage 
restorePrevCount();