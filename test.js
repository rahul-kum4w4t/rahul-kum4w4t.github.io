window.onload = () => {
    window.addEventListener('resize', resizeEffects, true);
    resizeEffects();

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
}

function resizeEffects() {
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