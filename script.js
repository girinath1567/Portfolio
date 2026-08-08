/* =============================================
   PORTFOLIO - script.js
   Handles interactivity, animations, and modals
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. DYNAMIC YEAR ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- 2. NAVBAR SCROLL EFFECT ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ---------- 3. MOBILE MENU TOGGLE ---------- */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- 4. ACTIVE SECTION HIGHLIGHTING ---------- */
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* ---------- 6. SCROLL REVEAL ANIMATIONS ---------- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

});

/* ---------- 7. PROJECT MODAL LOGIC ---------- */
const projectData = {
  project1: {
    title: "Air Qualty Sysyem (AQM System)",
    category: "Embedded Systems",
    desc: "The Air Quality Monitoring System is an embedded IoT project designed to monitor environmental conditions in real time .It measures air quality parameters using gas and environmental sensors and displays the collected data for continuous monitoring.The system helps create healthier environments by providing accurate and timely air quality information.",
    img: "AQM project.jpg",
    
    
    team: "3 Members",
    status: "Completed",
    features: [
      "Real-time air quality monitoring",
      "Gas concentration detection using sensors",
      "Temperature and humidity monitoring",
      "Live data display on LCD."
    ],
    skills: ["Ardiuno IDE", "Sensor"],
    github: "https://github.com/yourusername/project1",
    live: "https://project1-demo.com"
  },
  project2: {
    title: "Radar Detection System",
    category: "IOT",
    desc: "The Radar Detection System is an embedded and IOt project that detects and tracks nearby objects using an ultrasonic sensor and a rotating servo motor.It scans the surrounding area in real time and visualizes object positions through a radar-style interface.The system demonstrates distance measurement, object detection and real-time monitoring for automation and surveillance applications.",
    img: "Radar project.jpg",
    
    duration: "1 Day",
    team: "Individual",
    role: "iot ",
    status: "Completed",
    features: [
      "180° real-time object scanning",
      "Accurate distance measurement using an ultrasonic sensor",
      "ive radar visualization on a computer display",
      "uitable for obstacle detection and automation projects"
    ],
    skills: ["IOT", "Web Design", ],
    github: "https://github.com/yourusername/project2",
    live: "#"
  },
  project3: {
    title: "RootSense AI",
    category: "IOT",
    desc: "RootSense AI is an IoT-based smart agriculture system designed to monitor crop root health and soil conditions in real time.It collects environmental data using multiple sensors and transmits the information through an ESP32 for continuous monitoring.The system enables precision farming by helping farmers improve crop health, optimize irrigation and increase agricultural productivity.",
    img: "Root Sense Projects.jpg",
    
    duration: "2 Days",
    team: "4 Members",
    role: "Team Lead",
    status: "Completed",
    features: [
      "Real-time crop root health monitoring",
      "Soil moisture, temperature and humidity sensing",
      "Live data monitoring through a web dashboard",
      "Precision irrigation and smart farming support"
    ],
    skills: ["Github", "ThingSpeak", "ESP32"],
    github: "https://github.com/yourusername/project3",
    live: "#"
  }
};

const modalBackdrop = document.getElementById('modal-backdrop');
const projectModal = document.getElementById('project-modal');

function openProjectModal(projectId) {
  const data = projectData[projectId];
  if (!data) return;

  // Populate Image
  const imgEl = document.getElementById('modal-img');
  imgEl.src = data.img;
  imgEl.alt = `Screenshot of ${data.title}`;
  imgEl.style.display = 'block';
  document.getElementById('modal-img-text').textContent = data.imgPlaceholder;

  // Populate Text
  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-category').textContent = data.category;
  document.getElementById('modal-desc').textContent = data.desc;
  
  // Populate Meta
  document.getElementById('modal-duration').textContent = data.duration;
  document.getElementById('modal-team').textContent = data.team;
  document.getElementById('modal-role').textContent = data.role;
  document.getElementById('modal-status').textContent = data.status;

  // Populate Features
  const featuresList = document.getElementById('modal-features-list');
  featuresList.innerHTML = '';
  data.features.forEach(feature => {
    const li = document.createElement('li');
    li.textContent = feature;
    featuresList.appendChild(li);
  });

  // Populate Skills
  const skillsWrap = document.getElementById('modal-skills');
  skillsWrap.innerHTML = '';
  data.skills.forEach(skill => {
    const span = document.createElement('span');
    span.className = 'modal-skill-badge';
    span.textContent = skill;
    skillsWrap.appendChild(span);
  });

  // Show Modal
  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeProjectModal() {
  modalBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
    closeProjectModal();
  }
});

/* ---------- 8. EXPERIENCE OFFER LETTER TOGGLE ---------- */
function toggleOffer(buttonElement) {
  const targetId = buttonElement.getAttribute('aria-controls');
  const offerSection = document.getElementById(targetId);
  const isExpanded = buttonElement.getAttribute('aria-expanded') === 'true';

  if (isExpanded) {
    offerSection.classList.remove('show');
    buttonElement.setAttribute('aria-expanded', 'false');
    buttonElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> View Offer Letter`;
  } else {
    offerSection.classList.add('show');
    buttonElement.setAttribute('aria-expanded', 'true');
    buttonElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> Hide Offer Letter`;
  }
}

/* ---------- 9. CONTACT FORM HANDLING ---------- */
function handleContactForm(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitBtn = document.getElementById('form-submit-btn');
  const successMsg = document.getElementById('form-success');
  
  // Basic validation check
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Simulate form submission
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending...';
  
  setTimeout(() => {
    form.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message`;
    
    successMsg.textContent = "Thank you! Your message has been sent successfully.";
    successMsg.style.color = "#16a34a"; // green
    
    setTimeout(() => {
      successMsg.textContent = "";
    }, 5000);
  }, 1500);
}