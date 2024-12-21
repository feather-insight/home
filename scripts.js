document.addEventListener('DOMContentLoaded', function() {
    const langSwitch = document.getElementById('lang-switch');
    let currentLang = localStorage.getItem('lang') || 'fr';
    document.querySelector('html').setAttribute('lang', currentLang);

    function loadTranslations(lang) {
        fetch(`translations/${lang}.json`)
            .then(response => response.json())
            .then(translations => {
                document.querySelectorAll('[data-i18n]').forEach(element => {
                    const key = element.getAttribute('data-i18n');
                    if (translations[key]) {
                        element.textContent = translations[key];
                    }
                });
                langSwitch.textContent = translations.switchLang;
            })
            .catch(error => console.error('Error loading translations:', error));
    }

    function switchLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.querySelector('html').setAttribute('lang', lang);
        loadTranslations(lang);
    }

    langSwitch.addEventListener('click', function() {
        const newLang = currentLang === 'fr' ? 'en' : 'fr';
        switchLanguage(newLang);
    });

    loadTranslations(currentLang);
});
