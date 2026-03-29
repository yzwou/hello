// async function download(objectKey="test.zip") {
//     try {
//         const resp = await fetch(
//             "https://oss-signed-url-hdvhergbei.cn-hangzhou.fcapp.run/oss-signed-url?key="
//             + encodeURIComponent(objectKey)
//         );
//
//         if (!resp.ok) {
//             throw new Error("Failed to get signed url");
//         }
//
//         const data = await resp.json();
//
//         if (!data.url) {
//             throw new Error("Invalid response");
//         }
//
//         // 触发下载
//         window.location.href = data.url;
//
//     } catch (err) {
//         alert("Download failed: " + err.message);
//     }
// }

// 方式1：使用 fetch 下载并触发浏览器保存
// async function downloadPublicFile(url="https://mcdownloader.oss-cn-hangzhou.aliyuncs.com/", filename="test.zip") {
//     try {
//         const response = await fetch(url);
//         if (!response.ok) throw new Error('Network response was not ok');
//
//         const blob = await response.blob();
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = filename;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         URL.revokeObjectURL(link.href);
//     } catch (error) {
//         console.error('Download failed:', error);
//     }
// }

// 使用示例
async function download(objectKey="test.zip") {
    const publicUrl = 'https://mcdownloader.oss-cn-hangzhou.aliyuncs.com/test.zip';
    downloadPublicFile(publicUrl, 'test.zip');
}
