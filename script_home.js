const nav = document.getElementById("nav");
const pageOne = document.getElementById("page1");
const pageTwo = document.getElementById("page2");
const pageThree = document.getElementById("page3");
window.addEventListener("scroll", ()=> {
    if (window.scrollY != 0){
        nav.classList.add("n-scroll");
    }else{
        nav.classList.remove("n-scroll");
    }
});
window.addEventListener("scroll", ()=>{
    console.log(window.scrollY)
    if(window.scrollY < 500){
        pageOne.classList.add("active");
        pageTwo.classList.remove("active");
        pageThree.classList.remove("active");
    }else if(window.scrollY < 1000){
        pageOne.classList.remove("active");
        pageTwo.classList.add("active");
        pageThree.classList.remove("active");
    }else if(window.scrollY > 1000){
        pageOne.classList.remove("active");
        pageTwo.classList.remove("active");
        pageThree.classList.add("active");
    }
});
window.addEventListener("load", ()=>{
    document.getElementById("loading").style.display = "none";
})