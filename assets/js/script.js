'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}




// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    // Split the data-category value by commas to handle multiple categories
    let categories = filterItems[i].dataset.category.toLowerCase().split(", ");

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (categories.includes(selectedValue)) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



/// Select all project items and project detail sections
const projectItems = document.querySelectorAll('.project-item');
const portfolioSection = document.querySelector('.portfolio');
const projectDetails = document.querySelectorAll('.project-detail');

// Add event listeners to each project item
projectItems.forEach(item => {
  item.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default link behavior

    // Hide portfolio section
    portfolioSection.style.display = "none";

    // Show the relevant project detail section
    const projectTitle = this.querySelector('.project-title').innerText;
    projectDetails.forEach(detail => {
      if (detail.getAttribute('data-project') === projectTitle) {
        detail.style.display = "block";
      } else {
        detail.style.display = "none"; // Hide other project details
      }
    });
  });
});

// Handle back to portfolio click
const backToPortfolioBtns = document.querySelectorAll('.back-to-portfolio');
backToPortfolioBtns.forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Show portfolio and hide all project details
    portfolioSection.style.display = "block";
    projectDetails.forEach(detail => {
      detail.style.display = "none";
    });
  });
});

let currentSlide = 0;

function moveSlide(n) {
    const slides = document.querySelectorAll('.carousel-item');
    currentSlide = (currentSlide + n + slides.length) % slides.length;
    showSlide(currentSlide);
}

function setSlide(n) {
    currentSlide = n - 1;
    showSlide(currentSlide);
}

function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');

    // Shift slides to display the current one
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${-n * 100}%)`;
    });

    // Update dot indicators
    dots.forEach(dot => dot.classList.remove('active'));
    dots[n].classList.add('active');
}

// Initialize first slide
showSlide(currentSlide);


document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.fade-in-section');

  const options = {
      root: null, // viewport
      threshold: 0.1, // 10% of the section is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
          } else {
              entry.target.classList.remove('visible'); // Remove class when the section is out of view
          }
      });
  }, options);

  sections.forEach(section => {
      observer.observe(section);
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent the default form submission

      const backendUrl = 'https://backend-h5iv.vercel.app/api/contact.js'; // Your backend URL

      // Collect form data
      const formData = {
          fullname: document.querySelector("input[name='fullname']").value,
          email: document.querySelector("input[name='email']").value,
          message: document.querySelector("textarea[name='message']").value
      };

      try {
          const response = await fetch(backendUrl, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(formData), // Sending data as JSON
          });

          if (response.ok) {
              const jsonResponse = await response.json();
              console.log("Response from backend:", jsonResponse);
              alert("Message sent successfully!"); // Show success message
              contactForm.reset(); // Reset the form
          } else {
              const errorData = await response.json();
              console.error("Error response from backend:", errorData);
              alert("Failed to send message. " + errorData.message);
          }
      } catch (error) {
          console.error("Error:", error);
          alert("There was an error sending your message.");
      }
  });
});