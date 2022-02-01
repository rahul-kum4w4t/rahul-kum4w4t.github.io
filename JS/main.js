import TypeWriterEffect from './typewriter-effect.js';

export default function onLoad() {
    new TypeWriterEffect(
        document.getElementsByClassName("intro")[0],
        { cursorColor: "white", wait: 0 }
    ).startTyping().then(() => {
        return new TypeWriterEffect(
            document.getElementsByClassName("intro-about")[0],
            { cursorColor: "white", ms: 70, wait: 0 }
        ).startTyping();
    }).then(() => {
        return new TypeWriterEffect(
            document.getElementsByClassName("intro-summary-1")[0],
            { cursorColor: "white", ms: 50, wait: 0 }
        ).startTyping();
    }).then(() => {
        return new TypeWriterEffect(
            document.getElementsByClassName("intro-summary-2")[0],
            { cursorColor: "white", ms: 50 }
        ).startTyping();
    });

    document.querySelector(".nav-menu > .pane_1 > i").addEventListener("mouseup", event => {

        const target = event.target.parentElement.parentElement;
        target.classList.remove("closed");
        target.classList.add("open");
    });

    document.querySelector(".nav-menu > div#close > i").addEventListener("mouseup", event => {

        const target = event.target.parentElement.parentElement;
        target.classList.remove("open");
        target.classList.add("closed");
    });
}