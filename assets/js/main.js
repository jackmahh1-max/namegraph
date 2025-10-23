// ===== NAME POPULARITY DATA =====
// Simulated historical data for name popularity across decades
const namePopularityData = {
    // Female names
    'emma': [45, 38, 32, 28, 35, 52, 68, 85, 92, 88],
    'olivia': [12, 15, 18, 22, 28, 45, 68, 82, 95, 92],
    'jennifer': [25, 35, 58, 88, 95, 72, 45, 28, 18, 15],
    'mary': [88, 82, 75, 68, 55, 42, 35, 28, 22, 18],
    'linda': [35, 65, 82, 72, 55, 38, 25, 18, 12, 10],
    'sophia': [22, 20, 18, 15, 18, 25, 42, 65, 85, 88],
    'emily': [28, 32, 38, 45, 58, 72, 82, 75, 65, 58],
    'madison': [8, 10, 12, 15, 28, 48, 72, 68, 55, 48],
    'elizabeth': [68, 65, 62, 58, 55, 52, 48, 45, 42, 40],
    'ashley': [15, 18, 25, 42, 68, 85, 72, 52, 35, 25],
    'jessica': [22, 28, 38, 58, 82, 88, 68, 45, 32, 22],
    'sarah': [42, 48, 52, 58, 68, 72, 65, 55, 45, 38],
    'amanda': [18, 25, 35, 52, 72, 78, 58, 38, 25, 18],
    'mia': [10, 12, 15, 18, 22, 35, 55, 75, 88, 85],
    'ava': [12, 15, 18, 20, 25, 38, 58, 78, 90, 88],
    
    // Male names
    'liam': [15, 18, 20, 22, 25, 35, 58, 78, 92, 95],
    'noah': [12, 15, 18, 22, 28, 42, 62, 82, 90, 88],
    'michael': [62, 72, 82, 92, 88, 75, 58, 42, 32, 28],
    'james': [88, 85, 82, 78, 72, 65, 58, 52, 48, 45],
    'john': [92, 88, 82, 75, 68, 58, 48, 42, 38, 35],
    'robert': [78, 75, 72, 68, 62, 55, 48, 42, 35, 32],
    'david': [72, 75, 78, 75, 68, 58, 48, 38, 32, 28],
    'william': [82, 78, 75, 72, 68, 62, 58, 55, 52, 50],
    'ethan': [15, 18, 22, 28, 38, 58, 78, 82, 75, 68],
    'alexander': [25, 28, 32, 38, 45, 55, 68, 75, 72, 68],
    'daniel': [35, 42, 52, 65, 75, 78, 72, 62, 55, 48],
    'matthew': [32, 38, 48, 62, 78, 82, 75, 62, 48, 38],
    'jackson': [12, 15, 18, 22, 28, 42, 62, 75, 82, 78],
    'logan': [10, 12, 15, 18, 25, 38, 58, 72, 78, 75],
    'jacob': [22, 28, 35, 48, 65, 78, 82, 72, 58, 48],
    
    // Additional common names
    'isabella': [18, 20, 22, 25, 32, 48, 68, 82, 85, 80],
    'charlotte': [28, 25, 22, 20, 25, 35, 52, 72, 88, 92],
    'amelia': [15, 18, 20, 22, 25, 32, 48, 68, 85, 88],
    'harper': [8, 10, 12, 15, 20, 32, 52, 72, 82, 78],
    'evelyn': [42, 38, 32, 28, 25, 28, 38, 58, 75, 80],
    'mason': [12, 15, 18, 22, 28, 42, 65, 82, 85, 78],
    'benjamin': [38, 42, 45, 48, 52, 58, 65, 72, 78, 75],
    'lucas': [15, 18, 22, 28, 35, 48, 65, 78, 82, 80],
    'henry': [52, 48, 42, 38, 35, 38, 45, 58, 72, 75],
    'sebastian': [10, 12, 15, 18, 22, 32, 48, 65, 78, 82]
};

// Generate data for names not in the database
function generateNameData(name) {
    const seed = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const random = (seed * 9301 + 49297) % 233280;
    const basePopularity = (random / 233280) * 50 + 20;
    
    const data = [];
    let current = basePopularity;
    
    for (let i = 0; i < 10; i++) {
        const variance = ((seed * (i + 1) * 9301) % 20) - 10;
        current = Math.max(5, Math.min(95, current + variance));
        data.push(Math.round(current));
    }
    
    return data;
}

// Get popularity data for a name
function getNameData(name) {
    const normalized = name.toLowerCase().trim();
    
    if (namePopularityData[normalized]) {
        return namePopularityData[normalized];
    }
    
    return generateNameData(normalized);
}

// ===== CHART INSTANCE =====
let chartInstance = null;

// ===== TOOL FUNCTIONALITY =====
const nameInput = document.getElementById('nameInput');
const generateBtn = document.getElementById('generateBtn');
const resetBtn = document.getElementById('resetBtn');
const resultSection = document.getElementById('resultSection');
const resultName = document.getElementById('resultName');
const peakYear = document.getElementById('peakYear');
const peakPopularity = document.getElementById('peakPopularity');
const avgScore = document.getElementById('avgScore');
const currentTrend = document.getElementById('currentTrend');

// Generate graph function
function generateGraph() {
    const name = nameInput.value.trim();
    
    if (!name) {
        alert('Please enter a name to continue.');
        nameInput.focus();
        return;
    }
    
    // Get popularity data
    const popularityData = getNameData(name);
    const decades = ['1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2015s', '2020s', '2025'];
    
    // Calculate statistics
    const maxPopularity = Math.max(...popularityData);
    const maxIndex = popularityData.indexOf(maxPopularity);
    const peakDecade = decades[maxIndex];
    const average = Math.round(popularityData.reduce((a, b) => a + b, 0) / popularityData.length);
    
    // Determine trend
    const recentTrend = popularityData[popularityData.length - 1] - popularityData[popularityData.length - 2];
    let trendText = 'Stable';
    if (recentTrend > 10) trendText = 'Rising ↑';
    else if (recentTrend < -10) trendText = 'Declining ↓';
    
    // Update result section
    resultName.textContent = `Popularity Timeline for "${name.charAt(0).toUpperCase() + name.slice(1)}"`;
    peakYear.textContent = peakDecade;
    peakPopularity.textContent = `${maxPopularity}%`;
    avgScore.textContent = `${average}%`;
    currentTrend.textContent = trendText;
    
    // Show result section
    resultSection.style.display = 'block';
    
    // Scroll to results
    setTimeout(() => {
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
    
    // Destroy existing chart if it exists
    if (chartInstance) {
        chartInstance.destroy();
    }
    
    // Create chart
    const ctx = document.getElementById('popularityChart').getContext('2d');
    
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: decades,
            datasets: [{
                label: 'Popularity Score',
                data: popularityData,
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderColor: 'rgba(99, 102, 241, 1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'rgba(99, 102, 241, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: 'rgba(99, 102, 241, 1)',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(31, 41, 55, 0.95)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `Popularity: ${context.parsed.y}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12,
                            family: 'Poppins'
                        },
                        color: '#6B7280'
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(229, 231, 235, 0.5)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 12,
                            family: 'Poppins'
                        },
                        color: '#6B7280',
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

// Reset function
function resetTool() {
    nameInput.value = '';
    resultSection.style.display = 'none';
    nameInput.focus();
    
    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }
}

// Event listeners
generateBtn.addEventListener('click', generateGraph);
resetBtn.addEventListener('click', resetTool);

nameInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        generateGraph();
    }
});

// ===== NAVIGATION FUNCTIONALITY =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show-menu');
        
        // Change icon
        const icon = this.querySelector('i');
        if (navMenu.classList.contains('show-menu')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('show-menu');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');

function scrollHeader() {
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById('backToTop');

function scrollTop() {
    if (window.scrollY >= 400) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

window.addEventListener('scroll', scrollTop);

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== KEYBOARD NAVIGATION =====
if (navToggle) {
    navToggle.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
}

// ===== ACCESSIBILITY: FOCUS MANAGEMENT =====
// Trap focus in mobile menu when open
if (navMenu) {
    const focusableElements = navMenu.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    document.addEventListener('keydown', function(e) {
        if (!navMenu.classList.contains('show-menu')) return;
        
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
        
        if (e.key === 'Escape') {
            navMenu.classList.remove('show-menu');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            navToggle.focus();
        }
    });
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', function() {
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === '/')) {
            link.classList.add('active');
        }
    });
    
    // Focus on name input if on homepage
    if (nameInput && window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html')) {
        setTimeout(() => {
            nameInput.focus();
        }, 500);
    }
    
    console.log('Name Popularity Graph - Initialized');
});