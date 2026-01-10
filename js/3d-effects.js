/* ==========================================
   KOSTYUK PROJECT - 3D EFFECTS
   Three.js Premium Background
   ========================================== */

// Инициализация Three.js сцены
let scene, camera, renderer, particles, particlesMesh;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function init3DBackground() {
    // Создаем сцену
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.001);

    // Камера
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.z = 400;

    // Рендерер
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Добавляем canvas в контейнер
    const container = document.getElementById('three-container');
    if (container) {
        container.appendChild(renderer.domElement);
    }

    // Создаем частицы
    createParticles();

    // Обработчики событий
    document.addEventListener('mousemove', onDocumentMouseMove);
    window.addEventListener('resize', onWindowResize);

    // Запускаем анимацию
    animate();
}

function createParticles() {
    const particleCount = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Цвета для частиц (премиум мультиколор)
    const color1 = new THREE.Color(0xD4AF37); // золотой
    const color2 = new THREE.Color(0x8B5CF6); // электрический фиолетовый
    const color3 = new THREE.Color(0x9D174D); // глубокий пурпурный
    const color4 = new THREE.Color(0xF97316); // закатный оранжевый
    const color5 = new THREE.Color(0x6B46C1); // королевский фиолетовый

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Позиции
        positions[i3] = (Math.random() - 0.5) * 1000;
        positions[i3 + 1] = (Math.random() - 0.5) * 1000;
        positions[i3 + 2] = (Math.random() - 0.5) * 1000;

        // Цвета (случайный выбор из расширенной палитры)
        const colorChoice = Math.random();
        let color;
        if (colorChoice < 0.2) {
            color = color1;
        } else if (colorChoice < 0.4) {
            color = color2;
        } else if (colorChoice < 0.6) {
            color = color3;
        } else if (colorChoice < 0.8) {
            color = color4;
        } else {
            color = color5;
        }

        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Материал для частиц
    const material = new THREE.PointsMaterial({
        size: 3,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    particles = particlesMesh.geometry.attributes.position.array;
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.1;
    mouseY = (event.clientY - windowHalfY) * 0.1;
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Вращение частиц
    particlesMesh.rotation.x += 0.0003;
    particlesMesh.rotation.y += 0.0005;

    // Следование за мышкой
    camera.position.x += (mouseX - camera.position.x) * 0.02;
    camera.position.y += (-mouseY - camera.position.y) * 0.02;
    camera.lookAt(scene.position);

    // Анимация отдельных частиц
    const positions = particlesMesh.geometry.attributes.position.array;
    const time = Date.now() * 0.00005;

    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] = Math.sin(time + i) * 50;
    }

    particlesMesh.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

// Инициализация при загрузке
if (typeof THREE !== 'undefined') {
    window.addEventListener('load', () => {
        init3DBackground();
    });
}

// Экспорт для использования
window.init3DBackground = init3DBackground;
