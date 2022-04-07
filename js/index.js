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
        var elemTop = $('#main').offset().top; //#area-2の位置まできたら
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
    // $('#main_now_countCurrent').text(output);
    const navTrue = $('#nav').hasClass('nav-show');
    $('#navButton').on('click', () => {
        $('#nav').toggleClass('nav-show');
        console.log('dd');
        if (navTrue) {
            $('.nav-show').hide();
        } else {
            $('.nav-show').show();
            console.log('ww');
        }
    });

    $(':not(.nav-show)').on('click', () => {
        if (navTrue) {
            $('.nav-show').remove();
            console.log(navTrue);
        }
    });

    $('#closeNav').on('click', () => {
        $('#nav').toggleClass('nav-show');
        if (navTrue) {
            $('#nav').addClass('hideNav');
            $('#nav').removeClass('nav-show');
        }
    });

    $('#ready').on('click', () => {
        $('#ready').fadeOut();
        $('#ready').slideUp(300);
        $('#main_now').slideUp(300);
        $('#main_pullDown').slideDown(300);

        window.scrollTo(0, top);
    });
});