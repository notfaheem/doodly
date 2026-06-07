const doo = document.getElementById("doo-container");
const wheels = document.querySelectorAll(".wheel");
let rotation = 0;
window.addEventListener("keydown", () => {

    /*Movement*/
    if (event.key == "ArrowRight"){
        let position = parseFloat(getComputedStyle(doo).left);
        position+=2;
        doo.style.left = position + "px";
        doo.style.transform = "scaleX(1)";
        rotation+=10;
        wheels[0].style.transform = `rotate(${rotation}deg)`;
        wheels[1].style.transform = `rotate(${rotation}deg)`;
    }
    if (event.key == "ArrowLeft"){
        let position = parseFloat(getComputedStyle(doo).left);
        position-=2;
        doo.style.left = position + "px";
        doo.style.transform = "scaleX(-1)";
        rotation-=10;
        wheels[0].style.transform = `rotate(${rotation}deg)`;
        wheels[1].style.transform = `rotate(${rotation}deg)`;
    }
    if (event.key == "ArrowUp"){
        let position = parseFloat(getComputedStyle(doo).top);
        position-=2;
        doo.style.top = position + "px";
        rotation-=10;
        wheels[0].style.transform = `rotate(${rotation}deg)`;
        wheels[1].style.transform = `rotate(${rotation}deg)`;
    }
    if (event.key == "ArrowDown"){
        let position = parseFloat(getComputedStyle(doo).top);
        position+=2;
        doo.style.top = position + "px";
        rotation-=10;
        wheels[0].style.transform = `rotate(${rotation}deg)`;
        wheels[1].style.transform = `rotate(${rotation}deg)`;
    }
});


/*Highlighting*/
function colour(){
    console.log("load")
    const items = document.querySelectorAll('[id^="item"] .i-img');
    items.forEach((item, index) => {
        const playerArea = doo.getBoundingClientRect();
        const itemArea = item.getBoundingClientRect();
        const overlap = 
            playerArea.left < itemArea.right &&
            playerArea.right > itemArea.left &&
            playerArea.top < itemArea.bottom &&
            playerArea.bottom > itemArea.top;
        if (overlap){
            console.log("active-img" , index+1);
            item.classList.add(`active-img${index+1}`);
        }else{
            item.classList.remove(`active-img${index+1}`);
        }
    });

    requestAnimationFrame(colour);
}
requestAnimationFrame(colour);
