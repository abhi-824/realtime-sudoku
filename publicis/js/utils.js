function loaderfor1sec() {
  document.querySelector(".loader").classList.remove("hidden");
  window.setTimeout(() => {
    document.querySelector(".loader").classList.add("hidden");
  }, 600);
}

function display(str) {
  let div = document.createElement("a");
  div.className = "notification";
  div.innerHTML = str;
  window.setTimeout(() => {
    div.classList.add("disappear");
  }, 2000);
  document.body.appendChild(div);
}

function dashboard(name, handle_list) {
  document.querySelector(".login_page").classList.add("hidden");
}

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
document.querySelector(".login").addEventListener("click", (e) => {
  side(document.querySelector(".login_form"));
});

function side(div) {
  div.classList.add("side_hoja_parli");
}
