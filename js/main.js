document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Hamburger menu functionality
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburgerMenu) {
    // Add click event to hamburger button
    hamburgerMenu.addEventListener('click', function() {
      // Toggle active class
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      
      // Create or remove overlay
      let overlay = document.querySelector('.nav-overlay');
      
      if (!overlay && navLinks.classList.contains('active')) {
        // Create overlay if it doesn't exist
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay active';
        document.body.appendChild(overlay);
        
        // Close menu when overlay is clicked
        overlay.addEventListener('click', function() {
          hamburgerMenu.classList.remove('active');
          navLinks.classList.remove('active');
          overlay.remove();
        });
      } else if (overlay) {
        // Remove overlay
        overlay.remove();
      }
    });
    
    // Close menu when a link is clicked
    const menuLinks = navLinks.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        
        const overlay = document.querySelector('.nav-overlay');
        if (overlay) {
          overlay.remove();
        }
      });
    });
  }
  
  // Set active navigation link based on current page
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll('.nav-links a');
  
  links.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    // Check if current path ends with the link path
    if (currentPath.endsWith(linkPath) || 
        (linkPath === 'index.html' && (currentPath === '/' || currentPath.endsWith('/')))) {
      link.classList.add('active');
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.getElementById('back-to-top');
  
  function toggleBackToTopButton() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  }
  
  let scrollAnimationFrame;
  
  window.addEventListener('scroll', function() {
    if (scrollAnimationFrame) {
      window.cancelAnimationFrame(scrollAnimationFrame);
    }
    
    scrollAnimationFrame = window.requestAnimationFrame(function() {
      toggleBackToTopButton();
    });
  });
  
  backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    let rect = this.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    
    let ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
  
  toggleBackToTopButton();
});