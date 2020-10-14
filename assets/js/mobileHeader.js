/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function toggleMenu() {
    var menuButton = document.getElementById("menuButton");
    if (document.getElementById("navLinks").style.display === "block") {
        document.getElementById("navLinks").style.display = "none";
    } else {
        document.getElementById("navLinks").style.display = "block";
    }
}