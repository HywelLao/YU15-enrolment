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

function updateCountdown() {
    const now = new Date();
    const diff = eventDate - now;
    const countdownElement = document.getElementById('countdown');
    const eventStatus = document.getElementById('event-status');

    countdownElement.innerHTML = '';

    // Event ended (3+ hours after start)
    if (diff <= -3 * 60 * 60 * 1000) {
        eventStatus.textContent = "宣誓典禮已圓滿結束，感謝您的參與！The enrolment has concluded. Thank you for joining us!";
        eventStatus.style.fontSize = "1.5rem";
        eventStatus.style.fontWeight = "600";
        return;
    }

    // Event is happening now
    if (diff <= 0) {
        eventStatus.textContent = "宣誓典禮現正進行中！The enrolment is currently in progress!";
        eventStatus.style.fontSize = "1.5rem";
        eventStatus.style.fontWeight = "600";
        countdownElement.innerHTML = '';
        setTimeout(updateCountdown, 1000 * 60);
        return;
    }

    // Countdown to event
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (totalDays >= 1) {
        eventStatus.textContent = "";

        const daysUnit = document.createElement('div');
        daysUnit.className = 'countdown-unit';
        daysUnit.innerHTML = `
            <span class="countdown-number">${totalDays.toString().padStart(2, '0')}</span>
            <span class="countdown-label">Days</span>
        `;
        countdownElement.appendChild(daysUnit);

        setTimeout(updateCountdown, 1000 * 60 * 60);
    } else if (diff > 1000 * 60 * 60) {
        eventStatus.textContent = "";

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

        setTimeout(updateCountdown, 1000 * 60);
    } else {
        eventStatus.textContent = "宣誓典禮即將開始！The enrolment is starting soon!";
        eventStatus.style.fontSize = "1.5rem";
        eventStatus.style.fontWeight = "600";

        const minutesUnit = document.createElement('div');
        minutesUnit.className = 'countdown-unit';
        minutesUnit.innerHTML = `
            <span class="countdown-number">${minutes.toString().padStart(2, '0')}</span>
            <span class="countdown-label">Minutes</span>
        `;
        countdownElement.appendChild(minutesUnit);

        const secondsUnit = document.createElement('div');
        secondsUnit.className = 'countdown-unit';
        secondsUnit.innerHTML = `
            <span class="countdown-number">${seconds.toString().padStart(2, '0')}</span>
            <span class="countdown-label">Seconds</span>
        `;
        countdownElement.appendChild(secondsUnit);

        setTimeout(updateCountdown, 1000);
    }
}

// Start countdown
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
    const images = ['src/souvenir1.webp', 'src/souvenir2.webp', 'src/souvenir3.webp'];
    const canvases = document.querySelectorAll('.souvenir-canvas');

    canvases.forEach((canvas, i) => {
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = images[i];

        img.onload = () => {
            const width = canvas.width;
            const height = canvas.height;

            // Use CSS variable for dynamic theming (light/dark bg)
            const bgColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--souvenir-bg-fallback')
            .trim() || '#fff';

            // 1. Paint background behind transparent image
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, width, height);

            ctx.drawImage(img, 0, 0, width, height);
        };
    }); 


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