//スクロール途中でヘッダーが消え、上にスクロールすると復活する設定を関数にまとめる
class ScrollAnime {
    constructor(el, up, down) {
        this.el = document.querySelector(el);
        this.up = up;
        this.down = down;
    }
    _scrollAnime() {
        var beforePos = 0; //スクロールの値の比較用の設定
        var rect = document.body.getBoundingClientRect();
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var elemTop = rect.top + scrollTop; //#area-2の位置まできたら
        var scroll = $(window).scrollTop();
        //ヘッダーの出し入れをする
        if (scroll == beforePos) {
            //IE11対策で処理を入れない
        } else if (elemTop > scroll || 0 > scroll - beforePos) {
            //ヘッダーが上から出現する
            this.el.classList.remove(this.up);
            this.el.classList.add(this.down);
        } else {
            this.el.classList.remove(this.down);
            this.el.classList.add(this.up);
        }
        scroll = beforePos;
    }
}