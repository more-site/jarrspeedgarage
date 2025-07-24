// Utility function for debouncing
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    feather.replace();

    // --- Kode Splash Screen ---
    const splashScreen = document.querySelector('.splash-screen');
    if (splashScreen) {
        const splashDuration = 3000; // 3 detik

        setTimeout(() => {
            splashScreen.classList.add('hidden');
        }, splashDuration);
    }
    // --- Akhir Kode Splash Screen ---

    const menu = document.getElementById("menuList");
    const hamburger = document.querySelector(".hamburger");
    const overlay = document.querySelector(".overlay");
    const mainNav = document.querySelector(".main-nav");
    const menuLinks = document.querySelectorAll("#menuList a");

    function toggleMenu() {
        if (menu && overlay && mainNav && hamburger) {
            menu.classList.toggle("active");
            overlay.classList.toggle("active");
            mainNav.classList.toggle("active");
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
        } else {
            console.error("Salah satu elemen navigasi tidak ditemukan (menuList, hamburger, overlay, atau main-nav).");
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    if (overlay) {
        overlay.addEventListener('click', toggleMenu);
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            if (menu.classList.contains('active')) {
                setTimeout(() => {
                    toggleMenu();
                }, 300);
            }
        });
    });

    // ----- Kode Search Bar -----
    const searchInput = document.getElementById("searchInput");
    const searchForm = document.getElementById("searchForm");
    const productItems = document.querySelectorAll(".category-item");

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        let foundProducts = 0;

        productItems.forEach(item => {
            const productName = item.querySelector("h3") ? item.querySelector("h3").textContent.toLowerCase() : '';
            if (productName.includes(searchTerm)) {
                item.style.display = "flex";
                foundProducts++;
            } else {
                item.style.display = "none";
            }
        });
    }

    const debouncedFilterProducts = debounce(filterProducts, 300);

    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            filterProducts();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keyup', debouncedFilterProducts);
    }
    // --- Akhir Kode Search Bar ---

    // Atur tahun hak cipta secara dinamis
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    } else {
        console.warn("Elemen dengan ID 'currentYear' tidak ditemukan. Tahun hak cipta tidak dapat diatur secara dinamis.");
    }

    // --- Image Fade-in on Load ---
    const productImages = document.querySelectorAll('.category-item img');

    productImages.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
            img.addEventListener('error', () => {
                console.error('Failed to load image:', img.src);
                img.classList.add('loaded');
            });
        }
    });
    // --- Akhir Image Fade-in ---
});