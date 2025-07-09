document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'night') {
        body.classList.add('night-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Change icon to sun
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Default to moon icon
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('night-theme');
        if (body.classList.contains('night-theme')) {
            localStorage.setItem('theme', 'night');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Change icon to sun
        } else {
            localStorage.setItem('theme', 'day');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Change icon to moon
        }
    });


    // 1. Smooth Scrolling for Navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // Optional: Close mobile nav if open (if you implement a hamburger menu later)
            const navUl = document.querySelector('#main-nav ul');
            // if (navUl.classList.contains('show')) {
            //     navUl.classList.remove('show');
            // }
        });
    });

    // 2. Pop-Up Details for Skills, Projects, and Certificates
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const closeButton = document.querySelector('.close-button');

    function openModal(title, text) {
        modalTitle.textContent = title;
        modalText.textContent = text;
        modal.classList.add('show'); // Add 'show' class to trigger CSS transition
    }

    function closeModal() {
        modal.classList.remove('show'); // Remove 'show' class to trigger CSS transition
    }

    // Attach click listeners to skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h3').textContent;
            const description = item.dataset.fullDesc; // Get description from data attribute
            openModal(title, description);
        });
    });

    // Attach click listeners to project items
    document.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('click', (event) => {
            // Check if the clicked element or its parent is a project link button
            const isLinkButtonClicked = event.target.closest('.project-link-button');

            if (isLinkButtonClicked) {
                // If a button was clicked, let the button's href handle the navigation
                return;
            }

            // If not a button, open the modal with full description
            const title = item.querySelector('h3').textContent;
            const description = item.dataset.fullDesc;
            openModal(title, description);
        });
    });

    // Attach click listeners to certificate items
    document.querySelectorAll('.certificate-item').forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h3').textContent;
            const description = item.dataset.fullDesc;
            openModal(title, description);
        });
    });

    // Close modal event listeners
    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // 3. Section Scroll Animations (using Intersection Observer)
    const sections = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optionally, stop observing once animated to avoid re-triggering
                // observer.unobserve(entry.target); // Uncomment if you want animation only once
            } else {
                // Optional: remove 'active' class if you want sections to re-animate on scroll back
                // entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 4. Highlight active navigation link based on scroll position
    const navLinks = document.querySelectorAll('#main-nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Adjust this value if your sticky header covers the section title
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = '#' + section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });

    // Initial check for hero section animation on load (CSS handles this, but good to ensure JS is ready)
    // No specific JS needed for .animate-hero as CSS animation-delay handles it.
});
