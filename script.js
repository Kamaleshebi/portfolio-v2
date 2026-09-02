/* ==============================
   TYPING EFFECT
============================== */

const texts = [
    "Frontend Developer",
    "Creative Designer",
    "Final Year Student",
    "Building Modern Web Experiences"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {

    const currentText = texts[textIndex];

    if (!isDeleting) {

        typingElement.textContent =
            currentText.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentText.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1400);
            return;
        }

    } else {

        typingElement.textContent =
            currentText.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            isDeleting = false;

            textIndex =
                (textIndex + 1) % texts.length;
        }
    }

    const speed = isDeleting ? 50 : 90;

    setTimeout(typeEffect, speed);
}


/* ==============================
   SCROLL REVEAL
============================== */

const revealElements = document.querySelectorAll(
    ".about-content, " +
    ".about-number, " +
    ".skills-header, " +
    ".skill-card, " +
    ".projects-header, " +
    ".project-card, " +
    ".education-number, " +
    ".education-header, " +
    ".timeline-card, " +
    ".contact-number, " +
    ".contact-content"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {
        threshold: 0.15
    }

);

revealElements.forEach((element) => {
    observer.observe(element);
});


/* ==============================
   SKILLS STAGGER
============================== */

const skillCards =
    document.querySelectorAll(".skill-card");

skillCards.forEach((card, index) => {

    card.style.transitionDelay =
        `${index * 0.08}s`;

});


/* ==============================
   PROJECT STAGGER
============================== */

const projectCards =
    document.querySelectorAll(".project-card");

projectCards.forEach((card, index) => {

    card.style.transitionDelay =
        `${index * 0.1}s`;

});


/* ==============================
   NAVBAR SCROLL EFFECT
============================== */

const navbar =
    document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("navbar-scrolled");

    } else {

        navbar.classList.remove("navbar-scrolled");

    }

});


/* ==============================
   ACTIVE NAV LINK
============================== */

const sections =
    document.querySelectorAll(
        "main[id], section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        /*
         * Navbar height is 80px on desktop
         * and 70px on mobile.
         *
         * Use a dynamic offset instead of
         * the old fixed 180px value.
         */

        const navbarHeight =
            window.innerWidth <= 768 ? 70 : 80;

        const sectionTop =
            section.offsetTop - navbarHeight - 10;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});


/* ==============================
   HERO MOUSE PARALLAX
============================== */

const hero =
    document.querySelector(".hero");

const heroContent =
    document.querySelector(".hero-content");

if (hero && heroContent) {

    hero.addEventListener("mousemove", (event) => {

        if (window.innerWidth > 768) {

            const x =
                (window.innerWidth / 2 - event.clientX) / 70;

            const y =
                (window.innerHeight / 2 - event.clientY) / 70;

            heroContent.style.transform =
                `translate(${x}px, ${y}px)`;

        }

    });

    hero.addEventListener("mouseleave", () => {

        heroContent.style.transform =
            "translate(0,0)";

    });

}


/* ==============================
   PROJECT 3D TILT
============================== */

projectCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        if (window.innerWidth > 768) {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                (y - centerY) / 35;

            const rotateY =
                (centerX - x) / 35;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-10px)`;

        }

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* ==============================
   CURSOR GLOW
============================== */

const cursorGlow =
    document.createElement("div");

cursorGlow.classList.add("cursor-glow");

document.body.appendChild(cursorGlow);

document.addEventListener("mousemove", (event) => {

    cursorGlow.style.left =
        event.clientX + "px";

    cursorGlow.style.top =
        event.clientY + "px";

});


/* ==============================
   MOBILE MENU
============================== */

const menuButton =
    document.createElement("button");

menuButton.classList.add("menu-button");

menuButton.setAttribute(
    "aria-label",
    "Open navigation menu"
);

menuButton.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
`;

navbar.appendChild(menuButton);

const navList =
    document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {

    menuButton.classList.toggle("active");

    navList.classList.toggle("menu-open");

});


/* ==============================
   CLOSE MOBILE MENU AFTER CLICK
============================== */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        menuButton.classList.remove("active");

        navList.classList.remove("menu-open");

    });

});


/* ==============================
   LOGO CLICK = HOME
============================== */

const logo =
    document.querySelector(".logo");

logo.style.cursor = "pointer";

logo.addEventListener("click", () => {

    document
        .querySelector("#home")
        .scrollIntoView({
            behavior: "smooth"
        });

});


/* ==============================
   START WEBSITE
============================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        typeEffect();

    }, 2600);

});
