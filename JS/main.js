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

    document.querySelector(".nav-menu > div#close > img").addEventListener("mouseup", event => {

        const target = event.target.parentElement.parentElement;
        target.classList.remove("open");
        target.classList.add("closed");
    });


    document.querySelector(".skills-container > div").addEventListener("mousedown", drawCard);

    document.querySelector(".skills-container > div").addEventListener("mouseenter", spreadCards);

    document.querySelector(".skills-container > div").addEventListener("mouseleave", stackCards);
}

function spreadCards({ currentTarget: { children: cards } }) {

    const margin = 40;
    const minMargin = 15;
    let count = 1;
    const windowWidthUsable = document.documentElement.clientWidth - margin;
    const distributionWidth = windowWidthUsable - cards[0].clientWidth;
    const remainingWidthForEachChild = Math.round(distributionWidth / cards.length);

    if (remainingWidthForEachChild >= minMargin) {
        let topOne = null;
        for (let elem of cards) {
            if (!elem.classList.contains("remove") && !elem.classList.contains("restack")) {
                elem.style.left = `${remainingWidthForEachChild * count++}px`;
                elem.style.transform = "rotateZ(-10deg) rotateX(30deg) rotateY(-10deg)";
            } else {
                topOne = elem;
            }
        }
        if (topOne) {
            topOne.style.left = `${remainingWidthForEachChild * cards.length}px`;
            topOne.style.transform = "rotateZ(-10deg) rotateX(30deg) rotateY(-10deg)";
        }
    }
}

function stackCards(event) {
    for (let elem of event.currentTarget.children) {
        elem.style.left = null;
        elem.style.transform = null;
    }
}

drawCard.allow = true;
drawCard.delay = 1500;
function drawCard(event) {

    if (drawCard.allow) {

        drawCard.allow = false;

        const { target, currentTarget: { children } } = event;

        if (!target.classList.contains('restack')) {

            target.classList.add("remove");

            setTimeout(() => {

                for (let elem of children) {
                    if (elem !== target && elem.classList.contains("restack")) {
                        elem.classList.remove("restack");
                        elem.classList.remove("remove");
                    }
                }

                target.classList.add("restack");
                drawCard.allow = true;
                spreadCards({ currentTarget: { children } });

            }, drawCard.delay);
        } else {
            drawCard.allow = true;
        }
    }
}