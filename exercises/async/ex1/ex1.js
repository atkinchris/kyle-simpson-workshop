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
// The old-n-busted callback way

var responses = {};
var files = [
	'file1',
	'file2',
	'file3'
];

function getFile(file) {
	fakeAjax(file,function(text){
		handleResponse(file, text);
	});
}

function handleResponse(url, text) {
	if (!(url in responses)) {
		responses[url] = text;
	}

	for (var i = 0; i < files.length; i++) {
		if(files[i] in responses) {
			if (responses[files[i]] != null) {
				output(responses[files[i]]);
				responses[files[i]] = null;
			}
		}
		else return;
	}

	output('Complete!');
}

// request all files at once in "parallel"
getFile("file1");
getFile("file2");
getFile("file3");
