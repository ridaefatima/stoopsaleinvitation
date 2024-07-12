

const arm = document.querySelector('.left-arm');

arm.addEventListener('click', () => {
    arm.style.animationPlayState = (arm.style.animationPlayState === 'paused') ? 'running' : 'paused';
});