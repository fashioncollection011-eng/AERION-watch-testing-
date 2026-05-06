// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
    gsap.to(cursorFollower, {
        x: e.clientX - 12,
        y: e.clientY - 12,
        duration: 0.3
    });
});

// Preloader Animation
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    tl.to('#loader-bar', {
        width: '100%',
        duration: 2,
        ease: 'power4.inOut'
    })
    .to('.loader-text', {
        y: 0,
        duration: 1,
        ease: 'power4.out'
    }, "-=1")
    .to('#loader', {
        y: '-100%',
        duration: 1.2,
        ease: 'expo.inOut'
    }, "+=0.5")
    .from('.hero-sub', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    })
    .to('.hero-sub', {
        opacity: 1,
        duration: 0.5
    }, "-=1")
    .from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out'
    }, "-=0.8")
    .to('.hero-title', {
        opacity: 1,
        duration: 0.5
    }, "-=1.5")
    .from('#hero-watch', {
        scale: 0.8,
        opacity: 0,
        duration: 2,
        ease: 'power4.out'
    }, "-=1")
    .to('#hero-watch', {
        opacity: 1,
        duration: 1
    }, "-=2")
    .from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 1
    }, "-=1")
    .to('.hero-cta', {
        opacity: 1,
        duration: 0.5
    }, "-=1")
    .from('#navbar', {
        y: -100,
        opacity: 0,
        duration: 1
    }, "-=1");
});

// Hero Watch Parallax & Rotation
gsap.to('#hero-watch', {
    scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    rotate: 45,
    y: 100,
    scale: 1.1
});

// Navbar Background on Scroll
ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
        if (self.direction === 1) {
            gsap.to('#navbar', { backgroundColor: 'rgba(5, 5, 5, 0.95)', py: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', duration: 0.3 });
        } else {
            gsap.to('#navbar', { backgroundColor: 'transparent', py: '2rem', borderBottom: '1px solid transparent', duration: 0.3 });
        }
    }
});

// Collection Animations
gsap.from('.product-card', {
    scrollTrigger: {
        trigger: '#collection',
        start: 'top 80%',
    },
    y: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: 'power4.out'
});

// Craft Section Image Parallax
gsap.to('#craft-img', {
    scrollTrigger: {
        trigger: '#craft-img',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
    },
    y: -50,
    scale: 1.2
});

// Shopping Cart Sidebar Logic
const cartTrigger = document.getElementById('cart-trigger');
const cartClose = document.getElementById('cart-close');
const cartSidebar = document.getElementById('cart-sidebar');

cartTrigger.addEventListener('click', () => {
    cartSidebar.style.transform = 'translateX(0)';
    lenis.stop(); // Stop scrolling when cart is open
});

cartClose.addEventListener('click', () => {
    cartSidebar.style.transform = 'translateX(100%)';
    lenis.start(); // Resume scrolling
});

// Quick View Modal Logic
const quickViewModal = document.getElementById('quick-view');
const closeModal = document.getElementById('close-modal');
const quickViewBtns = document.querySelectorAll('.product-card button');

quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = btn.closest('.product-card');
        const img = card.querySelector('img').src;
        const title = card.querySelector('h3').textContent;
        const price = card.querySelector('span').textContent;
        
        document.getElementById('modal-img').src = img;
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-price').textContent = price;
        
        quickViewModal.classList.remove('hidden');
        quickViewModal.classList.add('flex');
        gsap.from(quickViewModal.querySelector('.relative'), {
            y: 50,
            opacity: 0,
            duration: 0.6,
            ease: 'power4.out'
        });
        lenis.stop();
    });
});

closeModal.addEventListener('click', () => {
    gsap.to(quickViewModal.querySelector('.relative'), {
        y: 50,
        opacity: 0,
        duration: 0.4,
        ease: 'power4.in',
        onComplete: () => {
            quickViewModal.classList.add('hidden');
            quickViewModal.classList.remove('flex');
            lenis.start();
        }
    });
});

// Wishlist Micro-interaction
const wishlistBtns = document.querySelectorAll('.wishlist-btn');
wishlistBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const svg = this.querySelector('svg');
        if (svg.getAttribute('fill') === 'none') {
            gsap.to(svg, { fill: '#C5A059', stroke: '#C5A059', scale: 1.2, duration: 0.3, ease: 'back.out' });
        } else {
            gsap.to(svg, { fill: 'none', stroke: 'currentColor', scale: 1, duration: 0.3 });
        }
    });
});
