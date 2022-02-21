window.onload = () => {
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
}