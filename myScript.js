//Here will be the java script codesdocument.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();

        const targetSectionId = this.getAttribute('data-section');
        const targetSection = document.getElementById(targetSectionId);

        if (!targetSection) return; // Exit if target section is not found

        // Hide all sections
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show the target section
        targetSection.classList.add('active');

        // Remove active2 class from all links
        navLinks.forEach(link => {
            link.classList.remove('active2');
        });

        // Add active2 class to the clicked link
        this.classList.add('active2');
    });
});
