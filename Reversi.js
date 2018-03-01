//　//　リバーシゲームの基本部分
var clickCount = 0;
var boardState = [
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 1, 2, 0, 0, 0],
		[0, 0, 0, 2, 1, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0]
	];
var placeState;
var reversiblePiecesX = [];
var reversiblePiecesY = [];
// 初期化
function initialize() {
	getStartDate();
	showNowTime();
	drawBoard();
	setFourPiece();
}

// ボードを描写
function drawBoard() {
	var board = document.getElementById('board');
	for(var y = 1; y <= 8; y++) {
		var tr = document.createElement('tr');
		for(var x = 1; x <= 8; x++) {
			var td = document.createElement('td');
			td.className = "cell";
			td.id = "cell." + x + "." + y;
			td.addEventListener('click', function(){
				click(this.id);
			});
			tr.appendChild(td);

			var imgW = document.createElement('img');
			imgW.src = "white.png";
			imgW.id = "imgW" + x + y; 
			imgW.style.display = "none";
			td.appendChild(imgW);

			var imgB = document.createElement('img');
			imgB.src = "black.png";
			imgB.id = "imgB" + x + y; 
			imgB.style.display = "none";
			td.appendChild(imgB);
		}
		board.appendChild(tr);
	}
}
// コマを4つ配置
function setFourPiece() {
	document.getElementById('imgW44').style.display = "flex";
	document.getElementById('imgB45').style.display = "flex";
	document.getElementById('imgB54').style.display = "flex";
	document.getElementById('imgW55').style.display = "flex";
}

// マスをクリックした時の処理
function click(placeId) {
	reversiblePiecesX.splice(0, reversiblePiecesX.length);
	reversiblePiecesY.splice(0, reversiblePiecesY.length);
	showReversiblePiece(placeId);
	if(checkInput() && preventionOverlap(placeId)) {
		putPiece(placeId);
		reverse();
	} else if(preventionOverlap(placeId)) {
		pass();
	}
}

// マスをクリックしたときにひっくり返せる駒を出す関数	
function showReversiblePiece(placeId) {
	placeState = placeId.split(".");
	var x = parseInt(placeState[1]);
	var y = parseInt(placeState[2]);
	if((clickCount % 2) != 0) {
		var a = 0;
		for(var i = (x - 1); i < (x + 2); i++) {
			for(var j = (y - 1); j < (y + 2); j++) {
				a++;
				try {
					// alert(boardState[i - 1][j - 1]);
					if(boardState[i - 1][j - 1] == 2) {
						var n = 2;
						var b = true;
						switch(a) {
							case 1:
								while(b) {
									try {
										if(boardState[i + (n - 5)][j - (n - 1)] == 1) {
											reversiblePiecesX.push(i - (n - 1));
											reversiblePiecesY.push(j - (n - 1));
											b = false;
										} else if(boardState[i + (n - 5)][j - (n - 1)] == 0) {
											b = false;
										} else {
											n++;
										}
									} catch(e){}
								}
							break;
							case 2:
								while(b) {
									try {
										alert(boardState[i + (n - 3)][j - 1]);
										alert(i + (n - 3));
										alert(j - 1);
										if(boardState[i + (n - 3)][j - 1] == 1) {
											reversiblePiecesX.push(i - (n - 1));
											reversiblePiecesY.push(j - (n - 1));
											b = false;
										} else if(boardState[i + (n - 3)][j - 1] == 0) {
											b = false;
										} else {
											n++;
										}
									} catch(e){}
								}
							break;
							case 3:
								while(b) {
									try {
										if(boardState[i + (n - 5)][j + (n - 3)] == 1) {
											reversiblePiecesX.push(i - (n - 1));
											reversiblePiecesY.push(j - (n - 1));
											b = false;
										} else if(boardState[i + (n - 5)][j + (n - 3)] == 0) {
											b = false;
										} else {
											n++;
										}
									} catch(e){}
								}
							break;
							case 4:
								while(b) {
									try {
										if(boardState[i - 1][j - (n - 1)] == 1) {
											reversiblePiecesX.push(i - (n - 1));
											reversiblePiecesY.push(j - (n - 1));
											b = false;
										} else if(boardState[i - 1][j - (n - 1)] == 0) {
											b = false;
										} else {
											n++;
										}
									} catch(e){}
								}
							break;
							case 6:
								while(b) {
									try {
										if(boardState[i - 1][j + (n - 3)] == 1) {
											reversiblePiecesX.push(i - (n - 1));
											reversiblePiecesY.push(j - (n - 1));
											b = false;
										} else if(boardState[i - 1][j + (n - 3)] == 0) {
											b = false;
										} else {
											n++;
										}
									} catch(e){}
								}
							break;
							case 7:
								while(b) {
									try {
										if(boardState[i + (n - 3)][j - (n - 1)] == 1) {
											reversiblePiecesX.push(i - (n - 1));
											reversiblePiecesY.push(j - (n - 1));
											b = false;
										} else if(boardState[i + (n - 3)][j - (n - 1)] == 0) {
											b = false;
										} else {
											n++;
										}
									} catch(e){}
								}
							break;
							case 8:
								while(b) {
									try {
										if(boardState[i + (n - 3)][j - 1] == 1) {
											reversiblePiecesX.push(i - (n - 1));
											reversiblePiecesY.push(j - (n - 1));
											b = false;
										} else if(boardState[i + (n - 2)][j - 1] == 0) {
											b = false;
										} else {
											n++;
										}
									} catch(e){}
								}
							break;
							case 9:
								while(b) {
									try {
										if(boardState[i + (n - 3)][j + (n - 3)] == 1) {
											reversiblePiecesX.push(i - (n - 1));
											reversiblePiecesY.push(j - (n - 1));
											b = false;
										} else if(boardState[i + (n - 3)][j + (n - 3)] == 0) {
											b = false;
										} else {
											n++;
										}
									} catch(e){}
								}
							break;
						}

					}
				} catch(e) {}
			}
		}
	} else {
		var a = 0;
		for(var i = (x - 1); i < (x + 2); i++) {
			for(var j = (y - 1); j < (y + 2); j++) {
				a++;
				try {
					// alert(boardState[i - 1][j - 1]);
					if(boardState[i - 1][j - 1] == 1) {
						var n = 2;
						var b = true;
						switch(a) {
							case 1:
								while(b) {
									try {
										if(boardState[i + (n - 5)][j - (n - 1)] == 2) {
											reversiblePiecesX.push(i - (n - 1));
											reversiblePiecesY.push(j - (n - 1));
											b = false;
										} else if(boardState[i + (n - 5)][j - (n - 1)] == 0) {
											b = false;
										} else {
											n++;
										}
									} catch(e){}
								}
							break;
							case 2:
								while(b) {
									try {
										if(boardState[i + (n - 5)][j - 1] == 2) {
											reversiblePiecesX.push(i - (n - 1));
											reversiblePiecesY.push(j - (n - 1));
											b = false;
										} else if(boardState[i + (n - 5)][j - 1] == 0) {
											b = false;
										} else {
											n++;
										}
									} catch(e){}
								}
							break;
							case 3:
								while(b) {
									try {
										if(boardState[i + (n - 5)][j + (n - 3)] == 2) {
											reversiblePiecesX.push(i - (n - 1));
											reversiblePiecesY.push(j - (n - 1));
											b = false;
										} else if(boardState[i + (n - 5)][j + (n - 3)] == 0) {
											b = false;
										} else {
											n++;
										}
									} catch(e){}
								}
							break;
							case 4:
								while(b) {
									try {
										if(boardState[i - 1][j - (n - 1)] == 2) {
											reversiblePiecesX.push(i - (n - 1));
											reversiblePiecesY.push(j - (n - 1));
											b = false;
										} else if(boardState[i - 1][j - (n - 1)] == 0) {
											b = false;
										} else {
											n++;
										}
									} catch(e){}
								}
							break;
							case 6:
								while(b) {
									try {
										if(boardState[i - 1][j + (n - 3)] == 2) {
											reversiblePiecesX.push(i - (n - 1));
											reversiblePiecesY.push(j - (n - 1));
											b = false;
										} else if(boardState[i - 1][j + (n - 3)] == 0) {
											b = false;
										} else {
											n++;
										}
									} catch(e){}
								}
							break;
							case 7:
								while(b) {
									try {
										if(boardState[i + (n - 3)][j - (n - 1)] == 2) {
											reversiblePiecesX.push(i - (n - 1));
											reversiblePiecesY.push(j - (n - 1));
											b = false;
										} else if(boardState[i + (n - 3)][j - (n - 1)] == 0) {
											b = false;
										} else {
											n++;
										}
									} catch(e){}
								}
							break;
							case 8:
								while(b) {
									try {
										if(boardState[i + (n - 3)][j - 1] == 2) {
											reversiblePiecesX.push(i - (n - 1));
											reversiblePiecesY.push(j - (n - 1));
											b = false;
										} else if(boardState[i + (n - 2)][j - 1] == 0) {
											b = false;
										} else {
											n++;
										}
									} catch(e){}
								}
							break;
							case 9:
								while(b) {
									try {
										if(boardState[i + (n - 3)][j + (n - 3)] == 2) {
											reversiblePiecesX.push(i - (n - 1));
											reversiblePiecesY.push(j - (n - 1));
											b = false;
										} else if(boardState[i + (n - 3)][j + (n - 3)] == 0) {
											b = false;
										} else {
											n++;
										}
									} catch(e){}
								}
							break;
						}

					}
				} catch(e) {}
			}
		}
	}
}

// マスをクリックしたときそれが合法な入力か判定する関数
function checkInput() {
	if(reversiblePiecesX.length > 0) {
		return true;
	} else {
		return false;
	}
}

//　合法だったときそこに駒を置く関数
function putPiece(placeId) {
	clickCount++;
	placeState = placeId.split(".");
	if((clickCount % 2) == 0){
		document.getElementById(placeId).childNodes[0].style.display = "flex";
		boardState[parseInt(placeState[1] - 1)][parseInt(placeState[2] - 1)] = 1;
	} else {
		document.getElementById(placeId).childNodes[1].style.display = "flex";
		boardState[parseInt(placeState[1] - 1)][parseInt(placeState[2] - 1)] = 2;
	}
}

// すでに駒が置いてあったらそれ以上置くのを防ぐ関数
function preventionOverlap(placeId) {
	if(
		document.getElementById(placeId).childNodes[0].style.display == "none"
	 && document.getElementById(placeId).childNodes[1].style.display == "none"
	) {
		return true;
	} else {
		return false;
	}
}

// 駒を置いた後挟んだ駒をひっくり返す関数
function reverse() {

}

// パスする関数
function pass() {

}


// //　タイマー関連
var start;
var timer;
var min;
var sec;

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