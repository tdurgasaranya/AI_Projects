{\rtf1\ansi\ansicpg1252\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Matrix Rain Effect\
const canvas = document.getElementById('matrix-bg');\
const ctx = canvas.getContext('2d');\
\
canvas.width = window.innerWidth;\
canvas.height = window.innerHeight;\
\
const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~\{[|`]\}";\
const matrixArray = matrix.split("");\
\
const fontSize = 10;\
const columns = canvas.width / fontSize;\
\
const drops = [];\
for(let x = 0; x < columns; x++) \{\
    drops[x] = 1;\
\}\
\
function drawMatrix() \{\
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';\
    ctx.fillRect(0, 0, canvas.width, canvas.height);\
\
    ctx.fillStyle = '#00ff00';\
    ctx.font = fontSize + 'px monospace';\
\
    for(let i = 0; i < drops.length; i++) \{\
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];\
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);\
\
        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) \{\
            drops[i] = 0;\
        \}\
        drops[i]++;\
    \}\
\}\
\
setInterval(drawMatrix, 35);\
\
// Remove loading bar after page load\
window.addEventListener('load', () => \{\
    setTimeout(() => \{\
        document.querySelector('.loading-bar').style.display = 'none';\
    \}, 2000);\
\});\
\
// Smooth scrolling\
document.querySelectorAll('a[href^="#"]').forEach(anchor => \{\
    anchor.addEventListener('click', function (e) \{\
        e.preventDefault();\
        const target = document.querySelector(this.getAttribute('href'));\
        if (target) \{\
            target.scrollIntoView(\{\
                behavior: 'smooth',\
                block: 'start'\
            \});\
        \}\
    \});\
\});\
\
// Scroll to top button\
const scrollTopBtn = document.getElementById('scrollTop');\
\
window.addEventListener('scroll', () => \{\
    if (window.pageYOffset > 300) \{\
        scrollTopBtn.classList.add('active');\
    \} else \{\
        scrollTopBtn.classList.remove('active');\
    \}\
\});\
\
scrollTopBtn.addEventListener('click', () => \{\
    window.scrollTo(\{\
        top: 0,\
        behavior: 'smooth'\
    \});\
\});\
\
// Intersection Observer for animations\
const observerOptions = \{\
    threshold: 0.1,\
    rootMargin: '0px 0px -50px 0px'\
\};\
\
const observer = new IntersectionObserver((entries) => \{\
    entries.forEach(entry => \{\
        if (entry.isIntersecting) \{\
            entry.target.style.opacity = '1';\
            entry.target.style.transform = 'translateY(0)';\
        \}\
    \});\
\}, observerOptions);\
\
// Observe all cards\
document.querySelectorAll('.project-card, .skill-card').forEach(card => \{\
    card.style.opacity = '0';\
    card.style.transform = 'translateY(20px)';\
    card.style.transition = 'all 0.6s ease';\
    observer.observe(card);\
\});\
\
// Resize canvas on window resize\
window.addEventListener('resize', () => \{\
    canvas.width = window.innerWidth;\
    canvas.height = window.innerHeight;\
\});\
\
// Animate hero stats on scroll\
const stats = document.querySelectorAll('.stat-number');\
let statsAnimated = false;\
\
const animateStats = () => \{\
    stats.forEach(stat => \{\
        const target = stat.innerText;\
        if (target.includes('+')) \{\
            const num = parseInt(target);\
            let current = 0;\
            const increment = num / 50;\
            const timer = setInterval(() => \{\
                current += increment;\
                if (current >= num) \{\
                    stat.innerText = target;\
                    clearInterval(timer);\
                \} else \{\
                    stat.innerText = Math.floor(current) + '+';\
                \}\
            \}, 30);\
        \}\
    \});\
\};\
\
window.addEventListener('scroll', () => \{\
    const heroSection = document.querySelector('.hero');\
    const rect = heroSection.getBoundingClientRect();\
    if (rect.top < window.innerHeight && rect.bottom > 0 && !statsAnimated) \{\
        statsAnimated = true;\
        animateStats();\
    \}\
\});}