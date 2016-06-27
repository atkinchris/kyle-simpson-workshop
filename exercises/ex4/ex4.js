function upper(strings,...values) {
	return strings.reduce((out, str, i) => [...out, str, (values[i] || '').toUpperCase()], []).join('');
}

var name = "kyle",
	twitter = "getify",
	classname = "es6 workshop";

console.log(
upper`Hello ${name} (@${twitter}),
welcome to the ${classname}!`
);
