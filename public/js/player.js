

document.getElementById("copy-stream-url").addEventListener("click", function () {
    navigator.clipboard.writeText("{{ path }}");
    this.innerText = "Copied!";
    setTimeout(() => {
        this.innerText = "Copy stream URL";
    }, 3000);
});

let video = document.querySelector('#player-wrapper>video');
let playerWrapper = document.getElementById('player-wrapper')
let playPauseBtn = document.querySelector('.play-pause');
let currentTime = document.querySelector('.duration-time')
let durationTime = document.querySelector('.current-time')
let fullscreenToggle = document.querySelector('.fullscreen-toggle')
let downloadButton = document.querySelector('.download-video')
let seekbar = document.querySelector('.seekbar')

video.onloadedmetadata = function () {
    currentTime.innerText = secondsToHms(video.duration)
    durationTime.innerText = secondsToHms(0)
    seekbar.max = video.duration

    setInterval(() => {
        if (!video.paused) {
            durationTime.innerText = secondsToHms(video.currentTime)
            seekbar.value = video.currentTime
        }
    }, 0);

}

video.onplay = function () {
    playPauseBtn.dataset.state = "playing"
    playerWrapper.classList.add('hide-controls')

}

video.onpause = function () {
    playPauseBtn.dataset.state = "paused"
    playerWrapper.classList.remove('hide-controls')
}

playPauseBtn.playbackCallback = {
    playing: function () { video.pause() },
    paused: function () { video.play() }
}

playPauseBtn.addEventListener('click', function () {
    this.playbackCallback[this.dataset.state]()
})

fullscreenToggle.addEventListener('click', function () {
    toggleFullscreen()
})

playerWrapper.addEventListener('dblclick', function () {
    toggleFullscreen()
})

downloadButton.addEventListener('click', function () {
    const a = document.createElement('a');
    a.href = video.src;
    a.style.display = 'none'
    a.download = "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
})

seekbar.addEventListener('input', function () {
    video.currentTime = this.value
    durationTime.innerText = secondsToHms(video.currentTime)
})


function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600)
    var m = Math.floor(d % 3600 / 60)
    var s = Math.floor(d % 3600 % 60)

    var hDisplay = `${h}`.padStart(2, '00')
    var mDisplay = `${m}`.padStart(2, '00');
    var sDisplay = `${s}`.padStart(2, 00)
    return `${hDisplay}:${mDisplay}:${sDisplay}`;
}

function toggleFullscreen(params) {
    if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    ) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        fullscreenToggle.dataset.state = "normal"
    } else {
        if (playerWrapper.requestFullscreen) {
            playerWrapper.requestFullscreen();
        } else if (playerWrapper.mozRequestFullScreen) {
            playerWrapper.mozRequestFullScreen();
        } else if (playerWrapper.webkitRequestFullscreen) {
            playerWrapper.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (playerWrapper.msRequestFullscreen) {
            playerWrapper.msRequestFullscreen();
        }
        fullscreenToggle.dataset.state = "fullscreen"
    }
}