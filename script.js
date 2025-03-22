console.log("Welcome To Kstreams!");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlayButtons = document.querySelectorAll('.songItemPlay');

let songs = [
    { songName: "Character Dheela Hai", filePath: "songs/mp3 music.mp3", coverPath: "covers/bg3.webp" },
    { songName: "Aa Re Pritam Pyare", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Baby Doll", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Blue Eyes", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Dhan Te Nan", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Jalwa Mera Hi Jalwa", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Nusta Paisa", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Snake", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
]
    

// Update UI with song details
songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

// Function to reset all play buttons
const resetPlayButtons = () => {
    songItemPlayButtons.forEach((btn) => {
        btn.classList.remove('fa-circle-pause');
        btn.classList.add('fa-circle-play');
    });
};

// Function to play a song
const playSong = (index) => {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

    gif.style.opacity = 1; // Show animation

    document.getElementById('currentSongName').innerText = songs[songIndex].songName; // Update song name at bottom
};


// Master Play Button Event
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Listen to Events for Progress Bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Song Item Play Button Event
songItemPlayButtons.forEach((element, index) => {
    element.addEventListener('click', (e) => {
        let icon = e.target;

        if (songIndex === index && !audioElement.paused) {
            audioElement.pause();
            icon.classList.remove('fa-circle-pause');
            icon.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        } else {
            resetPlayButtons();
            icon.classList.remove('fa-circle-play');
            icon.classList.add('fa-circle-pause');
            playSong(index);
        }
    });
});
document.querySelector('.fa-forward').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length; // Move to next song
    playSong(songIndex); // Play the new song
    updateUI(); // Update icons and song info
});
document.querySelector('.fa-backward').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // Move to previous song
    playSong(songIndex); // Play the new song
    updateUI(); // Update icons and song info
});

