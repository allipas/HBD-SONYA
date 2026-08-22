/* =========================================================
   BIRTHDAY WEBSITE
   GANTI DATA DI BAGIAN "CUSTOMIZE" UNTUK PERSONALISASI
   ========================================================= */

const CONFIG = {
  name: "SONYAWWW",
  birthday: "AGUSTUS 23 · THE MOST SPECIAL DAY",
  music: [
    {
      title: "monokrom",
      artist: "Tulus",
      file: "tulus.mp3"
    }
  ]
};

/* ---------- ELEMENTS ---------- */
const loading = document.getElementById("loadingScreen");
const giftScreen = document.getElementById("giftScreen");
const main = document.getElementById("mainContent");
const giftButton = document.getElementById("giftButton");
const audio = document.getElementById("audioPlayer");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");
const playTrack = document.getElementById("playTrack");
const record = document.querySelector(".record");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const playlist = document.getElementById("playlist");

/* ---------- PERSONALIZATION ---------- */
document.querySelectorAll(".name-inline").forEach(el => el.textContent = CONFIG.name);
document.getElementById("personName").textContent = CONFIG.name;
document.getElementById("birthdayDate").textContent = CONFIG.birthday;
document.title = `Happy Birthday ${CONFIG.name} 💗`;
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------- LOADING -> GIFT ---------- */
window.addEventListener("load", () => {
    const loading = document.getElementById("loadingScreen");
    const gift = document.getElementById("giftScreen");

    setTimeout(() => {
        if (loading) {
            loading.classList.add("fade-out");
        }

        setTimeout(() => {
            if (loading) {
                loading.classList.add("hidden");
            }

            if (gift) {
                gift.classList.remove("hidden");
            }
        }, 700);

    }, 1500);
});

/* ---------- GIFT ---------- */
giftButton.addEventListener("click", () => {
  giftButton.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.15) rotate(-4deg)" },
      { transform: "scale(0) rotate(15deg)" }
    ],
    { duration: 700, easing: "cubic-bezier(.2,.8,.2,1)" }
  );

  setTimeout(() => {
    giftScreen.classList.add("fade-out");
    main.classList.remove("hidden");
    document.body.style.overflow = "auto";
    createConfetti(80);
    setTimeout(() => {
      giftScreen.classList.add("hidden");
      document.querySelector(".hero").scrollIntoView({behavior:"smooth"});
    }, 800);
  }, 550);
});

/* ---------- PARTICLES ---------- */
const particleBox = document.getElementById("particles");
const symbols = ["✦","✿","•","♡","✧"];

for(let i=0;i<32;i++){
  const p = document.createElement("span");
  p.className = "particle" + (Math.random() > .65 ? " flower" : "");
  p.textContent = Math.random() > .65 ? symbols[Math.floor(Math.random()*symbols.length)] : "";
  p.style.left = Math.random()*100 + "%";
  p.style.animationDuration = (8 + Math.random()*13) + "s";
  p.style.animationDelay = (-Math.random()*18) + "s";
  p.style.opacity = .15 + Math.random()*.45;
  p.style.transform = `scale(${.5+Math.random()*1.3})`;
  particleBox.appendChild(p);
}

/* ---------- BOUQUET ---------- */
document.querySelectorAll(".flower-buttons button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById("bouquetMessage").textContent = btn.dataset.message;
    document.getElementById("bouquetMessage").animate(
      [{opacity:.2,transform:"translateY(8px)"},{opacity:1,transform:"translateY(0)"}],
      {duration:350}
    );
  });
});

/* ---------- IMAGE MODAL ---------- */
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");

document.querySelectorAll(".memory-card[data-img]").forEach(card => {
  card.addEventListener("click", () => {
    modalImage.src = card.dataset.img;
    modalTitle.textContent = card.dataset.title;
    modal.classList.remove("hidden");
  });
});

document.getElementById("closeModal").addEventListener("click", () => {
  modal.classList.add("hidden");
});
modal.addEventListener("click", e => {
  if(e.target === modal) modal.classList.add("hidden");
});

/* ---------- MUSIC PLAYER ---------- */
let currentTrack = 0;

function formatTime(seconds){
  if(!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds/60);
  const s = Math.floor(seconds%60).toString().padStart(2,"0");
  return `${m}:${s}`;
}

function renderPlaylist(){
  playlist.innerHTML = "";
  CONFIG.music.forEach((track,index) => {
    const item = document.createElement("div");
    item.className = "track" + (index === currentTrack ? " active" : "");
    item.innerHTML = `
      <span class="track-icon">${index+1}</span>
      <div><b>${track.title}</b><small>${track.artist}</small></div>
      <span>♡</span>
    `;
    item.addEventListener("click", () => {
      currentTrack = index;
      loadTrack(true);
    });
    playlist.appendChild(item);
  });
}

function loadTrack(autoplay=false){
  const track = CONFIG.music[currentTrack];
  document.getElementById("trackTitle").textContent = track.title;
  document.getElementById("trackArtist").textContent = track.artist;
  audio.src = track.file;
  audio.load();
  renderPlaylist();

  if(autoplay){
    audio.play().then(setPlaying).catch(() => {
      alert("File musik belum ada. Masukkan MP3 ke folder assets/music sesuai nama di script.js.");
    });
  }
}

function setPlaying(){
  playTrack.textContent = "Ⅱ";
  musicIcon.textContent = "Ⅱ";
  record.classList.add("playing");
}

function setPaused(){
  playTrack.textContent = "▶";
  musicIcon.textContent = "▶";
  record.classList.remove("playing");
}

function toggleMusic(){
  if(audio.paused){
    audio.play().then(setPlaying).catch(() => {
      alert("Musiknya belum tersedia. Masukkan file MP3 ke folder assets/music.");
    });
  }else{
    audio.pause();
    setPaused();
  }
}

playTrack.addEventListener("click", toggleMusic);
musicToggle.addEventListener("click", toggleMusic);

document.getElementById("prevTrack").addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + CONFIG.music.length) % CONFIG.music.length;
  loadTrack(true);
});

document.getElementById("nextTrack").addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % CONFIG.music.length;
  loadTrack(true);
});

audio.addEventListener("timeupdate", () => {
  if(audio.duration){
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
  currentTime.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
  if(audio.duration){
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

audio.addEventListener("play", setPlaying);
audio.addEventListener("pause", setPaused);
audio.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % CONFIG.music.length;
  loadTrack(true);
});

renderPlaylist();
loadTrack(false);

/* ---------- WISH ---------- */
document.getElementById("wishButton").addEventListener("click", e => {
  const result = document.getElementById("wishResult");
  result.classList.remove("hidden");
  e.currentTarget.textContent = "Wish sent ♡";
  e.currentTarget.disabled = true;
  createConfetti(120);
});

/* ---------- CONFETTI ---------- */
function createConfetti(amount=70){
  const emojis = ["✦","♡","✿","🌸","✨"];
  for(let i=0;i<amount;i++){
    const el = document.createElement("span");
    el.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    el.style.position = "fixed";
    el.style.left = Math.random()*100 + "vw";
    el.style.top = "-30px";
    el.style.zIndex = 999;
    el.style.fontSize = (10+Math.random()*16)+"px";
    el.style.color = Math.random() > .5 ? "#f39ab9" : "#fff1f5";
    el.style.pointerEvents = "none";
    document.body.appendChild(el);

    const endX = (Math.random()-.5)*300;
    const endY = window.innerHeight + 100;
    const rotate = Math.random()*720-360;

    el.animate(
      [
        {transform:"translate(0,0) rotate(0deg)",opacity:1},
        {transform:`translate(${endX}px,${endY}px) rotate(${rotate}deg)`,opacity:0}
      ],
      {duration:1800+Math.random()*1800,easing:"cubic-bezier(.2,.7,.3,1)"}
    ).onfinish = () => el.remove();
  }
}

/* ---------- KEYBOARD SHORTCUTS ---------- */
document.addEventListener("keydown", e => {
  if(e.code === "Space" && !["INPUT","BUTTON"].includes(document.activeElement.tagName)){
    e.preventDefault();
    toggleMusic();
  }
  if(e.key === "Escape") modal.classList.add("hidden");
});
    
