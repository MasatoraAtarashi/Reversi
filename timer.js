// //　自作ライブラリ
// //　ページを表示してからの経過時間をリアルタイムで表示する。
// //　フォーマットはn分m秒
// //　利用にはhtmlにid="text"のなんかを作って、startUpTimer()を呼び出せば良い。
var start;
var timer;
var min;
var sec;

function startUpTimer() {
	getStartDate();
	showNowTime();
}

//　ゲーム開始時の時刻を取得する関数
function getStartDate() {
	start = new Date();
}

//　ゲーム開始からの経過時間を計測する関数
function getPassTime() {
	var now = new Date();
	var passTime = parseInt((now.getTime() - start.getTime()) / 1000);
	min = parseInt((passTime / 60) % 60);
	sec = passTime % 60;
	timer = min + "分" + sec + "秒";
}

//　ゲーム開始からの経過時間をリアルタイムで表示する関数
function showNowTime() {
	getPassTime();
	document.getElementById('time').value = timer;
	setTimeout("showNowTime()", 1000);
}