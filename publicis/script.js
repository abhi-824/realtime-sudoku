
let timer = document.querySelector('.timer');
console.log(timer);
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
document.querySelector(".practiceMode").addEventListener("click",(e)=>{
	e.preventDefault();
	document.querySelector(".button_after_practice_mode").classList.remove("hidden2");
	document.querySelector(".modes").classList.add("side_hoja")
})
for (let i = 0; i < gen_btn.length; i++) {
	gen_btn[i].addEventListener('click', () => {
        console.log("hh")
		let pp = document.querySelectorAll('.hidden');
		for (let i = 0; i < pp.length; i++) {
			pp[i].classList.remove('hidden');
			
			startTimer(60 * 60, timer);

		}
	});
}
