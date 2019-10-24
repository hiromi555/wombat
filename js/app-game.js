$(function () {

  $('.js-button-hamburger').click(function () {
    $('body').toggleClass('is-active-drower');

    if ($(this).attr('aria-expanded') == 'false') {
      $(this).attr('aria-expanded', true);
    } else {
      $(this).attr('aria-expanded', false);
    }
  });

});
//-------game----------
//スロットゲーム
var spin = document.getElementById('js-spin');
var stop = document.getElementById('js-stop');
var star = document.getElementById('js-star');

var clear = document.getElementById('js-clear')
var pzstart = document.getElementById('pzstart')

function countUp() {
  var resulte = ['/images/images/card1.png', '/images/images/card2.png', '/images/images/card3.png', '/images/images/card4.png']
  var x = Math.floor(Math.random() * resulte.length)
  var y = Math.floor(Math.random() * resulte.length)
  var z = Math.floor(Math.random() * resulte.length)

  var left = document.getElementById('left');
  var center = document.getElementById('center');
  var right = document.getElementById('right');
  left.setAttribute('src', resulte[x]);
  center.setAttribute('src', resulte[y]);
  right.setAttribute('src', resulte[z]);
  var timer = setTimeout(countUp, 100);
  stop.addEventListener('click', function () {
    clearTimeout(timer);
    stop.classList.add('js-active');
    spin.classList.remove('js-active');
    if (x !== y || y !== z) {
      star.classList.add('js-hidden')
    } else {
      star.classList.remove('js-hidden')
    }
  });
}
spin.addEventListener('click', function () {
  countUp();
  spin.classList.add('js-active')
  stop.classList.remove('js-active')
  star.classList.add('js-hidden')
});

//神経衰弱
clear.addEventListener('click', function () {
  window.location.reload();
});
var total = 12;  //カードの枚数
var img = [];
var first = true;  //クリックしたカードが1枚目かどうかの判定用
var card1;  //1枚目に引いたカードの番号
var card2;  //2枚目に引いたカードの番号
var index;
var index1;
var index2;
var pair = 0;  //正解したカードのペア数
var speed = 500

//ura面を開く
function uraOpen(n) {
  $("#card li:eq(" + n + ") img").attr("src", img[n]);
}
//表面を開く
function omoteOpen(j) {
  $("#card li:eq(" + j + ") img").attr("src", "/images/images/card.png");
}

//全てのカードをロック
function lock() {
  $("#card li").addClass("lock");
}
//全てのカードをアンロック
function unlock() {
  $("#card li").removeClass("lock");
}
//選んだ2枚のカードの正否
function compar() {
  if (card1 == card2) {  //2枚が同じカードであれば
    pair++;  //ペア数を1増やす
    if (pair == total / 2) {  //ペアが全て見つかったら
      setTimeout(function () {
        star.classList.remove('js-hidden') //星を表示
      }, speed * 0.5);
    }
  } else {  //2枚が違うカードであれば
    lock() //カードロック
    setTimeout(function () {  //カードをめくる動作が終わった、表にもどす
      omoteOpen(index1)
      omoteOpen(index2)
    }, speed);
  }
}
//ランダムimages配列を作る
for (i = 1; i <= total / 2; i++) {
  img.push("/images/images/card" + i + ".png", "/images/images/card" + i + ".png");
}
//配列の中身をランダムに並び替え
img.sort(function () {
  return Math.random() - Math.random();
});
//画像を表示
$(function () {
  for (i = 1; i <= total; i++) {
    $("#card").append("<li class='omote'><img src='/images/images/card.png'></li>");
  }
  //カードのクリックする
  $("#card li").click(function () {
    star.classList.add('js-hidden')
    index = $("#card li").index(this);  //選択したカードの順番をindexに保存
    unlock()  //カードをアンロック
    $("#card li:eq(" + index + ") img").attr("src", img[index]); //裏面を開く

    if (first == true) {  //選択したカードが1枚目であれば
      index1 = index;  //カードの順番をindex1に保存
      card1 = img[index];  //並び順を基に表面の番号を配列から取り出しcard1に保存
      first = false;  //1枚目かどうかを無効に

    } else {  //二枚目
      lock();  //カードロック
      index2 = index;
      card2 = img[index];
      compar();  //card1とcard2を比べて正否の判定をする関数
      first = true;
      setTimeout(function () {
        unlock();  //カードをアンロック
      }, speed);
    }
  });
});


//pazzle
var pos = [];
var change = false;
//配列posの番号からX座標を返す関数
function posX(n) {
  return n % 4 * -80;
}
//配列posの番号からY座標を返す関数
function posY(n) {
  return Math.floor(n / 4) * -80;
}
//配列posの位置に移動させる関数
function sort() {
  for (i = 0; i < 16; i++) {
    $("#puzzle li#" + i).css({
      "left": -posX(pos[i]) + "px ",
      "top": -posY(pos[i]) + "px"
    });
  }
}

//タイマー処理
function setTimer() {
  var i = 0;
  timer = setInterval(function () {
    i++;
    $("#time").text(i + "秒");
  }, 1000);
}
//判定
function goal() {
  var goal = true;
  for (i = 0; i < 16; i++) {
    if (pos[i] != i) {
      goal = false;
    }
  }
  if (goal) {
    clearInterval(timer);
    star.classList.remove('js-hidden')
  }
}

$(function () {
  //liタグの生成
  for (i = 0; i < 16; i++) {
    pos[i] = i;
    $("<li id='" + i + "'></li>").css("background-position", posX(i) + "px " + posY(i) + "px").appendTo($("#puzzle"));
  }
  sort();

  //スタートボタンクリック
  $("#start").click(function () {
    $("#js-star").addClass('js-hidden');
    pos.sort(function () {
      return Math.random(i) - Math.random(i);
    });	//配列posの中身をシャッフル
    sort();	//配列posの中身に沿ってピースを並び替え
    setTimer();	//タイマーのスタート
  })

  //選択したピースの入れ替え

  $("#puzzle li").click(function () {
    if (!change) {	//1枚目のピース選択時の処理
      $(this).fadeTo(0, 0.3).css("border", "3px solid red");
      no = $(this).attr("id");
      change = true;
    } else {	//2枚目のピース選択時の処理
      $("#puzzle li#" + no).fadeTo(0, 1).css("border", "none");
      var id = $(this).attr("id");
      var replace = pos[no];
      pos[no] = pos[id];
      pos[id] = replace;
      sort();
      change = false;
      goal();
    }

  });
});
