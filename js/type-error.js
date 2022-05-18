class TypeErrorText {
    constructor(el, text) {
        this.el = el;
        this.text = text;
        this.input();
    }
    input() {
        document.querySelector(this.el).textContent = this.text;
    }
}