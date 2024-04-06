const music = document.querySelector('audio');
const proggresConteiner = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const curTime = document.getElementById('current-time');
const durTime = document.getElementById('duration');
// Check if play 
let isPlaying = false;

// Music 
const songs = [
    {
        name : 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist : 'Jacinto Design'
    },  
    {
        name : 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist : 'Jacinto Design'
    },{
        name : 'jacinto-3',
        displayName: 'Goodnight Disco Queen',
        artist : 'Jacinto Design'
    },{
        name : 'metric-1',
        displayName: 'Front Row (Remix)',
        artist : 'Metric'
    }
];
    

// Play 
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

//play or pause event
playBtn.addEventListener('click',() => (isPlaying ? pauseSong() : playSong() ) )

// Update DOM
function loadSong(songs) {
    // console.log(songs);
    title.textContent = songs.displayName;
    artist.textContent = songs.artist;
    music.src = `music/${songs.name}.mp3`;
    image.src = `img/${songs.name}.jpg`;
}

// Current song 
let songIndex = 0;

// Next Song 
function nextSong() {
    songIndex++;
    if (songIndex > songs.length-1) {
        songIndex = 0;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length-1;
    }
    // console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}

// update Progress and time  
function updateProgressBar(e) {
    if (isPlaying) {
        const {duration, currentTime} = e.srcElement;
        // console.log(duration, currentTime);
        // Update progres bar width 
        const progressPercent = (currentTime/duration) * 100;
        progress.style.width = `${progressPercent}%`;
        //calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSecond = Math.floor(duration % 60);
        if (durationSecond < 10) {
            durationSecond = `0${durationSecond}`
        }
        // delay to avoid not a number 
        if(durationSecond){
            durTime.textContent = `${durationMinutes}:${durationSecond}`;
        }

        //calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSecond = Math.floor(currentTime % 60);
        if (currentSecond < 10) {
            currentSecond = `0${currentSecond}`
        }
        curTime.textContent = `${currentMinutes}:${currentSecond}`;
    }
}

// set progress bar 
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX/width) * duration;
}
// on Load 
loadSong(songs[songIndex]);

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate',updateProgressBar)
music.addEventListener('ended',nextSong);
proggresConteiner.addEventListener('click', setProgressBar)