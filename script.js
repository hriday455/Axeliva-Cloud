document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinksDirect = document.querySelectorAll('.nav-links > li > a:not(.dropbtn)'); // Direct links excluding dropdown button
    const allNavLinksForActiveState = document.querySelectorAll('.nav-links a'); // All links for active state logic
    const mainNavListItems = document.querySelectorAll('.nav-links > li'); // Main list items for animation

    // Mobile Navigation Toggle (Main Menu)
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        // Animate Links (main level)
        mainNavListItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        burger.classList.toggle('toggle');

        // Close any open mobile dropdowns when closing main nav
        if (!nav.classList.contains('nav-active')) {
            document.querySelectorAll('.dropdown.active-mobile-dropdown').forEach(openDropdown => {
                openDropdown.classList.remove('active-mobile-dropdown');
                const arrow = openDropdown.querySelector('.dropbtn .arrow');
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            });
        }
    });

    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        if (dropbtn) {
            dropbtn.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) { // Only apply click toggle for mobile
                    e.preventDefault(); // Prevent default anchor behavior

                    // Close other open dropdowns before opening the current one
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown && otherDropdown.classList.contains('active-mobile-dropdown')) {
                            otherDropdown.classList.remove('active-mobile-dropdown');
                            const otherArrow = otherDropdown.querySelector('.dropbtn .arrow');
                             if (otherArrow) otherArrow.style.transform = 'rotate(0deg)';
                        }
                    });
                    // Toggle current dropdown
                    dropdown.classList.toggle('active-mobile-dropdown');
                    const arrow = dropbtn.querySelector('.arrow');
                    if (arrow) {
                        arrow.style.transform = dropdown.classList.contains('active-mobile-dropdown') ? 'rotate(180deg)' : 'rotate(0deg)';
                    }
                }
            });
        }
    });


    // Function to close mobile navigation and reset states
    const closeMobileNav = () => {
        if (nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            mainNavListItems.forEach(li => li.style.animation = ''); // Reset animation

            // Close any open mobile dropdowns
            document.querySelectorAll('.dropdown.active-mobile-dropdown').forEach(openDropdown => {
                openDropdown.classList.remove('active-mobile-dropdown');
                const arrow = openDropdown.querySelector('.dropbtn .arrow');
                if (arrow) arrow.style.transform = 'rotate(0deg)';
            });
        }
    };

    // Close mobile nav when a non-dropdown link is clicked
    navLinksDirect.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    // Close mobile nav when a dropdown ITEM link is clicked
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });


    // Smooth scroll for internal links (CSS handles this with scroll-behavior: smooth)
    // Active Link Highlighting
    const sections = document.querySelectorAll("main section");
    const headerElement = document.querySelector('header');

    window.addEventListener("scroll", () => {
        let current = "";
        const headerHeight = headerElement ? headerElement.offsetHeight + 50 : 120; // Default if header not found

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - headerHeight) {
                current = section.getAttribute("id");
            }
        });

        allNavLinksForActiveState.forEach((a) => {
            a.classList.remove("active");
            const href = a.getAttribute("href");
            if (href && href.substring(1) === current) {
                a.classList.add("active");
                // If it's a dropdown item, also activate its parent "Services" link (dropbtn)
                const parentDropdown = a.closest('.dropdown');
                if (parentDropdown) {
                    const dropbtn = parentDropdown.querySelector('.dropbtn');
                    if (dropbtn) dropbtn.classList.add('active');
                }
            }
        });

        // Special case for top of page / hero section
        // If no section is 'current' (e.g., scrolled to the very top or above first section trigger point)
        // and hero link exists, make it active.
        const heroLink = document.querySelector('nav .nav-links li a[href="#hero"]');
        if (current === "" && pageYOffset < (sections.length > 0 ? sections[0].offsetTop - headerHeight : 500) && heroLink) {
            allNavLinksForActiveState.forEach(a => a.classList.remove("active")); // Clear all
            heroLink.classList.add("active");
        } else if (current === "hero" && heroLink) { // Explicitly handle hero if it's the current section
            allNavLinksForActiveState.forEach(a => {
                if (a !== heroLink) a.classList.remove("active");
            });
            heroLink.classList.add("active");
        }

    });

    // Update Footer Year
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});