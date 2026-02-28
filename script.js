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
});
