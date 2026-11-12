const translations = {
    en: {
        flag: "🇬🇧",
        code: "EN",
        pageTitle: "Home — AC Uranium",
        navAbout: "About Us",
        navGallery: "Gallery",
        navJoin: "Join Us",
        aboutEyebrow: "About us",
        aboutP1: "AC Uranium is an airsoft team created in October 2019 by a group of friends in Vyshhorod, Kyivska Oblast, Ukraine.",
        aboutP2: "We came a long way from toy pistols to real airsoft guns and real games with better gear.",
        card1Title: "Future plans",
        card2Title: "Game organisation",
        card3Title: "Organiser team",
        footerCopy: "© 2026 AC Uranium. All rights reserved.",
        footerMedias: "Our Medias"
    },
    fr: {
        flag: "🇫🇷",
        code: "FR",
        pageTitle: "Accueil — AC Uranium",
        navAbout: "À propos",
        navGallery: "Galerie",
        navJoin: "Nous rejoindre",
        aboutEyebrow: "À propos de nous",
        aboutP1: "AC Uranium est une équipe d'airsoft créée en octobre 2019 par un groupe d'amis à Vychhorod, dans l'oblast de Kiev, en Ukraine.",
        aboutP2: "Nous avons parcouru un long chemin, des pistolets jouets aux véritables répliques d'airsoft et aux vraies parties avec un meilleur équipement.",
        card1Title: "Projets futurs",
        card2Title: "Organisation des parties",
        card3Title: "Équipe organisatrice",
        footerCopy: "© 2026 AC Uranium. Tous droits réservés.",
        footerMedias: "Nos réseaux"
    },
    uk: {
        flag: "🇺🇦",
        code: "UA",
        pageTitle: "Головна — AC Uranium",
        navAbout: "Про нас",
        navGallery: "Галерея",
        navJoin: "Приєднатися",
        aboutEyebrow: "Про нас",
        aboutP1: "AC Uranium — страйкбольна команда, створена у жовтні 2019 року групою друзів у Вишгороді, Київська область, Україна.",
        aboutP2: "Ми пройшли великий шлях від іграшкових пістолетів до справжніх страйкбольних приводів та повноцінних ігор із кращим спорядженням.",
        card1Title: "Плани на майбутнє",
        card2Title: "Організація ігор",
        card3Title: "Команда організаторів",
        footerCopy: "© 2026 AC Uranium. Усі права захищено.",
        footerMedias: "Наші соцмережі"
    }
};

const dropdown = document.querySelector(".lang-dropdown");
const langBtn = document.getElementById("langBtn");
const currentFlag = document.getElementById("currentFlag");
const currentLang = document.getElementById("currentLang");
const langOptions = document.querySelectorAll(".lang-option");
const i18nElements = document.querySelectorAll("[data-i18n]");

function setLanguage(lang) {
    const dict = translations[lang] || translations.en;

    document.documentElement.lang = lang;
    currentFlag.textContent = dict.flag;
    currentLang.textContent = dict.code;

    i18nElements.forEach((el) => {
        const key = el.dataset.i18n;
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });

    langOptions.forEach((btn) => {
        const isSelected = btn.dataset.lang === lang;
        btn.classList.toggle("active", isSelected);
        btn.setAttribute("aria-selected", String(isSelected));
    });

    localStorage.setItem("acUraniumLang", lang);
}

langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle("open");
    langBtn.setAttribute("aria-expanded", String(isOpen));
});

langOptions.forEach((btn) => {
    btn.addEventListener("click", () => {
        setLanguage(btn.dataset.lang);
        dropdown.classList.remove("open");
        langBtn.setAttribute("aria-expanded", "false");
    });
});

document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
        langBtn.setAttribute("aria-expanded", "false");
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        dropdown.classList.remove("open");
        langBtn.setAttribute("aria-expanded", "false");
    }
});

const savedLang = localStorage.getItem("acUraniumLang");
if (savedLang && translations[savedLang]) {
    setLanguage(savedLang);
}
const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('lightboxClose');
const prevBtn = document.getElementById('lightboxPrev');
const nextBtn = document.getElementById('lightboxNext');

let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.alt = galleryImages[currentIndex].alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
}

function showNext(step) {
    currentIndex = (currentIndex + step + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.alt = galleryImages[currentIndex].alt;
}

galleryImages.forEach((img, index) => {
    img.parentElement.addEventListener('click', () => openLightbox(index));
});

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', () => showNext(-1));
nextBtn.addEventListener('click', () => showNext(1));

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext(1);
    if (e.key === 'ArrowLeft') showNext(-1);
});