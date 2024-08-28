let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_button = document.querySelector(".playpause-track");
let next_button = document.querySelector(".next-track");
let previous_button = document.querySelector(".previous-track");

let seek_slider = document.querySelector(".seek-slider");
let volume_slider = document.querySelector(".volume-slider");
let current_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.querySelector(".wave");
let random_icon = document.querySelector(".fa-shuffle");
let current_track = document.createElement("audio");

current_track.addEventListener("ended", NextTrack);

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
  {
    img: "Music/DeadReckoningAlbum.jpg",
    name: "I Was Hoping It'd Be You",
    artist: "Lorne Balfe",
    track: "Music/I Was Hoping It'd Be You Lorne Balfe.mp3",
  },
  {
    img: "Music/DeadReckoningAlbum.jpg",
    name: "Leap of Faith",
    artist: "Lorne Balfe",
    track: "Music/Leap of Faith Lorne Balfe.mp3",
  },
  {
    img: "Music/musealbum.jpg",
    name: "Mercy",
    artist: "Muse",
    track: "Music/MercyMuse.mp3",
  },
];

function LoadTrack(track_index) {
  clearInterval(updateTimer);
  Reset();

  current_track.src = music_list[track_index].track;
  current_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;
  now_playing.textContent =
    "Playing Music " + (track_index + 1) + " of " + music_list.length;

  updateTimer = setInterval(SetUpdate, 1000);
}

function Reset() {
  current_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function RandomTrack() {
  isRandom ? PauseRandom() : PlayRandom();
}

function PlayRandom() {
  isRandom = true;
}

function PauseRandom() {
  isRandom = false;
}

function RepeatTrack() {
  let current_index = track_index;
  LoadTrack(current_index);
  PlayTrack();
}

function PlayPauseTrack() {
  isPlaying ? PauseTrack() : PlayTrack();
}

function PlayTrack() {
  current_track.play();
  playpause_button.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
  isPlaying = true;
}

function PauseTrack() {
  current_track.pause();
  playpause_button.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
  isPlaying = false;
}

function NextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  LoadTrack(track_index);
  PlayTrack();
}

function PreviousTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  LoadTrack(track_index);
  PlayTrack();
}

function SeekTo() {
  let seek_to = current_track.duration * (seek_slider.value / 100);
  current_track.currentTime = seek_to;
  seek_slider.value = seek_slider.value;
}

/* Currently not working, something to do with the audio tag* 
function SetVolume() {
  const volumeValue = Math.max(0, Math.min(100, volume_slider.value));
  current_track.volume = volumeValue / 100;
}
*/

function SetUpdate() {
  if (!isNaN(current_track.duration)) {
    const sliderPosition =
      (current_track.currentTime / current_track.duration) * 100;
    seek_slider.value = sliderPosition;

    const currentMinutes = Math.floor(current_track.currentTime / 60);
    const currentSeconds = Math.floor(current_track.currentTime % 60)
      .toString()
      .padStart(2, "0");
    const durationMinutes = Math.floor(current_track.duration / 60);
    const durationSeconds = Math.floor(current_track.duration % 60)
      .toString()
      .padStart(2, "0");

    current_time.textContent = `${currentMinutes}:${currentSeconds}`;
    total_duration.textContent = `${durationMinutes}:${durationSeconds}`;
  }
}

LoadTrack(track_index);
