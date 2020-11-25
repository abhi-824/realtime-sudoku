var socket = io();
let room = window.location.href.split("/")[3];
let elem = document.createElement("div");

let timer = document.querySelector(".timer");

console.log(timer);

function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  let c = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      alert("Time's Up!!!");
      clearInterval(c);
    }
  }, 1000);
}

let gen_btn = document.querySelectorAll(".js-generate-board");

console.log(gen_btn);

document.querySelector(".practiceMode").addEventListener("click", (e) => {
  e.preventDefault();
  loaderfor1sec();
  document
    .querySelector(".button_after_practice_mode")
    .classList.remove("hidden2");
  document.querySelector(".modes").classList.add("side_hoja");
});

for (let i = 0; i < gen_btn.length; i++) {
  gen_btn[i].addEventListener("click", () => {
    console.log("hh");
    loaderfor1sec();
    document.querySelector(".sudoku-board").classList.remove("hidden");
    document.querySelector(".krr").classList.remove("hidden");
    document.querySelector(".candidates").classList.remove("hidden");
    document.querySelector(".timer").classList.remove("hidden");
    startTimer(60 * 60, timer);
  });
}

document.querySelector(".competitiveMode").addEventListener("click", (e) => {
  document.querySelector("footer").classList.add("hidden");
  loaderfor1sec();
  document
    .querySelector(".button_after_practice_mode")
    .classList.add("hidden2");
  document.querySelector(".sudoku-board").classList.add("hidden");
  document.querySelector(".krr").classList.add("hidden");
  document.querySelector(".candidates").classList.add("hidden");
  document.querySelector(".timer").classList.add("hidden");
  e.preventDefault();
});

document.querySelector(".login").addEventListener("click", (e) => {
  side(document.querySelector(".login_form"));
});

function side(div) {
  div.classList.add("side_hoja_parli");
}

document.querySelector(".login").addEventListener("click", (e) => {
  document.querySelector("#signup-form").classList.add("hidden");
  e.preventDefault();
  document.querySelector("#login-as-guest-form").classList.add("hidden");
  document.querySelector("#login-form").classList.remove("hidden");
});

document.querySelector(".signup").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#signup-form").classList.remove("hidden");
  side(document.querySelector(".login_form"));
  document.querySelector("#login-as-guest-form").classList.add("hidden");
  document.querySelector("#login-form").classList.add("hidden");
});

document.querySelector(".forgot_pass").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#signup-form").classList.add("hidden");
  side(document.querySelector(".login_form"));
  document.querySelector("#login-form").classList.add("hidden");
  document.querySelector("#forgot").classList.remove("hidden");
});

document.querySelector(".back-login").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#signup-form").classList.add("hidden");
  document.querySelector("#login-form").classList.remove("hidden");
  side(document.querySelector(".login_form"));
  document.querySelector("#forgot").classList.add("hidden");
  document.querySelector(".after-forgot").classList.add("hidden");
});

document.querySelector(".login_as_guest").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#login-as-guest-form").classList.remove("hidden");
  side(document.querySelector(".login_form"));
  document.querySelector("#login-form").classList.add("hidden");
  document.querySelector("#signup-form").classList.add("hidden");
});

document.querySelector(".competitiveMode").addEventListener("click", (e) => {
  auth.onAuthStateChanged((user) => {
    // var handle_name=document.getElementById('')
    if (user) {
      document.querySelector(".competitiveModeOn").classList.remove("hidden");
      document.querySelector(".join_room").addEventListener("click", (e) => {
        e.preventDefault();

        document.querySelector("#ask_for_room").classList.remove("hidden");
      });
      document
        .querySelector("#ask_for_room")
        .addEventListener("submit", (e) => {
          e.preventDefault();
          room = document.querySelector(".ask_room").value;

          let ready = document.querySelector(".ready_btn");
          ready.addEventListener("click", () => {
            ready.classList.remove("btn-outline-dark");
            ready.classList.remove("btn-primary");
            let user = firebase.auth().currentUser;

            db.collection("users")
              .where("email", "==", user.email)
              .get()
              .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                  const handle_list = doc.data();
                  if (handle_list.email === user.email) {
                    let fname = handle_list.name;
                    console.log(room)
                    socket.emit("make_ready", {fname, room});
                    console.log(fname);
                  }
                });
              });
          });
          const video_grid = document.querySelector(".video-grid");
          const myvideo = document.createElement("video");
          myvideo.muted = true;
          navigator.mediaDevices
            .getUserMedia({
              video: true,
              audio: true,
            })
            .then((stream) => {
              addVideoStream(myvideo, stream);
              // socket.emit('catch_user', stream);

              socket.on("user-connected", (fname) => {
                console.log(fname);
                connectToNewUser(fname, stream);
              });

              peer.on("call", (call) => {
                call.answer(stream);
                const video = document.createElement("video");
                call.on("stream", (userVideoStream) => {
                  addVideoStream(video, userVideoStream);
                });
              });
            });
          function addVideoStream(video, stream) {
            video.srcObject = stream;
            video.addEventListener("loadedmetadata", () => {
              video.play();
            });
            console.log("he");
            let div = document.createElement("div");
            div.appendChild(video);
            elem.innerHTML =
              '<img src="res/mic.svg" class="mic-icon enable" alt=""> <img src="res/video.svg" class="vid-icon enable" alt="">';
            elem.classList.add("icons");
            div.appendChild(elem);
            video_grid.appendChild(div);

            document
              .querySelector(".mic-icon")
              .addEventListener("click", () => {
                myvideo.muted = !myvideo.muted;
              });
          }
          function connectToNewUser(userId, stream) {
            const call = peer.call(userId, stream);
            const video2 = document.createElement("video");
            call.on("stream", (userVideoStream) => {
              addVideoStream(video2, userVideoStream);
            });
            call.on("close", () => {
              video2.remove();
            });
          }
          var peer = new Peer({
            // secure: true,
            host: "brainteaser.herokuapp.com",
            port: "",
            path: "/peerjs",
          });
          console.log(peer);
          peer.on("open", (id) => {
            console.log("jhaod");
            db.collection("users")
              .where("email", "==", user.email)
              .get()
              .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                  const handle_list = doc.data();
                  if (handle_list.email === user.email) {
                    let fname = handle_list.name;

                    socket.emit("join-room", id, room, fname);
                    console.log(fname);
                  }
                });
              });
          });
          document.querySelector(".buttons").classList.add("hidden");
          document.querySelector("#ask_for_room").classList.add("hidden");
          document.querySelector(".modes").classList.add("hidden");
          document.querySelector(".ready_btn").classList.remove("hidden");

          loaderfor1sec();
        });
      document.querySelector(".create_one");
    } else {
      document.querySelector(".login_form").classList.remove("hidden22");
    }
  });
  document.querySelector(".modes").classList.add("side_hoja");
});

function dashboard(name, handle_list) {
  document.querySelector(".login_page").classList.add("hidden");
}

document.querySelector(".logout").addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
  document.querySelector(".competitiveModeOn").classList.add("hidden");
  document.querySelector(".login_page").classList.remove("hidden");
});
function loaderfor1sec() {
  document.querySelector(".loader").classList.remove("hidden");
  window.setTimeout(() => {
    document.querySelector(".loader").classList.add("hidden");
  }, 600);
}
socket.on("message", (msg) => {
  display(msg);
});

function display(str) {
  let div = document.createElement("a");
  div.className = "notification";
  div.innerHTML = str;
  window.setTimeout(() => {
    div.classList.add("disappear");
  }, 2000);
  document.body.appendChild(div);
}
socket.on('start_sudoku',()=>{
  console.log(room);  
  socket.emit('make_it_real',document.querySelector('#sudoku2').innerHTML,room);

})
socket.on('start_game',(data)=>{
  loaderfor1sec();
  document.querySelector('#sudoku2').innerHTML=data;
  console.log(data);  
  document.querySelector('#sudoku2').classList.remove('hidden');
  document.querySelector('.ready_btn').classList.add('hidden');
}) 