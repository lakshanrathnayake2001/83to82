document.addEventListener('DOMContentLoaded', function() {
  // ===== Mobile Menu Toggle =====
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
  });
  
  // Close mobile menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.add('hidden');
    });
  });

  // ===== Gallery Modal Functionality =====
  const galleryItems = document.querySelectorAll('.gallery-item');
  const photoModal = document.getElementById('photo-modal');
  const modalImage = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption');
  const closeModal = document.getElementById('close-modal');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').src;
      const caption = this.querySelector('p').textContent;
      
      modalImage.src = imgSrc;
      modalCaption.textContent = caption;
      photoModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  });
  
  closeModal.addEventListener('click', function() {
    photoModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });
  
  photoModal.addEventListener('click', function(e) {
    if (e.target === photoModal) {
      photoModal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  });

  // ===== Load More Photos Functionality =====
  const loadMoreButton = document.getElementById('load-more');
  const galleryContainer = document.querySelector('#gallery .grid');
  
  if (loadMoreButton) {
    loadMoreButton.addEventListener('click', function() {
      const newPhotos = [
        {
          src: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          caption: 'සතුටු මොහොත'
        },
        {
          src: 'https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          caption: 'විශ්වවිද්‍යාලයීය මතක'
        },
        {
          src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          caption: 'සංග්‍රහය'
        },
        {
          src: 'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          caption: 'සහෝදරත්වය'
        }
      ];
      
      newPhotos.forEach(photo => {
        const newItem = document.createElement('div');
        newItem.className = 'gallery-item relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition duration-500 transform hover:-translate-y-2';
        newItem.innerHTML = `
          <img src="${photo.src}" 
               alt="Gallery image" 
               class="w-full h-64 object-cover transition duration-500 group-hover:scale-110">
          <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
            <p class="text-white text-lg font-bold">${photo.caption}</p>
          </div>
        `;
        
        galleryContainer.appendChild(newItem);
        
        // Add click event to the new item
        newItem.addEventListener('click', function() {
          const imgSrc = this.querySelector('img').src;
          const caption = this.querySelector('p').textContent;
          
          modalImage.src = imgSrc;
          modalCaption.textContent = caption;
          photoModal.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        });
      });
      
      // Scroll to the newly added items
      const lastItem = galleryContainer.lastElementChild;
      lastItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

// ===== Enhanced Dual Image Transformation =====
const bgContainer = document.getElementById('home');
if (bgContainer) {
  // Create image elements
  const bgImage1 = document.createElement('div');
  const bgImage2 = document.createElement('div');
  
  // Set classes for both images
  bgImage1.className = 'absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out opacity-100 z-0';
  bgImage2.className = 'absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out opacity-0 z-0';
  
  // Set your Facebook image URLs
  bgImage1.style.backgroundImage = "url('https://drive.google.com/uc?export=view&id=1RERTVpe_OysyC7N7gYj6qFL-7W4G0VP5')";
  bgImage2.style.backgroundImage = "url('https://drive.google.com/uc?export=view&id=1vtBs-WrnLqELaAJKHI_qkOVrOl_knBDT')";
  
  // Preload images to avoid flickering
  const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
  };
  preloadImage(bgImage1.style.backgroundImage.slice(4, -1).replace(/["']/g, ""));
  preloadImage(bgImage2.style.backgroundImage.slice(4, -1).replace(/["']/g, ""));
  
  // Insert images at the beginning of the section
  bgContainer.insertBefore(bgImage2, bgContainer.firstChild);
  bgContainer.insertBefore(bgImage1, bgContainer.firstChild);
  
  // Image transition logic
  let currentActive = 1;
  const transitionImages = () => {
    if (currentActive === 1) {
      bgImage1.classList.remove('opacity-100');
      bgImage1.classList.add('opacity-0');
      bgImage2.classList.remove('opacity-0');
      bgImage2.classList.add('opacity-100');
      currentActive = 2;
    } else {
      bgImage1.classList.remove('opacity-0');
      bgImage1.classList.add('opacity-100');
      bgImage2.classList.remove('opacity-100');
      bgImage2.classList.add('opacity-0');
      currentActive = 1;
    }
  };
  
  // Start transition after 3 seconds, then every 5 seconds
  setTimeout(() => {
    transitionImages(); // First transition
    setInterval(transitionImages, 5000); // Subsequent transitions
  }, 3000);
}

  // ===== Scroll Animations =====
  const animateOnScroll = function() {
    const memoryCards = document.querySelectorAll('.memory-card');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    memoryCards.forEach(card => {
      const cardPosition = card.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (cardPosition < screenPosition) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    });
    
    galleryItems.forEach((item, index) => {
      const itemPosition = item.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (itemPosition < screenPosition) {
        item.style.transitionDelay = `${index * 0.1}s`;
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state for animation
  document.querySelectorAll('.memory-card, .gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.6s ease-out';
  });
  
  window.addEventListener('scroll', animateOnScroll);
  // Trigger once on load in case elements are already in view
  animateOnScroll();
});
