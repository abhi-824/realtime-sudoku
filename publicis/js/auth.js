// for signup

const auth = firebase.auth();
var user ;

const db = firebase.firestore();
let fname;
auth.onAuthStateChanged((user) => {
	// var handle_name=document.getElementById('')
	if (user) {
		console.log('user logged in');
		db.collection('users')
			.where('email', '==', user.email)
			.get()
			.then((snapshot) => {
				snapshot.docs.forEach((doc) => {
					const handle_list = doc.data();
					if (handle_list.email === user.email) {
						fname = handle_list.name;

						console.log(fname);
					}
					if (!fname) {
						ask_fr_handle(user);
					} else {
						dashboard(fname, handle_list);
					}
				});
			});
	} else {
		console.log('user logged out');
		// show_screen(index_screen);
	}
});

const signupform = document.querySelector('#signup-form');
const forgotform = document.querySelector('#forgot');
signupform.addEventListener('submit', (e) => {
	loaderfor1sec();
	const email = signupform['signup-email'].value;
	const Name = signupform['signup-handle'].value;
	const pwd = signupform['signup-password'].value;
	// firebase.database().ref('users/' + userId).set({
	//     handle: Name
	// });

	console.log(email, Name, pwd);

	auth
		.createUserWithEmailAndPassword(email, pwd)
		.then((cred) => {
			db.collection('users').add({
				email: email,
				name: Name,
			});
			console.log(cred);
			signupform.reset();
		})
		.catch(function (error) {
			alert(error);
		});

	e.preventDefault();
});

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
	e.preventDefault();
	loaderfor1sec();
	const email = loginForm['login-email'].value;
	const pwd = loginForm['login-password'].value;

	auth
		.signInWithEmailAndPassword(email, pwd)
		.then((cred) => {
			console.log(cred);
		})
		.catch(function (error) {
			alert(error);
		});
});

function ask_fr_handle(user) {
	document.querySelector('.ask_handle').classList.remove('hidden');
	document.querySelector('#signup-form').classList.add('hidden');
	document.querySelector('#login-form').classList.add('hidden');
	document.querySelector('#forgot').classList.add('hidden');
	document.querySelector('.after-forgot').classList.add('hidden');
	document
		.querySelector('.ask-handle-submit')
		.addEventListener('click', (e) => {
			e.preventDefault();
			let handle_val = document.querySelector('.ask_handle_val').value;

			db.collection('users').add({
				email: user.email,
				handle: handle_val,
			});

			dashboard(handle_val);
		});
}

document.querySelector('.google-sign-in').addEventListener('click', (e) => {
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase
		.auth()
		.signInWithPopup(provider)
		.then(function (result) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			// ...
		})
		.catch(function (error) {
			console.log('hell');
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			alert(errorMessage);
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			// ...
		});
	e.preventDefault();
});
