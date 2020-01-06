const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/punchr';

const timeAsNum = () => {
        const hours = new Date().getHours();
        const minutes = Math.round(new Date().getMinutes()/60*100);
        return hours + minutes/100;
}

const allUsers = () => {
	MongoClient.connect(url, {useUnifiedTopology: true}, (err,db) => {
		if (err) throw err;
		const dbo = db.db('punchr');
		dbo.collection('users').find({}).toArray((err,res) => {
			if (err) throw err;
			console.log(res);
			return res;
		})
		if (db) { db.close() };
	})
}

const addNewUser = (name,usrId,phone,email) => {
	Object.assign(activeUsers, {usrId: false});
	MongoClient.connect(url, {useUnifiedTopology: true}, (err, db) => {
		if (err) throw err;
		const dbo = db.db('punchr');
		const newUsr = {
			_id: usrId,
			name: name,
			usrId: usrId,
			phone: phone,
			email: email,
			active: false,
		};
		dbo.collection('users').insertOne(newUsr, (err,res) => {
			if (err) throw err;
			Object.assign(activeUsers, {[usrId]: false});
			console.log(res);
			})
			if (db) { db.close() };
	})
}

const removeUser = (usrId) => {
	MongoClient.connect(url, {useUnifiedTopology: true}, (err, db) => {
		if (err) throw err;
		const dbo = db.db('punchr');
		const query = { usrId: usrId };
		dbo.collection('users').removeOne(query, (err,res) => {
			if (err) throw err;
			console.log(res);
			return 'User ' + usrId + ' removed.';
		}); if (db) {db.close()};
	})
};      
                    
const queryUserInfo = (usrId) => {
	MongoClient.connect(url,
		{useUnifiedTopology: true}, (err, db) => {
		if (err) throw err;
		const dbo = db.db('punchr')
		dbo.collection('users').findOne({usrId: usrId})
			.then(res => {console.log(res)})
			.catch(err => {console.log(err)})
		})
}


const getPunchStatus = (usrId) => {
	MongoClient.connect(url, {useUnifiedTopology: true}, (err,db) => {
		if (err) throw err;
		const dbo = db.db('punchr');
		dbo.collection('users').findOne({usrId: usrId})
			.then(res => { 
				console.log(res.active);
				return res.status;
			 })
			.catch(err => { console.log(err) }) 
		});
	}

const togglePunchIn = (usrId) => {
	MongoClient.connect(url,
		{useUnifiedTopology: true},
		(err,db) => {
			if (err) throw err;
		const dbo = db.db('punchr');
		dbo.collection('users').updateOne(
			{ usrId: usrId },
			{ $set: {active: timeAsNum()} })
			.then(res => { 
				Object.assign(activeUsers, {[usrId]: timeAsNum()});
				console.log(res); })
			.catch(err => { console.log(err) })
	})
}

const togglePunchOut = (usrId) => {
	const inTime = activeUsers[usrId];
	logNewPunch(usrId,inTime);
        MongoClient.connect(url,
                {useUnifiedTopology: true},
                (err,db) => {
                        if (err) throw err;
                const dbo = db.db('punchr');
                dbo.collection('users').updateOne(
                        { usrId: usrId },
                        { $set: {active: false} })
                        .then(res => {	console.log(res) })
                        .catch(err => { console.log(err) })
        })
}


const editName = (oldName,newName) => {}

const editPhone = (oldPhone,newPhone) => {}

const editId = (oldId,newId) => {}

const editEmail = (oldEmail,newEmail) => {}

const getUsrNameById = (usrId) => {
	MongoClient.connect(url, 
		{useUnifiedTopology: true}, 
		(err,db) => {
			if (err) throw err;
			const dbo = db.db('punchr');
			dbo.collection('users').findOne(
				{ usrId: usrId })
			.then(res => {console.log(res.name)})
			.catch(err => {console.log(err)});
	})
}

const getUsrByName = (name) => {}

const returnPunchLog = () => {
	MongoClient.connect(url,
		{useUnifiedTopology: true},
		(err, db) => {
			if (err) throw err;
			const dbo = db.db('punchr')
			dbo.collection('punchLog').find().toArray((err,res) => {
				if (err) throw err;
				console.log(res);
			})
		})
}

const logNewPunch = (usrId,timeIn) => {
	MongoClient.connect(url,
		{useUnifiedTopology: true},
		(err, db) => {
			if (err) throw err;
			const dbo = db.db('punchr');
			const date = new Date();
			const punchId =	`${usrId}_${date.getYear()}_${date.getMonth()}_${date.getDate()}_${timeAsNum()}`;
			
                 dbo.collection('users').findOne({usrId: usrId})
                         .then(res => {
                                 const timeIn = res.active;
                                 console.log(res.active);
                          })
                         .catch(err => { console.log(err) });

			const newPunch = {
				_id: punchId,
				usrId: usrId,
				shiftOpen: Number(timeIn),
				shiftClose: Number(timeAsNum()),
				shiftHours: Math.round(((timeAsNum() - timeIn)*100)/100),
				date: new Date().toLocaleDateString(),
				}
			dbo.collection('punchLog').insertOne(newPunch)
				.then(res => { console.log(res) })
				.catch(err => {console.log(err) })					
			})
}
module.exports = { addNewUser, removeUser, togglePunchIn, togglePunchOut, getPunchStatus, getUsrNameById, logNewPunch, returnPunchLog, userList: allUsers } ;
