function redirectTo(url) {
    // try {
    //     window.open(url, '_blank');
    // } catch {
    //     window.location.href = url;
    // }
    window.location.href = url;
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
