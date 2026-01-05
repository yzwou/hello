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