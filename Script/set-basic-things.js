const userName = document.getElementById('name'),
    greeting = document.getElementById('greeting'),
    focusContainer = document.getElementById('focus'),
    bgImgContainer = document.getElementById('bg_img');

function setBackground() {
    // const url ="https://source.unsplash.com/1600x900/?nature,water"
    // document.body.style.backgroundImage = `url(${url})`;

    var imgName = Math.floor(Math.random() * 6) + 1;
    bgImgContainer.style.cssText = `background: url(BG/${imgName}.jpg); background-size: cover;`;
}


function setGreet() {
    let today = new Date(),
        hour = today.getHours();

    if (hour < 12) {
        // Morning
        greeting.textContent = 'Good Morning, ';
    } else if (hour < 18) {
        // Afternoon
        greeting.textContent = 'Good Afternoon, ';
    } else {
        // Evening
        greeting.textContent = 'Good Evening, ';
        document.body.style.color = 'white';
    }
}


// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
        userName.textContent = '[Enter Name]';
    } else {
        userName.textContent = localStorage.getItem('name');
    }
}

// Set Name
function setName(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('name', e.target.innerText);
            userName.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerText);
    }
}

// Get Focus
function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focusContainer.textContent = '[Enter Focus]';
    } else {
        focusContainer.textContent = localStorage.getItem('focus');
    }
}

// Set Focus
function setFocus(e) {
    if (e.type === 'keypress') {
        // Make sure enter is pressed
        if (e.which == 13 || e.keyCode == 13) {
            localStorage.setItem('focus', e.target.innerText);
            focusContainer.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText);
    }
}

userName.addEventListener('keypress', setName);
userName.addEventListener('blur', setName);
focusContainer.addEventListener('keypress', setFocus);
focusContainer.addEventListener('blur', setFocus);

// Run
setBackground();
setGreet();
getName();
getFocus();