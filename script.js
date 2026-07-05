/* ==========================================================================
   Liquid Glass UI Portfolio JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- Modal Overlay Controls ---
  const modals = {
    certifications: document.getElementById('modal-certifications'),
    projects: document.getElementById('modal-projects'),
    links: document.getElementById('modal-links')
  };

  const buttons = {
    certifications: document.getElementById('btn-certifications'),
    projects: document.getElementById('btn-projects'),
    links: document.getElementById('btn-links')
  };

  // Open modal handler
  function openModal(modalId) {
    const modal = modals[modalId];
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden'; // Disable scroll under modal
      
      // Auto focus close button for accessibility
      const closeBtn = modal.querySelector('.modal-close');
      if (closeBtn) closeBtn.focus();
    }
  }

  // Close modal handler
  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('open');
      // Only restore scroll if there is no other open modal
      const openModals = document.querySelectorAll('.modal-overlay.open');
      if (openModals.length === 0) {
        document.body.style.overflow = '';
      }
    }
  }

  // Add click listeners to sidebar buttons
  Object.keys(buttons).forEach(key => {
    buttons[key].addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(key);
    });
  });

  // Add close listeners for close buttons and backdrop clicks
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeModal(modal));
    }

    // Close when clicking the outer overlay border
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Close modals on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-overlay.open');
      if (activeModal) {
        closeModal(activeModal);
      }
    }
  });

  // --- Scroll-to-About Click Handler ---
  const scrollToAboutBtn = document.getElementById('scroll-to-about-btn');
  if (scrollToAboutBtn) {
    scrollToAboutBtn.addEventListener('click', () => {
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // --- Scroll-Driven Animation Fallback for Unsupported Browsers ---
  const supportsCSSScroll = CSS.supports('(animation-timeline: view()) and (animation-range: entry)');
  
  if (!supportsCSSScroll) {
    console.log("Native CSS scroll-driven animations not supported. Initiating JavaScript fallback.");

    const photoWrapper = document.querySelector('.photo-container-wrapper');
    const detailsWrapper = document.querySelector('#scrolly-details');
    const introWrapper = document.querySelector('#scrolly-intro');
    const scrollTracker = document.getElementById('scroll-tracker');

    // Run fallback only on desktop viewports (where tracker sections are used)
    let lastKnownScrollPosition = 0;
    let ticking = false;

    function handleScrollFallback() {
      lastKnownScrollPosition = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollFallback(lastKnownScrollPosition);
          ticking = false;
        });

        ticking = true;
      }
    }

    function updateScrollFallback(scrollTop) {
      if (window.innerWidth <= 768) {
        // Reset styles for mobile stacked view
        if (photoWrapper) {
          photoWrapper.style.transform = '';
          photoWrapper.style.opacity = '';
        }
        if (detailsWrapper) {
          detailsWrapper.style.opacity = '';
          detailsWrapper.style.transform = '';
          detailsWrapper.style.top = '';
          detailsWrapper.style.right = '';
          detailsWrapper.style.left = '';
        }
        if (introWrapper) {
          introWrapper.style.transform = '';
          introWrapper.style.opacity = '';
        }
        return;
      }

      // Calculate scroll progress relative to total scroll height of tracker
      const maxScroll = scrollTracker ? scrollTracker.offsetHeight : window.innerHeight * 2;
      
      let progress = scrollTop / maxScroll;
      progress = Math.min(Math.max(progress, 0), 1); // Clamp between 0 and 1

      // 1. Animate Photo Wrapper
      if (photoWrapper) {
        if (progress <= 0.5) {
          const p = progress / 0.5; // 0 to 1
          const scaleVal = 1 - (p * 0.1); // 1 to 0.9
          photoWrapper.style.transform = `translate3d(0, -50%, 0) scale(${scaleVal})`;
          photoWrapper.style.opacity = '1';
        } else {
          const p = (progress - 0.5) / 0.5; // 0 to 1
          const scaleVal = 0.9 - (p * 0.3); // 0.9 to 0.6
          photoWrapper.style.transform = `translate3d(0, calc(-50% - ${80 * p}vh), 0) scale(${scaleVal})`;
          photoWrapper.style.opacity = 1 - p;
        }
      }

      // 2. Animate Details Card
      if (detailsWrapper) {
        if (progress <= 0.5) {
          const p = progress / 0.5; // 0 to 1
          detailsWrapper.style.transform = `translate3d(0, calc(-50% + ${18 * (1 - p)}vh), 0)`;
          detailsWrapper.style.opacity = p;
          detailsWrapper.style.left = 'calc(var(--sidebar-width) + 8%)';
          detailsWrapper.style.right = 'auto';
        } else {
          const p = (progress - 0.5) / 0.5; // 0 to 1
          detailsWrapper.style.transform = `translate3d(0, calc(-50% - ${80 * p}vh), 0)`;
          detailsWrapper.style.opacity = 1 - p;
          detailsWrapper.style.left = 'calc(var(--sidebar-width) + 8%)';
          detailsWrapper.style.right = 'auto';
        }
      }

      // 3. Animate Intro Card
      if (introWrapper) {
        if (progress <= 0.5) {
          const p = progress / 0.5; // 0 to 1
          const yVal = -50 - (p * 70); // translate Y from -50% to -120%
          introWrapper.style.transform = `translate3d(0, ${yVal}%, 0)`;
          introWrapper.style.opacity = 1 - p;
        } else {
          introWrapper.style.transform = 'translate3d(0, -120%, 0)';
          introWrapper.style.opacity = '0';
        }
      }
    }

    // Attach scroll listener and trigger on load
    window.addEventListener('scroll', handleScrollFallback);
    window.addEventListener('resize', handleScrollFallback);
    handleScrollFallback();
  }
});
