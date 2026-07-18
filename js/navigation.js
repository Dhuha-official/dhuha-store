const page = window.location.pathname.split("/").pop();

document.querySelectorAll(".bottom-nav a").forEach(link=>{

const href = link.getAttribute("href");

if(href === page){

link.style.color="#111";
link.style.fontWeight="700";

}

});
