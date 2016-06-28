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
	var response;

	fakeAjax(file, function(text) {
		if (response) response(text);
		else response = text;
	});

	return function(cb) {
		if (response) cb(response);
		else response = cb;
	}
}

// request all files at once in "parallel"

var t1 = getFile('file1');
var t2 = getFile('file2');
var t3 = getFile('file3');

t1(function(text) {
	output(text);
	t2(function(text) {
		output(text);
		t3(function(text) {
			output(text);
		});
	});
});
