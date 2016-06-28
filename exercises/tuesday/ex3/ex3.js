function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
	return text;
}

// **************************************

function getFile(file) {
	return new Promise(resolve => {
		fakeAjax(file, resolve);
	});
}

// request all files at once in "parallel"
var t1 = getFile('file1');
var t2 = getFile('file2');
var t3 = getFile('file3');

t1.then(output)
	.then(() => t2)
	.then(output)
	.then(() => t3)
	.then(output)
	.then(() => output('Complete!'));
