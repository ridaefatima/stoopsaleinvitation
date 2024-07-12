function togglePlayback() {
    var audio = document.getElementById("sound");

    if (audio.paused) {
        audio.play();
        sessionStorage.setItem("isPlaying", "true");
        document.getElementById("soundImage").src = "on.svg";
    } else {
        audio.pause();
        sessionStorage.setItem("isPlaying", "false");
        document.getElementById("soundImage").src = "off.svg";
    }
    
    sessionStorage.setItem("currentTime", audio.currentTime);
}

function synchronizePlayback() {
    var audio = document.getElementById("sound");
    var isPlaying = sessionStorage.getItem("isPlaying");
    var currentTime = sessionStorage.getItem("currentTime");

    if (currentTime) {
        audio.currentTime = parseFloat(currentTime);
    }

    if (isPlaying === "true") {
        audio.play();
        document.getElementById("soundImage").src = "on.svg";
    } else {
        audio.pause();
        document.getElementById("soundImage").src = "off.svg";
    }

    window.addEventListener("storage", function(e) {
        if (e.key === "isPlaying") {
            if (e.newValue === "true") {
                audio.play();
                document.getElementById("soundImage").src = "on.svg";
            } else {
                audio.pause();
                document.getElementById("soundImage").src = "off.svg";
            }
        }

        if (e.key === "currentTime") {
            audio.currentTime = parseFloat(e.newValue);
        }
    });

    audio.addEventListener("timeupdate", function() {
        sessionStorage.setItem("currentTime", audio.currentTime);
    });

    audio.addEventListener("ended", function() {
        audio.currentTime = 0;
        audio.play();
    });
}

document.addEventListener("DOMContentLoaded", synchronizePlayback);
