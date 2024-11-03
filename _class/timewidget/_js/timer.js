let workDuration = 25 * 60; // 默认工作时间 25分钟
let breakDuration = 5 * 60; // 默认休息时间 5分钟
let timerInterval;
let isWorking = true;
let isTimerRunning = false;

function startStopTimer() {
	if (isTimerRunning) {
		clearInterval(timerInterval);
		document.getElementById("startStopButton").textContent = "开始";
		pauseBell();
	} else {
		timerInterval = setInterval(updateTimer, 1000);
		document.getElementById("startStopButton").textContent = "停止";
		playBell();
	}
	isTimerRunning = !isTimerRunning;
}

function playBell() {
	const bell = document.getElementById("bell");
	bell.play().catch(error => {
		// 音频播放失败，您可以在这里处理错误
		console.error("音频播放失败:", error);
	});
}

function pauseBell() {
	const bell = document.getElementById("bell");
	bell.pause();
}

function updateTimer() {
	if (isWorking) {
		workDuration--;
		if (workDuration === 0) {
			playBell();
			isWorking = false;
			workDuration = 25 * 60; // 重置工作时间
		}
	} else {
		breakDuration--;
		if (breakDuration === 0) {
			playBell();
			isWorking = true;
			breakDuration = 5 * 60; // 重置休息时间
		}
	}

	const minutes = Math.floor(isWorking ? workDuration / 60 : breakDuration / 60);
	const seconds = isWorking ? workDuration % 60 : breakDuration % 60;
	const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	document.getElementById("timer").innerText = formattedTime;
}