// script.js

document.getElementById('downloadBtn').addEventListener('click', function() {
    const fileUrl = 'path_to_your_file/your_file_name.ext'; // 替换为你文件的路径
    const fileName = 'your_file_name.ext';  // 替换为你文件的名称

    // 创建一个隐藏的链接
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;

    // 触发下载
    link.click();

    // 显示下载状态
    document.getElementById('statusMessage').textContent = '下载开始...';
});

function redirectTo(url) {
    window.location.href = url; // 跳转到指定的URL
}
