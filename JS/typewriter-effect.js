export default class TypeWriterEffect {

    constructor(htmlElem, text, { ms = 100, cursorColor = "rgb(255,255,255)", wait = 3000, blinkStop = true } = {}) {

        if (htmlElem instanceof HTMLElement) {
            this.htmlElem = htmlElem;
        } else {
            throw new Error("No HTMLElement provided");
        }

        if (typeof (text) == "string" && text.length > 0) {
            this.text = text;
        } else {
            throw new Error("No text provided");
        }

        if (typeof (ms) == "number" && ms > 0) {
            this.ms = ms;
        } else {
            throw new Error("Milliseconds must be a positive number");
        }

        this.cursorColor = cursorColor;
        this.blinkStop = blinkStop;
        this.wait = wait;

        this.count = 0;

        this.cursorClassName = `typewriter-cursor-${TypeWriterEffect.noOfInstances}`;
        this.animationName = `blink-caret-${TypeWriterEffect.noOfInstances}`;

        TypeWriterEffect.noOfInstances += 1;

        TypeWriterEffect.creteCSS(`.${this.cursorClassName}{border-right: 0.15em solid #fff;animation:${this.animationName} 1s step-end infinite;}@keyframes ${this.animationName}{from,to{border-color:transparent}50%{border-color:${this.cursorColor}}}`);
    }

    static creteCSS(cssString) {
        const st = document.createElement('style');
        st.type = 'text/css';
        st.innerHTML = cssString;
        document.getElementsByTagName('head')[0].appendChild(st);
    }

    startTyping() {

        return new Promise((resolve) => {
            this.para = document.createElement('p');
            this.para.className = `typewriter-format ${this.cursorClassName}`;
            this.htmlElem.appendChild(this.para);

            setTimeout(this.__setText, this.ms, () => {
                if (this.blinkStop) {
                    if (this.wait > 0) setTimeout(this.__stopCursor, this.wait, resolve);
                    else this.__stopCursor(resolve);
                }
            });
        }).catch(console.error);
    }

    __setText = (callback) => {
        this.para.textContent = this.text.substring(0, this.count = this.count + 1);
        this.count < this.text.length ? setTimeout(this.__setText, this.ms, callback) : callback();
    }

    __stopCursor = (callback) => {
        this.para.className = "typewriter-format";
        callback();
    }
}

(function __init() {
    TypeWriterEffect.creteCSS('.typewriter-format{padding:0;margin:0;line-height:inherit;font-size:inherit;overflow:hidden;border-right: 0.15em solid transparent;}');
    TypeWriterEffect.noOfInstances = 0;
})();