console.log("spotify");

let songs = [
  {
    songName: "Zara sa",
    filepath: "Zara Sa - Jannat 128 Kbps.mp3",
    coverpath: "",
  },
  {
    songName: "Labon ko",
    filepath: "Labon-Ko---KK(PagalWorldl).mp3",
    coverpath: "",
  },
  {
    songName: "Make some noise",
    filepath:"Make-Some-Noise-For-Desi-Boyz-(Slowed-and-Reverb)(PagalWorldl).mp3",
    coverpath: "",
  },
  {
    songName: "Mat Azamaa re",
    filepath: "Mat-Aazma-Re(PagalWorldl).mp3",
    coverpath: "",
  },
  {
    songName: "Haan Tu hain",
    filepath: "Haa-Tu-Hai(PagalWorldl).mp3",
    coverpath: "",
  },
  {
    songName: "Zindagi do pal ki",
    filepath: "old_kites-zindagi do pal ki(remix).mp3",
    coverpath: "",
  },
  {
    songName: "O Sanam",
    filepath: "O-Sanam-O-Sanam(PagalWorldl).mp3",
    coverpath: "",
  },
  {
    songName: "Tujhe Sochta hu",
    filepath: "Tujhe-Sochta-Hoon(PagalWorldl).mp3",
    coverpath: "",
  },
  {
    songName: "Ye pal",
    filepath:
      "Yaad-Aayenge-Ye-Pal-(KK-Mashup)---DJ-Kiran-Kamath(PagalWorldl).mp3",
    coverpath: "",
  },
];

//declaring variables and getting objects

let audio = new Audio();
let Masterplay = document.getElementById("masterPlay");
let gif = document.querySelectorAll(".songinfo")[0];
let progress = document.getElementById("slider");
let smallplaypause = document.querySelectorAll(".smallPlayPause");
let nextsong = document.querySelectorAll(".fa-forward-fast")[0];
let previoussong = document.querySelectorAll(".fa-backward-fast")[0];
let songsnameinBar = document.querySelectorAll(".songsName");
let showDuration = document.querySelectorAll(".duration");
let percentage;
let currentSong;
console.log(smallplaypause);

//adding song name on the bar
for (let i = 0; i < songsnameinBar.length; i++) {
  songsnameinBar[i].innerText = songs[i].songName;
}

//playing audio

Masterplay.addEventListener("click", () => {
  if (audio.src == 0) {
    return;
  }
  if (audio.paused) {
    audio.play();
    Masterplay.classList.remove("fa-play");
    Masterplay.classList.add("fa-pause");
    gif.style.opacity = "1";
    smallplaypause[currentSong].classList.remove("fa-play");
    smallplaypause[currentSong].classList.add("fa-pause");
  } else {
    audio.pause();
    Masterplay.classList.remove("fa-pause");
    Masterplay.classList.add("fa-play");
    gif.style.opacity = "0";
    smallplaypause[currentSong].classList.remove("fa-pause");
    smallplaypause[currentSong].classList.add("fa-play");
  }
});

//updating seeking bar

if (audio.play) {
  setInterval(() => {
    percentage = (audio.currentTime / audio.duration) * 100;
    console.log(percentage);
    progress.value = percentage;
  }, 500);
}
//alternate of above
// audio.addEventListener("timeupdate", ()=>{
//     percentage = Math.floor((audio.currentTime/audio.duration)*100);
//     console.log(percentage);
//     // progress.value = percentage;
// })

// when user do change on seek bar song get start from there.
progress.addEventListener("change", () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

//making small play pause button functioning

function makeplays() {
  for (let i = 0; i < smallplaypause.length; i++) {
    smallplaypause[i].classList.remove("fa-pause");
    smallplaypause[i].classList.add("fa-play");
  }
}

for (let i = 0; i < smallplaypause.length; i++) {
  smallplaypause[i].addEventListener("click", () => {
    makeplays();
    if (audio.paused) {
      currentSong = i;
      console.log(currentSong);
      smallplaypause[i].classList.remove("fa-play");
      smallplaypause[i].classList.add("fa-pause");
      audio.currentTime = "0";
      audio.src = songs[i].filepath;
      Masterplay.classList.remove("fa-play");
      Masterplay.classList.add("fa-pause");
      gif.style.opacity = "1";
      audio.play();
    } else {
      audio.pause();
      smallplaypause[i].classList.remove("fa-pause");
      smallplaypause[i].classList.add("fa-play");
      Masterplay.classList.remove("fa-pause");
      Masterplay.classList.add("fa-play");
      gif.style.opacity = "0";
    }
  });
}

//making previous and next button functioning

nextsong.addEventListener("click", () => {
  if (currentSong == null) {
    return;
  }
  if (currentSong == 9) {
    currentSong = 0;
  } else {
    currentSong = currentSong + 1;
  }
  makeplays();

  audio.src = songs[currentSong].filepath;
  audio.currentTime = "0";
  smallplaypause[currentSong].classList.remove("fa-play");
  smallplaypause[currentSong].classList.add("fa-pause");
  Masterplay.classList.remove("fa-play");
  Masterplay.classList.add("fa-pause");

  audio.play();
});

previoussong.addEventListener("click", () => {
  if (currentSong == null) {
    return;
  }
  if (currentSong == 0) {
    currentSong = 9;
  } else {
    currentSong = currentSong - 1;
  }
  makeplays();

  audio.src = songs[currentSong].filepath;
  audio.currentTime = "0";
  smallplaypause[currentSong].classList.remove("fa-play");
  smallplaypause[currentSong].classList.add("fa-pause");
  Masterplay.classList.remove("fa-play");
  Masterplay.classList.add("fa-pause");

  audio.play();
});
