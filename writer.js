const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writeCsv = (obj,output) => {
	let writer;
	if ( fs.existsSync(output) )
		{  writer = csvWriter({sendHeaders: false}) }
	else { writer = csvWriter() };
	writer.pipe(fs.createWriteStream(output, {flags: 'a'}))
	writer.write(obj)
	writer.end();
}

module.exports = writeCsv;
