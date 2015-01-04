(function () {
	window.addEventListener("DOMContentLoaded", function () {
		var time = document.getElementById('time');
 		var colon = time.innerHTML.indexOf(':');
		var min = time.innerHTML.substring(colon + 1, colon + 3);
		console.log(min);
		if (min < 10) {
			var newMin  = '0' + min;
	 		time.innerHTML = time.innerHTML.replace(min, newMin);
		}
	});
})();