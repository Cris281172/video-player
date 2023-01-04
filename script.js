const playButton = document.querySelector('#play-button');
const pauseButton = document.querySelector('#pause-button');
const myVideo = document.querySelector('#my-video');
const video = document.querySelector('#video')
const changeVolume = document.querySelector('#change-volume');
const videoRedLine = document.querySelector('#red-video-line');
const videoLine = document.querySelector('#video-line');
const videoTimer = document.querySelector('#video-timer');
const videoLength = document.querySelector('#video-length');
const tooltip = document.querySelector('#tooltip');
const fullscreen = document.querySelector('#fullscreen');
const title = document.querySelector('#title');
myVideo.volume = 0.5;
const minutesSecondsFormat = (secondsTime) => {
    let minutes = Math.floor(secondsTime / 60);
    let seconds = Math.floor(secondsTime % 60);
    if(minutes < 10){
        minutes = '0' + minutes
    }
    if(seconds < 10){
        seconds = '0' + seconds;
    }
    return `${minutes}:${seconds}`
}

console.log();

const toggleVideo = () => {
    if(myVideo.paused){
        myVideo.play();
        pauseButton.style.display = 'block'
        playButton.style.display = 'none'
    }
    else{
        myVideo.pause();
        pauseButton.style.display = 'none'
        playButton.style.display = 'block'
    }
}

const changeVolumeVideo = (e) => {
    myVideo.volume = e.target.value;
}

const videoProgress =  () => {
    videoRedLine.style.width = `${(myVideo.currentTime / myVideo.duration) * 100}%`;
    videoTimer.innerText = `${minutesSecondsFormat(myVideo.currentTime)} / `;
    videoLength.innerText = minutesSecondsFormat(myVideo.duration);
}

const videoStatus = () => {
    toggleVideo()
    console.log('dasd')
}

const changeVideoTime = (e) => {
    const clickedTime = e.layerX
    myVideo.currentTime = (clickedTime / myVideo.clientWidth) * myVideo.duration
}

const showVideoTimeTooltip = e => {
    const showedTime = e.layerX;
    const actualTime = Math.floor((showedTime / myVideo.clientWidth) * myVideo.duration);
    tooltip.style.left = `${(actualTime / myVideo.duration) * 100}%`
    tooltip.innerText = minutesSecondsFormat(actualTime);
    tooltip.style.display = 'block';
}

const mouseOverLine = () => {
    tooltip.style.display = 'none';
}

const toggleFullscreen = () => {
    myVideo.classList.toggle('fullscreen')
    video.classList.toggle('fullscreen')
    title.classList.toggle('fullscreen')
}

playButton.addEventListener('click', toggleVideo);
pauseButton.addEventListener('click', toggleVideo);
changeVolume.addEventListener('input', changeVolumeVideo);
myVideo.addEventListener('timeupdate', videoProgress)
myVideo.addEventListener('click', videoStatus)
videoLine.addEventListener('click', changeVideoTime);
videoLine.addEventListener('mousemove', showVideoTimeTooltip)
videoLine.addEventListener('mouseout', mouseOverLine)
fullscreen.addEventListener('click', toggleFullscreen)
videoProgress()
