window.addEventListener("load", ()=>{
    document.getElementById("loading").style.display = "none";
});


    /*Movement*/

const doo = document.getElementById("doo-container");
const legOne = document.getElementById("leg1");
const legTwo = document.getElementById("leg2");
window.addEventListener("keydown", () => {
    if (event.key == "ArrowRight"){
        let position = parseFloat(getComputedStyle(doo).left);
        position+=2;
        doo.style.left = position + "px";
        doo.style.transform = "scaleX(1)";
        legOne.style.animation = "walk 1s infinite";
        legTwo.style.animation = "walk 1s infinite 0.5s";
    }
    if (event.key == "ArrowLeft"){
        let position = parseFloat(getComputedStyle(doo).left);
        position-=2;
        doo.style.left = position + "px";
        doo.style.transform = "scaleX(-1)";
        legOne.style.animation = "walk 1s infinite";
        legTwo.style.animation = "walk 1s infinite 0.5s";
    }
    if (event.key == "ArrowUp"){
        let position = parseFloat(getComputedStyle(doo).top);
        position-=2;
        doo.style.top = position + "px";
        legOne.style.animation = "walk 1s infinite";
        legTwo.style.animation = "walk 1s infinite 0.5s";
    }
    if (event.key == "ArrowDown"){
        let position = parseFloat(getComputedStyle(doo).top);
        position+=2;
        doo.style.top = position + "px";
        legOne.style.animation = "walk 1s infinite";
        legTwo.style.animation = "walk 1s infinite 0.5s";
    }
});
window.addEventListener("keyup", ()=>{
    legOne.style.animation = "none";
    legTwo.style.animation = "none";

})

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
        if (btns[index] == btns[1]) {
            let coinsCave = randomNumber(20, 10);
            console.log(coinsCave)
            if (coins < coinsCave){
                toggleStat("Hospital", "Don't have enough money to get surgery, or whatever u need!", 0, 0, 0, "Ok", 100, "Checking ur wallet...", studyS);
            }else{
                const knowCave = randomNumber(0, 5);
                const heartsCave = randomNumber(10, 20);
                coinsCave = coinsCave*-1;
                changeStats(knowCave, heartsCave, coinsCave);
                toggleStat("Hospital", "Got some more health!!", knowCave, heartsCave, coinsCave, "Ok", 2000, "Surgery in progress... (tbh idk if its a surgery!)", studyS);
            }
        }
        if (btns[index] == btns[3]) {
            const knowCave = randomNumber(10, 20);
            const heartsCave = randomNumber(-2, 1);
            const coinsCave = randomNumber(-10, -1);
            changeStats(knowCave, heartsCave, coinsCave);
            toggleStat("Study Time!!", "You just did an academic miracle!! Just Wow!", knowCave, heartsCave, coinsCave, "Ok", 2000, "Studying...", studyS);
        }
        if (btns[index] == btns[4]) {
            const knowCave = randomNumber(1, 3);
            const heartsCave = randomNumber(-5, 0);
            const coinsCave = randomNumber(10, 20);
            changeStats(knowCave, heartsCave, coinsCave);
            toggleStat("Wanna Mine?", "Oh!! you have mined some really good stuff!! Also got some useful knowledge! and you have hurt ur hands ig, wanna go to hospital?", knowCave, heartsCave, coinsCave, "Ok", 2000, "Mining...", miningS);
        }
    });
});


/* Stats Popup */
const doneS = new Audio("public/done.mp3");
const studyS = new Audio("public/study.mp3");
const miningS = new Audio("public/mining.mp3");
let know = 10;
let hearts = 10;                                    /*After doing localstorage change to that values*/
let coins = 10;
document.getElementById("edu").innerText = know;
document.getElementById("hearts").innerText = hearts;
document.getElementById("coins").innerText = coins;

const bg = document.getElementById("bg-b");
const pp = document.getElementById("pp");
const statsContainer = document.getElementById("pp-container");

function toggleStat (head, para, know, hearts, coins, btn, timeDelayforStats, loadingMessage, sound){

    document.getElementById("pp-h").innerText = head;
    document.getElementById("pp-para").innerText = para;
    document.getElementById("pp-edu").innerText = "+" + know;
    document.getElementById("pp-hearts").innerText = "+" + hearts;
    document.getElementById("pp-coins").innerText = "+" + coins;
    document.getElementById("pp-btn").innerText = btn;
    if(timeDelayforStats != undefined){
        statsContainer.style.opacity = 0;
    }
    
    
    bg.style.display = "unset";
    pp.style.display = "unset";

    requestAnimationFrame(() => {
        bg.style.opacity = 1;
        pp.style.opacity = 1;
        if(timeDelayforStats != undefined){
        document.getElementById("pp-para").innerText = loadingMessage;
        sound.currentTime = 0;
        sound.play();
            setTimeout(() => {
                statsContainer.style.opacity = 1;
                document.getElementById("pp-para").innerText = para;
            },timeDelayforStats)
        }
    })

}

const ppBtn = document.getElementById("pp-btn");
ppBtn.addEventListener("click", closeToggle);
let updateStats = false;
function closeToggle(){
    pp.style.opacity = 0;
    bg.style.opacity = 0;
    doneS.currentTime = 0;
    doneS.play();
    setTimeout(() => {
        pp.style.display = "none";
        bg.style.display = "none";
    }, 500)
    updateStats = true;
    changeStats();
}


/*Random Number Generator */
function randomNumber(min, max){                                             /*AI*/
    const minCeild = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeild + 1) + minCeild);
};

/* Changing Stats */
function changeStats (knowValue, heartsValue, coinsValue){
    if (knowValue != undefined){
        know = know + knowValue;
        hearts = hearts + heartsValue;                                  /*Update in localstorage too*/
        coins = coins + coinsValue;
    }
    if(updateStats == true){
        document.getElementById("edu").innerText = know;
        document.getElementById("hearts").innerText = hearts;
        document.getElementById("coins").innerText = coins;
        updateStats = false;
    }
}