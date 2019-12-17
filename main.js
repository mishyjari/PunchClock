//Variables linking to various HTML elements
const idButton = document.getElementById('entryButton');
const newUserName = document.getElementById('newUserName');
const newUserNum = document.getElementById('newUserNum');
const newUserButton = document.getElementById('submitNewUser');
const punchButton = document.getElementById('punchButton');
const punchNum = document.getElementById('punchField');


//Script that formats the current date in some useful ways
const date = new Date();
function zeroFill(i)
{
        if ( i < 10 )
                { i = '0' + i }
        return i;
};

const _time = {
        dayArr: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        monthArr: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        year: date.getFullYear(),
        monthNum: zeroFill(date.getMonth()),
        dayOfMonth: zeroFill(date.getDate()),
        day: date.getDay(),
        hour24: zeroFill(date.getHours()),
        minute: zeroFill(date.getMinutes()),

};
const year = _time.year;
const month = _time.monthArr[_time.monthNum];
const day = _time.dayArr[_time.day];
const calDay = _time.dayOfMonth;
const monthNum = _time.monthNo;
const clock = `${_time.hour24}:${_time.minute}`;
const milTime = _time.hour24 + Math.round((_time.minute/60)*100)/100;
const numDate = `${_time.monthNum}/${_time.dayOfMonth}/${_time.year}`;
const fullDate = `${day}, ${month} ${calDay}, ${year}`;



//Create object for users with two predefined entries. Need to write this to external file to save changes or use a database.
const Users = 
{
	2112: 
	{
		name: 'Michelle Frattaroli',
		punchStatus: false,
	},
	2365:
	{
		name: 'Jillian Gilpatrick',
		punchStatus: false,
	},
};



//Made this a global variable cause im dumb
let myId;


//Checks if number entered exists as a key in Users, returns an authorized message with their name if true.
idButton.onclick = checkAuth = () => { 
	myId = Number(document.getElementById('entryField').value);
		if(Users[myId]) {alert(`${Users[myId].name}, you are authorized!`)}
		else {alert('That number does not exist!')};
};



//Adds new user with a user-defined number as a key and an object with the name and default false for punchStatus
submitNewUser.onclick = newUser = () => 
{
	if(!isNaN(Number(newUserNum.value)))
	{
		Users[Number(newUserNum.value)] = {
			name: newUserName.value,
			punchStatus: false
		}
	} else { alert('Please enter a valid whole number!')};
	console.log(Users);
};






document.getElementById('timeHeading').innerHTML = `${day}, ${month} ${calDay}, ${year} at ${clock}`;


//New Punch
punchButton.onclick = newPunch = () => { 
	myId = Number(document.getElementById('punchField').value);
	
	if(!Users[myId]) {alert(`That number doesn't exist!`)}
	else if (Users[myId].punchStatus === true)
	{
		Users[myId].punchStatus = false;
		alert(`${Users[myId].name} clocked out successfully at ${clock}!	`);
	}
	else if (Users[myId].punchStatus === false )	
	{
		Users[myId].punchStatus = true;
		alert(`${Users[myId].name} clocked in successfully at ${clock}!`);
	}
	else {alert(`System malfunction`)};
};
