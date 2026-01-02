function redirectTo(url) {
    window.location.href = url;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', () => {
            const message = button.dataset.message;
            const url = button.dataset.url;
            if (message) alert(message);
            if (url) redirectTo(url);
        });
    });
});