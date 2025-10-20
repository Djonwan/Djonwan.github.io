// Gestion du hamburger menu
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav.classList.toggle("active");
});


// Animation des skills au scroll
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.querySelector('.skill-progress');
                const width = progress.getAttribute('data-width');
                
                setTimeout(() => {
                    progress.style.width = width + '%';
                }, 300);
                
                // Animation du pourcentage
                const percent = entry.target.querySelector('.skill-percent');
                let start = 0;
                const end = parseInt(width);
                const duration = 1500;
                const stepTime = Math.abs(Math.floor(duration / end));
                
                const timer = setInterval(() => {
                    start++;
                    percent.textContent = start + '%';
                    
                    if (start === end) {
                        clearInterval(timer);
                        percent.textContent = end + '%';
                    }
                }, stepTime);
            }
        });
    }, { threshold: 0.5 });
    
    skillItems.forEach(item => observer.observe(item));
}

// Lancer l'animation quand la page charge
document.addEventListener('DOMContentLoaded', animateSkills);

// Smooth scroll pour la navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// Gestion des liens de navigation
const navLinks = document.querySelectorAll("nav ul li a");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // Prevent default only for internal section links
    if (link.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80, // Adjust for fixed header
          behavior: "smooth",
        });
      }
    }
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    if (nav.classList.contains("active")) {
      hamburger.classList.remove("active");
      nav.classList.remove("active");
    }
  });
});

// Gestion du scroll pour activer le lien correspondant
const sections = document.querySelectorAll("section[id]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  {
    root: null,
    threshold: 0.3, // Trigger when 30% of the section is visible
    rootMargin: "-80px 0px 0px 0px", // Adjust for fixed header
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

// Animation Intersection Observer pour les éléments
const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeIn 1s ease-out forwards";
        if (entry.target.classList.contains("progress")) {
          entry.target.style.width = entry.target.style.width || "100%";
        }
        animationObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document
  .querySelectorAll(
    ".home-content, .home-image, .about-content, .about-image, .skill-card, .work-card, .testimonial-card, .contact-form, .contact-info, .progress"
  )
  .forEach((el) => {
    animationObserver.observe(el);
  });

// Gestion des erreurs d'image
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", () => {
    img.setAttribute("src", "");
    img.style.background = "#e0e0e0";
    img.style.color = "#555";
    img.style.display = "flex";
    img.style.alignItems = "center";
    img.style.justifyContent = "center";
    img.style.fontSize = "14px";
    img.style.textAlign = "center";
    img.style.padding = "10px";
    img.textContent = img.getAttribute("data-fallback") || "Image Unavailable";
  });
});


// Initialiser EmailJS avec votre User ID
(function () {
  emailjs.init("rrBvGOPTPGtjjk9EK"); // Remplacez par votre User ID EmailJS
})();

const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let isValid = true;

  // Réinitialiser les messages d'erreur
  document
    .querySelectorAll(".error-message")
    .forEach((error) => (error.style.display = "none"));

  // Valider le nom
  const name = document.getElementById("name").value.trim();
  if (!name) {
    document.getElementById("nameError").style.display = "block";
    isValid = false;
  }

  // Valider l'email
  const email = document.getElementById("email").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    document.getElementById("emailError").style.display = "block";
    isValid = false;
  }

  // Valider le message
  const message = document.getElementById("message").value.trim();
  if (!message) {
    document.getElementById("messageError").style.display = "block";
    isValid = false;
  }

  if (isValid) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Envoi en cours...";

    // Paramètres pour EmailJS
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      to_email: "djongangpaklam@gmail.com",
    };

    // Envoyer l'email via EmailJS
    emailjs.send("service_u5qesjd", "template_kgjpogt", templateParams).then(
      function (response) {
        alert("Message envoyé avec succès !");
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = "Envoyer";
      },
      function (error) {
        alert("Erreur lors de l'envoi : " + JSON.stringify(error));
        submitBtn.disabled = false;
        submitBtn.textContent = "Envoyer";
      }
    );
  }
});
