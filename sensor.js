// //　センサーで遊び
// //　光センサーと位置情報センサーで文字色を変える
// 光センサーで色を変える
function light_show(event) {
	// alert('a');
	var r = event.value * Math.floor(Math.random() * (5 + 1 - 1)) + 1;
	var g = event.value * Math.floor(Math.random() * (5 + 1 - 1)) + 1;
	var b = event.value * Math.floor(Math.random() * (5 + 1 - 1)) + 1;

	// document.getElementById('time').style.color = "rgba(" + r + "," + g + "," + b + ", 1)";
	$("#time").css("color", "rgba(" + r + "," + g + "," + b + ", 1)");
	// alert(document.getElementById('time').style.color);
}
window.addEventListener('devicelight', light_show);

// 位置情報で色を変える		
function drawMapPresent() {
	navigator.geolocation.getCurrentPosition(loc_print, loc_error);
}

function loc_print(pos) {
	changeColorByPosition(pos.coords.latitude,pos.coords.longitude);
}

function loc_error(err) {
	if (err.code == err.POSITION_UNAVAILABLE) {
		alert("位置情報の取得ができませんでした。");
	} else if (err.code == err.PERMISSION_DENIED) {
		alert("位置情報取得の使用許可がされませんでした。");
	} else if (err.code == err.PERMISSION_DENIED_TIMEOUT) {
		alert("位置情報取得中にタイムアウトしました。");
	}
}

function changeColorByPosition(latitude,longitude) {
	var b = Math.floor(Math.random() * (255 + 1 - 1)) + 1;
	// document.getElementById('turn').style.color = "rgba(" + latitude + "," + longitude + "," + b + ", 1)";
	$("#turn").css("color", "rgba(" + latitude + "," + longitude + "," + b + ", 1)");
	// alert('a');
}