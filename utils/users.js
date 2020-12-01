const users = [];
const problems=[];
const user_states = [];

function userJoin(id, username, room) {
	const user = { id, username, room };
	users.push(user);
	return user;
}

function make_ready(id, username, room, state) {
	const user = { id, username, room, state };
	user_states.push(user);
	return user;
}

function allready(room) {
	// for(let i=0;i<user_states.length;i++)
	// {
	// console.log(users);
	// console.log(user_states
	let cnt=0;
	let cnt2=0;
	for(let i=0;i<user_states.length;i++)
	{
		if(user_states[i].room===room)
		{
			cnt++;
		}
	}
	for(let i=0;i<users.length;i++)
	{
		if(users[i].room==room)
		{
			cnt2++;
		}
	}
	console.log(cnt,room);
	if (cnt === cnt2) {
		return true;
	}
	// }
	return false;
}
function getCurrentUser(id) {
	return users.find((user) => user.id === id);
}

function userLeave(id) {
	const index = users.findIndex((user) => user.id === id);
	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
}

function getRoomUsers(room) {
	console.log(users);
	return users.filter((user) => user.room === room);
}

module.exports = {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers,
	make_ready,
	allready
  // giveProblems
};
