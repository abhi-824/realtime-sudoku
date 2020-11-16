let timer = document.querySelector('.timer');
console.log(timer);
startTimer(60 * 60, timer);
function startTimer(duration, display) {
	var timer = duration,
		minutes,
		seconds;
	let c = setInterval(function () {
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;

		display.textContent = minutes + ':' + seconds;

		if (--timer < 0) {
			alert("Time's Up!!!");
			clearInterval(c);
		}
	}, 1000);
}
let gen_btn = document.querySelectorAll('.js-generate-board');
console.log(gen_btn)

for (let i = 0; i < gen_btn.length; i++) {
	gen_btn[i].addEventListener('click', () => {
        console.log("hh")
		let pp = document.querySelectorAll('.hidden');
		for (let i = 0; i < pp.length; i++) {
			pp[i].classList.remove('hidden');
		}
	});
}
