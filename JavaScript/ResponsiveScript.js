/* ==================================================================
    --------------------RESPONSIVE DESIGN SCRIPT---------------------
    [LargeDisplays-1200px, Laptops-992px, Tablets(Portrait)-768px,
    Phones(Landscape)-915px, Phones(Portrait)-600px]
   ================================================================== */

// ===============================================================
// ---------Global Variables accessible from all Script.js--------
// ===============================================================

// Pre-declared global variables
// const resumeBox = document.querySelector(".resumeBox");
// const headingBox = document.getElementById("resumeHeadingBox");
// const headingH2 = document.querySelector(".resumeHeading");
// const navSwitch = document.getElementById("resumeDivClicker");

// Title's Mono Variables
const mono1 = document.querySelector('.header-mono1');
const mono2 = document.querySelector('.header-mono2');
// Navbar and Profile pic's Variables
const navbar = document.getElementById("navBar");
const navMain = document.querySelector(".navMain");
const profilePicBox = document.getElementById("profilePicBox");
const profilePic = document.querySelector('.profilePic');
// This variable will be used to detect navbar's position while scrolling
const navOffsetTop = navbar.offsetTop;


// =============================================
// --------[For Tablets(Portrait)-786px]--------
// =============================================


// =============================================
// --------[For Mobile(Landscape)-915px]--------
// =============================================



// =============================================
// --------[For Mobile(Portrait)-600px]---------
// =============================================
// To match under 600px width
const mobilePortrait = window.matchMedia("(max-width: 600px)");

function handleMobilePortrait(e) {
    if (e.matches) {
        // Codes to run when screen is <= 600px
        
        // ==========================================
        // -------------Header Scripts---------------
        // ==========================================


        // ==========================================
        // -------------Main Scripts---------------
        // ==========================================

        // ==========================================
        // -------------Footer Scripts---------------
        // ==========================================

    } else {
        // Code to revert when larger again
    }

    mobilePortrait.addEventListener("change", handleMobilePortrait);
    // Run once on load
    handleMobilePortrait(mobilePortrait);

}

// ===============================================================
// ----------------------Still in Progress------------------------
// ===============================================================