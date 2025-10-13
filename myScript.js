// ---------------------------------------------------------------
// Header Background Animation
// ---------------------------------------------------------------
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
    <li class="exception"><a href="#homeDiv" class="nav-link active2">Home</a></li>
    <li class="exception"><a href="#aboutDiv" class="nav-link">About</a></li>
    <li class="exception"><a href="#resumeDiv" class="nav-link">Resume</a></li>
    <li class="exception"><a href="#projectsDiv" class="nav-link">Projects</a></li>
    <li class="exception"><a href="#blogsDiv" class="nav-link">Blogs</a></li>
    <li class="exception"><a href="#contactDiv" class="nav-link">Contact</a></li>
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

document.addEventListener("DOMContentLoaded", () => {
  const navSwitch     = document.getElementById("resumeDivClicker");   // navbar control
  const headingBox    = document.getElementById("resumeHeadingBox");   // clickable heading container
  const headingH2     = document.querySelector(".resumeHeading");      // the H2 text
  const resumeBox     = document.querySelector(".resumeBox");          // the collapsible content
  const resumeSection = document.getElementById("resumeDiv");          // section to scroll to

  // sanity check
  if (!headingBox || !headingH2 || !resumeBox) {
    console.error("Resume toggle elements missing:", {
      headingBox, headingH2, resumeBox, navSwitch, resumeSection
    });
    return;
  }

  // Helper: show (idempotent)
  function showResume() {
    resumeBox.classList.add("show");
    headingH2.textContent = "Resume ▲";
    headingBox.classList.add("hide");   // ✅ fixed: use classList
    headingH2.classList.remove("bubble");
    headingBox.classList.remove("resumeHeadingBox");
    headingBox.classList.add("headingBox");
  }

  // Helper: hide (idempotent)
  function hideResume() {
    resumeBox.classList.remove("show");
    headingH2.textContent = "Resume ▼";
    headingBox.classList.remove("hide"); // remove hidden <p> when closed
    headingH2.classList.add("bubble");
    headingBox.classList.remove("headingBox");
    headingBox.classList.add("resumeHeadingBox");
  }

  // Toggle
  function toggleResume() {
    if (resumeBox.classList.contains("show")) {
      hideResume();
    } else {
      showResume();
    }
  }

  // Initial state: make heading pulse if hidden
  if (!resumeBox.classList.contains("show")) {
    headingH2.classList.add("bubble");
  }

  // Heading click toggles
  headingBox.addEventListener("click", () => {
    toggleResume();
  });

  // Nav click: scroll then open (idempotent)
  if (navSwitch) {
    navSwitch.addEventListener("click", (e) => {
      e.preventDefault?.();

      // Scroll to the section first
      if (resumeSection) {
        resumeSection.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        headingBox.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      // Delay so scroll happens first
      setTimeout(() => {
        showResume(); // always open from navbar
      }, 150);
    });
  }
});

// ---------------------------------------------------------------
// Form Details Sending as Email Codes
// ---------------------------------------------------------------
// ✅ Include this only if you’re not initializing EmailJS anywhere else
// Initialize EmailJS with your public key
(function() {
    emailjs.init({
        publicKey: "_SmxFeM8S-kjX5LoF"//"7N9GkSnYT6GnYAWfZ"  // Replace with your actual EmailJS Public Key
    });
})();

// ✅ Attach event listener to your form
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");

    if (!form) {
        console.error("❌ Form with ID 'contactForm' not found!");
        return;
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // ✅ Replace these with your actual EmailJS IDs
        const serviceID = "service_gszwm0i";//"service_v6d3758";
        const templateID = "template_li03woa";//"template_jbzwbvl";

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
