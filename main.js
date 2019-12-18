//import React from 'react';
//import ReactDOM from 'react-dom';

//Get current time
const sysTime = new Date();
console.log(sysTime);

//Create empty user obj
const UsersObj = {};

//Simple function that uses Object.assign to add new users to the UsersObj object
const newUser = (id,name) => {
	Object.assign(UsersObj,{[id]:{userName:name,punchStatus:false}})
};

newUser(2112,'Michelle Frattaroli');

//User authorization function, looks for ID in UsersObj and returns boolean
const userAuth = (id) => {
	const userId = Number(id);
	let auth = false;
	if (UsersObj[userId]) 
		{auth = true; 
		console.log('authorized'); return auth; }
	else if (!UsersObj[id]) 
		{ console.log('Unauthroized'); return auth }
	else { console.log('auth error') };
};

//toggle boolean for punch status by id and log boolean to console
const togglePunch = (id) => {
	const userId = Number(id);
	UsersObj[userId].punchStatus = !UsersObj[userId].punchStatus;
	console.log(`User ${userId} Punched In: ${UsersObj[userId].punchStatus}`);
};

//Empty Object for logging punches, agian will be database eventually
const PunchHistory = {};

const newPunch = (id) => {
	const userId = Number(id);
	togglePunch(userId);
	if (UsersObj[userId].punchStatus)
		{ Object.assign(PunchHistory, {[userId]: ['IN', sysTime]}) }
	else { Object.assign(PunchHistory, {[userId]: ['OUT', sysTime]}) }
};

/* ================================== */

console.log(`This is the backbone for a time clock system.\n
Users can be added to the UsersObj object with newUser().\n
userAuth() returns a boolean as to whether the user number exists.\n
newPunch() assigns an object for each punch to the PunchHistory object.\n\n`);

/*
 
//Syntax for adding new users as follows (punchStatus defaults to false)
NewUser(2112,'Michelle Frattaroli');

//Returns full user info object by number
console.log(UsersObj[2112]);

//Returns user name as string
console.log(UsersObj[2112].userName);

//Returns punch Status as boolean
console.log(UsersObj[2112].punchStatus);

*/



