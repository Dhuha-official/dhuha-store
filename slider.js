const slides = document.querySelectorAll(".hero-slide");

let current = 0;

if(slides.length){

setInterval(()=>{

slides[current].classList.remove("active");

current++;

if(current>=slides.length){
current=0;
}

slides[current].classList.add("active");

},4000);

}
