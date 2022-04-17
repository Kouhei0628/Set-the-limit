"use strict";

function runTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const dayOfWeek = now.getDay();
    const dayOfWeekStr = [
        "Sun.",
        "Mon.",
        "Tue.",
        "Wed.",
        "Thur.",
        "Fri.",
        "Sut.",
    ][dayOfWeek];
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    const padhour = String(hour).padStart(2, "0");
    const padmin = String(min).padStart(2, "0");
    const padsec = String(sec).padStart(2, "0");
    document.getElementById("main_now_countCurrent").innerHTML = `
    <p>
    <span>${year}/${
    month + 1
  }/${date} ( ${dayOfWeekStr} )</span><br> ${padhour}:${padmin}:${padsec}
    </p>
    `;
}
setInterval(runTime, 1000);

$(function() {
    //scrollでヘッダーを出し入れ
    var beforePos = 0; //スクロールの値の比較用の設定

    //スクロール途中でヘッダーが消え、上にスクロールすると復活する設定を関数にまとめる
    function ScrollAnime() {
        var rect = document.body.getBoundingClientRect();
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var elemTop = rect.top + scrollTop; //#area-2の位置まできたら
        var scroll = $(window).scrollTop();
        //ヘッダーの出し入れをする
        if (scroll == beforePos) {
            //IE11対策で処理を入れない
        } else if (elemTop > scroll || 0 > scroll - beforePos) {
            //ヘッダーが上から出現する
            document.getElementById("header").classList.remove("UpMove"); //#headerにUpMoveというクラス名を除き
            document.getElementById("header").classList.add("DownMove"); //#headerにDownMoveのクラス名を追加
        } else {
            document.getElementById("header").classList.remove("DownMove"); //#headerにDownMoveというクラス名を除き
            document.getElementById("header").classList.add("UpMove"); //#headerにUpMoveのクラス名を追加
        }
        scroll = beforePos;
    }
    // 画面をスクロールをしたら動かしたい場合の記述
    $(window).scroll(function() {
        ScrollAnime();
    });

    // // ページが読み込まれたらすぐに動かしたい場合の記述
    $(window).on("load", function() {
        ScrollAnime();
    });
    // ------------------------

    function rmNav(event) {
        event.classList.remove("navBg");
    }

    // ハンバーガーメニュー切り替えアニメ
    const nav = document.querySelector(".nav");
    const navButton = document.querySelector(".navButton");
    // ハンバーガーメニューの背景
    const navBg = document.querySelector(".navBg");

    // ハンバーガークリック時
    navButton.addEventListener("click", () => {
        nav.classList.toggle("open");
        navButton.classList.toggle("open");
        navBg.classList.toggle("open");
    });

    // ナビゲーションの背景クリック時の動作
    navBg.addEventListener("click", () => {
        navBg.classList.remove("open");
        nav.classList.remove("open");
        navButton.classList.remove("open");
    });

    // クリックで該当箇所までスクロール
    document.getElementById("ready").addEventListener("click", () => {
        var setTop = document.getElementById("main_pullDown");
        var position = setTop.scrollTop;

        setTop.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });

        setTop.classList.add("show");
    });

    // フォーム入力の反映
    const nameElm = document.querySelector("#inputEventText");
    const dateElm = document.querySelector("#inputEventDate");
    const timeElm = document.querySelector("#inputEventTime");
    const memoElm = document.querySelector("#inputMemo");

    const nameVal = nameElm.value;
    const dateVal = dateElm.value;
    const timeVal = timeElm.value;
    const memoVal = memoElm.value;

    nameElm.addEventListener("input", () => {
        document.getElementById("outputName").innerHTML = nameVal;
        console.log(nameVal);
    });

    // ポップアップ出す
    const doneBtn = document.getElementById("sendSettings");
    const donePopup = document.getElementsByClassName("donePopup");
    const resetBtn = document.getElementById("resetSettings");
    const resetPopup = document.querySelectorAll(".resetPopup");

    doneBtn.addEventListener("click", () => {
        var i = 0;
        while (i < 2) {
            donePopup[i].classList.add("show");
            i++;
        }
    });
    // done-yesの時
    const doneOK = document.querySelector(".doneOK");

    // done-noの時
    const doneCanc = document.querySelector(".doneCanc");

    doneCanc.addEventListener("click", () => {
        var i = 0;
        while (i < 2) {
            donePopup[i].classList.remove("show");
            i++;
        }
    });

    resetBtn.addEventListener("click", () => {
        var i = 0;
        while (i < 2) {
            resetPopup[i].classList.add("show");
            i++;
        }
    });
    // reset-yesの時

    // reset-noの時
    const resetCanc = document.querySelector(".resetCanc");

    resetCanc.addEventListener("click", () => {
        var i = 0;
        while (i < 2) {
            resetPopup[i].classList.remove("show");
            i++;
        }
    });

    // ポップアップ出すここまで

    // ポップアップを取り除く
    const doneBg = document.querySelector(".doneBg");
    const resetBg = document.querySelector(".resetBg");

    // 取り除く関数
    function rmPopup(event) {
        var i = 0;
        while (i < 2) {
            event[i].classList.remove("show");
            i++;
        }
    }

    // 背景クリック時の動作
    doneBg.addEventListener("click", () => {
        rmPopup(donePopup);
    });

    // 背景クリック時の動作
    resetBg.addEventListener("click", () => {
        rmPopup(resetPopup);
    });
});