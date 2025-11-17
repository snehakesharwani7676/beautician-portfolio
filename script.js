// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth Scrolling
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

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const portfolioCategories = document.querySelectorAll('.portfolio-category');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        if (filterValue === 'all') {
            portfolioCategories.forEach(category => {
                category.style.display = 'block';
            });
        } else {
            portfolioCategories.forEach(category => {
                category.style.display = 'none';
            });
            
            portfolioItems.forEach(item => {
                if (item.getAttribute('data-category') === filterValue) {
                    item.closest('.portfolio-category').style.display = 'block';
                }
            });
        }
    });
});

// Booking Form Submission
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Create WhatsApp message
    const message = `Hello! I would like to book an appointment.%0A%0AName: ${name}%0APhone: ${phone}%0AService: ${service}%0ADate: ${date}%0ATime: ${time}`;
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/919415229728?text=${message}`, '_blank');
    
    // Reset form
    bookingForm.reset();
    
    // Show confirmation
    alert('Redirecting to WhatsApp to confirm your appointment!');
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Create email subject and body
    const subject = `Contact from ${name}`;
    const body = `Name: ${name}%0AEmail: ${email}%0A%0AMessage:%0A${message}`;
    
    // Open email client
    window.location.href = `mailto:snehakesharwani76@gmail.com?subject=${subject}&body=${body}`;
    
    // Reset form
    contactForm.reset();
    
    // Show confirmation
    alert('Thank you for your message! Your email client will open to send the message.');
});

// Advanced Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
            
            // Animate children elements
            const children = entry.target.querySelectorAll('.skill-category, .timeline-item, .portfolio-item, .contact-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Animate skill categories, timeline items, portfolio items
document.querySelectorAll('.skill-category, .timeline-item, .portfolio-item, .contact-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 500);
    }
});

// Typing Effect for Hero Tagline
const tagline = document.querySelector('.hero-tagline');
if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll to Top Button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff69b4 0%, #b76e79 50%, #d4af37 100%);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    z-index: 999;
`;
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0) scale(1)';
});

// Set minimum date for booking to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Image upload preview (optional enhancement)
const referenceInput = document.getElementById('reference');
if (referenceInput) {
    referenceInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log('Reference photo selected:', file.name);
        }
    });
}


// Custom Cursor Effect
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid #ff69b4;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.1s ease;
    transform: translate(-50%, -50%);
    display: none;
`;
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
cursorDot.className = 'cursor-dot';
cursorDot.style.cssText = `
    width: 8px;
    height: 8px;
    background: #ff69b4;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    display: none;
`;
document.body.appendChild(cursorDot);

// Show custom cursor on desktop only
if (window.innerWidth > 768) {
    cursor.style.display = 'block';
    cursorDot.style.display = 'block';
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        }, 50);
    });

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .skill-category');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.background = 'rgba(255, 105, 180, 0.2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.background = 'transparent';
        });
    });
}

// Portfolio Image Lightbox
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
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
                cursor: pointer;
                animation: fadeIn 0.3s ease;
            `;
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = img.src;
            lightboxImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                border-radius: 10px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                animation: zoomIn 0.3s ease;
            `;
            
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '×';
            closeBtn.style.cssText = `
                position: absolute;
                top: 20px;
                right: 30px;
                font-size: 3rem;
                color: white;
                background: none;
                border: none;
                cursor: pointer;
                transition: transform 0.3s;
            `;
            
            closeBtn.addEventListener('mouseenter', () => {
                closeBtn.style.transform = 'rotate(90deg) scale(1.2)';
            });
            
            closeBtn.addEventListener('mouseleave', () => {
                closeBtn.style.transform = 'rotate(0) scale(1)';
            });
            
            lightbox.appendChild(lightboxImg);
            lightbox.appendChild(closeBtn);
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox || e.target === closeBtn) {
                    lightbox.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => lightbox.remove(), 300);
                }
            });
        }
    });
});

// Skill Progress Animation
const skillCategories = document.querySelectorAll('.skill-category');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skills = entry.target.querySelectorAll('.skill-list li');
            skills.forEach((skill, index) => {
                setTimeout(() => {
                    skill.style.opacity = '1';
                    skill.style.transform = 'translateX(0)';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.5 });

skillCategories.forEach(category => {
    skillObserver.observe(category);
});

// Add floating particles effect
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: fixed;
        width: 5px;
        height: 5px;
        background: linear-gradient(135deg, #ff69b4, #d4af37);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        opacity: 0;
        animation: particleFloat 4s ease-in-out infinite;
    `;
    
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 4000);
}

// Create particles periodically
setInterval(createParticle, 500);

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes zoomIn {
        from {
            transform: scale(0.5);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    .nav-menu a.active {
        color: #ff69b4;
        font-weight: 700;
    }
`;
document.head.appendChild(style);

// Form validation with visual feedback
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.borderColor = '#ff69b4';
            input.style.boxShadow = '0 0 10px rgba(255, 105, 180, 0.3)';
        });
        
        input.addEventListener('blur', () => {
            if (input.value) {
                input.style.borderColor = '#28a745';
            } else {
                input.style.borderColor = '#ffb6c1';
            }
            input.style.boxShadow = 'none';
        });
    });
});

// Add success message animation
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: linear-gradient(135deg, #28a745, #20c997);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => successDiv.remove(), 500);
    }, 3000);
}

// Add slide animations
const slideStyle = document.createElement('style');
slideStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(slideStyle);

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);
});

// Add sparkle effect on click
document.addEventListener('click', (e) => {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, #ff69b4, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        animation: sparkleEffect 0.6s ease-out;
    `;
    
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 600);
});

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

console.log('🎨 Advanced interactive features loaded! ✨');


// Load uploaded images from localStorage
function loadUploadedImages() {
    const storedImages = JSON.parse(localStorage.getItem('portfolioImages') || '{}');
    
    // Load hero image
    if (storedImages.hero && storedImages.hero.length > 0) {
        const heroImg = document.querySelector('.hero-image .image-placeholder');
        if (heroImg) {
            heroImg.innerHTML = `<img src="${storedImages.hero[0].data}" alt="Sneha Kesharwani">`;
        }
    }
    
    // Load about image
    if (storedImages.about && storedImages.about.length > 0) {
        const aboutImg = document.querySelector('.about-image .image-placeholder');
        if (aboutImg) {
            aboutImg.innerHTML = `<img src="${storedImages.about[0].data}" alt="Sneha Profile">`;
        }
    }
    
    // Load makeup portfolio (with subcategories)
    const makeupGrid = document.querySelector('.portfolio-category:first-of-type .portfolio-grid');
    if (makeupGrid) {
        makeupGrid.innerHTML = '';
        let makeupCount = 0;
        
        Object.keys(storedImages).forEach(key => {
            if (key.startsWith('makeup-')) {
                storedImages[key].forEach((img) => {
                    const item = document.createElement('div');
                    item.className = 'portfolio-item makeup';
                    item.setAttribute('data-category', 'makeup');
                    const subcategoryName = img.subcategory !== 'none' ? img.subcategory.replace(/-/g, ' ') : 'Makeup';
                    item.innerHTML = `
                        <img src="${img.data}" alt="${subcategoryName}">
                        <div class="portfolio-overlay">
                            <p>${subcategoryName}</p>
                        </div>
                    `;
                    makeupGrid.appendChild(item);
                    makeupCount++;
                });
            }
        });
    }
    
    // Load hair portfolio (with subcategories)
    const hairGrid = document.querySelectorAll('.portfolio-category')[1]?.querySelector('.portfolio-grid');
    if (hairGrid) {
        hairGrid.innerHTML = '';
        let hairCount = 0;
        
        Object.keys(storedImages).forEach(key => {
            if (key.startsWith('hair-')) {
                storedImages[key].forEach((img) => {
                    const item = document.createElement('div');
                    item.className = 'portfolio-item hair';
                    item.setAttribute('data-category', 'hair');
                    const subcategoryName = img.subcategory !== 'none' ? img.subcategory.replace(/-/g, ' ') : 'Hair';
                    item.innerHTML = `
                        <img src="${img.data}" alt="${subcategoryName}">
                        <div class="portfolio-overlay">
                            <p>${subcategoryName}</p>
                        </div>
                    `;
                    hairGrid.appendChild(item);
                    hairCount++;
                });
            }
        });
    }
    
    // Load skin & nails portfolio (with subcategories)
    const skinGrid = document.querySelectorAll('.portfolio-category')[2]?.querySelector('.portfolio-grid');
    if (skinGrid) {
        skinGrid.innerHTML = '';
        let skinCount = 0;
        
        Object.keys(storedImages).forEach(key => {
            if (key.startsWith('skin-nails-')) {
                storedImages[key].forEach((img) => {
                    const item = document.createElement('div');
                    item.className = 'portfolio-item skin-nails';
                    item.setAttribute('data-category', 'skin-nails');
                    const subcategoryName = img.subcategory !== 'none' ? img.subcategory.replace(/-/g, ' ') : 'Skin & Nails';
                    item.innerHTML = `
                        <img src="${img.data}" alt="${subcategoryName}">
                        <div class="portfolio-overlay">
                            <p>${subcategoryName}</p>
                        </div>
                    `;
                    skinGrid.appendChild(item);
                    skinCount++;
                });
            }
        });
    }
    
    // Re-attach lightbox events to new images
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
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
                    cursor: pointer;
                    animation: fadeIn 0.3s ease;
                `;
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = img.src;
                lightboxImg.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    border-radius: 10px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                    animation: zoomIn 0.3s ease;
                `;
                
                const closeBtn = document.createElement('button');
                closeBtn.innerHTML = '×';
                closeBtn.style.cssText = `
                    position: absolute;
                    top: 20px;
                    right: 30px;
                    font-size: 3rem;
                    color: white;
                    background: none;
                    border: none;
                    cursor: pointer;
                    transition: transform 0.3s;
                `;
                
                lightbox.appendChild(lightboxImg);
                lightbox.appendChild(closeBtn);
                document.body.appendChild(lightbox);
                
                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox || e.target === closeBtn) {
                        lightbox.style.animation = 'fadeOut 0.3s ease';
                        setTimeout(() => lightbox.remove(), 300);
                    }
                });
            }
        });
    });
}

// Load images when page loads
window.addEventListener('load', () => {
    setTimeout(loadUploadedImages, 100);
});

// Add admin button to navbar
const adminBtn = document.createElement('a');
adminBtn.href = 'admin.html';
adminBtn.innerHTML = '<i class="fas fa-cog"></i> Manage Images';
adminBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    background: linear-gradient(135deg, #ff69b4, #b76e79);
    color: white;
    padding: 12px 20px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    box-shadow: 0 5px 20px rgba(255, 105, 180, 0.4);
    z-index: 998;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s;
`;
document.body.appendChild(adminBtn);

adminBtn.addEventListener('mouseenter', () => {
    adminBtn.style.transform = 'translateY(-5px) scale(1.05)';
    adminBtn.style.boxShadow = '0 10px 30px rgba(255, 105, 180, 0.6)';
});

adminBtn.addEventListener('mouseleave', () => {
    adminBtn.style.transform = 'translateY(0) scale(1)';
    adminBtn.style.boxShadow = '0 5px 20px rgba(255, 105, 180, 0.4)';
});
