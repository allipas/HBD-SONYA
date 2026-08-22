/* =========================================================
   HBD SONYAWWW
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   CUSTOMIZE
   ========================================================= */

const CONFIG = {

  name: "SONYAWWW",

  birthday: "AGUSTUS 23 · THE MOST SPECIAL DAY",

  music: [
    {
      title: "Monokrom",
      artist: "Tulus",
      file: "assets/music/tulus.mp3"
    }
  ]

};


/* =========================================================
   ELEMENTS
   ========================================================= */

const loading = document.getElementById("loadingScreen");
const giftScreen = document.getElementById("giftScreen");
const main = document.getElementById("mainContent");

const giftButton = document.getElementById("giftButton");

const audio = document.getElementById("audioPlayer");

const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");
const musicStatus = document.getElementById("musicStatus");

const playTrack = document.getElementById("playTrack");
const record = document.querySelector(".record");

const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const playlist = document.getElementById("playlist");


/* =========================================================
   PERSONALIZATION
   ========================================================= */

document
  .querySelectorAll(".name-inline")
  .forEach(el => {
    el.textContent = CONFIG.name;
  });

const personName =
  document.getElementById("personName");

if(personName){
  personName.textContent = CONFIG.name;
}

const birthdayDate =
  document.getElementById("birthdayDate");

if(birthdayDate){
  birthdayDate.textContent = CONFIG.birthday;
}

document.title =
  `Happy Birthday ${CONFIG.name} 💗`;

const year =
  document.getElementById("year");

if(year){
  year.textContent =
    new Date().getFullYear();
}


/* =========================================================
   LOADING
   ========================================================= */

window.addEventListener("load", () => {

  document.body.style.overflow = "hidden";

  setTimeout(() => {

    if(loading){
      loading.classList.add("fade-out");
    }

    setTimeout(() => {

      if(loading){
        loading.classList.add("hidden");
      }

      if(giftScreen){
        giftScreen.classList.remove("hidden");
      }

    }, 850);

  }, 1800);

});


/* =========================================================
   GIFT OPEN
   ========================================================= */

if(giftButton){

  giftButton.addEventListener("click", () => {

    giftButton.animate(
      [
        {
          transform:
            "scale(1)"
        },

        {
          transform:
            "scale(1.13) rotate(-4deg)"
        },

        {
          transform:
            "scale(0) rotate(20deg)"
        }
      ],
      {
        duration:800,
        easing:
          "cubic-bezier(.2,.8,.2,1)"
      }
    );

    createConfetti(45);

    setTimeout(() => {

      if(giftScreen){
        giftScreen.classList.add("fade-out");
      }

      if(main){
        main.classList.remove("hidden");
      }

      document.body.style.overflow =
        "auto";

      createConfetti(100);

      setTimeout(() => {

        if(giftScreen){
          giftScreen.classList.add("hidden");
        }

        const hero =
          document.querySelector(".hero");

        if(hero){
          hero.scrollIntoView({
            behavior:"smooth"
          });
        }

      }, 700);

    }, 550);

  });

}


/* =========================================================
   PARTICLES
   ========================================================= */

const particleBox =
  document.getElementById("particles");

const symbols = [
  "✦",
  "✿",
  "•",
  "♡",
  "✧"
];

if(particleBox){

  for(let i = 0; i < 38; i++){

    const particle =
      document.createElement("span");

    const isFlower =
      Math.random() > .65;

    particle.className =
      "particle" +
      (isFlower ? " flower" : "");

    if(isFlower){

      particle.textContent =
        symbols[
          Math.floor(
            Math.random() *
            symbols.length
          )
        ];

    }

    particle.style.left =
      Math.random() * 100 + "%";

    particle.style.animationDuration =
      (9 + Math.random() * 15) + "s";

    particle.style.animationDelay =
      (-Math.random() * 20) + "s";

    particle.style.opacity =
      .12 + Math.random() * .4;

    particle.style.transform =
      `scale(${.5 + Math.random() * 1.3})`;

    particleBox.appendChild(particle);
  }

}


/* =========================================================
   FLOWER BUTTONS
   ========================================================= */

document
  .querySelectorAll(".flower-buttons button")
  .forEach(button => {

    button.addEventListener("click", () => {

      const message =
        document.getElementById(
          "bouquetMessage"
        );

      if(!message) return;

      message.textContent =
        `“${button.dataset.message}”`;

      message.animate(
        [
          {
            opacity:.2,
            transform:
              "translateY(10px) scale(.98)"
          },

          {
            opacity:1,
            transform:
              "translateY(0) scale(1)"
          }
        ],
        {
          duration:450,
          easing:
            "cubic-bezier(.2,.8,.2,1)"
        }
      );

    });

  });


/* =========================================================
   IMAGE MODAL
   ========================================================= */

const modal =
  document.getElementById("imageModal");

const modalImage =
  document.getElementById("modalImage");

const modalTitle =
  document.getElementById("modalTitle");

const closeModal =
  document.getElementById("closeModal");


document
  .querySelectorAll(
    ".memory-card[data-img]"
  )
  .forEach(card => {

    card.addEventListener("click", () => {

      if(!modal) return;

      modalImage.src =
        card.dataset.img;

      modalTitle.textContent =
        card.dataset.title;

      modal.classList.remove(
        "hidden"
      );

      modal.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.style.overflow =
        "hidden";

    });

  });


function hideModal(){

  if(!modal) return;

  modal.classList.add("hidden");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  if(main &&
     !main.classList.contains("hidden")){

    document.body.style.overflow =
      "auto";
  }

}


if(closeModal){

  closeModal.addEventListener(
    "click",
    hideModal
  );

}


if(modal){

  modal.addEventListener(
    "click",
    event => {

      if(event.target === modal){
        hideModal();
      }

    }
  );

}


/* =========================================================
   MUSIC PLAYER
   ========================================================= */

let currentTrack = 0;


function formatTime(seconds){

  if(!Number.isFinite(seconds)){
    return "0:00";
  }

  const minutes =
    Math.floor(seconds / 60);

  const secondsPart =
    Math.floor(seconds % 60)
      .toString()
      .padStart(2,"0");

  return `${minutes}:${secondsPart}`;
}


function renderPlaylist(){

  if(!playlist) return;

  playlist.innerHTML = "";

  CONFIG.music.forEach(
    (track,index) => {

      const item =
        document.createElement("div");

      item.className =
        "track" +
        (
          index === currentTrack
            ? " active"
            : ""
        );

      item.innerHTML = `
        <span class="track-icon">
          ${index + 1}
        </span>

        <div>
          <b>${track.title}</b>
          <small>${track.artist}</small>
        </div>

        <span>♡</span>
      `;

      item.addEventListener(
        "click",
        () => {

          currentTrack =
            index;

          loadTrack(true);

        }
      );

      playlist.appendChild(item);

    }
  );

}


function loadTrack(
  autoplay = false
){

  if(
    !CONFIG.music.length ||
    !audio
  ){
    return;
  }

  const track =
    CONFIG.music[currentTrack];

  const title =
    document.getElementById(
      "trackTitle"
    );

  const artist =
    document.getElementById(
      "trackArtist"
    );

  if(title){
    title.textContent =
      track.title;
  }

  if(artist){
    artist.textContent =
      track.artist;
  }

  audio.src =
    track.file;

  audio.load();

  renderPlaylist();

  if(autoplay){

    audio.play()
      .then(() => {

        setPlaying();

      })
      .catch(() => {

        showMusicError();

      });

  }

}


function showMusicError(){

  if(musicStatus){

    musicStatus.textContent =
      "MP3 belum ditemukan";
  }

  alert(
    "Musiknya belum tersedia.\n\n" +
    "Pastikan file ada di:\n" +
    "assets/music/tulus.mp3"
  );

}


function setPlaying(){

  if(playTrack){
    playTrack.textContent =
      "Ⅱ";
  }

  if(musicIcon){
    musicIcon.textContent =
      "Ⅱ";
  }

  if(musicStatus){
    musicStatus.textContent =
      "Music is playing";
  }

  if(record){
    record.classList.add(
      "playing"
    );
  }

}


function setPaused(){

  if(playTrack){
    playTrack.textContent =
      "▶";
  }

  if(musicIcon){
    musicIcon.textContent =
      "▶";
  }

  if(musicStatus){
    musicStatus.textContent =
      "Tap untuk mulai musik";
  }

  if(record){
    record.classList.remove(
      "playing"
    );
  }

}


function toggleMusic(){

  if(!audio) return;

  if(audio.paused){

    audio.play()
      .then(() => {

        setPlaying();

      })
      .catch(() => {

        showMusicError();

      });

  }else{

    audio.pause();

    setPaused();

  }

}


/* PLAY BUTTON */

if(playTrack){

  playTrack.addEventListener(
    "click",
    toggleMusic
  );

}


/* HERO MUSIC BUTTON */

if(musicToggle){

  musicToggle.addEventListener(
    "click",
    toggleMusic
  );

}


/* PREVIOUS */

const previous =
  document.getElementById(
    "prevTrack"
  );

if(previous){

  previous.addEventListener(
    "click",
    () => {

      if(!CONFIG.music.length){
        return;
      }

      currentTrack =
        (
          currentTrack -
          1 +
          CONFIG.music.length
        ) %
        CONFIG.music.length;

      loadTrack(true);

    }
  );

}


/* NEXT */

const next =
  document.getElementById(
    "nextTrack"
  );

if(next){

  next.addEventListener(
    "click",
    () => {

      if(!CONFIG.music.length){
        return;
      }

      currentTrack =
        (
          currentTrack +
          1
        ) %
        CONFIG.music.length;

      loadTrack(true);

    }
  );

}


/* TIME UPDATE */

if(audio){

  audio.addEventListener(
    "timeupdate",
    () => {

      if(
        audio.duration &&
        progress
      ){

        progress.value =
          (
            audio.currentTime /
            audio.duration
          ) * 100;

      }

      if(currentTime){

        currentTime.textContent =
          formatTime(
            audio.currentTime
          );

      }

      if(duration){

        duration.textContent =
          formatTime(
            audio.duration
          );

      }

    }
  );


  audio.addEventListener(
    "play",
    setPlaying
  );


  audio.addEventListener(
    "pause",
    setPaused
  );


  audio.addEventListener(
    "ended",
    () => {

      if(!CONFIG.music.length){
        return;
      }

      currentTrack =
        (
          currentTrack +
          1
        ) %
        CONFIG.music.length;

      loadTrack(true);

    }
  );

}


/* PROGRESS */

if(progress){

  progress.addEventListener(
    "input",
    () => {

      if(audio.duration){

        audio.currentTime =
          (
            progress.value /
            100
          ) *
          audio.duration;

      }

    }
  );

}


/* INIT MUSIC */

renderPlaylist();
loadTrack(false);


/* =========================================================
   WISH
   ========================================================= */

const wishButton =
  document.getElementById(
    "wishButton"
  );

if(wishButton){

  wishButton.addEventListener(
    "click",
    event => {

      const result =
        document.getElementById(
          "wishResult"
        );

      if(!result) return;

      result.classList.remove(
        "hidden"
      );

      event.currentTarget.textContent =
        "Wish sent ♡";

      event.currentTarget.disabled =
        true;

      createConfetti(140);

    }
  );

}


/* =========================================================
   CONFETTI
   ========================================================= */

function createConfetti(
  amount = 70
){

  const emojis = [
    "✦",
    "♡",
    "✿",
    "🌸",
    "✨",
    "⋆"
  ];

  for(
    let i = 0;
    i < amount;
    i++
  ){

    const element =
      document.createElement("span");

    element.textContent =
      emojis[
        Math.floor(
          Math.random() *
          emojis.length
        )
      ];

    element.style.position =
      "fixed";

    element.style.left =
      Math.random() * 100 + "vw";

    element.style.top =
      "-30px";

    element.style.zIndex =
      "9999";

    element.style.fontSize =
      (
        10 +
        Math.random() * 18
      ) + "px";

    element.style.color =
      Math.random() > .5
        ? "#f39ab9"
        : "#fff1f5";

    element.style.pointerEvents =
      "none";

    document.body.appendChild(
      element
    );

    const endX =
      (
        Math.random() - .5
      ) * 350;

    const endY =
      window.innerHeight + 120;

    const rotate =
      Math.random() * 900 - 450;

    const animation =
      element.animate(
        [
          {
            transform:
              "translate(0,0) rotate(0deg)",
            opacity:1
          },

          {
            transform:
              `translate(${endX}px,${endY}px) rotate(${rotate}deg)`,
            opacity:0
          }
        ],
        {
          duration:
            1800 +
            Math.random() * 2200,

          easing:
            "cubic-bezier(.2,.7,.3,1)"
        }
      );

    animation.onfinish =
      () => element.remove();

  }

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(
        entry => {

          if(
            entry.isIntersecting
          ){

            entry.target.classList.add(
              "visible"
            );

            revealObserver.unobserve(
              entry.target
            );

          }

        }
      );

    },
    {
      threshold:.12
    }
  );


revealElements.forEach(
  element => {

    revealObserver.observe(
      element
    );

  }
);


/* =========================================================
   KEYBOARD
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if(
      event.code === "Space" &&
      ![
        "INPUT",
        "BUTTON"
      ].includes(
        document.activeElement.tagName
      )
    ){

      event.preventDefault();

      toggleMusic();

    }

    if(
      event.key === "Escape"
    ){

      hideModal();

    }

  }
);


/* =========================================================
   EASTER EGG
   DOUBLE CLICK HERO NAME
   ========================================================= */

const heroName =
  document.getElementById(
    "personName"
  );

if(heroName){

  heroName.addEventListener(
    "dblclick",
    () => {

      createConfetti(80);

      heroName.animate(
        [
          {
            transform:"scale(1)"
          },
          {
            transform:
              "scale(1.12)"
          },
          {
            transform:"scale(1)"
          }
        ],
        {
          duration:500
        }
      );

    }
  );

}


/* =========================================================
   DONE
   ========================================================= */

console.log(
  `♡ HBD ${CONFIG.name} — website ready ♡`
);
