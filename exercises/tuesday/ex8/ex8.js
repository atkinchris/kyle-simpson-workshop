$(document).ready(function(){
	var $btn = $("#btn"),
		$list = $("#list");

	var clicks = ASQ.react.of();
	var messages = throttle(clicks);

	$btn.click(function(evt){
		clicks.push(evt);
	});

	messages.val(function(msg){
		$list.append($("<div>" + msg + "</div>"));
	});
});

function throttle(stream) {
	var waiting;

	return ASQ.react.filter(stream, function (evt) {
		if (!waiting) {
			waiting = true;
			setTimeout(function() {
				waiting = false;
			}, 1000);
			return true;
		}

		return false;
	});
}
