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
        btn.innerHTML = OriginalText; // restore text
    }, 2000);
});

// ---------------------------------------------------------------
// Sticky Navbar & Profile Pic Animation
// ---------------------------------------------------------------
const navbar = document.getElementById("navBar");
const navMain = document.querySelector(".navMain");
const profilePicBox = document.getElementById("profilePicBox");
const profilePic = document.querySelector('.profilePic');
const navOffsetTop = navbar.offsetTop;
let isSticky = false;
let smallActive = false;
const triggerTopPx = 20;

    // store original nav content
    const originalNav = navMain.innerHTML;
    // new nav content for sticky mode
    const stickyNav = `
    <li><a href="#homeDiv" class="nav-link active2">Home</a></li>
    <li><a href="#aboutDiv" class="nav-link">About</a></li>
    <li><a href="#resumeDiv" class="nav-link">Resume</a></li>
    <li><a href="#projectsDiv" class="nav-link">Projects</a></li>
    <li><a href="#blogsDiv" class="nav-link">Blogs</a></li>
    <li><a href="#contactDiv" class="nav-link">Contact</a></li>
    <li style="width: 500px"><br></li>
    `;

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Sticky navbar
    if (scrollY > navOffsetTop + 10 && !isSticky) {
        navbar.classList.add("sticky");
        navMain.innerHTML = stickyNav;
        navMain.appendChild(profilePicBox);
        isSticky = true;
    } else if (scrollY <= navOffsetTop + 10 && isSticky) {
        navbar.classList.remove("sticky");
        navMain.innerHTML = originalNav;
        isSticky = false;
    }

    // Profile pic shrink/pop
    const picRect = profilePic.getBoundingClientRect();
    if (picRect.top <= triggerTopPx && !smallActive) {
        
        profilePic.classList.add('shrinkToCorner');
        navMain.innerHTML = stickyNav;
        navMain.appendChild(profilePicBox);

        void profilePic.offsetWidth; // force reflow
        profilePic.classList.add('popShrink');
        
        profilePic.addEventListener('animationend', () => {
            profilePic.classList.remove('popShrink');
        }, { once: true });

        smallActive = true;
    } else if (picRect.top > triggerTopPx && smallActive) {
        profilePic.classList.remove('shrinkToCorner');
        navMain.innerHTML = originalNav;
        smallActive = false;
    }
});

// ---------------------------------------------------------------
// Active Link Highlighting
// ---------------------------------------------------------------
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

// ---------------------------------------------------------------
// Smooth Scroll on Nav Click
// ---------------------------------------------------------------
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ---------------------------------------------------------------
// Typewriter Effect for Title
// ---------------------------------------------------------------
const mono1 = document.querySelector('.header-mono1');
const mono2 = document.querySelector('.header-mono2');

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

// Start animation
typeWriterLoop();

// ---------------------------------------------------------------
// Quote Box Animation on Scroll
// ---------------------------------------------------------------
// Run pop-in once the section is visible on load
  document.addEventListener('DOMContentLoaded', () => {
    const quoteBox = document.querySelector('#homeDiv .quote-box');
    if (quoteBox) {
      setTimeout(() => quoteBox.classList.add('show'), 100);
    }
  });
  
//   ---------------------------------------------------------------
// Resume Section Toggle Switch
// -----------------------------------------------------------------

const heading = document.getElementById("resumeHeading")[0];
const heading2 = document.getElementsByClassName("resumeButton")[0];
const content = document.querySelector(".resumeBox")[0]; // use class selector
const headingText = document.querySelector(".resumeHeading")[0];

heading.addEventListener("click", () => {
  content.classList.toggle("show");

  if (content.classList.contains("show")) {
    headingText.innerHTML = "Resume ▲";
    content.style.display = "flex";
  } else {
    headingText.innerHTML = "Resume ▼";
    content.style.display = "none";
  }
});