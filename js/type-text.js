class TypeText {
    constructor(el, text) {
        this.el = el;
        this.text = text;
        this.inputTxt();
    }
    inputTxt() {
        document.querySelector(this.el).textContent = this.text;
    }
}
class TypeHTML {
    constructor(el, text) {
        this.el = el;
        this.text = text;
        this.inputHtml();
    }
    inputHtml() {
        document.querySelector(this.el).innerHTML = this.text;
    }
}