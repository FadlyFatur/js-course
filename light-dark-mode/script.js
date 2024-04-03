const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById ('text-box');
const DARK_MODE = 'dark';
const LIGHT_MODE = 'light';


function imageMode(mode){
    image1.src = `img/undraw_proud_coder_${mode}.svg`;
    image2.src = `img/undraw_feeling_proud_${mode}.svg`;
    image3.src = `img/undraw_conceptual_idea_${mode}.svg`;
}   

function toggleDarkLightMode(isDark) {
    nav.style.backgroundColor = isDark ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';
    textBox.style.backgroundColor = isDark ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
    toggleIcon.children[0].textContent = isDark ? 'Dark Mode' : 'Light Mode';
    isDark ? toggleIcon.children[1].classList.replace('fa-sun','fa-moon') : toggleIcon.children[1].classList.add('fa-moon');
    isDark ? imageMode(DARK_MODE) : imageMode(LIGHT_MODE);
}

// function darkMode() {
//     nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
//     textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
//     toggleIcon.children[0].textContent = 'Dark Mode';
//     toggleIcon.children[1].classList.replace('fa-sun','fa-moon');
//     toggleIcon.children[1].classList.add('fa-moon');
//     imageMode('dark');
// }

// function lightMode(params) {
//     nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
//     textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
//     toggleIcon.children[0].textContent = 'Dark Mode';
//     toggleIcon.children[1].classList.replace('fa-moon','fa-sun');
//     imageMode('light');
// }

// Switch theme dynamic 
function switchTheme(e) {
    // console.log(e.target.checked);
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme',DARK_MODE);
        localStorage.setItem('mode', DARK_MODE);
        // darkMode();
        toggleDarkLightMode(true);
    }else{
        document.documentElement.setAttribute('data-theme',LIGHT_MODE);
        localStorage.setItem('mode', LIGHT_MODE);
        // lightMode();
        toggleDarkLightMode(false);
    }
}

// Event Listener
toggleSwitch.addEventListener('change', switchTheme)

// Check local storage 
const currTheme = localStorage.getItem('mode');
// console.log(currTheme);
if (currTheme) {
    document.documentElement.setAttribute('data-theme',currTheme);
    if (currTheme === DARK_MODE) {
        toggleSwitch.checked = true;
        // darkMode();
        toggleDarkLightMode(true);
    }else{
        toggleSwitch.checked = false;
        // lightMode();
        toggleDarkLightMode(false);
    }
}