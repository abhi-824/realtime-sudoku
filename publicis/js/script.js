var socket = io();
let room = window.location.href.split("/")[3];
let elem = document.createElement("div");
let create_id;
let timer = document.querySelector(".timer");
socket.emit('req_id');
console.log(timer);

let gen_btn = document.querySelectorAll(".js-generate-board");

console.log(gen_btn);

function initEventListeners() {
  document
    .querySelector(".practiceMode")
    .addEventListener("click", practiceMode);
  for (let i = 0; i < gen_btn.length; i++) {
    gen_btn[i].addEventListener("click", generateSudoku);
    gen_btn[i].addEventListener("click", () => {
      if (i == 0) {
        console.log("hello");
        startTimer(20 * 60, timer);
      }
      if (i == 1) {
        startTimer(30 * 60, timer);
      }
      if (i == 2) {
        startTimer(40 * 60, timer);
      }
      if (i == 3) {
        startTimer(60 * 60, timer);
      }
    });
  }
  document
    .querySelector(".competitiveMode")
    .addEventListener("click", competitiveModeOn);

  document
    .querySelector(".competitiveMode")
    .addEventListener("click", competitiveModeBackend);
  document.querySelector(".create_one").addEventListener("click", give_room);
}

initEventListeners();

//For Practice Mode button click Animations
function practiceMode() {
  loaderfor1sec();
  document
    .querySelector(".button_after_practice_mode")
    .classList.remove("hidden2");
  document.querySelector(".modes").classList.add("side_hoja");
  document.querySelector("footer").classList.add("hidden");
}
//For front end of sudoku
function generateSudoku() {
  console.log("hh");

  loaderfor1sec();
  document.querySelector(".sudoku-board").classList.remove("hidden");
  document.querySelector(".krr").classList.remove("hidden");
  document.querySelector(".candidates").classList.remove("hidden");
  document.querySelector(".timer").classList.remove("hidden");
}
//For competitive Mode front end
function competitiveModeOn() {
  document.querySelector("footer").classList.add("hidden");
  loaderfor1sec();
  document
    .querySelector(".button_after_practice_mode")
    .classList.add("hidden2");
  document.querySelector(".sudoku-board").classList.add("hidden");
  document.querySelector(".krr").classList.add("hidden");
  document.querySelector(".candidates").classList.add("hidden");
  document.querySelector(".timer").classList.add("hidden");
}
//For starting video and room creation
function competitiveModeBackend() {
  auth.onAuthStateChanged((user) => {
    // var handle_name=document.getElementById('')
    if (user) {
      frontend_changes_competitive();

      document
        .querySelector("#ask_for_room")
        .addEventListener("submit", (e) => {
          e.preventDefault();

          room = document.querySelector(".ask_room").value;
          socket.emit("check_room_avail", room);
          socket.on("reply_to_room", (flag) => {
            console.log(flag);
            if (flag) {
              join_room(room);
            } else {
              alert("No room Exists with that ID!");
            }
          });
        });
    } else {
      document.querySelector(".login_form").classList.remove("hidden22");
    }
  });
  document.querySelector(".modes").classList.add("side_hoja");
}
function join_room(room) {
  let ready = document.querySelector(".ready_btn");
  
  videoOn();
  loaderfor1sec();
  document.querySelector(".buttons").classList.add("hidden");
  document.querySelector("#ask_for_room").classList.add("hidden");
  document.querySelector(".modes").classList.add("hidden");
  document.querySelector(".ready_btn").classList.remove("hidden");
}
function frontend_changes_competitive() {
  document.querySelector(".competitiveModeOn").classList.remove("hidden");
  document.querySelector(".join_room").addEventListener("click", (e) => {
    e.preventDefault();

    document.querySelector("#ask_for_room").classList.remove("hidden");
  });
}
function give_room() {
  display_popup(create_id);
}
function display_popup(create_id) {
  loaderfor1sec();
  
  document.querySelector(".buttons").classList.add("hidden");
  document.querySelector("#ask_for_room").classList.add("hidden");
  document.querySelector(".modes").classList.add("hidden");
  document.querySelector(".ready_btn").classList.remove("hidden");
  videoOn();
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  modal.style.display = "block";
  document.querySelector('#room_id_t').innerHTML=`Give this room ID to your friends : ${create_id}`;
  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
socket.on('seek_id',(id)=>{
  create_id=id;
  console.log(create_id);
})
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
          console.log(room);
          socket.emit("make_ready", { fname, room });
          console.log(fname);
        }
      });
    });
});