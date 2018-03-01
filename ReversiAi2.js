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
	]; //boardState[y座標][x座標]で指定
var reversibleCellsX = [];
var reversibleCellsY = [];

// 初期化
function initialize() {
	draw_board();
	set_four_piece();
	show_turn();
	countUpPiece();
	showSetable();
}

// ボードを描写
// テーブルをつくって、そこにオンクリックイベントと画像を黒白両方入れておく(cssで表示・非表示切り替える)
function draw_board() {
	var board = document.getElementById('board');
	for(var y = 0; y < 8; y++) {
		var tr = document.createElement('tr');
		for(var x = 0; x < 8; x++) {
			var td = document.createElement('td');
			td.id = "cell." + x + "." + y;
			td.addEventListener('click', function(){
				click(this.id);
			});
			tr.appendChild(td);

			// 白いコマを埋め込む
			var imgW = document.createElement('img');
			imgW.src = "white.png";
			imgW.id = "imgW" + x + y; 
			imgW.style.display = "none";
			td.appendChild(imgW);

			// 黒いコマを埋め込む
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
function set_four_piece() {
	document.getElementById('imgW33').style.display = "flex";
	document.getElementById('imgB43').style.display = "flex";
	document.getElementById('imgB34').style.display = "flex";
	document.getElementById('imgW44').style.display = "flex";
}

// クリックイベントを処理する関数
function click(placeId) {
	if(check(placeId) && turn() == 2) {
		// alert(boardState[0]+"\n"+boardState[1]+"\n"+boardState[2]+"\n"+boardState[3]+"\n"+boardState[4]+"\n"+boardState[5]+"\n"+boardState[6]+"\n"+boardState[7]);
		redraw(placeId);
		if(none == 1) {
			result();
			location.reload();
		}
		clickCount++;
		show_turn();
		showSetable();
		countUpPiece();
		if(turn() == 1) {
			setTimeout("ai();", 1000);
		}
	}
}

// AIのクリックイベントを処理する関数
function clickAi(placeId) {
	if(check(placeId)) {
		// alert(boardState[0]+"\n"+boardState[1]+"\n"+boardState[2]+"\n"+boardState[3]+"\n"+boardState[4]+"\n"+boardState[5]+"\n"+boardState[6]+"\n"+boardState[7]);
		redraw(placeId);
		if(none == 1) {
			result();
			location.reload();
		}
		clickCount++;
		show_turn();
		showSetable();
		countUpPiece();
	} else {
		alert('a');
		ai();
	}
}

// クリックが合法な入力か判定する関数
function check(placeId) {
	// クリックしたとこにコマがなく
	// 上下左右ナナメ方向に敵のコマが置いてあり
	// その先に味方のコマがある
	// という条件を満たしているかチェック
	if(checkSetable() && check_overlap(placeId) && check_reversible(placeId)){
		return true;
	} else {
		return false;
	}
}

// すでにコマが置いてあるところをクリックしたとき入力を無視する関数
function check_overlap(placeId) {
	if(
		document.getElementById(placeId).childNodes[0].style.display == "none"
	 && document.getElementById(placeId).childNodes[1].style.display == "none"
	) {
		return true;
	} else {
		return false;
	}
}
// 上下左右ナナメ方向に敵のコマが置いてあり・その先に味方のコマがあるかどうかをチェックする関数
function check_reversible(placeId) {
	if(countup_reversible(placeId)) {
		return true;
	}
}

// 反転可能なコマを数え上げる関数
function countup_reversible(placeId) {
	// x,y座標を取得
	placeState = placeId.split(".");
	var x = parseInt(placeState[1]);
	var y = parseInt(placeState[2]);
	var player = turn();
	for(var cx = -1; cx <= 1; cx++) {
		for(var cy = -1; cy <= 1; cy++) {
			// alert(cx + "," + cy);
			if(cx == 0 && cy == 0) { 
				continue; //クリックしたマスをスルー
			}
			for(var i = 1; i < boardState.length; i++) {
				var nx = x + i * cx; //上下左右ナナメのマスを調べていく	
				var ny = y + i * cy;
				// alert(nx + "," + ny);
				if (nx < 0 || boardState.length <= nx || ny < 0 || boardState.length <= ny) {
					break;
				}
				var cell = boardState[ny][nx];
				if(cell == player && i >= 2) {
					if(boardState[y + 1 * cy][x + 1 * cx] == player || boardState[y + 1 * cy][x + 1 * cx] == 0) {
						// alert("x: " + (x + 1 * cx) + ",y: " + (y + 1 * cy));
						break;
					}
					var a = 0;
					for(var j = 1; j < i; j++) {
						if(boardState[y + j * cy][x + j * cx] == 0) {
							a++;
						}
					}
					for(var j = 1; j < i; j++) {
						if(a == 0) {
							reversibleCellsX.push([x + j * cx]);
							reversibleCellsY.push([y + j * cy]);
						}
					}
					break;
				}
			}
		}
	}
	if(reversibleCellsX.length > 0 && reversibleCellsY.length > 0) {
		for(var n = 0; n < reversibleCellsX.length; n++) {
			// alert(reversibleCellsX[n] + "," + reversibleCellsY[n]);
		}
		return true;
	}
}

var none = 0;
var reversibleCellsXX = [];
var reversibleCellsYY = [];
// コマがどこかにおけるかチェックする関数
function checkSetable() {
	var setable = 0;
	none = 0;
	for(var i = 0; i < 8; i++) {
		for(var j = 0; j < 8; j++) {
			reversibleCellsX = [];
			reversibleCellsY = [];
			var placeId = createPlaceId(i, j);
			if(countup_reversible(placeId) && boardState[j][i] == 0){
				reversibleCellsXX.push(i);
				reversibleCellsYY.push(j);
				setable++;
			}
			if(boardState[j][i] == 0) {
				none++;
			}
		}
	}
	// alert("setable: " + setable + "none" + none);
	if(none == 0) {
		// result();
	} else if(setable == 0) {
		pass();
	} else {
		reversibleCellsX = [];
		reversibleCellsY = [];
		return true;
	}
}

// おける場所を表示する関数
function showSetable() {
	if(turn() == 2) {
		reversibleCellsXX = [];
		reversibleCellsYY = [];
		checkSetable();
		for(var i = 0; i < reversibleCellsXX.length; i++) {
			var placeId = createPlaceId(reversibleCellsXX[i], reversibleCellsYY[i]);
			document.getElementById(placeId).style.boxShadow = "0px 0px 5px 3px white, 0px 0px 5px 3px white inset";
		}
	}
}

// 上のを消す関数
function deleteSetable() {
	for(var i = 0; i < reversibleCellsXX.length; i++) {
		var placeId = createPlaceId(reversibleCellsXX[i], reversibleCellsYY[i]);
		document.getElementById(placeId).style.boxShadow = "";
	}
}

// 入力に基づいて盤面を書きかえる関数
function redraw(placeId) {
	var player = turn();
	deleteSetable();
	set(placeId, player);
	reverse(placeId, player);
}

// コマを置く関数
function set(placeId, player) {

	placeState = placeId.split(".");
	var x = parseInt(placeState[1]);
	var y = parseInt(placeState[2]);
	if(player == 1){
		document.getElementById(placeId).childNodes[0].style.display = "flex";
		boardState[y][x] = 1;
	} else {
		document.getElementById(placeId).childNodes[1].style.display = "flex";
		boardState[y][x] = 2;
	}
}

// コマを反転させる関数
function reverse(placeId, player) {
	for(var i = 0; i < reversibleCellsX.length; i++) {
		var id = createPlaceId(reversibleCellsX[i], reversibleCellsY[i]);
		if(player == 2) {
			document.getElementById(id).childNodes[1].style.display = "flex";
			document.getElementById(id).childNodes[0].style.display = "none";
			boardState[reversibleCellsY[i]][reversibleCellsX[i]] = player;
		} else {
			document.getElementById(id).childNodes[0].style.display = "flex";
			document.getElementById(id).childNodes[1].style.display = "none";
			boardState[reversibleCellsY[i]][reversibleCellsX[i]] = player;
		}
	}
	reversibleCellsX = [];
	reversibleCellsY = [];
}

// パスの時の処理を行う関数
function pass() {
	alert('pass');
	clickCount++;
	show_turn();
	countUpPiece();
	showSetable();
}


// ターンを判定する関数
function turn() {
	if((clickCount % 2) == 0) {
		return 2; //黒
	}else {
		return 1; //白
	}
}

// ターンを画面に表示する関数
function show_turn() {
	if(turn() == 2){
		document.getElementById('turn').value = "プレイヤーのターン";
	} else {
		document.getElementById('turn').value = "AIのターン";
	}
}

var black = 0;
var white = 0;
// コマ数を毎ターン表示する機能
function countUpPiece() {
	black = 0;
	white = 0;
	for(var i = 0; i < 8; i++) {
		for(var j = 0; j < 8; j++) {
			if(boardState[i][j] == 1) {
				white++;
			} else if(boardState[i][j] == 2) {
				black++;
			}
		}
	}
	if(black == 0 || white == 0) {
		result();
	}
	document.getElementById('piece').value = "AI: " + white + " プレイヤー: " + black; 
}

// 勝ち負けを判定して表示する関数
function result() {
	countUpPiece();
	if(white > black) {
		alert("白の勝ち 白: " + white + "黒: " + black);
	} else if(white == black) {
		alert("引き分け 白: " + white + "黒: " + white);
	} else {
		alert("黒の勝ち 白: " + white + "黒: " + black);
	}
}

// x座標y座標からplaceIdを生成する
function createPlaceId(x, y) {
	return "cell." + x + "." + y;
}	

// 戻る機能、AI、コマをひっくり返すときのエフェクト、チートツール

// ライブラリを使う
$(function() {
  $("#buttonJustForUseLibrary").click(function(){
    alert('jQuery');
  });
});

// ai
function ai() {
	var reversibleCellsXX = [];
	var reversibleCellsYY = [];
	var setable = 0;
	none = 0;
	var reversibleCellsXXMost = [];
	var reversibleCellsYYMost = [];
	var reversibleNum = 0;
	var reversibleNumBest = 0;
	for(var i = 0; i < 8; i++) {
		for(var j = 0; j < 8; j++) {
			reversibleCellsX = [];
			reversibleCellsY = [];
			var placeId = createPlaceId(i, j);
			reversibleNum = countup_reversibleAi(placeId);
			if(reversibleNum > 0 && boardState[j][i] == 0){
				if(reversibleNumBest < reversibleNum || reversibleNumBest == 0) {
					reversibleNumBest = reversibleNum;
					reversibleCellsXXMost.pop();
					reversibleCellsYYMost.pop();
					reversibleCellsXXMost.push(i);
					reversibleCellsYYMost.push(j);
				}
				reversibleCellsXX.push(i);
				reversibleCellsYY.push(j);
				setable++;
			}
			if(boardState[j][i] == 0) {
				none++;
			}
		}
	}
	if(none == 0) {
		// result();
	} else if(setable == 0) {
		pass();
	} else {
		for(var i = 0; i < reversibleCellsYY.length; i++) {
			if((reversibleCellsXX[i] == 0 && reversibleCellsYY[i] == 0) 
				|| (reversibleCellsXX[i] == 0 && reversibleCellsYY[i] == 7)
				|| (reversibleCellsXX[i] == 7 && reversibleCellsYY[i] == 0)
				|| (reversibleCellsXX[i] == 7 && reversibleCellsYY[i] == 7)
			) {
				var id = createPlaceId(reversibleCellsXX[i], reversibleCellsYY[i]);
			}
		}
		if(id == null) {
			// alert(reversibleNumBest);
			var id = createPlaceId(reversibleCellsXXMost[0], reversibleCellsYYMost[0]);
		}
		clickAi(id);
	}
}

// 反転可能なコマを数え上げる関数(Ai仕様)
function countup_reversibleAi(placeId) {
	// x,y座標を取得
	placeState = placeId.split(".");
	var x = parseInt(placeState[1]);
	var y = parseInt(placeState[2]);
	var player = turn();
	for(var cx = -1; cx <= 1; cx++) {
		for(var cy = -1; cy <= 1; cy++) {
			// alert(cx + "," + cy);
			if(cx == 0 && cy == 0) { 
				continue; //クリックしたマスをスルー
			}
			for(var i = 1; i < boardState.length; i++) {
				var nx = x + i * cx; //上下左右ナナメのマスを調べていく	
				var ny = y + i * cy;
				// alert(nx + "," + ny);
				if (nx < 0 || boardState.length <= nx || ny < 0 || boardState.length <= ny) {
					break;
				}
				var cell = boardState[ny][nx];
				if(cell == player && i >= 2) {
					if(boardState[y + 1 * cy][x + 1 * cx] == player || boardState[y + 1 * cy][x + 1 * cx] == 0) {
						// alert("x: " + (x + 1 * cx) + ",y: " + (y + 1 * cy));
						break;
					}
					var a = 0;
					for(var j = 1; j < i; j++) {
						if(boardState[y + j * cy][x + j * cx] == 0) {
							a++;
						}
					}
					for(var j = 1; j < i; j++) {
						if(a == 0) {
							reversibleCellsX.push([x + j * cx]);
							reversibleCellsY.push([y + j * cy]);
						}
					}
					break;
				}
			}
		}
	}
	if(reversibleCellsX.length > 0 && reversibleCellsY.length > 0) {
		for(var n = 0; n < reversibleCellsX.length; n++) {
			// alert(reversibleCellsX[n] + "," + reversibleCellsY[n]);
		}
		return reversibleCellsY.length;
	}
}