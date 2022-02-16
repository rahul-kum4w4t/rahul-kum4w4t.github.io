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
            { cursorColor: "white", ms: 50, wait: 0  }
        ).startTyping();
    }).then(() => {
        document.querySelector(".contact-me").style.opacity = 1;
    });


    document.querySelector(".side-menu").addEventListener("mousedown", ({ target, currentTarget }) => {

        const [up, { children: items }, down] = currentTarget.children;

        if (target !== currentTarget) {
            
            if (target === up && !up.classList.contains("bound")) {
                for (let i = 1; i < items.length; i++) {
                    if (items[i].classList.contains("selected")) {
                        items[i].classList.remove("selected");
                        navigateAndClear(items[i - 1], items, up, down);
                        break;
                    }
                }

            } else if (down === target && !down.classList.contains("bound")) {
            
                for (let i = items.length - 2; i >= 0; i--) {
                    if (items[i].classList.contains("selected")) {
                        items[i].classList.remove("selected");
                        navigateAndClear(items[i + 1], items, up, down);
                        break;
                    }
                }
            } else if (target !== up && target !== down) {

                target = target.classList.contains("side-menu-item") ? target : target.parentElement.classList.contains("side-menu-item") ? target.parentElement : null;

                if (target && !target.classList.contains("selected")) {
                    
                    for (let item of items) {
                        if (item.classList.contains("selected")) {
                            item.classList.remove("selected");
                            navigateAndClear(target, items, up, down);
                            break;
                        }
                    }
                }
            }
        }
    });

    function navigateAndClear(elem, items, up, down) {
        
        elem.classList.add("selected");
        document.querySelector(`.${elem.dataset.navigate}`).scrollIntoView();
        
        if (elem == items[0]) {
            up.classList.add("bound");
            if (down.classList.contains("bound")) {
                down.classList.remove("bound");
            }
        } else if (elem == items[items.length - 1]) {
            down.classList.add("bound");
            if (up.classList.contains("bound")) {
                up.classList.remove("bound");
            }
        } else {
            if (up.classList.contains("bound")) {
                up.classList.remove("bound");
            }
            if (down.classList.contains("bound")) {
                down.classList.remove("bound");
            }
        }
    }


    window.scrollTo(0, 0);


    document.querySelector(".contact-me").addEventListener("mousedown", e => {
        document.querySelector(".side-menu-item[data-navigate=contact-info]").dispatchEvent(new Event("mousedown",{bubbles: true}));
    });

    /*let lastScrollPos = 0;
    document.body.onscroll = event => {
        if(scrollAllowed){
            console.log(scrollAllowed);
            scrollAllowed = false;
            let st = window.pageYOffset || document.documentElement.scrollTop;
            if(st > lastScrollPos){
                document.querySelector(".side-menu-down").dispatchEvent(new Event("mousedown",{bubbles: true}));
            }else{
                document.querySelector(".side-menu-up").dispatchEvent(new Event("mousedown",{bubbles: true}));
            }
            lastScrollPos =  st;
        }
    }*/

    /*document.querySelector(".nav-menu > .pane_1 > i").addEventListener("mouseup", event => {

        const target = event.target.parentElement.parentElement;
        target.classList.remove("closed");
        target.classList.add("open");
    });

    document.querySelector(".nav-menu > div#close > img").addEventListener("mouseup", event => {

        const target = event.target.parentElement.parentElement;
        target.classList.remove("open");
        target.classList.add("closed");
    });

    document.querySelector(".nav-menu > .pane_3 > #skills").addEventListener("mousedown", () => {
        document.querySelector(".nav-menu > div#close > img").dispatchEvent(new Event("mouseup"));
        document.querySelector(".card-container").scrollIntoView();
        
    });

    document.querySelector(".nav-menu > .pane_3 > #about").addEventListener("mousedown", () => {
        document.querySelector(".nav-menu > div#close > img").dispatchEvent(new Event("mouseup"));
        document.querySelector(".dashboard").scrollIntoView();
    });

    document.querySelector(".nav-menu > .pane_3 > #experience").addEventListener("mousedown", () => {
        document.querySelector(".nav-menu > div#close > img").dispatchEvent(new Event("mouseup"));
        document.querySelector(".experience-container").scrollIntoView();
    });*/


    for (let card of document.querySelectorAll(".card-container > div.card-deck > div")) {
        card.addEventListener("mousedown", drawCard);
    }

    document.querySelector(".card-container > div.card-deck").addEventListener("mouseenter", spreadCards);

    document.querySelector(".card-container > div.card-deck").addEventListener("mouseleave", delayedStackUpdate);

    window.addEventListener('resize', resizeDropBar);
    resizeDropBar();

    for (let tab of document.querySelectorAll(".experience > div:nth-child(2) > span")) {
        tab.addEventListener("mousedown", event => {
            const tab = event.currentTarget;
            const index = parseInt(tab.dataset.index);
            console.log(index);

            const parent = tab.parentElement;
            const grandParent = tab.parentElement.parentElement;

            const scroller = grandParent.children[0].children;
            const tabs = parent.children;
            const summary = grandParent.children[2].children;

            for (let i = 0; i < tabs.length; i++) {
                if (i != index) {
                    if (tabs[i].classList.contains("selected")) {
                        tabs[i].classList.remove("selected");
                        summary[i].classList.remove("selected");
                        scroller[i].classList.remove("selected");
                    }
                } else {
                    tabs[i].classList.add("selected");
                    summary[i].classList.add("selected");
                    scroller[i].classList.add("selected");
                }
            }
        });
    }
}

function resizeDropBar() {
    const dropContainers = document.querySelectorAll(".drop-container");
    for (const cont of dropContainers) {
        if (cont.dataset.direction == "right") {
            cont.style.right = -2 * (cont.offsetWidth / 5) + "px";
        } else {
            cont.style.left = -2 * (cont.offsetWidth / 5) + "px";
        }
    }
}

let cardsOpen = false;
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
            if (!elem.classList.contains("restack")) {
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
    cardsOpen = true;
}

function delayedStackUpdate({ currentTarget: { children } }) {
    setTimeout(stackCards, 100, children);
}

function stackCards(cards) {
    for (let elem of cards) {
        elem.style.left = null;
        elem.style.transform = null;
    }
    cardsOpen = false;
}

drawCard.allow = true;
const DELAY = 1500;
function drawCard(event) {

    if (drawCard.allow) {
        drawCard.allow = false;
        const { currentTarget: clickedCard, currentTarget: { parentElement: { children: cards } } } = event;

        if (!clickedCard.classList.contains('restack')) {
            clickedCard.classList.add("remove");
            setTimeout(() => {

                for (let card of cards) {
                    if (card !== clickedCard && card.classList.contains("restack")) {
                        card.classList.remove("restack");
                        card.classList.remove("remove");
                    }
                }
                clickedCard.classList.add("restack");
                drawCard.allow = true;
                spreadCards({ currentTarget: { children: cards } });
            }, DELAY);
        } else {
            if (cardsOpen) stackCards(cards);
            else spreadCards({ currentTarget: { children: cards } });
            drawCard.allow = true;
        }
    }
}