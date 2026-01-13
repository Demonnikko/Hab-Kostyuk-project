/* ==========================================
   PREMIUM IMAGE PLACEHOLDERS
   SVG-based placeholder generator
   ========================================== */

// Generate premium placeholder SVG
function createPlaceholder(width, height, text, gradient = 'gold') {
    const gradients = {
        gold: {
            start: '#C6A664',
            end: '#8A6E36'
        },
        purple: {
            start: '#b464ff',
            end: '#8844cc'
        },
        blue: {
            start: '#64b4ff',
            end: '#4488cc'
        },
        dark: {
            start: '#2a2a2a',
            end: '#1a1a1a'
        }
    };

    const grad = gradients[gradient] || gradients.gold;

    const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad-${gradient}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${grad.start};stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:${grad.end};stop-opacity:0.9" />
                </linearGradient>
                <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.05)"/>
                </pattern>
            </defs>
            <rect width="${width}" height="${height}" fill="url(#grad-${gradient})"/>
            <rect width="${width}" height="${height}" fill="url(#pattern)"/>
            <text
                x="50%"
                y="50%"
                text-anchor="middle"
                dominant-baseline="middle"
                font-family="'Playfair Display', serif"
                font-size="${Math.min(width, height) / 10}"
                font-weight="700"
                fill="rgba(255,255,255,0.9)"
                style="text-shadow: 0 2px 10px rgba(0,0,0,0.5);"
            >${text}</text>
        </svg>
    `;

    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

// Apply placeholders on page load
function initPlaceholders() {
    const placeholderMap = {
        'portrait.jpg': { width: 400, height: 400, text: 'ПОРТРЕТ', gradient: 'gold' },
        'story-reviews.jpg': { width: 200, height: 200, text: 'ОТЗЫВЫ', gradient: 'purple' },
        'story-gallery.jpg': { width: 200, height: 200, text: 'ГАЛЕРЕЯ', gradient: 'gold' },
        'story-moments.jpg': { width: 200, height: 200, text: 'ЭМОЦИИ', gradient: 'blue' },
        'bg-texture.jpg': { width: 1920, height: 1080, text: '', gradient: 'dark' },
        'school-student-1.jpg': { width: 800, height: 600, text: 'УЧЕНИКИ', gradient: 'blue' },
        'school-student-2.jpg': { width: 800, height: 600, text: 'ВЫПУСКНОЙ', gradient: 'blue' },
        'tv-show-cover.jpg': { width: 800, height: 400, text: 'ТВ-ШОУ', gradient: 'purple' }
    };

    // Replace all image sources with placeholders
    document.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src');
        if (!src) return;

        const filename = src.split('/').pop();
        const config = placeholderMap[filename];

        if (config) {
            img.src = createPlaceholder(
                config.width,
                config.height,
                config.text,
                config.gradient
            );
            img.style.backgroundColor = '#1a1a1a';
        }
    });

    // Generate gallery placeholders
    const galleryImages = [];
    for (let i = 1; i <= 6; i++) {
        galleryImages.push(
            createPlaceholder(800, 600, `ФОТО ${i}`, i % 3 === 0 ? 'purple' : 'gold')
        );
    }

    // Store for later use
    window.GALLERY_IMAGES = galleryImages;
}

// Run on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlaceholders);
} else {
    initPlaceholders();
}
