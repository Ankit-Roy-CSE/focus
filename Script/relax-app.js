const relax_container = document.getElementById('relax_container');
const text = document.getElementById('text');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

breathAnimation();

function breathAnimation() {
    text.innerText = 'Breathe In!';
    relax_container.classList.remove("shrink")
    relax_container.classList.add("grow")

    // container.className = 'container grow';

    setTimeout(() => {
        text.innerText = 'Hold';

        setTimeout(() => {
            text.innerText = 'Breathe Out!';
            relax_container.classList.remove("grow")
            relax_container.classList.add("shrink")
        }, holdTime);
    }, breatheTime);
}

setInterval(breathAnimation, totalTime);