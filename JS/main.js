import TypeWriterEffect from './typewriter-effect.js';

export default function onLoad() {
    /**
     * Binding events
    */
    for (let elem of document.querySelectorAll(".skills-container > .skills-palatte > div")) {
        elem.addEventListener("mousedown", event => {
            const selected = event.currentTarget;
            for (let e of selected.parentElement.children) {
                if (e!= selected && e.classList.contains("selected")) {
                    e.classList.remove("selected");
                    break;
                }
            }
            selected.classList.toggle("selected");
        });
    }

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


    document.querySelector(".contact-me").addEventListener("mousedown", e => {

        if (window.matchMedia("(orientation: portrait)").matches && "ontouchstart" in document.documentElement) {
            document.querySelector(".contact-info").scrollIntoView();
        }else{
            document.querySelector(".side-menu-item[data-navigate=contact-info]").dispatchEvent(new Event("mousedown",{bubbles: true}));
        }
    });

    for (let tab of document.querySelectorAll(".experience > div:nth-child(2) > span")) {
        tab.addEventListener("mousedown", event => {
            const tab = event.currentTarget;
            const index = parseInt(tab.dataset.index);

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

    if (!("ontouchstart" in document.documentElement))
    {
        window.addEventListener('resize', resizeEffects, true);
        resizeEffects();
    }

    const boxes = document.querySelectorAll(".cross-line > div");

    for(let box of boxes){
        box.addEventListener("mousedown", ({currentTarget}) => {
            for(let child of currentTarget.parentElement.children){
                if(child.classList.contains("selected")){
                    child.classList.remove("selected");
                    break;
                }
            }
            currentTarget.classList.add("selected");
            const id = currentTarget.dataset.id;

            let grandParentChildren = currentTarget.parentElement.parentElement.children;
            for(let i = 1; i < grandParentChildren.length; i++){
                if(grandParentChildren[i].classList.contains("selected")){
                    grandParentChildren[i].classList.remove("selected");
                }

                if(grandParentChildren[i].dataset.id == id){
                    grandParentChildren[i].classList.add("selected");
                }
            }
        });
    }


    /**
     * Page initialization tasks
    */

    window.scrollTo(0, 0);

    resizeBar();

    // Type writer effect
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
}


function resizeBar(){
    const dropContainer = document.querySelector(".drop-container");
    dropContainer.style.left = -2 * (dropContainer.offsetWidth / 5) + "px";
}

function resizeEffects() {
    resizeBar();
    const width = document.documentElement.offsetWidth;
    const height = document.documentElement.offsetHeight;
    let ratio = width / height;
    let length = Math.sqrt(width ** 2 + height ** 2);
    let angle = Math.atan(ratio) * 180 / Math.PI;
    //console.log(width + ", " + height + "\n" + length + " : " + angle);

    let line  = document.querySelector(".cross-line");
    line.style.height = (length-10)+"px";
    line.style.transform = `rotate(${angle}deg)`;

    let boxes  = document.querySelectorAll(".cross-line > div");
    for(let box of boxes){
        box.style.transform = `rotate(${-1 * angle}deg)`
    }
}

function navigateAndClear(elem, items, up, down) {
        
    elem.classList.add("selected");
    const elemToDisplay = document.querySelector(`.${elem.dataset.navigate}`);
    for(let elem of elemToDisplay.parentElement.children){
        if(elem.classList.contains("selected")) {
            elem.classList.remove("selected");
        }
    }
    elemToDisplay.classList.add("selected");
    
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

    const sideMenu = document.querySelector(".side-menu");
    if(elemToDisplay.classList.contains("experience-container")){
        sideMenu.classList.add("left");
        sideMenu.classList.remove("right");
    }else if(sideMenu.classList.contains("left")){
        sideMenu.classList.remove("left");
        sideMenu.classList.add("right");
    }
}