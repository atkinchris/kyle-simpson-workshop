function foo(a1, x, y, ...a2) {
	return [a1, ...a2];
}

function bar() {
	var a1 = [ 2, 4 ];
	var a2 = [ 6, 8, 10, 12 ];

	return foo(...a1, ...a2);
}

console.log(
	bar().join("") === "281012"
);
