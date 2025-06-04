// DOM Elements
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navbar = document.getElementById("navbar")
const scrollToTopBtn = document.getElementById("scrollToTop")
const contactForm = document.getElementById("contactForm")

// Mobile Navigation Toggle
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  hamburger.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }

  // Show/hide scroll to top button
  if (window.scrollY > 500) {
    scrollToTopBtn.classList.add("visible")
  } else {
    scrollToTopBtn.classList.remove("visible")
  }
})

// Scroll to top functionality
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80 // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Animated Counter for Hero Stats
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16) // 60 FPS
  const timer = setInterval(() => {
    start += increment
    if (start >= target) {
      element.textContent = target.toLocaleString()
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(start).toLocaleString()
    }
  }, 16)
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up")

      // Animate counters when hero section is visible
      if (entry.target.classList.contains("hero")) {
        const counters = entry.target.querySelectorAll(".stat-number")
        counters.forEach((counter) => {
          const target = Number.parseInt(counter.getAttribute("data-target"))
          animateCounter(counter, target)
        })
      }
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".hero, .feature-card, .gallery-item, .pricing-card, .testimonial-card",
  )
  animatedElements.forEach((el) => observer.observe(el))
})

// Contact form handling
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const firstName = formData.get("firstName")
  const lastName = formData.get("lastName")
  const email = formData.get("email")
  const phone = formData.get("phone")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Simple validation
  if (!firstName || !lastName || !email || !subject || !message) {
    showNotification("Please fill in all required fields", "error")
    return
  }

  if (!isValidEmail(email)) {
    showNotification("Please enter a valid email address", "error")
    return
  }

  // Simulate form submission
  showNotification("Thank you for your message! We'll get back to you soon.", "success")
  contactForm.reset()
})

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Notification system
function showNotification(message, type) {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification")
  if (existingNotification) {
    existingNotification.remove()
  }

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="notification-icon ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        color: #333;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        border-left: 4px solid ${getNotificationColor(type)};
    `

  const notificationContent = notification.querySelector(".notification-content")
  notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 1rem;
    `

  const icon = notification.querySelector(".notification-icon")
  icon.style.color = getNotificationColor(type)

  const closeButton = notification.querySelector(".notification-close")
  closeButton.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
        margin-left: auto;
    `

  // Add to document
  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Close button functionality
  closeButton.addEventListener("click", () => {
    notification.style.transform = "translateX(400px)"
    setTimeout(() => {
      notification.remove()
    }, 300)
  })

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = "translateX(400px)"
      setTimeout(() => {
        notification.remove()
      }, 300)
    }
  }, 5000)
}

function getNotificationIcon(type) {
  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    info: "fas fa-info-circle",
  }
  return icons[type] || icons.info
}

function getNotificationColor(type) {
  const colors = {
    success: "#10b981",
    error: "#ef4444",
    info: "#6366f1",
  }
  return colors[type] || colors.info
}

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroShapes = document.querySelectorAll(".shape")

  heroShapes.forEach((shape, index) => {
    const speed = 0.5 + index * 0.2
    shape.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Pricing card hover effects
document.querySelectorAll(".pricing-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-15px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    if (card.classList.contains("featured")) {
      card.style.transform = "scale(1.05)"
    } else {
      card.style.transform = "translateY(0) scale(1)"
    }
  })
})

// Gallery lightbox effect
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector(".gallery-image")
    const lightbox = document.createElement("div")
    lightbox.className = "lightbox"
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <img src="${img.src}" alt="${img.alt}">
        <button class="lightbox-close">&times;</button>
      </div>
    `

    lightbox.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `

    const content = lightbox.querySelector(".lightbox-content")
    content.style.cssText = `
      position: relative;
      max-width: 90%;
      max-height: 90%;
    `

    const lightboxImg = lightbox.querySelector("img")
    lightboxImg.style.cssText = `
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 10px;
    `

    const closeBtn = lightbox.querySelector(".lightbox-close")
    closeBtn.style.cssText = `
      position: absolute;
      top: -40px;
      right: 0;
      background: none;
      border: none;
      color: white;
      font-size: 2rem;
      cursor: pointer;
      width: 40px;
      height: 40px;
    `

    document.body.appendChild(lightbox)
    document.body.style.overflow = "hidden"

    setTimeout(() => {
      lightbox.style.opacity = "1"
    }, 10)

    const closeLightbox = () => {
      lightbox.style.opacity = "0"
      setTimeout(() => {
        document.body.removeChild(lightbox)
        document.body.style.overflow = ""
      }, 300)
    }

    closeBtn.addEventListener("click", closeLightbox)
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox()
      }
    })

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeLightbox()
      }
    })
  })
})

// Testimonials carousel (auto-rotate)
let currentTestimonial = 0
const testimonials = document.querySelectorAll(".testimonial-card")

function rotateTestimonials() {
  if (testimonials.length > 0) {
    testimonials.forEach((testimonial, index) => {
      testimonial.style.opacity = index === currentTestimonial ? "1" : "0.5"
      testimonial.style.transform = index === currentTestimonial ? "scale(1)" : "scale(0.95)"
    })

    currentTestimonial = (currentTestimonial + 1) % testimonials.length
  }
}

// Start testimonial rotation
setInterval(rotateTestimonials, 4000)

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  // Add loading animation
  document.body.style.opacity = "0"

  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease"
    document.body.style.opacity = "1"
  }, 100)

  // Initialize testimonial carousel
  rotateTestimonials()

  // Add scroll reveal animations
  const revealElements = document.querySelectorAll(".feature-card, .gallery-item, .pricing-card, .testimonial-card")

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, index * 100)
        }
      })
    },
    { threshold: 0.1 },
  )

  revealElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "all 0.6s ease"
    revealObserver.observe(el)
  })
})

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(() => {
    // Existing scroll functionality is already handled above
  }, 16),
) // ~60fps
