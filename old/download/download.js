async function download(objectKey="test.zip") {
    try {
        const resp = await fetch(
            "https://oss-signed-url-hdvhergbei.cn-hangzhou.fcapp.run/oss-signed-url?key="
            + encodeURIComponent(objectKey)
        );

        if (!resp.ok) {
            throw new Error("Failed to get signed url");
        }

        const data = await resp.json();

        if (!data.url) {
            throw new Error("Invalid response");
        }

        // 触发下载
        window.location.href = data.url;

    } catch (err) {
        alert("Download failed: " + err.message);
    }
}

// 按钮点击事件处理（与主界面保持一致）
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.button button').forEach(button => {
        button.addEventListener('click', () => {
            const message = button.dataset.message;
            const url = button.dataset.url;

            if (message) alert(message);
            if (url) {
                try {
                    window.open(url, '_blank');
                } catch (error) {
                    window.location.href = url;
                }
            }
        });
    });
});

