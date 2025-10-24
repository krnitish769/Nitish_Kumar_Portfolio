/* ==================================================================
    --------------------MAIN DESIGN SCRIPT---------------------------
   ================================================================== */

// ===============================================================
// ---------Global Variables accessible from all Script.js--------
// ===============================================================
const mono1 = document.querySelector('.header-mono1');
const mono2 = document.querySelector('.header-mono2');

const resumeBox = document.querySelector(".resumeBox");
const headingBox = document.getElementById("resumeHeadingBox");
const headingH2 = document.querySelector(".resumeHeading");
const navSwitch = document.getElementById("resumeDivClicker");

const navbar = document.getElementById("navBar");
const navMain = document.querySelector(".navMain");
const profilePicBox = document.getElementById("profilePicBox");
const profilePic = document.querySelector('.profilePic');

const navOffsetTop = navbar.offsetTop;

// ===============================================================
// ------------------------Header Scripts-------------------------
// ===============================================================

// ---------------------------------------------------------------
// Animations Only
// ---------------------------------------------------------------
// Header Background Animations
const bgContainer = document.getElementById("bgContainer");

const bgImages = [
  "../Images/BgImage.jpg",
  "Images/Bg2.jpg",
  "Images/Bg3.jpg",
  "Images/Bg4.jpg",
  "Images/Bg5.jpg"
];

let current = 0;

// --- Different animation types ---
const animations = ["fade", "split", "tiles"];

// Main background change function
function changeBackground() {
  const type = animations[Math.floor(Math.random() * animations.length)];
  const nextImage = bgImages[current];
  current = (current + 1) % bgImages.length;

  if (type === "tiles") {
    createTilesEffect(nextImage);
  } else {
    const newBg = document.createElement("div");
    newBg.classList.add("bgImage");
    newBg.style.backgroundImage = `url(${nextImage})`;
    bgContainer.appendChild(newBg);

    if (type === "fade") newBg.classList.add("fade-in");
    if (type === "split") newBg.classList.add("split-enter");

    // Remove old images smoothly
    setTimeout(() => {
      const all = bgContainer.querySelectorAll(".bgImage");
      if (all.length > 1) all[0].remove();
    }, 1500);
  }
}

// Create Mosaic (Tiles) animation
function createTilesEffect(img) {
  bgContainer.innerHTML = "";
  const grid = document.createElement("div");
  grid.classList.add("tilesContainer");
  for (let i = 0; i < 60; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.style.backgroundImage = `url(${img})`;
    tile.style.animationDelay = `${Math.random()}s`;
    grid.appendChild(tile);
  }
  bgContainer.appendChild(grid);

  // remove tiles after 1.5s
  setTimeout(() => { bgContainer.innerHTML = ""; }, 1500);
}

// Initialize and run every 7 seconds
changeBackground();
setInterval(changeBackground, 7000);

// ---------------------------------------------------------------
// Typewriter Effect for Title's Mono
// ---------------------------------------------------------------

const text1 = "Software Engineer";
const text2 = "D e v e l o p e r";

const maxLength = Math.max(text1.length, text2.length); // longest word
const totalDuration = 2500; // total typing time in ms
const speed = totalDuration / maxLength; // time per character

function typeWriterLoop() {
    let i = 0;
    mono1.textContent = '';
    mono2.textContent = '';

    const typingInterval = setInterval(() => {
        if (i < maxLength) {
            if (i < text1.length) mono1.textContent += text1.charAt(i);
            if (i < text2.length) {
                if (text2.charAt(i) != ' ') {
                    mono2.textContent += text2.charAt(i);
                }
            }
            i++;
        } else {
            clearInterval(typingInterval);
            setTimeout(typeWriterLoop, 1000); // loop again after pause
        }
    }, speed);
}
typeWriterLoop();// Started animation

// ---------------------------------------------------------------
// Download Resume Button Animation
// ---------------------------------------------------------------
const btn = document.getElementById("downloadResume");

btn.addEventListener("click", () => {
    const OriginalText = btn.innerHTML; // store original text
    btn.classList.add("clicked"); // turns white
    btn.innerHTML = "Downloading..."; // change text

    setTimeout(() => {
        btn.classList.remove("clicked"); // back to orange
        btn.innerHTML = "Downloaded :)"; // restore text
    }, 4000);

    setTimeout(() => {
        btn.classList.remove("clicked"); // back to orange
        btn.innerHTML = OriginalText; // restore text
    }, 8000);
});


// ===============================================================
// -----------------------Main Scripts----------------------------
// ===============================================================

// -----------------------------------------------------------
// Sticky Navbar & Profile Pic Animation
// -----------------------------------------------------------
let isSticky = false;
let smallActive = false;
const triggerTopPx = 20;

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Sticky navbar
    if (scrollY > navOffsetTop + 10 && !isSticky) {
        navbar.classList.add("sticky");
        navMain.appendChild(profilePicBox);
        isSticky = true;
    } else if (scrollY <= navOffsetTop + 10 && isSticky) {
        navbar.classList.remove("sticky");
        navMain.insertBefore(profilePicBox, navMain.children[3]);
        isSticky = false;
    }

    // Profile pic shrink/pop
    const picRect = profilePic.getBoundingClientRect();
    if (picRect.top <= triggerTopPx && !smallActive) {
        
        profilePic.classList.add('shrinkToCorner');
        navMain.appendChild(profilePicBox);

        void profilePic.offsetWidth; // force reflow
        profilePic.classList.add('popShrink');
        
        profilePic.addEventListener('animationend', () => {
            profilePic.classList.remove('popShrink');
        }, { once: true });

        smallActive = true;
    } else if (picRect.top > triggerTopPx && smallActive) {
        profilePic.classList.remove('shrinkToCorner');
        smallActive = false;
    }
});


// -----------------------------------------------------------
// Active Link Highlighting
// -----------------------------------------------------------
const sections = document.querySelectorAll(".content-section");

window.addEventListener("scroll", () => {
    // Vertical middle of viewport
    let scrollPosition = window.scrollY + window.innerHeight / 2;

    let currentSectionId = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSectionId = section.getAttribute("id");
        }
    });

    // Remove active from all
    document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active2"));

    // Highlight only current
    if (currentSectionId) {
        const currentLink = document.querySelector(`.nav-link[href="#${currentSectionId}"]`);
        if (currentLink) currentLink.classList.add("active2");
    }
});

// -----------------------------------------------------------
// Smooth Scroll on Nav Click
// -----------------------------------------------------------
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// -----------------------------------------------------------
// Quote Box Animation on Scroll
// -----------------------------------------------------------
// Run pop-in once the section is visible on load
  document.addEventListener('DOMContentLoaded', () => {
    const quoteBox = document.querySelector('#homeDiv .quote-box');
    if (quoteBox) {
      setTimeout(() => quoteBox.classList.add('show'), 100);
    }
  });
  
// -----------------------------------------------------------
// Resume Section Toggle Switch
// -----------------------------------------------------------
//function to show resume
function showResume() {
    if (!resumeBox || !headingBox || !headingH2) return;
    resumeBox.classList.add("show");
    headingH2.textContent = "Resume ▲";
    headingBox.classList.add("hide");
    headingH2.classList.remove("bubble");
    headingBox.classList.remove("resumeHeadingBox");
    headingBox.classList.add("headingBox");
}
//function to hide resume
function hideResume() {
    if (!resumeBox || !headingBox || !headingH2) return;
    resumeBox.classList.remove("show");
    headingH2.textContent = "Resume ▼";
    headingBox.classList.remove("hide");
    headingH2.classList.add("bubble");
    headingBox.classList.remove("headingBox");
    headingBox.classList.add("resumeHeadingBox");
}

// Delegated click listener - That stores the current node's references
document.addEventListener("click", (e) => {

    // Heading click - Toggle Switch of Resume
    if (e.target.closest(".resumeHeading")) {
        if (resumeBox.classList.contains("show")) hideResume();
        else showResume();
    }

    // Navbar click
    if (e.target.closest("#resumeDivClicker")) {
        const resumeSection = document.getElementById("resumeDiv");
        if (!resumeSection) return;

        resumeSection.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => showResume(), 800);
    }
});


// -----------------------------------------------------------
// Form Details Sending as Email Codes
// -----------------------------------------------------------
// Initialize EmailJS with your public key
(function() {
    emailjs.init({
        publicKey: "_SmxFeM8S-kjX5LoF" // "7N9GkSnYT6GnYAWfZ"  // Keep both if you switch later
    });
})();

// Attach event listener to your form
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const messageInput = document.getElementById("message");

    if (!form) {
        console.error("❌ Form with ID 'contactForm' not found!");
        return;
    }

    // Allow pressing Enter to submit (Shift+Enter still adds newline)
    messageInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevents newline
            form.requestSubmit(); // Triggers the form submit
        }
    });

    // Handle normal form submission (EmailJS)
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Keep your original IDs here
        const serviceID = "service_gszwm0i"; // "service_v6d3758";
        const templateID = "template_li03woa"; // "template_jbzwbvl";

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                alert("✅ Message sent successfully!");
                form.reset();
            })
            .catch((error) => {
                console.error("❌ EmailJS Error:", error);
                alert("❌ Failed to send message. Check console for details.");
            });
    });
});


// ===============================================================
// ------------------------Footer Scripts-------------------------
// ===============================================================
