class HandleScroll {
    constructor(forTouchDevice, forPointingDevice) {
            //デバイス操作を登録
            this.forTouchDevice = forTouchDevice;
            this.forPointingDevice = forPointingDevice;
        }
        // スクロール禁止関数
    _preventScroll(event) {
        event.preventDefault();
    }
    disableScroll() {
        // スクロール禁止
        document.addEventListener(this.forTouchDevice, this._preventScroll, {
            passive: false,
        });
        document.addEventListener(this.forPointingDevice, this._preventScroll, {
            passive: false,
        });
    }
    ableScroll() {
        // スクロール可能
        document.removeEventListener(this.forTouchDevice, this._preventScroll, {
            passive: false,
        });
        document.removeEventListener(this.forPointingDevice, this._preventScroll, {
            passive: false,
        });
    }
}