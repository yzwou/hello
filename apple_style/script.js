function redirectTo(url) {
    if (!url || typeof url !== 'string') {
        return false;
    }

    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
        return false;
    }

    try {
        window.open(trimmedUrl, '_blank');
    } catch (error) {
        window.location.href = trimmedUrl;
    }

    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.buttons button').forEach(button => {
        button.addEventListener('click', () => {
            const message = button.dataset.message;
            const url = button.dataset.url;

            if (message) alert(message);
            if (url) redirectTo(url);
        });
    });

    const revealTargets = document.querySelectorAll('.card-animate');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealTargets.forEach(target => target.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    revealTargets.forEach(target => observer.observe(target));
});
