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

    // スクロール禁止関数
    function preventScroll(event) {
        event.preventDefault();
    }

    function disableScroll() {
        // スクロール禁止
        document.addEventListener("touchmove", preventScroll, { passive: false });
        document.addEventListener("mousewheel", preventScroll, { passive: false });
    }

    function ableScroll() {
        // スクロール可能
        document.removeEventListener("touchmove", preventScroll, {
            passive: false,
        });
        document.removeEventListener("mousewheel", preventScroll, {
            passive: false,
        });
    }

    // ハンバーガーメニュー切り替えアニメ
    const nav = document.querySelector(".nav");
    const navButton = document.querySelector(".navButton");
    // ハンバーガーメニューの背景
    const navBg = document.querySelector(".navBg");

    // クリックで該当箇所までスクロール
    document.getElementById("ready").addEventListener("click", () => {
        var setTop = document.getElementById("ready");

        setTop.scrollIntoView({ behavior: "smooth", block: "start" });

        document.getElementById('main_pullDown').classList.add("show");
    });

    // ポップアップ出す
    const doneBtn = document.getElementById("sendSettings");
    const donePopup = document.getElementsByClassName("donePopup");
    const resetBtn = document.getElementById("resetSettings");
    const resetPopup = document.querySelectorAll(".resetPopup");

    // フォーム入力の反映
    var nameElm = document.querySelector("#inputEventText");
    var dateElm = document.querySelector("input[type='date']");
    var timeElm = document.querySelector("input[type='time']");
    var memoElm = document.querySelector("#inputMemo");

    // フォーム値をポップアップに反映
    // イベント名
    nameElm.addEventListener("input", () => {
        document.getElementById("outputName").innerHTML = nameElm.value;
        // 文字が入ったらエラー除去
        if (nameElm.value.length != 0) {
            document.getElementById("nameError").innerHTML = "";
        }
    });

    // 日付反映
    dateElm.addEventListener("input", () => {
        let dateStr = dateElm.value.split("-");
        document.getElementById(
            "outputDateTime"
        ).innerHTML = `${dateStr[0]}年${dateStr[1]}月${dateStr[2]}日<br> ${timeElm.value}`;

        // 文字が入ったらエラー除去
        if (dateElm.value.length != 0) {
            document.getElementById("dateError").innerHTML = "";
        }
    });

    // 時間反映
    timeElm.addEventListener("input", () => {
        let dateStr = dateElm.value.split("-");
        document.getElementById(
            "outputDateTime"
        ).innerHTML = `${dateStr[0]}年${dateStr[1]}月${dateStr[2]}日<br> ${timeElm.value}`;

        // 文字が入ったらエラー除去
        if (memoElm.value.length != 0) {
            document.getElementById("timeError").innerHTML = "";
        }
    });

    // メモ反映
    memoElm.addEventListener("input", () => {
        document.getElementById("outputMemo").innerHTML = memoElm.value;
    });

    // done押した時
    doneBtn.addEventListener("click", () => {
        // スクロール禁止
        disableScroll();

        // 入力がないときはエラーを返す
        if (
            nameElm.value.length !== 0 &&
            dateElm.value.length !== 0 &&
            timeElm.value.length !== 0
        ) {
            var i = 0;
            while (i < 2) {
                donePopup[i].classList.add("show");
                i++;
            }
        }
        if (nameElm.value === "") {
            document.getElementById("nameError").innerHTML =
                "イベントを入力してください";
            // スクロール可能
            ableScroll();
        }
        if (dateElm.value === "") {
            document.getElementById("dateError").innerHTML = "日付を入力してください";
            // スクロール可能
            ableScroll();
        }
        if (timeElm.value == "") {
            document.getElementById("timeError").innerHTML = "時間を入力してください";
            // スクロール可能
            ableScroll();
        }
    });

    // done-yesの時
    const doneOK = document.querySelector(".doneOK");
    const cDownNum = document.getElementById('_time_num');
    const innerName = document.querySelector('._name_inner');
    const innerMemo = document.querySelector('._memo_text');
    const cDownCard = document.querySelector("#main_cDown");
    // タイマー開始！
    doneOK.addEventListener('click', () => {

        ableScroll();

        var setTop = document.getElementById("sendOrReset");
        setTop.scrollIntoView({ behavior: "smooth", block: "start" });

        var i = 0;
        while (i < 2) {
            donePopup[i].classList.remove("show");
            i++;
        }
        // カウントダウ開く
        cDownCard.classList.add('is-open');

        // イベント名表示
        innerName.innerHTML = nameElm.value;

        let yourDate = new Date(dateElm.value);

        const yTimeStr = timeElm.value.split(':');
        const hourToMSec = yTimeStr[0] * 60 * 60 * 1000;
        const minToMSec = yTimeStr[1] * 60 * 1000;

        let yourTimeStamp = yourDate.setDate(yourDate.getDate()) + hourToMSec + minToMSec;
        // カウントダウン関数
        const countdown = (due) => {
            // 残り時間
            const now = new Date();
            const rest = due - now;
            const sec = Math.floor(rest / 1000) % 60;
            const min = Math.floor(rest / 1000 / 60) % 60;
            const hours = Math.floor(rest / 1000 / 60 / 60) % 24;
            const days = Math.floor(rest / 1000 / 60 / 60 / 24);
            const count = [days, hours, min, sec];
            if (rest > 0) {
                return count;
            } else {
                cDownNum.innerHTML = '<span class="is-passed">予定を過ぎました。新しく予定を作成するか、正確な予定を設定してください。</span>';
            }
        }

        // 目標時間の設定
        let goal = yourDate;
        goal.setHours(yTimeStr[0]);
        goal.setMinutes(yTimeStr[1]);
        goal.setSeconds(0);

        function recalc() {
            const counter = countdown(goal);
            cDownNum.innerHTML =
                `${counter[0]}日${counter[1]}時間${String(counter[2]).padStart(2, '0')}分${String(counter[3]).padStart(2, '0')}秒`
            refresh();
        }

        function refresh() {
            setTimeout(recalc, 1000);
        }
        recalc();
        // 
        // メモ表示
        innerMemo.innerHTML = memoElm.value;
        if (memoElm.value === "") {
            innerMemo.innerHTML = "なし";
        }
    });

    // done-noの時
    const doneCanc = document.querySelector(".doneCanc");

    doneCanc.addEventListener("click", () => {
        // スクロール可能
        ableScroll();

        var i = 0;
        while (i < 2) {
            donePopup[i].classList.remove("show");
            i++;
        }
    });

    resetBtn.addEventListener("click", () => {
        // スクロール禁止
        disableScroll();

        var i = 0;
        while (i < 2) {
            resetPopup[i].classList.add("show");
            i++;
        }
    });
    // reset-yesの時
    // フォームクリア
    document.querySelector(".resetOK").addEventListener("click", () => {
        // スクロール可能
        ableScroll();

        var i = 0;
        while (i < 2) {
            resetPopup[i].classList.remove("show");
            i++;
        }
        // テキストを空に
        nameElm.value = "";
        document.getElementById("outputName").innerHTML = "";
        dateElm.value = "";
        timeElm.value = "";
        document.getElementById("outputDateTime").innerHTML = "";
        memoElm.value = "";
        document.getElementById("outputMemo").innerHTML = "";
    });

    // reset-noの時
    const resetCanc = document.querySelector(".resetCanc");

    resetCanc.addEventListener("click", () => {
        // スクロール可能
        ableScroll();
        var i = 0;
        while (i < 2) {
            resetPopup[i].classList.remove("show");
            i++;
        }
    });

    const restart = document.querySelector('._restart_btn');

    restart.addEventListener('click', () => {
        cDownCard.classList.remove('is-open');
        innerName.innerHTML = "";
        cDownNum.innerHTML = "";
        innerMemo.innerHTML = "";

        var setTop = document.getElementById("ready");
        setTop.scrollIntoView({ behavior: "smooth", block: "start" });
    })

    // ポップアップ出すここまで
});