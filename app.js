// Trying to make this script work independtly by using Node's filesystem module to read and write external text files

const fs = require('fs');

//Temporary Object to Store Users
//Make this a Database!!
const allUsers = {
	2112: {
		name: 'Mishy Jari',
		punch: false,
		openPunch: {},
	}
};
const readPunchFile = () => {
	return fs.readFileSync('./punches.md', 'utf8')
}
//Again with the temorary object that will ultimately be a database
const punchLog = {
	//Define a method for creating new sequental keys for each new punch
	newPunchKey: function() {
		let i = 0;
		while (this[i]) {i++}
		return i;
	},
	readPunchFile: fs.readFileSync('./punches.md', 'utf8')
}

//This returns the time as a number, rounded to two digits.
//E.g., 6:30p.m. would be 18.5
//Used for calculating shift hours
const timeAsNum = () => {
	const hours = new Date().getHours();
	const minutes = Math.round(new Date().getMinutes()/60*100);
	return hours + minutes/100;
}

//Check if punch is open, if not store time values in user object (making punch key truthy) and return info
const openShift = (id) => {
	let time = new Date().toLocaleTimeString();
	let date = new Date().toLocaleDateString();
	if (allUsers[id].punch) {
		return 'Shift already opened for user ' + id;
	} else {
		allUsers[id].punch = timeAsNum();
		allUsers[id].openPunch = {
			id: id,
			name: allUsers[id].name,
			date: date,
			timeIn: time
		}
	}
}

//Similar to openShift, with extra info, but also adds the punch to the punchLog
const closeShift = (id) => {
	let time = new Date().toLocaleTimeString();
	let date = new Date().toLocaleDateString();
	if (!allUsers[id].punch) {
		return 'No shift open for user ' + id;
	} else {
		const netHours = Math.round((timeAsNum() - allUsers[id].punch)*10)/10;
		const inStr = allUsers[id].openPunch.timeIn;
		allUsers[id].punch = false;
		const punchId = punchLog.newPunchKey();
		punchLog[punchId] = {
			id: id,
			name: allUsers[id].name,
			date: date,
			timeIn: inStr,
			timeOut: time,
			shiftHours: netHours,
		}
		fs.appendFile('./punches.md', 
			punchId + ' = ' + util.inspect(punchLog[punchId]) + ', ', 
			err => { if (err) { throw err }})
	}
	allUsers[id].openPunch = {}
}

console.log(punchLog)
