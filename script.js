// Set event date (August 24, 2025 14:00:00 GMT+0800)
const eventDate = new Date('2025-08-24T14:00:00+08:00');

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Check for saved theme preference or respect OS preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.classList.add('dark-mode');
    themeIcon.textContent = 'light_mode';
} else {
    themeIcon.textContent = 'dark_mode';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeIcon.textContent = 'light_mode';
    } else {
        localStorage.setItem('theme', 'light');
        themeIcon.textContent = 'dark_mode';
    }
});

// Countdown timer
function updateCountdown() {
    const now = new Date();
    const diff = eventDate - now;
    const countdownElement = document.getElementById('countdown');
    const eventStatus = document.getElementById('event-status');

    // Clear existing content
    countdownElement.innerHTML = '';

    if (diff <= 0) {
        // Event has ended
        eventStatus.textContent = "The event has concluded. Thank you for joining us!";
        eventStatus.style.fontSize = "1.5rem";
        eventStatus.style.fontWeight = "600";
        return;
    }

    // Calculate time components
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diff / (1000 * 60 * 60));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    // Determine what to display
    if (totalDays >= 1) {
        // More than 24 hours - show days
        eventStatus.textContent = "";

        const daysUnit = document.createElement('div');
        daysUnit.className = 'countdown-unit';
        daysUnit.innerHTML = `
            <span class="countdown-number">${totalDays.toString().padStart(2, '0')}</span>
            <span class="countdown-label">Days</span>
        `;
        countdownElement.appendChild(daysUnit);

        // Update daily
        setTimeout(updateCountdown, 1000 * 60 * 60);
    } else if (totalHours >= 1) {
        // Less than 24 hours - show hours and minutes
        eventStatus.textContent = "The event is starting soon!";
        eventStatus.style.fontSize = "1.5rem";
        eventStatus.style.fontWeight = "600";

        const hoursUnit = document.createElement('div');
        hoursUnit.className = 'countdown-unit';
        hoursUnit.innerHTML = `
            <span class="countdown-number">${hours.toString().padStart(2, '0')}</span>
            <span class="countdown-label">Hours</span>
        `;
        countdownElement.appendChild(hoursUnit);

        const minutesUnit = document.createElement('div');
        minutesUnit.className = 'countdown-unit';
        minutesUnit.innerHTML = `
            <span class="countdown-number">${minutes.toString().padStart(2, '0')}</span>
            <span class="countdown-label">Minutes</span>
        `;
        countdownElement.appendChild(minutesUnit);

        // Update every minute
        setTimeout(updateCountdown, 1000 * 60);
    } else {
        // Event is happening now
        eventStatus.textContent = "The event is happening now!";
        eventStatus.style.fontSize = "1.5rem";
        eventStatus.style.fontWeight = "600";
    }
}

// Initialize countdown
updateCountdown();

// Share modal functionality
const shareBtn = document.getElementById('shareBtn');
const shareModal = document.getElementById('shareModal');
const closeModal = document.getElementById('closeModal');
const copyBtn = document.getElementById('copyBtn');
const shareText = document.getElementById('shareText');
const copiedMessage = document.getElementById('copiedMessage');
const selectors = document.querySelectorAll('.modal-select-info > div');
const contents = {
    text: document.getElementById('shareText'),
    poster: document.getElementById('sharePoster')
};

shareBtn.addEventListener('click', () => {
    shareModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
    shareModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    copiedMessage.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === shareModal) {
        shareModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        copiedMessage.style.display = 'none';
    }
});

function updateMode(target) {
    // Update aria-current on selectors
    selectors.forEach(el => {
        const isTarget = el.getAttribute('data-target') === target;
        if (isTarget) {
            el.setAttribute('aria-current', 'true');
        } else {
            el.removeAttribute('aria-current');
        }
    });

    // Show/hide content based on target
    Object.keys(contents).forEach(key => {
        contents[key].classList.toggle('active', key === target);
    });
}

// Initial display
updateMode('text');

// Add click handlers
selectors.forEach(el => {
    el.addEventListener('click', () => {
        const target = el.getAttribute('data-target');
        copyBtn.classList.toggle('active');
        updateMode(target);
    });
});

copyBtn.addEventListener('click', () => {
    shareText.select();
    document.execCommand('copy');

    // Show copied message
    copiedMessage.style.display = 'block';
    setTimeout(() => {
        copiedMessage.style.display = 'none';
    }, 3000);
});

// Add subtle scroll animations
document.addEventListener('DOMContentLoaded', function () {
    function typeWriter(txt, speed, elementId) {
        let i = 0;
        const element = document.getElementById(elementId);
        element.innerHTML = '';

        function type() {
            if (i < txt.length) {
                element.innerHTML += txt.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }
    typeWriter('Iter Simul', 90, 'eventName');

    const sections = document.querySelectorAll('section:not(.hero)');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'background-color 300ms, color 300ms, opacity 600ms ease, transform 600s ease';
        observer.observe(section);
    });
});