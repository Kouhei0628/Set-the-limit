'use strict';

function runTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const dayOfWeek = now.getDay();
    const dayOfWeekStr = ["Sun.", "Mon.", "Tue.", "Wed.", "Thur.", "Fri.", "Sut."][dayOfWeek];
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    const padhour = String(hour).padStart(2, '0');
    const padmin = String(min).padStart(2, '0');
    const padsec = String(sec).padStart(2, '0');
    document.getElementById('main_now_countCurrent').innerHTML =
        `
    <p>
    <span>${year}/${month+1}/${date} ( ${dayOfWeekStr} )</span><br> ${padhour}:${padmin}:${padsec}
    </p>
    `;
}
setInterval(runTime, 1000);

$(function() {
    //fadeIn
    $('head').append(
        '<style>body{display:none;}'
    );
    $(window).on("load", () => {
        $('body').fadeIn(600);
        $('#main_now_countCurrent').fadeIn(2000);
    });
    // ロード時
    if ($('#main_now_countCurrent').hasClass('countCurrent')) {
        $('.loader').css('display', 'none');
    }
    // ------------------
    //scrollでヘッダーを出し入れ
    var beforePos = 0; //スクロールの値の比較用の設定

    //スクロール途中でヘッダーが消え、上にスクロールすると復活する設定を関数にまとめる
    function ScrollAnime() {
        var elemTop = $('body').offset().top; //#area-2の位置まできたら
        var scroll = $(window).scrollTop();
        //ヘッダーの出し入れをする
        if (scroll == beforePos) {
            //IE11対策で処理を入れない
        } else if (elemTop > scroll || 0 > scroll - beforePos) {
            //ヘッダーが上から出現する
            $('#header').removeClass('UpMove'); //#headerにUpMoveというクラス名を除き
            $('#header').addClass('DownMove'); //#headerにDownMoveのクラス名を追加
        } else {

            $('#header').removeClass('DownMove'); //#headerにDownMoveというクラス名を除き
            $('#header').addClass('UpMove'); //#headerにUpMoveのクラス名を追加
        }
        scroll = beforePos;
    }
    // 画面をスクロールをしたら動かしたい場合の記述
    $(window).scroll(function() {
        ScrollAnime();
    });

    // ページが読み込まれたらすぐに動かしたい場合の記述
    $(window).on('load', function() {
        ScrollAnime();
    });
    // ------------------------

    // ハンバーガーメニュー切り替えアニメ
    $('#navButton').click(function() {
        if ($(this).hasClass('is-open')) {
            $(this).addClass('is-close');
            $(this).removeClass('is-open');
            $('#nav').addClass('nav-close');
            $('#nav').removeClass('nav-show');
        } else {
            $(this).addClass('is-open');
            $(this).removeClass('is-close');
            $('#nav').addClass('nav-show');
            $('#nav').removeClass('nav-close');
        }
        console.log($(this).hasClass('is-open'));
    });

    // ハンバーガーメニュー出現時に他をクリックしたらメニューが閉じる仕様
    // $(':not(.nav-show)').on('click', () => {
    //     if ($('#nav').hasClass('nav-show')) {
    //         $('.nav-show').remove();
    //     }
    // });

    // クリックで該当箇所までスクロール
    $('#ready').on('click', () => {
        $('#main_pullDown').slideDown(600);
        var setTop = document.getElementById('pullDown_order');
        var position = setTop.getBoundingClientRect();

        window.scrollTo(0, position.top);
    });
});