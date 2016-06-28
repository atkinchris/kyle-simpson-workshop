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
}

// **************************************

function getFile(file) {
	return function(done) {
		fakeAjax(file, done);
	}
}

// request an array of files at once in "parallel"
ASQ().all(
	getFile('file1'),
	getFile('file2'),
	getFile('file3')
).val(function(text1, text2, text3) {
	console.log(text1);
	console.log(text2);
	console.log(text3);
})
