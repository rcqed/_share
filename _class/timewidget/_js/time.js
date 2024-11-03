function displayDateTime() {
	var date = new Date();

	var year = date.getFullYear();
	var month = (date.getMonth() + 1).toString().padStart(2, '0');
	var day = date.getDate().toString().padStart(2, '0');
	var hours = date.getHours().toString().padStart(2, '0');
	var minutes = date.getMinutes().toString().padStart(2, '0');
	var seconds = date.getSeconds().toString().padStart(2, '0');
	var dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];

	var dayOfWeekString = dayOfWeek;

	document.getElementById('date').textContent = year + '.' + month + '.' + day;
	document.getElementById('time').textContent = hours + ':' + minutes + ':' + seconds;
	document.getElementById('dayOfWeek').textContent = dayOfWeekString;
}

function copyCurrentTime() {
	var date = new Date();
	var formattedTime = date.getFullYear() + '.' + (date.getMonth() + 1).toString().padStart(2, '0') + '.' + date.getDate().toString().padStart(2, '0') + ' ' + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
	var textArea = document.createElement("textarea");
	textArea.value = formattedTime;
	document.body.appendChild(textArea);
	textArea.select();
	document.execCommand('copy');
	document.body.removeChild(textArea);
}

setInterval(displayDateTime, 1000);
displayDateTime();