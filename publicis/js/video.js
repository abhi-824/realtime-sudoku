function videoOn() {
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

    document.querySelector(".mic-icon").addEventListener("click", () => {
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
}
