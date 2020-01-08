const csv = require('csv-parser');
const fs = require('fs');

// Arguments:
// file (required): source CSV file being read from
// key (optional): if provided, will return an object with keys resembling the value of procided key and value of an oject
// 	otherwise will return an array of objects
// Both file name and key expect to be in quotes.

const read = (file,key) => {
	let results;
	const inStream = new Promise((res,rej) => {
		if(key) {
		results = {};
		fs.createReadStream(file)
			.pipe(csv())
			.on('data', (row) => { results[row[key]] = row })
			.on('end', () => { res(results) });
		} else {
		results = [];
		fs.createReadStream(file)
			.pipe(csv())
			.on('data', (row) => { results.push(row) })
			.on('end', () => { res(results) })
		}
	})
	.then(() => { console.log(results) });
}

// Currently will just log results, need to get this to actually return that object / array.
