window.onload = function() {
    const hamburger = document.querySelector(".hamburger");
    const navList = document.getElementById("nav-list");

    function toggleButton() {

        hamburger.classList.toggle("active");
        navList.classList.toggle("active");
    }
    
    hamburger.addEventListener("click", toggleButton);
    navList.addEventListener("click", toggleButton);
}
