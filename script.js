document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Fallback to ensure content is visible if observer fails or takes too long
    setTimeout(() => {
        fadeElements.forEach(el => {
            if (!el.classList.contains('visible')) {
                el.classList.add('visible');
            }
        });
    }, 2000);

    // Gallery Modal
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('caption');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const closeModal = document.querySelector('.close-modal');

    galleryItems.forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = "block";
            modalImg.src = img.src;
            captionText.innerHTML = img.alt;
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
        document.body.style.overflow = 'auto'; // Enable scrolling
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    });

    // Form Validation
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }

        // Simulate submission
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = 'A enviar...';
        btn.disabled = true;

        setTimeout(() => {
            alert(`Obrigado, ${name}! A sua mensagem foi enviada com sucesso. Entraremos em contacto brevemente.`);
            contactForm.reset();
            btn.innerText = originalText;
            btn.disabled = false;
        }, 1500);
    });
});
