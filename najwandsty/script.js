// ===================================
// 0. FUNGSI PRELOADER
// ===================================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        // Tambahkan kelas 'hidden' untuk memulai animasi transisi fade-out
        preloader.classList.add('hidden');
        // Hapus elemen preloader dari DOM setelah transisi selesai
        preloader.addEventListener('transitionend', () => {
            preloader.remove();
        });
    }
});

// ===================================
// 1. FUNGSI EFEK KETIKAN OTOMATIS
// ===================================
const typingTextElement = document.querySelector('.typing-text');
const texts = [
    "Front-End Developer",
    "Siswi SMKN 8 Jember",
    "Software Engineering"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!typingTextElement) return;

    const currentText = texts[textIndex];
    const delay = isDeleting ? 50 : 100;
    
    // Tentukan teks yang akan ditampilkan
    const displayText = isDeleting 
        ? currentText.substring(0, charIndex - 1) 
        : currentText.substring(0, charIndex + 1);
    
    typingTextElement.textContent = displayText;

    // Logika maju dan mundur
    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => {
            isDeleting = true;
            type();
        }, 1000); // Jeda sebelum menghapus
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500); // Jeda sebelum mengetik teks berikutnya
    } else {
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        setTimeout(type, delay);
    }
}

document.addEventListener('DOMContentLoaded', type);

// ===================================
// 2. FUNGSI MENU HAMBURGER RESPONSIVE
// ===================================
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-links');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

// ===================================
// 3. FUNGSI EFEK ANIMASI SAAT SCROLL
// ===================================
const revealElements = document.querySelectorAll('.reveal');
let isTicking = false;

function handleScroll() {
    if (!isTicking) {
        window.requestAnimationFrame(() => {
            const windowHeight = window.innerHeight;
            const revealPoint = 150;
            
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('visible');
                } else {
                    element.classList.remove('visible');
                }
            });
            isTicking = false;
        });
        isTicking = true;
    }
}

window.addEventListener('scroll', handleScroll);
document.addEventListener('DOMContentLoaded', handleScroll);

// ===================================
// 4. FUNGSI POP-UP MODAL SERTIFIKAT
// ===================================
const certificateCards = document.querySelectorAll('.certificate-card');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.modal-close, .modal-close-btn');

certificateCards.forEach(card => {
    card.addEventListener('click', () => {
        const modalId = card.dataset.modalTarget;
        const modal = document.querySelector(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

modals.forEach(modal => {
    modal.addEventListener('click', (event) => {
        // Pastikan klik terjadi pada background modal, bukan kontennya
        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});