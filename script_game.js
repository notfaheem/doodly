const bgmToggle = document.getElementById("bgm-toggle");
const sfxToggle = document.getElementById("sound-effects-toggle");
const mBtnsToggle = document.getElementById("mobile-btns-toggle");
const mobileViewBtns = document.getElementById("mobile-view-btns");
window.addEventListener("load", ()=>{
    document.getElementById("loading").style.display = "none";

    const openerW = document.getElementById("opener-welcome");
    const openerDoodly = document.getElementById("opener-doodly");
    const openerMain = document.getElementById("opener");
    openerW.style.opacity = 1;
    setTimeout(()=>{
        openerW.style.opacity = 0;
        setTimeout(() => {
            openerDoodly.style.display = "unset";
            setTimeout(()=>{
                openerMain.style.animation = "fadeOut 1s forwards";
            },6000)
        },1000)
    },2000)

    const accessories = document.getElementById("accessories");
    setTimeout(()=>{
        if (localStorage.getItem("newPlayer") == null || localStorage.getItem("newPlayer") == "true") {
            tutorial();
        }
    },10000)
    if(localStorage.getItem("accessories") == "yellow-hat"){
        accessories.classList.add("yellow-hat")
    }else if (localStorage.getItem("accessories") == "blue-hat"){
        accessories.classList.add("blue-hat")
    }else if (localStorage.getItem("accessories") == "red-hat"){
        accessories.classList.add("red-hat")
    }


    function setupMobileButtons() {
        const isMobileScreen = window.matchMedia("(max-width:768px)").matches;
        const saved = localStorage.getItem("mobileBtns");
        if (saved === null) {
            if (isMobileScreen) {
                localStorage.setItem("mobileBtns", "yes");
                mobileView("yes");
                mBtnsToggle.checked = true;
            } else {
                localStorage.setItem("mobileBtns", "no");
                mobileView("no");
                mBtnsToggle.checked = false;
            }
        } else {
            mobileView(saved);
            mBtnsToggle.checked = saved === "yes";
        }
        if (isMobileScreen) {
            setTimeout(() => {
                broke("mobile");
            }, 100000);
        }
    }
    setupMobileButtons();
});
document.addEventListener("click", () => {
    if(localStorage.getItem("bgm") == null || localStorage.getItem("bgm") == "yes"){
        getBgm("yes");
        bgmToggle.checked = true;
    }else{
        bgmToggle.checked = false;
    }

    if(localStorage.getItem("sfx") == null || localStorage.getItem("sfx") == "yes"){
        getSfx("yes");
        sfxToggle.checked = true;
    }else{
        sfxToggle.checked = false;
        getSfx("no")
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
})

const bgm = new Audio("public/bgm.ogg");
bgm.loop = true;
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


sfxToggle.addEventListener("change", (event) => {
    if(event.target.checked){
        localStorage.setItem("sfx", "yes");
        getSfx("yes");
    }else{
        localStorage.setItem("sfx", "no");
        getSfx("no");
    }
})


//mobile view buttons toggle
mBtnsToggle.addEventListener("change", (event) => {
    if(event.target.checked){
        localStorage.setItem("mobileBtns", "yes");
        mobileView("yes")
    }else{
        localStorage.setItem("mobileBtns", "no");
        mobileView("no")
    }
})
function mobileView(access){
    if(access == "yes"){
        mobileViewBtns.style.display = "flex";
    }else {
        mobileViewBtns.style.display = "none";
    }
}




const doneS = new Audio("public/done.mp3");
const noS = new Audio("public/wrong.mp3");
const studyS = new Audio("public/study.mp3");
const miningS = new Audio("public/mining.mp3");
const gymS = new Audio("public/gym.mp3"); 
const allSounds = [doneS, noS, studyS, miningS, gymS];
allSounds.forEach(sound => {
    sound.volume = 0.5;
})

function getSfx(access){
    if(access == "yes"){
        allSounds.forEach(sound => {
            sound.volume = 0.5;
        })
    }else{
        allSounds.forEach(sound => {
            sound.volume = 0;
        })
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
settingsBg.addEventListener("click", ()=>{
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
            toggleStat("Welcome Home", "This is your stats so far... How is it?", know, hearts, coins, "Ok", undefined, undefined, undefined, true);
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
                const coinsCave = randomNumber(40, 50);
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
const ppBtn = document.getElementById("pp-btn");

function toggleStat (head, para, know, hearts, coins, btn, timeDelayforStats, loadingMessage, sound, isHome){

    document.getElementById("pp-h").innerText = head;
    document.getElementById("pp-para").innerText = para;
    if(know<0){
        document.getElementById("pp-edu").innerText = know;
    }else{
        document.getElementById("pp-edu").innerText = "+" + know;
    }
    if(hearts<0){
        document.getElementById("pp-hearts").innerText = hearts;
    }else{
        document.getElementById("pp-hearts").innerText = "+" + hearts;
    }
    if(coins<0){
        document.getElementById("pp-coins").innerText = coins;
    }else{
        document.getElementById("pp-coins").innerText = "+" + coins;
    }
    document.getElementById("pp-btn").innerText = btn;
    if(timeDelayforStats != undefined){
        statsContainer.style.opacity = 0;
    }
    
    
    bg.style.display = "unset";
    pp.style.display = "unset";

    requestAnimationFrame(() => {
        bg.style.opacity = 1;
        pp.style.opacity = 1;
        if(isHome == true){
            ppBtn.style.opacity = 1;
            ppBtn.style.pointerEvents = "all";
            statsContainer.style.opacity = 0;
            statsContainer.style.display = "none";
            document.getElementById("pp-para").innerText = `You have ${know} knowledge, ${hearts} hearts, ${coins} coins so far! `;
        }
        if(timeDelayforStats != undefined){
            if(statsContainer.style.display == "none"){
                statsContainer.style.display = "flex";
            }
            document.getElementById("pp-para").innerText = loadingMessage;
            sound.currentTime = 0;
            sound.play();
            setTimeout(() => {
                statsContainer.style.opacity = 1;
                document.getElementById("pp-para").innerText = para;
                ppBtn.style.opacity = 1;
                ppBtn.style.pointerEvents = "all";
            },timeDelayforStats)
        }
    })

}

ppBtn.addEventListener("click", closeToggle);
let updateStats = false;
function closeToggle(){
    ppBtn.style.opacity = 0;
    ppBtn.style.pointerEvents = "none";
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
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve();
        }, time)
    })
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
            }else if (shopBtn == shopBtns[1]) {
                localStorage.setItem("speed", 8);
            }else if (shopBtn == shopBtns[2]) {
                localStorage.setItem("speed", 12);
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
shopBg.addEventListener("click", ()=>{
    shopBg.style.opacity = 0;
    shopBg.style.zIndex = -10;
    shopView.style.transform = "translate(-50%,-50%) scale(0) ";
})


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
    }else if(what == "mobile"){
        noMoneyH.innerText = "Disclaimer";
        noMoneyPara.innerText = "You are using a low width device, where Doodly works but may have some bugs. So kindly switch to a high width device or if u find any bugs in this device let us know in the feedback form... Enjoyy!!!";
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

investBg.addEventListener("click", () => {
    investBg.style.opacity = 0;
    investBg.style.zIndex = -10;
    investView.style.transform = "translate(-50%,-50%) scale(0) ";
})





// Mobile controls
const mobileUp = document.getElementById("up-btn");
const mobileDown = document.getElementById("down-btn");
const mobileLeft = document.getElementById("left-btn");
const mobileRight = document.getElementById("right-btn");


let mobileInterval = null;

function startMove(direction){
    if(mobileInterval) return;
    legOne.style.animation = "walk 1s infinite";
    legTwo.style.animation = "walk 1s infinite 0.5s";
    mobileInterval = setInterval(()=>{
        let speed = localStorage.getItem("speed") == null 
            ? 2 
            : Number(localStorage.getItem("speed"));
        let pos;
        if(direction == "right"){
            pos = parseFloat(getComputedStyle(doo).left);
            doo.style.left = (pos + speed) + "px";
            doo.style.transform = "scaleX(1)";
            sayText.style.transform = "scaleX(1) translateX(-50%)";

        }
        if(direction == "left"){
            pos = parseFloat(getComputedStyle(doo).left);
            doo.style.left = (pos - speed) + "px";
            doo.style.transform = "scaleX(-1)";
            sayText.style.transform = "scaleX(-1) translateX(50%)";
        }
        if(direction == "up"){
            pos = parseFloat(getComputedStyle(doo).top);
            doo.style.top = (pos - speed) + "px";
        }
        if(direction == "down"){
            pos = parseFloat(getComputedStyle(doo).top);
            doo.style.top = (pos + speed) + "px";
        }
    },16);
}

function stopMove(){
    clearInterval(mobileInterval);
    mobileInterval = null;

    legOne.style.animation = "none";
    legTwo.style.animation = "none";
}



[
    [mobileRight,"right"],
    [mobileLeft,"left"],
    [mobileUp,"up"],
    [mobileDown,"down"]
].forEach(([btn,dir])=>{
    const isMobile = window.matchMedia("(max-width:768px)").matches;
    if(isMobile){
        btn.addEventListener("touchstart", e=>{
            e.preventDefault();
            startMove(dir);
        });
        btn.addEventListener("touchend", stopMove);
        btn.addEventListener("touchcancel", stopMove);

    }else{
        btn.addEventListener("pointerdown", e=>{
            e.preventDefault();
            startMove(dir);
        });
        btn.addEventListener("pointerup", stopMove);
        btn.addEventListener("pointerleave", stopMove);
        btn.addEventListener("pointercancel", stopMove);
    }
});


//tutorial
async function tutorial (){

    const tutorialbg = document.getElementById("tutorial");
    tutorialbg.style.opacity = 1;
    tutorialbg.style.pointerEvents = "all";
    tutorialbg.style.zIndex = 1;

    const tbtns = document.querySelectorAll(".i-btn");
    tbtns.forEach((button,index) => {
        button.style.display = "none";
    })

    await say("Hi I am Doo, move around here using arrow keys.", 6000);

    const tHome = document.getElementById("item1");
    tHome.style.zIndex = 1;
    await say("This is my home.", 5000)

    const tScho = document.getElementById("item4");
    tHome.style.zIndex = "unset";
    tScho.style.zIndex = 1;
    await say("You can earn knowledge from the school.", 5000)

    const tHos = document.getElementById("item2");
    const tGym = document.getElementById("item6");
    tScho.style.zIndex = "unset";
    tHos.style.zIndex = 1;
    tGym.style.zIndex = 1;
    await say("Improve your health and earn hearts from hospital and gym.", 7000);

    const tCave = document.getElementById("item5");
    const tJob = document.getElementById("item7");
    const tInv = document.getElementById("item8");
    tHos.style.zIndex = "unset";
    tGym.style.zIndex = "unset";
    tCave.style.zIndex = 1;
    tJob.style.zIndex = 1;
    tInv.style.zIndex = 1;
    await say("Earn coins from Jobs or mine em from the cave or just invest!!", 7000);

    const tShop = document.getElementById("item3");
    tCave.style.zIndex = "unset";
    tJob.style.zIndex = "unset";
    tInv.style.zIndex = "unset";
    tShop.style.zIndex = 1;
    await say("Buy cool stuff from the shop and enjoyy!!", 7000);

    tShop.style.zIndex = "unset";
    await say("Hover over any building to see the possible rewards (black text) and cost (red text)", 7000);

    
    tbtns.forEach((button,index) => {
        button.style.display = "unset";
    })

    tutorialbg.style.opacity = 0;
    tutorialbg.style.pointerEvents = "none";
    tutorialbg.style.zIndex = -10;

    localStorage.setItem("newPlayer", "false")
}
const tutorialBtn = document.getElementById("tutorial-btn")
tutorialBtn.addEventListener("click", ()=>{
    settingsClose.click()
    tutorial()
})




// temp change of values
function temp(a,b,c){
    updateStats= true;
    changeStats(a,b,c)
    updateStats=false;
}