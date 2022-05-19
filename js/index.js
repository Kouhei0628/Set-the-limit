"use strict";
document.addEventListener("DOMContentLoaded", function() {
    const currentTime = new CurrentTime();
    const scrollAnime = new ScrollAnime("#header", "UpMove", "DownMove");
    // 画面をスクロールをしたら動かしたい場合の記述
    window.scroll(function() {
        scrollAnime();
    });
    // -----
    const handleScroll = new HandleScroll("touchmove", "mousewheel");

    // クリックで該当箇所までスクロール
    document.getElementById("ready").addEventListener("click", () => {
        var setTop = document.getElementById("ready");

        setTop.scrollIntoView({ behavior: "smooth", block: "start" });

        document.getElementById("main_pullDown").classList.add("show");
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
        new TypeText("#outputName", nameElm.value);
        // 文字が入ったらエラー除去
        if (nameElm.value) {
            new TypeText("#nameError", "");
        }
    });

    // 日付反映
    dateElm.addEventListener("input", () => {
        let dateStr = dateElm.value.split("-");
        new TypeHTML(
            "#outputDateTime",
            `${dateStr[0]}年${dateStr[1]}月${dateStr[2]}日<br> ${timeElm.value}`
        );
        // 文字が入ったらエラー除去
        if (dateElm.value) {
            new TypeText("#dateError", "");
        }
    });

    // 時間反映
    timeElm.addEventListener("input", () => {
        let dateStr = dateElm.value.split("-");
        new TypeHTML(
            "#outputDateTime",
            `${dateStr[0]}年${dateStr[1]}月${dateStr[2]}日<br> ${timeElm.value}`
        );
        // 文字が入ったらエラー除去
        if (memoElm.value) {
            new TypeText("#timeError", "");
        }
    });

    // メモ反映
    memoElm.addEventListener("input", () => {
        new TypeText("#outputMemo", memoElm.value);
    });

    // done押した時
    doneBtn.addEventListener("click", () => {
        // スクロール禁止
        handleScroll.disableScroll();

        // 入力がないときはエラーを返す
        if (nameElm.value.length && dateElm.value.length && timeElm.value.length) {
            var i = 0;
            while (i < 2) {
                donePopup[i].classList.add("show");
                i++;
            }
        }
        if (!nameElm.value) {
            new TypeText("#nameError", "イベントを入力してください"); //TypeText(element,text)
            // スクロール可能
            handleScroll.ableScroll();
        }
        if (!dateElm.value) {
            new TypeText("#dateError", "日付を入力してください");
            // スクロール可能
            handleScroll.ableScroll();
        }
        if (!timeElm.value) {
            new TypeText("#timeError", "時間を入力してください");
            // スクロール可能
            handleScroll.ableScroll();
        }
    });
    // done-yesの時
    const doneOK = document.querySelector(".doneOK");
    const cDownNum = document.getElementById("_time_num");
    const innerName = document.querySelector("._name_inner");
    const innerMemo = document.querySelector("._memo_text");
    const cDownCard = document.querySelector("#main_cDown");

    // タイマー開始！
    doneOK.addEventListener("click", () => {
        innerName.textContent = "";
        cDownNum.textContent = "";
        innerMemo.textContent = "";
        handleScroll.ableScroll();

        var setTop = document.getElementById("sendOrReset");
        setTop.scrollIntoView({ behavior: "smooth", block: "start" });

        var i = 0;
        while (i < 2) {
            donePopup[i].classList.remove("show");
            i++;
        }
        // カウントダウ開く
        cDownCard.classList.add("is-open");

        // イベント名表示
        innerName.textContent = nameElm.value;

        let yourDate = new Date(dateElm.value);

        const yTimeStr = timeElm.value.split(":");

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
                cDownNum.innerHTML =
                    '<span class="is-passed">予定を過ぎました。新しく予定を作成するか、正確な予定を設定してください。</span>';
            }
        };

        // 目標時間の設定
        let goal = yourDate;
        goal.setHours(yTimeStr[0]);
        goal.setMinutes(yTimeStr[1]);
        goal.setSeconds(0);

        function recalc() {
            const counter = countdown(goal);
            cDownNum.textContent = `${counter[0]}日${counter[1]}時間${String(
        counter[2]
      ).padStart(2, "0")}分${String(counter[3]).padStart(2, "0")}秒`;
            refresh();
        }

        function refresh() {
            setTimeout(recalc, 1000);
        }
        recalc();
        //
        // メモ表示
        innerMemo.textContent = memoElm.value;
        if (!memoElm.value) {
            innerMemo.textContent = "なし";
        }
    });

    // done-noの時
    const doneCanc = document.querySelector(".doneCanc");

    doneCanc.addEventListener("click", () => {
        // スクロール可能
        handleScroll.ableScroll();

        var i = 0;
        while (i < 2) {
            donePopup[i].classList.remove("show");
            i++;
        }
    });

    resetBtn.addEventListener("click", () => {
        // スクロール禁止
        handleScroll.disableScroll();

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
        handleScroll.ableScroll();

        var i = 0;
        while (i < 2) {
            resetPopup[i].classList.remove("show");
            i++;
        }
        // テキストを空に
        nameElm.value = "";
        new TypeText("#outputName", "");
        dateElm.value = "";
        timeElm.value = "";
        new TypeText("#outputDateTime", "");
        memoElm.value = "";
        new TypeText("#outputMemo", "");
    });

    // reset-noの時
    const resetCanc = document.querySelector(".resetCanc");

    resetCanc.addEventListener("click", () => {
        // スクロール可能
        handleScroll.ableScroll();
        var i = 0;
        while (i < 2) {
            resetPopup[i].classList.remove("show");
            i++;
        }
    });

    const restart = document.querySelector("._restart_btn");

    restart.addEventListener("click", () => {
        cDownCard.classList.remove("is-open");
        innerName.textContent = "";
        cDownNum.textContent = "";
        innerMemo.textContent = "";

        var setTop = document.getElementById("ready");
        setTop.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});