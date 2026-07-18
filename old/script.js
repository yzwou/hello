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

    // 卡片进入动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card-animate').forEach(card => {
        observer.observe(card);
    });

    // 滚动视差效果 - 实时跟随滚动
    const cards = document.querySelectorAll('.parallax-card');
    const PARALLAX_STRENGTH = 5; // 移动强度：数值越小越轻微

    // 记录每个卡片的初始文档位置
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        card.dataset.initialTop = String(window.scrollY + rect.top);
    });

    function updateParallax() {
        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;
        const scrollY = window.scrollY;

        cards.forEach(card => {
            const initialTop = parseFloat(card.dataset.initialTop);
            // 计算卡片当前相对于视口的位置
            const currentTop = initialTop - scrollY;
            const cardHeight = card.offsetHeight;

            // 只处理视口内的卡片
            if (currentTop < viewportHeight && currentTop + cardHeight > 0) {
                const cardCenter = currentTop + cardHeight / 2;
                // 距视口中心的比例，乘以强度系数
                const offset = ((viewportCenter - cardCenter) / viewportCenter) * PARALLAX_STRENGTH;
                card.style.transform = `translateY(${offset}px)`;
            }
        });
    }

    // 使用 requestAnimationFrame 实现流畅滚动
    let rafId = null;
    window.addEventListener('scroll', () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(updateParallax);
    }, { passive: true });

    // 页面加载和窗口大小变化时更新
    updateParallax();
    window.addEventListener('resize', updateParallax);
});