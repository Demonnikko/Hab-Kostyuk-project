/* ==========================================
   KOSTYUK PROJECT - PREMIUM PORTFOLIO
   Main Application Logic
   ========================================== */

// ===== DATA CONFIGURATION =====
const TravelData = {
    "Вологодская": {
        fee: 9000,
        cities: {
            "Вологда": 9000,
            "Череповец": 15000,
            "Сокол": 12000
        }
    },
    "Владимирская": {
        fee: 10000,
        cities: {
            "Владимир": 10000,
            "Ковров": 10000,
            "Муром": 17000,
            "Александров": 10000,
            "Гусь-Хрустальный": 13500
        }
    },
    "Ивановская": {
        fee: 5000,
        cities: {
            "Иваново": 2000,
            "Кинешма": 3500,
            "Шуя": 3000,
            "Тейково": 2500,
            "Кохма": 2500,
            "Вичуга": 3000,
            "Фурманов": 2500,
            "Родники": 3000,
            "Приволжск": 2000,
            "Южа": 4000
        }
    },
    "Костромская": {
        fee: 3000,
        cities: {
            "Кострома": 2000,
            "Шарья": 6000,
            "Нерехта": 2000,
            "Буй": 3000,
            "Волгореченск": 2000,
            "Мантурово": 5500,
            "Галич": 3500
        }
    },
    "Ярославская": {
        fee: 1000,
        cities: {
            "Ярославль": 0,
            "Рыбинск": 2000,
            "Тутаев": 2000,
            "Переславль-Залесский": 2000,
            "Углич": 2000,
            "Ростов": 2000,
            "Гаврилов-Ям": 2000,
            "Данилов": 2000,
            "Пошехонье": 4000,
            "Мышкин": 2000,
            "Любим": 2000
        }
    }
};

const ServiceData = {
    kids: {
        name: "Детские шоу",
        items: {
            "Детское шоу (30 мин)": { p: 11250, d: "Веселая магия" },
            "Детское шоу (40 мин)": { p: 13750, d: "Расширенная" },
            "Индив. детское шоу": { p: 21250, d: "30 мин + фокус имениннику (11-й ребенок +1000₽)" }
        }
    },
    std: {
        name: "Взрослые шоу",
        items: {
            "Шоу (20 мин)": { p: 17500, d: "Сет из 3-4 трюков" },
            "Шоу (30 мин)": { p: 23750, d: "Универсальный" },
            "Шоу (40 мин)": { p: 30000, d: "Расширенный вариант" }
        }
    },
    close: {
        name: "Микромагия",
        items: {
            "Микромагия (30 мин)": { p: 13000, d: "Фокусы в руках" },
            "Микромагия (1 ч)": { p: 20000, d: "Обход гостей" },
            "Микромагия (2 ч)": { p: 30000, d: "Welcome-зона 80–120 чел." },
            "Микромагия (3 ч)": { p: 36000, d: "Максимальное покрытие" }
        }
    },
    spec: {
        name: "Спец-проекты",
        items: {
            "Свадебное шоу (20 мин)": { p: 26250, d: "Романтичный блок" },
            "Свадебное шоу (30 мин)": { p: 32500, d: "Расширенный свадебный" },
            "Корпоратив (20 мин)": { p: 26250, d: "Юмор" },
            "Корпоратив (30 мин)": { p: 32500, d: "Расширенный" },
            "Юбилей (20 мин)": { p: 23750, d: "Подарок юбиляру" },
            "Юбилей (30 мин)": { p: 30000, d: "Расширенный" },
            "Выпускной (20 мин)": { p: 23750, d: "Современный" },
            "Выпускной (30 мин)": { p: 30000, d: "Расширенный" }
        }
    },
    conc: {
        name: "Концерты",
        items: {
            "Мини-шоу «СЕКРЕТ» (1 ч)": { p: 150000, d: "Атмосферный моно-спектакль" },
            "Спектакль «СЕКРЕТ» (2 ч)": { p: 300000, d: "Полноценный концерт с антрактом" }
        }
    }
};

const FAQData = [
    { q: "За сколько бронировать дату?", a: "Обычно за 1–2 недели; популярные даты — за месяц и раньше." },
    { q: "Какой размер задатка?", a: "50 % от согласованной суммы. Остальное — в день мероприятия." },
    { q: "Всё ли входит в стоимость?", a: "Да, цена «под ключ» без скрытых платежей." },
    { q: "Сколько длится программа?", a: "Частные шоу — 20–40 мин, микромагия — до 3 ч, концерт — 1–2 ч." },
    { q: "Можно персонализировать трюк?", a: "Да! Подготовим номер под вашего именинника/бренд/событие." },
    { q: "Нужна ли сцена?", a: "Чаще нет. Для больших залов и концертной программы — по согласованию." },
    { q: "Что по звуку и аппаратуре?", a: "С ведущим — всё готово. Без ведущего нужна активная колонка/микрофон." },
    { q: "Сколько занимает подготовка?", a: "Около 30 мин; для концертной программы — до 1 ч." },
    { q: "Выезжаете в другие регионы?", a: "Да, работаю в нескольких областях и выезжаю по стране." },
    { q: "Способы оплаты?", a: "Безнал, СБП, наличные. Предусмотрен договор и чек." },
    { q: "Какой возраст для детских шоу?", a: "Для детей 8+; для младших — по согласованию и с адаптацией интерактива." },
    { q: "Можно снимать фото/видео?", a: "Да, съёмка приветствуется." },
    { q: "Есть ли официальное оформление?", a: "Да, работаю по договору (ИП), предоставляю чек." },
    { q: "Возможна площадка под открытым небом?", a: "Летом при безветренной погоде, с резервным планом на дождь." },
    { q: "Безопасны ли спецэффекты?", a: "Используются только сертифицированные и безопасные эффекты." },
    { q: "Можно ли интегрировать бренд компании?", a: "Да, интегрируем лого и смыслы бренда в интерактив и номера." },
    { q: "Что если дата переносится?", a: "Перенос возможен при наличии свободного слота; условия фиксируем в договоре." },
    { q: "Какой формат аудитории подходит?", a: "От камерных вечеринок 10–20 гостей до залов на 500+ человек." },
    { q: "Проводите мастер-классы?", a: "Да: 60 мин обучения + реквизит, участники показывают фокус сразу." }
];

// Gallery Images
const GalleryImages = [
    'images/gallery/1.jpg',
    'images/gallery/2.jpg',
    'images/gallery/3.jpg',
    'images/gallery/4.jpg',
    'images/gallery/5.jpg',
    'images/gallery/6.jpg'
];

// ===== APPLICATION STATE =====
let AppState = {
    discount: 0,
    currentPage: 'home'
};

// ===== INITIALIZATION =====
window.addEventListener('load', () => {
    initCalc();
    initFAQ();
    initSchoolTimer();
    initRevealAnimations();
    initCurtainAnimation();
    initParticles();
    initFABScroll();
    initParallax();
    initCardMorphing();
});

// ===== CURTAIN ANIMATION =====
function initCurtainAnimation() {
    setTimeout(() => {
        document.body.classList.add('curtains-open');
        document.getElementById('curtain-logo').style.opacity = '0';
        setTimeout(() => {
            const overlay = document.getElementById('intro-overlay');
            if (overlay) overlay.style.display = 'none';
        }, 1000);
    }, 600);
}

// ===== REVEAL ANIMATIONS =====
function initRevealAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Animate counters
                if (entry.target.id === 'anim-shows') {
                    animateValue("anim-shows", 0, 1838, 2000);
                }
                if (entry.target.id === 'anim-exp') {
                    animateValue("anim-exp", 0, 7, 1000);
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Observe counters
    const showsEl = document.getElementById('anim-shows');
    if (showsEl && showsEl.parentElement && showsEl.parentElement.parentElement) {
        observer.observe(showsEl.parentElement.parentElement);
    }
}

// ===== ANIMATE VALUE =====
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;

    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const val = Math.floor(progress * (end - start) + start);
        obj.innerHTML = val + (id === 'anim-exp' ? ' лет опыта' : '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ===== NAVIGATION =====
function goToPage(id) {
    const page = document.getElementById(id);
    if (!page) return;

    const homePage = document.getElementById('home-page');

    // Морфинг анимация: домашняя страница уменьшается и исчезает
    homePage.style.transform = 'scale(0.95)';
    homePage.style.opacity = '0';

    // Задержка перед показом новой страницы
    setTimeout(() => {
        page.classList.add('active');
        document.getElementById('fab-up').classList.add('visible');
        AppState.currentPage = id;
        page.scrollTop = 0;

        // Морфинг анимация: новая страница появляется с увеличением
        page.style.transform = 'scale(0.95)';
        page.style.opacity = '0';

        requestAnimationFrame(() => {
            page.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease';
            page.style.transform = 'scale(1)';
            page.style.opacity = '1';
        });
    }, 300);
}

function goBack() {
    const activePage = document.querySelector('.inner-page.active');
    const homePage = document.getElementById('home-page');

    if (activePage) {
        // Морфинг анимация: текущая страница уменьшается и исчезает
        activePage.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease';
        activePage.style.transform = 'scale(0.95)';
        activePage.style.opacity = '0';

        setTimeout(() => {
            document.querySelectorAll('.inner-page').forEach(p => {
                p.classList.remove('active');
                p.style.transform = '';
                p.style.opacity = '';
            });

            // Морфинг анимация: домашняя страница появляется с увеличением
            homePage.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease';
            homePage.style.transform = 'scale(1)';
            homePage.style.opacity = '1';

            document.getElementById('fab-up').classList.remove('visible');
            AppState.currentPage = 'home';
        }, 400);
    }
}

function openLink(url) {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.click();
}

function openContact(msg = 'Здравствуйте!') {
    openLink(`https://t.me/demonnikko?text=${encodeURIComponent(msg)}`);
}

function showToast(msg, type = 'info') {
    const toast = document.getElementById('toast');
    const msgEl = toast.querySelector('span');
    msgEl.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function scrollToTop() {
    const currentPage = document.querySelector('.page-container.active, #home-page');
    if (currentPage) {
        currentPage.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ===== FAB SCROLL DETECTION =====
function initFABScroll() {
    const pages = document.querySelectorAll('.page-container');
    pages.forEach(page => {
        page.addEventListener('scroll', () => {
            const fab = document.getElementById('fab-up');
            if (page.scrollTop > 300) {
                fab.classList.add('visible');
            } else {
                fab.classList.remove('visible');
            }
        });
    });
}

// ===== MODALS =====
function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.classList.add('hidden');

    // Clear video sources
    if (id === 'modal-story') {
        const video = document.getElementById('story-video');
        if (video) video.src = '';
    }
    if (id === 'modal-promo') {
        const video = document.getElementById('promo-video-frame');
        if (video) video.src = '';
    }
}

function openPromo(type) {
    const modal = document.getElementById('modal-promo');
    const video = document.getElementById('promo-video-frame');

    modal.classList.remove('hidden');

    // Video URLs - Replace with actual RuTube/YouTube URLs
    const videoUrls = {
        'tvshow': 'https://rutube.ru/play/embed/YOUR_CODE',
        'matvey': 'https://rutube.ru/play/embed/YOUR_CODE',
        'secret': 'https://rutube.ru/play/embed/YOUR_CODE',
        'huli': 'https://rutube.ru/play/embed/YOUR_CODE',
        'private': 'https://rutube.ru/play/embed/YOUR_CODE'
    };

    video.src = videoUrls[type] || '';
}

function openLightbox(type) {
    if (type === 'gallery') {
        openGallery();
    } else {
        const lightbox = document.getElementById('lightbox');
        const img = document.getElementById('lightbox-img');
        img.src = type;
        lightbox.classList.remove('hidden');
    }
}

function openStory(type) {
    const modal = document.getElementById('modal-story');
    const video = document.getElementById('story-video');

    modal.classList.remove('hidden');

    // Story video URLs
    const storyUrls = {
        'reviews': 'https://www.youtube.com/embed/YOUR_CODE?autoplay=1',
        'moments': 'https://www.youtube.com/embed/YOUR_CODE?autoplay=1'
    };

    video.src = storyUrls[type] || '';
}

// ===== GALLERY =====
function openGallery() {
    const modal = document.getElementById('modal-gallery');
    if (!modal) return;

    modal.classList.remove('hidden');
}

function closeGallery() {
    const modal = document.getElementById('modal-gallery');
    if (modal) modal.classList.add('hidden');
}

// ===== CALCULATOR LOGIC =====
function holidayMultiplier(dateStr) {
    if (!dateStr) return 1;
    const dt = new Date(dateStr);
    const m = dt.getMonth() + 1;
    const day = dt.getDate();

    // New Year (x2)
    if ((m === 12 && day === 31) || (m === 1 && (day === 1 || day === 2))) return 2;
    // Pre-New Year (x1.5)
    if (m === 12 && day >= 8 && day <= 30) return 1.5;

    return 1;
}

function roadHolidayMultiplier(dateStr) {
    if (!dateStr) return 1;
    const dt = new Date(dateStr);
    const m = dt.getMonth() + 1;
    const day = dt.getDate();

    // New Year (x2)
    if ((m === 12 && day === 31) || (m === 1 && (day === 1 || day === 2))) return 2;
    // Pre-New Year (x1.5)
    if (m === 12 && day >= 8 && day <= 30) return 1.5;
    // Feb 23 and Mar 8 (x1.5)
    if (m === 2 && (day === 22 || day === 23)) return 1.5;
    if (m === 3 && (day === 7 || day === 8)) return 1.5;

    return 1;
}

function initCalc() {
    const area = document.getElementById('calc-area');
    const cat = document.getElementById('calc-cat');

    if (!area || !cat) return;

    // Populate areas
    Object.keys(TravelData).forEach(k => area.add(new Option(k, k)));
    Object.keys(ServiceData).forEach(k => cat.add(new Option(ServiceData[k].name, k)));

    // Area change handler
    area.onchange = () => {
        const city = document.getElementById('calc-city');
        city.disabled = false;
        city.innerHTML = '<option disabled selected>Город</option>';
        Object.keys(TravelData[area.value].cities).forEach(k =>
            city.add(new Option(k, k))
        );
    };

    // Category change handler
    cat.onchange = () => {
        const svc = document.getElementById('calc-svc');
        svc.disabled = false;
        svc.innerHTML = '<option disabled selected>Программа</option>';
        Object.keys(ServiceData[cat.value].items).forEach(k =>
            svc.add(new Option(k, k))
        );
    };

    // Service change handler
    const svc = document.getElementById('calc-svc');
    if (svc) {
        svc.onchange = (e) => {
            const desc = document.getElementById('calc-desc');
            const catVal = document.getElementById('calc-cat').value;
            if (desc && ServiceData[catVal]) {
                desc.innerText = ServiceData[catVal].items[e.target.value].d;
            }
        };
    }

    // Guests change handler
    const guests = document.getElementById('calc-guests');
    if (guests) {
        guests.onchange = (e) => {
            const slider = document.getElementById('guest-slider-block');
            if (slider) {
                slider.style.display = e.target.value === 'custom' ? 'flex' : 'none';
            }
        };
    }

    // Range slider
    const range = document.getElementById('guest-range');
    if (range) {
        range.oninput = (e) => {
            const count = document.getElementById('guest-count');
            if (count) count.innerText = e.target.value;
        };
    }

    // Set min date
    const dateInput = document.getElementById('calc-date');
    if (dateInput) {
        dateInput.min = new Date().toISOString().split('T')[0];
    }
}

function calculatePrice() {
    const area = document.getElementById('calc-area').value;
    const city = document.getElementById('calc-city').value;
    const cat = document.getElementById('calc-cat').value;
    const svc = document.getElementById('calc-svc').value;
    const guests = document.getElementById('calc-guests').value;
    const date = document.getElementById('calc-date').value;

    if (!area || !city || !cat || !svc || !date) {
        showToast('Заполните все поля!');
        return;
    }

    // 1. Base price
    let base = ServiceData[cat].items[svc].p;
    if (area === 'Ярославская' && city === 'Ярославль') base += 1000;

    // 2. Road cost
    const roadBase = TravelData[area].cities[city];
    const rCoef = roadHolidayMultiplier(date);
    const roadExtra = Math.round(roadBase * (rCoef - 1));

    // 3. Guests
    let gst = 0;
    if (guests === 'custom') {
        const guestCount = parseInt(document.getElementById('guest-range').value);
        gst = (guestCount - 200) * 80;
    } else {
        gst = parseInt(guests) || 0;
    }

    // 4. Subtotal
    const subTotal = base + roadBase + roadExtra + gst;

    // 5. Holiday multiplier
    const hCoef = holidayMultiplier(date);
    const holUp = Math.round(subTotal * (hCoef - 1));

    // 6. Total before discount
    let total = subTotal + holUp;

    // 7. Apply discount
    if (AppState.discount > 0) {
        total = Math.round(total * (100 - AppState.discount) / 100);
    }

    // Display results
    document.getElementById('total-price').innerText = total.toLocaleString() + ' ₽';

    let breakdown = `Услуга: ${base.toLocaleString()} ₽ | Дорога: ${roadBase.toLocaleString()} ₽`;
    if (roadExtra > 0) breakdown += ` (+${roadExtra.toLocaleString()} ₽ праздн.)`;
    if (gst > 0) breakdown += ` | Гости: ${gst.toLocaleString()} ₽`;
    if (holUp > 0) breakdown += ` | Праздник (x${hCoef})`;
    if (AppState.discount > 0) breakdown += ` | Скидка -${AppState.discount}%`;

    document.getElementById('price-breakdown').innerText = breakdown;

    const result = document.getElementById('calc-result');
    result.classList.remove('hidden');
    result.classList.add('fade-in-up');

    setTimeout(() => {
        result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

function bookViaTelegram() {
    const price = document.getElementById('total-price').innerText;
    if (!price) return;

    const area = document.getElementById('calc-area').value;
    const city = document.getElementById('calc-city').value;
    const date = document.getElementById('calc-date').value;
    const svc = document.getElementById('calc-svc').value;

    const message = `Заявка на дату ${date}.\nГород: ${city} (${area})\nУслуга: ${svc}\nРасчетная цена: ${price}`;
    openContact(message);
}

// ===== FAQ =====
function initFAQ() {
    const faqList = document.getElementById('faq-list');
    if (!faqList) return;

    faqList.innerHTML = FAQData.map(item => `
        <details class="bg-white/5 rounded-xl border border-white/5 overflow-hidden group">
            <summary class="p-4 font-bold text-[#C6A664] cursor-pointer text-sm flex justify-between items-center">
                ${item.q}
                <span class="text-white transition-transform group-open:rotate-45">+</span>
            </summary>
            <div class="p-4 pt-2 text-xs text-gray-300 border-t border-white/5 leading-relaxed">
                ${item.a}
            </div>
        </details>
    `).join('');
}

// ===== SCHOOL LOGIC =====
function initSchoolTimer() {
    const targetDate = 3 * 24 * 60 * 60 * 1000 + Date.now();

    const updateTimer = () => {
        const diff = targetDate - Date.now();
        if (diff <= 0) return;

        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);

        const timerEl = document.getElementById('school-timer');
        if (timerEl) {
            timerEl.innerHTML = `
                <div class="bg-black px-2 py-1 rounded">0${days} дн</div>
                <div class="bg-black px-2 py-1 rounded">${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}</div>
            `;
        }
    };

    updateTimer();
    setInterval(updateTimer, 60000);
}

function scrollToForm() {
    const form = document.getElementById('school-form');
    if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
    }
}

function submitSchoolForm() {
    const parent = document.getElementById('s-parent').value;
    const phone = document.getElementById('s-phone').value;
    const age = document.getElementById('s-age').value;

    if (!parent || !phone || !age) {
        showToast('Заполните все поля');
        return;
    }

    const message = `Заявка в Школу!\nРодитель: ${parent}\nТел: ${phone}\nВозраст: ${age}`;
    openContact(message);
}

// ===== PREMIUM PARTICLES EFFECT =====
function initParticles() {
    const container = document.querySelector('.particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(198, 166, 100, 0.3);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(particle);
    }
}

// Add particle float animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 0.5; }
        90% { opacity: 0.5; }
        100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ===== PARALLAX SCROLLING =====
function initParallax() {
    // Параллакс отключен для премиум эффекта
    // Элементы остаются статичными при скролле
    return;
}

// ===== CARD MORPHING ANIMATIONS =====
function initCardMorphing() {
    const cards = document.querySelectorAll('.app-card');

    // Инициализируем карточки с начальным состоянием
    cards.forEach((card, index) => {
        // Начальная позиция для морфинга
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9) translateY(20px)';
        card.style.filter = 'blur(10px)';

        // Плавный морфинг с задержкой
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
            card.style.filter = 'blur(0px)';
        }, 100 + index * 100);
    });

    // Морфинг эффект при hover
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            // Создаем волновой эффект
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(212, 175, 55, 0.3), transparent);
                pointer-events: none;
                transform: translate(-50%, -50%);
                animation: morphRipple 0.8s ease-out;
            `;
            card.appendChild(ripple);

            setTimeout(() => ripple.remove(), 800);
        });

        // Морфинг при клике
        card.addEventListener('click', function(e) {
            if (this.tagName === 'BUTTON' || this.closest('button')) {
                // Пульсация при клике
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });

    // Добавляем CSS анимацию для ripple
    if (!document.getElementById('morphing-styles')) {
        const style = document.createElement('style');
        style.id = 'morphing-styles';
        style.textContent = `
            @keyframes morphRipple {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 1;
                }
                100% {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                }
            }

            .app-card {
                will-change: transform;
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== SMOOTH CURSOR FOLLOW =====
let cursorDot, cursorOutline;

function initCustomCursor() {
    // Создаем кастомный курсор с новыми цветами
    cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorDot.style.cssText = `
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, #D4AF37, #8B5CF6);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s, background 0.3s;
        box-shadow: 0 0 20px rgba(212, 175, 55, 0.6), 0 0 40px rgba(139, 92, 246, 0.4);
    `;

    cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    cursorOutline.style.cssText = `
        width: 40px;
        height: 40px;
        border: 2px solid rgba(212, 175, 55, 0.6);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s, border-color 0.3s;
    `;

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    // Следование за мышкой
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Плавное следование outline
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Эффекты при наведении с новыми цветами
    const interactiveElements = document.querySelectorAll('a, button, .app-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.width = '16px';
            cursorDot.style.height = '16px';
            cursorDot.style.background = 'linear-gradient(135deg, #8B5CF6, #9D174D)';
            cursorDot.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.8), 0 0 60px rgba(157, 23, 77, 0.6)';
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.borderColor = 'rgba(139, 92, 246, 0.8)';
            cursorOutline.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.4)';
        });

        el.addEventListener('mouseleave', () => {
            cursorDot.style.width = '8px';
            cursorDot.style.height = '8px';
            cursorDot.style.background = 'linear-gradient(135deg, #D4AF37, #8B5CF6)';
            cursorDot.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.6), 0 0 40px rgba(139, 92, 246, 0.4)';
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.borderColor = 'rgba(212, 175, 55, 0.6)';
            cursorOutline.style.boxShadow = '';
        });
    });
}

// Запускаем курсор на десктопе
if (window.innerWidth > 768) {
    window.addEventListener('load', initCustomCursor);
}

// ===== EXPORT FOR GLOBAL ACCESS =====
window.goToPage = goToPage;
window.goBack = goBack;
window.openLink = openLink;
window.openContact = openContact;
window.scrollToTop = scrollToTop;
window.closeModal = closeModal;
window.openPromo = openPromo;
window.openLightbox = openLightbox;
window.openStory = openStory;
window.calculatePrice = calculatePrice;
window.bookViaTelegram = bookViaTelegram;
window.scrollToForm = scrollToForm;
window.submitSchoolForm = submitSchoolForm;
window.closeGallery = closeGallery;
