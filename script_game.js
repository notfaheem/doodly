const bgmToggle = document.getElementById("bgm-toggle");
window.addEventListener("load", ()=>{
    document.getElementById("loading").style.display = "none";
    const accessories = document.getElementById("accessories");
    if(localStorage.getItem("accessories") == "yellow-hat"){
        accessories.classList.add("yellow-hat")
    }else if (localStorage.getItem("accessories") == "blue-hat"){
        accessories.classList.add("blue-hat")
    }else if (localStorage.getItem("accessories") == "red-hat"){
        accessories.classList.add("red-hat")
    }
});
document.addEventListener("click", () => {
    if(localStorage.getItem("bgm") == null || localStorage.getItem("bgm") == "yes"){
        getBgm("yes");
        bgmToggle.checked = true;
    }else{
        bgmToggle.checked = false;
    }
}, {once:true});


bgmToggle.addEventListener("change", (event) => {
    if(event.target.checked){
        localStorage.setItem("bgm", "yes")
        getBgm("yes")
    }else{
        localStorage.setItem("bgm", "no")
        getBgm("no")
    }
    console.log(localStorage.getItem("bgm"))
})

const bgm = new Audio("public/bgm.ogg");
function getBgm (access){
    if(access == "yes"){
        if(bgm.paused){
            bgm.volume = 0.05;
            bgm.play()
        }
    }else{
        bgm.pause();
        bgm.currentTime = 0;
    }
}


// Settings
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsBg = document.getElementById("bg-settings");
const settingsClose = document.getElementById("close-settings");
settingsBtn.addEventListener("click", () => {
    settings.style.transform = "translate(-50%,-50%) scale(1) ";
    settingsBg.style.transform = "scale(1)";
});
settingsClose.addEventListener("click" , ()=> {
    settings.style.transform = "translate(-50%, -50%) scale(0) ";
    settingsBg.style.transform = "scale(0)";
})

    /*Movement*/
const doo = document.getElementById("doo-container");
const legOne = document.getElementById("leg1");
const legTwo = document.getElementById("leg2");
const sayText = document.getElementById("say");
window.addEventListener("keydown", () => {
    if (event.key == "ArrowRight"){
        let position = parseFloat(getComputedStyle(doo).left);
        let speed = 2;
        if(localStorage.getItem("speed")==null){
            position+=speed;
        }else{
            position+=Number(localStorage.getItem("speed"));
        }
        doo.style.left = position + "px";
        doo.style.transform = "scaleX(1)";
        sayText.style.transform = "scaleX(1) translateX(-50%)";
        legOne.style.animation = "walk 1s infinite";
        legTwo.style.animation = "walk 1s infinite 0.5s";
    }
    if (event.key == "ArrowLeft"){
        let position = parseFloat(getComputedStyle(doo).left);
        let speed = 2;
        if(localStorage.getItem("speed")==null){
            position-=speed;
        }else{
            position-=Number(localStorage.getItem("speed"));
        }
        doo.style.left = position + "px";
        doo.style.transform = "scaleX(-1)";
        sayText.style.transform = "scaleX(-1) translateX(50%)";
        legOne.style.animation = "walk 1s infinite";
        legTwo.style.animation = "walk 1s infinite 0.5s";
    }
    if (event.key == "ArrowUp"){
        let position = parseFloat(getComputedStyle(doo).top);
        let speed = 2;
        if(localStorage.getItem("speed")==null){
            position-=speed;
        }else{
            position-=Number(localStorage.getItem("speed"));
        }
        doo.style.top = position + "px";
        legOne.style.animation = "walk 1s infinite";
        legTwo.style.animation = "walk 1s infinite 0.5s";
    }
    if (event.key == "ArrowDown"){
        let position = parseFloat(getComputedStyle(doo).top);
        let speed = 2;
        if(localStorage.getItem("speed")==null){
            position+=speed;
        }else{
            position+=Number(localStorage.getItem("speed"));
        }
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
        const itemContainer = document.getElementById(`item${index+1}`)
        const overlap = 
            playerArea.left < itemArea.right &&
            playerArea.right > itemArea.left &&
            playerArea.top < itemArea.bottom &&
            playerArea.bottom > itemArea.top;
        if (overlap){
            item.classList.add(`active-img${index+1}`);
            itemContainer.classList.add("item-hover");
            btns[index].style.opacity = 1;
            btns[index].style.pointerEvents = "all";
        }else{
            item.classList.remove(`active-img${index+1}`);
            itemContainer.classList.remove("item-hover")
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
    button.addEventListener("click", (e) => {
        if(e.currentTarget.disabled) return;
        if (btns[index] == btns[0]) {
            toggleStat("Welcome Home", "This is your stats so far... How is it?", know, hearts, coins, "Ok");
        }
        if (btns[index] == btns[1]) {
            let coinsCave = randomNumber(10, 20);
            let knowCave = randomNumber(1, 10);
            if (coins < coinsCave){
                broke("coins")
            }else if (know < knowCave){
                broke("know")
            }else{
                const heartsCave = randomNumber(10, 20);
                coinsCave = coinsCave*-1;
                knowCave = knowCave*-1;
                changeStats(knowCave, heartsCave, coinsCave);
                toggleStat("Hospital", "Got some more health!!", knowCave, heartsCave, coinsCave, "Ok", 2000, "Surgery in progress... (tbh idk if its a surgery!)", studyS);
            
            /*Cooldown*/
                let cooldown = 10;
                btns[index].disabled = true;
                const cooldowntimer = setInterval(() => {
                    cooldown--;
                    btns[index].innerText = `Cooldown ${cooldown}s`;
                    if (cooldown <= 0) {
                        clearInterval(cooldowntimer);
                        btns[index].innerText = "Interact";
                        btns[index].disabled = false;
                    }
                }, 1000)
            }
        }
        if (btns[index] == btns[2]) {
            openShop();
        }
        if (btns[index] == btns[3]) {
            let coinsCave = randomNumber(1, 10);
            let heartsCave = randomNumber(0, 2);
            if (coins < coinsCave){
                broke("coins")
            }else if (hearts < heartsCave){
                broke("hearts")
            }
            else{
                const knowCave = randomNumber(20, 30);
                coinsCave = coinsCave*-1;
                heartsCave = heartsCave*-1;
                changeStats(knowCave, heartsCave, coinsCave);
                toggleStat("Study Time!!", "You just did an academic miracle!! Just Wow!", knowCave, heartsCave, coinsCave, "Ok", 2000, "Studying...", studyS);
                
                /*Cooldown*/
                let cooldown = 10;
                btns[index].disabled = true;
                const cooldowntimer = setInterval(() => {
                    cooldown--;
                    btns[index].innerText = `Cooldown ${cooldown}s`;
                    if (cooldown <= 0) {
                        clearInterval(cooldowntimer);
                        btns[index].innerText = "Interact";
                        btns[index].disabled = false;
                    }
                }, 1000)
            }
        }
        if (btns[index] == btns[4]) {
            let knowCave = randomNumber(1, 10);
            let heartsCave = randomNumber(1, 10);
            if (know < knowCave){
                broke("know")
            }else if(hearts < heartsCave){
                broke("hearts")
            }
            else{
                const coinsCave = randomNumber(20, 30);
                knowCave = knowCave*-1;
                heartsCave = heartsCave*-1;
                changeStats(knowCave, heartsCave, coinsCave);
                toggleStat("Mining Time!", "Oh!! you have mined some really good stuff!! and you have hurt ur hands ig, wanna go to hospital?", knowCave, heartsCave, coinsCave, "Ok", 2000, "Mining...", miningS);

                /*Cooldown*/
                let cooldown = 10;
                btns[index].disabled = true;
                const cooldowntimer = setInterval(() => {
                    cooldown--;
                    btns[index].innerText = `Cooldown ${cooldown}s`;
                    if (cooldown <= 0) {
                        clearInterval(cooldowntimer);
                        btns[index].innerText = "Interact";
                        btns[index].disabled = false;
                    }
                }, 1000)
            }
            
        }
        if (btns[index] == btns[5]) {
            let coinsCave = randomNumber(5, 10);
            let knowCave = randomNumber(5, 10);
            if (coins < coinsCave){
                broke("coins")
            }else if (know < knowCave){
                broke("know")
            }else{
                const heartsCave = randomNumber(10, 20);
                coinsCave = coinsCave*-1;
                knowCave = knowCave*-1;
                changeStats(knowCave, heartsCave, coinsCave);
                toggleStat("Gym", "What a workout session was that?", knowCave, heartsCave, coinsCave, "Ok", 2000, "No pain? No gain...", gymS);
            

                /*Cooldown*/
                let cooldown = 10;
                btns[index].disabled = true;
                const cooldowntimer = setInterval(() => {
                    cooldown--;
                    btns[index].innerText = `Cooldown ${cooldown}s`;
                    if (cooldown <= 0) {
                        clearInterval(cooldowntimer);
                        btns[index].innerText = "Interact";
                        btns[index].disabled = false;
                    }
                }, 1000)
            }
            
        }
        if (btns[index] == btns[6]) {
            let knowCave = randomNumber(20, 30);
            let heartsCave = randomNumber(5, 10);
            if (hearts < heartsCave){
                broke("hearts")
            }else if (know < knowCave){
                broke("know")
            }else{
                const coinsCave = randomNumber(30, 40);
                heartsCave = heartsCave*-1;
                knowCave = knowCave*-1;
                changeStats(knowCave, heartsCave, coinsCave);
                toggleStat("Jobs Ltd.", "Nice Job...", knowCave, heartsCave, coinsCave, "Ok", 2000, "Working...", studyS);
            

                /*Cooldown*/
                let cooldown = 10;
                btns[index].disabled = true;
                const cooldowntimer = setInterval(() => {
                    cooldown--;
                    btns[index].innerText = `Cooldown ${cooldown}s`;
                    if (cooldown <= 0) {
                        clearInterval(cooldowntimer);
                        btns[index].innerText = "Interact";
                        btns[index].disabled = false;
                    }
                }, 1000)
            }
            
        }
        if (btns[index] == btns[7]) {
            invest()
        }
    });
});


/* Stats Popup */
const doneS = new Audio("public/done.mp3");
const noS = new Audio("public/wrong.mp3");
const studyS = new Audio("public/study.mp3");
const miningS = new Audio("public/mining.mp3");
const gymS = new Audio("public/gym.mp3"); 
const allSounds = [doneS, noS, studyS, miningS, gymS];
allSounds.forEach(sound => {
    sound.volume = 0.5;
})
if (localStorage.getItem("coins") == null){
    var coins = 10;
    var know = 10;
    var hearts = 10;
    localStorage.setItem("know",10);
    localStorage.setItem("hearts",10);
    localStorage.setItem("coins",10);
}else{
    var know = localStorage.getItem("know");
    var hearts = localStorage.getItem("hearts");
    var coins = localStorage.getItem("coins");
}
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
        localStorage.setItem("know", Number(localStorage.getItem("know")) + knowValue);
        localStorage.setItem("hearts", Number(localStorage.getItem("hearts")) + heartsValue);
        localStorage.setItem("coins", Number(localStorage.getItem("coins")) + coinsValue);
        know = Number(localStorage.getItem("know"));
        hearts = Number(localStorage.getItem("hearts"));
        coins = Number(localStorage.getItem("coins"));
    }
    if(updateStats == true){
        document.getElementById("edu").innerText = know;
        document.getElementById("hearts").innerText = hearts;
        document.getElementById("coins").innerText = coins;
        document.getElementById("know-in-shop").innerText = Number(localStorage.getItem("know"));
        document.getElementById("hearts-in-shop").innerText = Number(localStorage.getItem("hearts"));
        document.getElementById("coins-in-shop").innerText = Number(localStorage.getItem("coins"));
        updateStats = false;
    }
}


/*Say*/
function say(text,time){
    sayText.innerText = text;
    sayText.style.opacity = 1;
    setTimeout(()=> {
        sayText.style.opacity = 0;
    },time)
}


/*Open Shop*/
const shopBtns = document.querySelectorAll(".shop-btn");
const shopBg = document.getElementById("shop-bg");
const shopView = document.getElementById("shop-view");
const closeShop = document.getElementById("close-shop");
function openShop(){
    document.getElementById("know-in-shop").innerText = Number(localStorage.getItem("know"));
    document.getElementById("hearts-in-shop").innerText = Number(localStorage.getItem("hearts"));
    document.getElementById("coins-in-shop").innerText = Number(localStorage.getItem("coins"));
    shopBg.style.zIndex = 15;
    shopBg.style.opacity = 1;
    shopView.style.opacity =1;
    shopView.style.transform = "translate(-50%,-50%) scale(1) ";
}
shopBtns.forEach((shopBtn, index) => {
    shopBtn.addEventListener("click", () => {
        const purchaseValues = document.querySelectorAll(`#shop-item${index + 1} .stat`);
        const knowToDecrease = Number(purchaseValues[0].innerText);
        const heartsToDecrease = Number(purchaseValues[1].innerText);
        const coinToDecrease = Number(purchaseValues[2].innerText);
        if (Math.abs(coinToDecrease) > coins) {                               //take modulus of coin to decrease and etc.
            broke("coins")
        } else if (Math.abs(knowToDecrease) > know) {
            broke("know")
        } else if (Math.abs(heartsToDecrease) > hearts) {
            broke("hearts")
        } else {
            updateStats = true;
            changeStats(knowToDecrease, heartsToDecrease, coinToDecrease);

            if (shopBtn == shopBtns[0]) {
                localStorage.setItem("speed", 4);
                setTimeout(() => {
                    localStorage.setItem("speed", 2);
                }, 300000)
            }else if (shopBtn == shopBtns[1]) {
                localStorage.setItem("speed", 8);
                setTimeout(() => {
                    localStorage.setItem("speed", 2);
                }, 300000)
            }else if (shopBtn == shopBtns[2]) {
                localStorage.setItem("speed", 12);
                setTimeout(() => {
                    localStorage.setItem("speed", 2);
                }, 300000)
            }else if (shopBtn == shopBtns[3]) {
                updateStats = true;
                changeStats(1, 0, 0)
                updateStats = false;
            }else if (shopBtn == shopBtns[4]) {
                updateStats = true;
                changeStats(0, 1, 0)
                updateStats = false;
            }else if (shopBtn == shopBtns[5]) {
                updateStats = true;
                changeStats(0, 0, 1)
                updateStats = false;
            }else if (shopBtn == shopBtns[6]) {
                const accessories = document.getElementById("accessories");
                localStorage.setItem("accessories","yellow-hat");
                accessories.classList.remove("blue-hat")
                accessories.classList.remove("red-hat")
                accessories.classList.add("yellow-hat")
                say("Nice yellow hat!", 10000)
            }else if (shopBtn == shopBtns[7]) {
                const accessories = document.getElementById("accessories");
                localStorage.setItem("accessories","blue-hat");
                accessories.classList.remove("yellow-hat")
                accessories.classList.remove("red-hat")
                accessories.classList.add("blue-hat")
                say("Nice blue hat!", 10000)
            }else if (shopBtn == shopBtns[8]) {
                const accessories = document.getElementById("accessories");
                localStorage.setItem("accessories","red-hat");
                accessories.classList.remove("yellow-hat")
                accessories.classList.remove("blue-hat")
                accessories.classList.add("red-hat")
                say("Successfully proved the ELITEnes! ", 10000)
            }else if (shopBtn == shopBtns[9]) {
                localStorage.setItem("key", "true");
                broke("key");
                confetti({
                    particleCount: 100,
                    angle: 60,
                    spread: 70,
                    origin: { x: 0 }
                });

                confetti({
                    particleCount: 100,
                    angle: 120,
                    spread: 70,
                    origin: { x: 1 }
                });
                say("Key acquired!!!", 20000);
            }
        };

    })
});


closeShop.addEventListener("click", () => {
    shopBg.style.opacity = 0;
    shopBg.style.zIndex = -10;
    shopView.style.transform = "translate(-50%,-50%) scale(0) ";
})

/*broke*/
const noMoneyBtn = document.getElementById("nm-btn");
const uniBg = document.getElementById("uni-bg");
const noMoney = document.getElementById("no-money");
const noMoneyH = document.getElementById("nm-h");
const noMoneyPara = document.getElementById("nm-para");
function broke (what){
    if(what == "know"){
        noMoneyH.innerText = "Not enough Knowledge";
        noMoneyPara.innerText = "You don't have enough knowledge...";
    }else if(what == "hearts"){
        noMoneyH.innerText = "Not Enough Hearts";
        noMoneyPara.innerText = "You don't have enough hearts...";
    }else if(what == "coins"){
        noMoneyH.innerText = "Not Enough Coins";
        noMoneyPara.innerText = "You don't have enough coins...";
    }else if(what == "key"){
        noMoneyH.innerText = "WOOOWWW!!! Key to World 2 Acquired";
        noMoneyPara.innerText = "World 2 is coming sooonnnn... Stay tuned for your next adventures journey of life there. Meanwhile can you make it to 1 million coins here?";
    }
    else{
        noMoneyH.innerText = "Requirements Not Met";
        noMoneyPara.innerText = "You haven't met all the requirements";
    }
    uniBg.style.zIndex = 15;
    uniBg.style.opacity = 1;
    noMoney.style.transform = " translate(-50%, -50%) scale(1)";
}
noMoneyBtn.addEventListener("click", () => {
    noMoney.style.transform = " translate(-50%, -50%) scale(0)";
    uniBg.style.opacity = 0;
    uniBg.style.zIndex = -10;
})


// Invest
let investValue = 1;
const investStat = document.getElementById("invest-stat");
const investReq = document.querySelectorAll("#invest-req .stat");
const investBtn = document.getElementById("invest-btn");
const investBg = document.getElementById("invest-bg");
const investView = document.getElementById("invest");
function invest(){
    investBg.style.zIndex = 14;
    investBg.style.opacity = 1;
    investView.style.transform = "translate(-50%,-50%) scale(1)";


    if(localStorage.getItem("invest") == null){
        localStorage.setItem("invest", 1);
    }else{
        investValue = Number(localStorage.getItem("invest"));
    }

    investStat.innerText = `${investValue} coin(s) per 30 seconds`;
    investReq[0].innerText = investValue + 1;
    investReq[1].innerText = investValue + 1;
    investReq[2].innerText = investValue * investValue;

}
investBtn.addEventListener("click", () => {
    if (investValue + 1 > know) {
        broke("know")
    } else if (investValue + 1 > hearts) {
        broke("hearts")
    } else if (investValue * investValue > coins) {
        broke("coins")
    } else {
        updateStats = true;
        const investknownhearts = (investValue + 1) * -1;
        const investCoins = investValue * investValue * -1;
        changeStats(investknownhearts, investknownhearts, investCoins)
        investValue = investValue + 1;
        localStorage.setItem("invest", investValue);
        investStat.innerText = `${investValue} coin(s) per 30 seconds`;
        investReq[0].innerText = investValue + 1;
        investReq[1].innerText = investValue + 1;
        investReq[2].innerText = investValue * investValue;

    }
})

const closeInvest = document.getElementById("close-invest");
closeInvest.addEventListener("click", () => {
    investBg.style.opacity = 0;
    investBg.style.zIndex = -10;
    investView.style.transform = "translate(-50%,-50%) scale(0) ";
});

setInterval(()=>{
    updateStats= true;
    let investValue = Number(localStorage.getItem("invest"));
    if(investValue == 0){
        changeStats(0,0,1);
    }else{
        changeStats(0,0,investValue);
    }
    updateStats=false;
},30000)



//tutorial
function tutorial (){
    console.log("Will do last")
}


// temp change of values
function temp(){
    updateStats= true;
    changeStats(0,0,0)
    updateStats=false;
}
temp()


/* TO DO 

- Mobile View with controls

*/