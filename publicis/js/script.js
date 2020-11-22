var socket = io();
const room = window.location.href.split('/')[3];

var peer = new Peer({
	secure: true,
	host: 'brainteaser.herokuapp.com/',
	port: '',
	path: '/peerjs',
});
console.log(peer);
peer.on('open', (id) => {
	console.log('jhaod');
	socket.emit('join-room', room, id);
});
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
console.log(gen_btn);
document.querySelector('.practiceMode').addEventListener('click', (e) => {
	e.preventDefault();
	document
		.querySelector('.button_after_practice_mode')
		.classList.remove('hidden2');
	document.querySelector('.modes').classList.add('side_hoja');
});
for (let i = 0; i < gen_btn.length; i++) {
	gen_btn[i].addEventListener('click', () => {
		console.log('hh');
		let pp = document.querySelectorAll('.hidden');
		for (let i = 0; i < pp.length; i++) {
			pp[i].classList.remove('hidden');

			startTimer(60 * 60, timer);
		}
	});
}
document.querySelector('.competitiveMode').addEventListener('click', (e) => {
	e.preventDefault();
});
document.querySelector('.login').addEventListener('click', (e) => {
	side(document.querySelector('.login_form'));
});
function side(div) {
	div.classList.add('side_hoja_parli');
}
document.querySelector('.login').addEventListener('click', (e) => {
	document.querySelector('#signup-form').classList.add('hidden');
	e.preventDefault();
	document.querySelector('#login-as-guest-form').classList.add('hidden');
	document.querySelector('#login-form').classList.remove('hidden');
});

document.querySelector('.signup').addEventListener('click', (e) => {
	e.preventDefault();
	document.querySelector('#signup-form').classList.remove('hidden');
	side(document.querySelector('.login_form'));
	document.querySelector('#login-as-guest-form').classList.add('hidden');
	document.querySelector('#login-form').classList.add('hidden');
});

document.querySelector('.forgot_pass').addEventListener('click', (e) => {
	e.preventDefault();
	document.querySelector('#signup-form').classList.add('hidden');
	side(document.querySelector('.login_form'));
	document.querySelector('#login-form').classList.add('hidden');
	document.querySelector('#forgot').classList.remove('hidden');
});

document.querySelector('.back-login').addEventListener('click', (e) => {
	e.preventDefault();
	document.querySelector('#signup-form').classList.add('hidden');
	document.querySelector('#login-form').classList.remove('hidden');
	side(document.querySelector('.login_form'));
	document.querySelector('#forgot').classList.add('hidden');
	document.querySelector('.after-forgot').classList.add('hidden');
});
document.querySelector('.login_as_guest').addEventListener('click', (e) => {
	e.preventDefault();
	document.querySelector('#login-as-guest-form').classList.remove('hidden');
	side(document.querySelector('.login_form'));
	document.querySelector('#login-form').classList.add('hidden');
	document.querySelector('#signup-form').classList.add('hidden');
});

document.querySelector('.competitiveMode').addEventListener('click', (e) => {
	auth.onAuthStateChanged((user) => {
		// var handle_name=document.getElementById('')
		if (user) {
			const video_grid = document.querySelector('.video-grid');
			const myvideo = document.createElement('video');
			navigator.mediaDevices
				.getUserMedia({
					video: true,
					audio: true,
				})
				.then((stream) => {
					addVideoStream(myvideo, stream);
					// socket.emit('catch_user', stream);

					socket.on('user-connected', (userId) => {
						console.log(userId);
						connectToNewUser(userId, stream);
					});
					peer.on('call', (call) => {
						call.answer(stream);
						const video = document.createElement('video');
						call.on('stream', (userVideoStream) => {
							addVideoStream(video, userVideoStream);
						});
					});
				});
			function addVideoStream(video, stream) {
				video.srcObject = stream;
				video.addEventListener('loadedmetadata', () => {
					video.play();
				});
				console.log('he');
				video_grid.appendChild(video);
			}
			function connectToNewUser(userId, stream) {
				const call = peer.call(userId, stream);
				const video2 = document.createElement('video');
				call.on('stream', (userVideoStream) => {
					addVideoStream(video2, userVideoStream);
				});
				call.on('close', () => {
					video2.remove();
				});
			}
			document.querySelector('.competitiveModeOn').classList.remove('hidden');
			document.querySelector(".join_room").addEventListener("click",(e)=>{
				e.preventDefault();
				document.querySelector('#ask_for_room').classList.remove('hidden');
			})
			document.querySelector(".create_one")


		} else {
			document.querySelector('.login_form').classList.remove('hidden22');
		}
	});
	document.querySelector('.modes').classList.add('side_hoja');

});
function dashboard(name, handle_list) {}
