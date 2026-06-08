window.addEventListener("load", ()=>{
    document.getElementById("loading").style.display = "none";
});

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
    const items = document.querySelectorAll('[id^="item"] .i-img');              /*AI*/
    items.forEach((item, index) => {
        const playerArea = doo.getBoundingClientRect();
        const itemArea = item.getBoundingClientRect();
        const overlap = 
            playerArea.left < itemArea.right &&
            playerArea.right > itemArea.left &&
            playerArea.top < itemArea.bottom &&
            playerArea.bottom > itemArea.top;
        if (overlap){
            item.classList.add(`active-img${index+1}`);
            btns[index].style.opacity = 1;
            btns[index].style.pointerEvents = "all";
        }else{
            item.classList.remove(`active-img${index+1}`);
            btns[index].style.opacity = 0;
            btns[index].style.pointerEvents = "none";
        }
    });

    requestAnimationFrame(colour);                                              /*AI*/
}
requestAnimationFrame(colour);


/*Interact button*/
const btns = document.querySelectorAll(".i-btn");
btns.forEach((button, index) => {
    button.addEventListener("click", () => {
        if (btns[index] == btns[0]) {
            toggleStat("Welcome Home", "This is your stats so far... How is it?", know, hearts, coins, "Ok");
        }
    });
});


/* Stats Popup */
let know = 12;
let hearts = 10;                      /*After doing localstorage change to that values*/
let coins = 11;

const bg = document.getElementById("bg-b");
const pp = document.getElementById("pp");

function toggleStat (head, para, know, hearts, coins, btn){

    document.getElementById("pp-h").innerText = head;
    document.getElementById("pp-para").innerText = para;
    document.getElementById("pp-edu").innerText = know;
    document.getElementById("pp-hearts").innerText = hearts;
    document.getElementById("pp-coins").innerText = coins;
    document.getElementById("pp-btn").innerText = btn;

    
    bg.style.display = "unset";
    pp.style.display = "unset";

    requestAnimationFrame(() => {
        bg.style.opacity = 1;
        pp.style.opacity = 1;
    })

}

const ppBtn = document.getElementById("pp-btn");
ppBtn.addEventListener("click", closeToggle);

function closeToggle(){
    pp.style.opacity = 0;
    bg.style.opacity = 0;
    setTimeout(() => {
        pp.style.display = "none";
        bg.style.display = "none";
    }, 500)
}