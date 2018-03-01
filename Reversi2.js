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
var reversiblePiecesX = [];
var reversiblePiecesY = [];

// 初期化
function initialize() {
	draw_board();
	set_four_piece();
}

// ボードを描写
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
	show_turn();
	if(check(placeId) && explore(placeId)) {
		clickCount++;
		set(placeId);
		
	}
}

// クリックが合法な入力か判定する関数
function check(placeId) {
	if(prevention_overlap(placeId)){
		return true;
	}
}

// すでにコマが置いてあるところをクリックしたとき入力を無視する関数
function prevention_overlap(placeId) {
	if(
		document.getElementById(placeId).childNodes[0].style.display == "none"
	 && document.getElementById(placeId).childNodes[1].style.display == "none"
	) {
		return true;
	} else {
		return false;
	}
}

var reversiblePiecesX = [];
var reversiblePiecesY = [];
// 反転可能なコマを探す関数
function explore(placeId) {
	placeState = placeId.split(".");
	var x = parseInt(placeState[1]);
	var y = parseInt(placeState[2]);
	if(checkNext(x, y)) {
		return true;
	}
}

// クリックした場所の隣の状態を判定する関数
function checkNext(x, y) {
	var true_direction = [];
	// 今黒と白とどっちのターンか把握
	// 白
	if((clickCount % 2) != 0) {
		// 一個となりを判定
		for(var n = 0; n < 9; n++) {
			if(n == 4) {
				continue;
			}
			switch(n) {
				case 0:
					var x_dush = x;
					var y_dush = y;
					x_dush--;
					y_dush--;
					if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 1) {
						// 不正な入力。同じ色の隣とか隣に何もないとこにはおけない
						continue;
					} else if(boardState[x_dush][y_dush] == 2) {
						// もう一個となりを調べる
						true_direction.push(n);
	
					}
				break;
				case 1:
					var x_dush = x;
					var y_dush = y;
					x_dush--;
					if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 1) {
						// 不正な入力。同じ色の隣とか隣に何もないとこにはおけない
						continue;
					} else if(boardState[x_dush][y_dush] == 2) {
						// もう一個となりを調べる
						true_direction.push(n);
					}
				break;
				case 2:
					var x_dush = x;
					var y_dush = y;
					x_dush--;
					y_dush++;
					if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 1) {
						// 不正な入力。同じ色の隣とか隣に何もないとこにはおけない
						continue;
					} else if(boardState[x_dush][y_dush] == 2) {
						// もう一個となりを調べる
						true_direction.push(n);
					}
				break;
				case 3:
					var x_dush = x;
					var y_dush = y;
					y_dush--;
					if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 1) {
						// 不正な入力。同じ色の隣とか隣に何もないとこにはおけない
						continue;
					} else if(boardState[x_dush][y_dush] == 2) {
						// もう一個となりを調べる
						true_direction.push(n);
					}
				break;
				case 5:
					var x_dush = x;
					var y_dush = y;
					y_dush++;
					if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 1) {
						// 不正な入力。同じ色の隣とか隣に何もないとこにはおけない
						continue;
					} else if(boardState[x_dush][y_dush] == 2) {
						// もう一個となりを調べる
						true_direction.push(n);
					}
				break;
				case 6:
					var x_dush = x;
					var y_dush = y;
					x_dush++;
					y_dush--;
					if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 1) {
						// 不正な入力。同じ色の隣とか隣に何もないとこにはおけない
						continue;
					} else if(boardState[x_dush][y_dush] == 2) {
						// もう一個となりを調べる
						true_direction.push(n);
					}
				break;
				case 7:
					var x_dush = x;
					var y_dush = y;
					x_dush++;
					if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 1) {
						// 不正な入力。同じ色の隣とか隣に何もないとこにはおけない
						continue;
					} else if(boardState[x_dush][y_dush] == 2) {
						// もう一個となりを調べる
						true_direction.push(n);
					}
				break;
				case 8:
					var x_dush = x;
					var y_dush = y;
					x_dush++;
					y_dush++;
					if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 1) {
						// 不正な入力。同じ色の隣とか隣に何もないとこにはおけない
						continue;
					} else if(boardState[x_dush][y_dush] == 2) {
						// もう一個となりを調べる
						true_direction.push(n);
					}
				break;
			}
		}
	// 黒
	} else if((clickCount % 2) == 0) {
		for(var n = 0; n < 9; n++) {
			if(n == 4) {
				continue;
			}
			switch(n) {
				case 0:
					var x_dush = x;
					var y_dush = y;
					x_dush--;
					y_dush--;
					if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 2) {
						// 不正な入力。同じ色の隣とか隣に何もないとこにはおけない
						continue;
					} else if(boardState[x_dush][y_dush] == 1) {
						// もう一個となりを調べる
						true_direction.push(n);
					}
				break;
				case 1:
					var x_dush = x;
					var y_dush = y;
					x_dush--;
					if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 2) {
						// 不正な入力。同じ色の隣とか隣に何もないとこにはおけない
						continue;
					} else if(boardState[x_dush][y_dush] == 1) {
						// もう一個となりを調べる
						true_direction.push(n);
					}
				break;
				case 2:
					var x_dush = x;
					var y_dush = y;
					x_dush--;
					y_dush++;
					if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 2) {
						// 不正な入力。同じ色の隣とか隣に何もないとこにはおけない
						continue;
					} else if(boardState[x_dush][y_dush] == 1) {
						// もう一個となりを調べる
						true_direction.push(n);
					}
				break;
				case 3:
					var x_dush = x;
					var y_dush = y;
					y_dush--;
					if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 2) {
						// 不正な入力。同じ色の隣とか隣に何もないとこにはおけない
						continue;
					} else if(boardState[x_dush][y_dush] == 1) {
						// もう一個となりを調べる
						true_direction.push(n);
					}
				break;
				case 5:
					var x_dush = x;
					var y_dush = y;
					y_dush++;
					if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 2) {
						// 不正な入力。同じ色の隣とか隣に何もないとこにはおけない
						continue;
					} else if(boardState[x_dush][y_dush] == 1) {
						// もう一個となりを調べる
						true_direction.push(n);
					}
				break;
				case 6:
					var x_dush = x;
					var y_dush = y;
					x_dush++;
					y_dush--;
					if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 2) {
						// 不正な入力。同じ色の隣とか隣に何もないとこにはおけない
						continue;
					} else if(boardState[x_dush][y_dush] == 1) {
						// もう一個となりを調べる
						true_direction.push(n);
					}
				break;
				case 7:
					var x_dush = x;
					var y_dush = y;
					x_dush++;
					if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 2) {
						// 不正な入力。同じ色の隣とか隣に何もないとこにはおけない
						continue;
					} else if(boardState[x_dush][y_dush] == 1) {
						// もう一個となりを調べる
						true_direction.push(n);
					}
				break;
				case 8:
					var x_dush = x;
					var y_dush = y;
					x_dush++;
					y_dush++;
					if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 2) {
						// 不正な入力。同じ色の隣とか隣に何もないとこにはおけない
						continue;
					} else if(boardState[x_dush][y_dush] == 1) {
						// もう一個となりを調べる
						true_direction.push(n);
					}
				break;
			}
		}
	}
	if(checkOverNext(true_direction, x, y)) {
		return true;
	} else {
		return false;
	}
}

// クリックした場所の二個以上隣の状態を判定する関数
function checkOverNext(true_direction, x, y) {
	// 今黒と白とどっちのターンか把握
	// 白
	if((clickCount % 2) != 0) {
		for(var n = 0; n < true_direction.length; n++) {
			if(n == 4) {
				continue;
			}
			// 2個以上となりを判定
			switch(true_direction[n]) {
				case 0:
					var x_dush = x;
					var y_dush = y;
					var isloop = true;
					var count = 2;
					while(isloop) {
						var x_dush = x_dush - count;
						var y_dush = y_dush - count;
						if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 1) {
							isloop = false;
							return true;
						} else if(boardState[x_dush][y_dush] == 2) {
							count++;
						}
					}
				break
				case 1:
					var x_dush = x;
					var y_dush = y;
					var isloop = true;
					var count = 2;
					while(isloop) {
						var x_dush = x_dush - count;
						if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 1) {
							isloop = false;
							return true;
						} else if(boardState[x_dush][y_dush] == 2) {
							count++;
						}
					}
				break
				case 2:
					var x_dush = x;
					var y_dush = y;
					var isloop = true;
					var count = 2;
					while(isloop) {
						var x_dush = x_dush - count;
						var y_dush = y_dush + count;
						if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 1) {
							isloop = false;
							return true;
						} else if(boardState[x_dush][y_dush] == 2) {
							count++;
						}
					}
				break
				case 3:
					var x_dush = x;
					var y_dush = y;
					var isloop = true;
					var count = 2;
					while(isloop) {
						var y_dush = y_dush - count;
						if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 1) {
							isloop = false;
							return true;
						} else if(boardState[x_dush][y_dush] == 2) {
							count++;
						}
					}
				break
				case 5:
					var x_dush = x;
					var y_dush = y;
					var isloop = true;
					var count = 2;
					while(isloop) {
						var y_dush = y_dush + count;
						if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 1) {
							isloop = false;
							return true;
						} else if(boardState[x_dush][y_dush] == 2) {
							count++;
						}
					}
				break
				case 6:
					var x_dush = x;
					var y_dush = y;
					var isloop = true;
					var count = 2;
					while(isloop) {
						var x_dush = x_dush + count;
						var y_dush = y_dush - count;
						if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 1) {
							isloop = false;
							return true;
						} else if(boardState[x_dush][y_dush] == 2) {
							count++;
						}
					}
				break
				case 7:
					var x_dush = x;
					var y_dush = y;
					var isloop = true;
					var count = 2;
					while(isloop) {
						var x_dush = x_dush + count;
						if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 1) {
							isloop = false;
							return true;
						} else if(boardState[x_dush][y_dush] == 2) {
							count++;
						}
					}
				break
				case 8:
					var x_dush = x;
					var y_dush = y;
					var isloop = true;
					var count = 2;
					while(isloop) {
						var x_dush = x_dush + count;
						var y_dush = y_dush + count;
						if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 1) {
							isloop = false;
							return true;
						} else if(boardState[x_dush][y_dush] == 2) {
							count++;
						}
					}
				break
			}
		}
	// 黒
	} else if((clickCount % 2) == 0) {
		for(var n = 0; n < true_direction.length; n++) {
			if(n == 4) {
				continue;
			}
			// 2個以上となりを判定
			switch(true_direction[n]) {
				case 0:
					var x_dush = x;
					var y_dush = y;
					var isloop = true;
					var count = 2;
					while(isloop) {
						var x_dush = x_dush - count;
						var y_dush = y_dush - count;
						if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 2) {
							isloop = false;
							return true;
						} else if(boardState[x_dush][y_dush] == 1) {
							count++;
						}
					}
				break
				case 1:
					var x_dush = x;
					var y_dush = y;
					var isloop = true;
					var count = 2;
					while(isloop) {
						var x_dush = x_dush - count;
						if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 2) {
							isloop = false;
							return true;
						} else if(boardState[x_dush][y_dush] == 1) {
							count++;
						}
					}
				break
				case 2:
					var x_dush = x;
					var y_dush = y;
					var isloop = true;
					var count = 2;
					while(isloop) {
						var x_dush = x_dush - count;
						var y_dush = y_dush + count;
						if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 2) {
							isloop = false;
							return true;
						} else if(boardState[x_dush][y_dush] == 1) {
							count++;
						}
					}
				break
				case 3:
					var x_dush = x;
					var y_dush = y;
					var isloop = true;
					var count = 2;
					while(isloop) {
						var y_dush = y_dush - count;
						if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 2) {
							isloop = false;
							return true;
						} else if(boardState[x_dush][y_dush] == 1) {
							count++;
						}
					}
				break
				case 5:
				var x_dush = x;
		var y_dush = y;
					var isloop = true;
					var count = 2;
					while(isloop) {
						var y_dush = y_dush + count;
						if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 2) {
							isloop = false;
							return true;
						} else if(boardState[x_dush][y_dush] == 1) {
							count++;
						}
					}
				break
				case 6:
				var x_dush = x;
		var y_dush = y;
					var isloop = true;
					var count = 2;
					while(isloop) {
						var x_dush = x_dush + count;
						var y_dush = y_dush - count;
						if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 2) {
							isloop = false;
							return true;
						} else if(boardState[x_dush][y_dush] == 1) {
							count++;
						}
					}
				break
				case 7:
					var x_dush = x;
					var y_dush = y;
					var isloop = true;
					var count = 2;
					while(isloop) {
						var x_dush = x_dush + count;
						if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 2) {
							isloop = false;
							return true;
						} else if(boardState[x_dush][y_dush] == 1) {
							count++;
						}
					}
				break
				case 8:
					var x_dush = x;
					var y_dush = y;
					var isloop = true;
					var count = 2;
					while(isloop) {
						var x_dush = x_dush + count;
						var y_dush = y_dush + count;
						if(boardState[x_dush][y_dush] == 0 || boardState[x_dush][y_dush] == 2) {
							isloop = false;
							return true;
						} else if(boardState[x_dush][y_dush] == 1) {
							count++;
						}
					}
				break
			}
		}
	}
}


// コマの操作を行う関数
function set(placeId) {
	placeState = placeId.split(".");
	var x = parseInt(placeState[1]);
	var y = parseInt(placeState[2]);
	if((clickCount % 2) == 0){
		document.getElementById(placeId).childNodes[0].style.display = "flex";
		boardState[x][y] = 1;
	} else {
		document.getElementById(placeId).childNodes[1].style.display = "flex";
		boardState[x][y] = 2;
	}
}

// パスの時の処理を行う関数
function pass() {

}

// コマを反転させる関数
function reverse() {

}

// // ターンを判定する関数
// // この判定を関数でやると呼び出された位置とかでいろいろめんどかったのでその場その場でやるようにしました
// function turn() {
// 	if((clickCount % 2) != 0) {
// 		return "white";
// 	}else {
// 		return "black";
// 	}
// }

// ターンを画面に表示する関数
function show_turn() {
	if((clickCount % 2) == 0){
		document.getElementById('turn').value = "白のターン";
	} else {
		document.getElementById('turn').value = "黒のターン";
	}

}

// 勝ち負けを判定して表示する関数
function result() {

}

// //　AI関連