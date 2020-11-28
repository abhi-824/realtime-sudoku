
socket.on("start_sudoku", () => {
  console.log(room);
  socket.emit(
    "make_it_real",
    document.querySelector("#sudoku2").innerHTML,
    room
  );
});
socket.on("start_game", (data) => {
  loaderfor1sec();
  document.querySelector("#sudoku2").innerHTML = data;
  console.log(data);
  document.querySelector("#sudoku2").classList.remove("hidden");
  document.querySelector(".ready_btn").classList.add("hidden");
});

socket.on("message", (msg) => {
  display(msg);
});
