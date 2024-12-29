function redirectTo(url) {
    window.location.href = url; // 跳转到指定的URL
}

// 监听 ID 为 ys 的按钮
document.getElementById('ys').addEventListener('click', function() {
    window.alert('原神启动！');
    window.location.href = 'https://ys.mihoyo.com/';
});

// 监听 class 名为 b_java 的按钮（假设只有一个元素）
document.querySelector('.b_java').addEventListener('click', function() {
    window.alert('将进入JDK官网下载Java，下载速度可能较慢');
    window.location.href = 'https://www.oracle.com/cn/java/technologies/downloads/#jdk20-windows';
});

// 监听 class 名为 b_pcl 的按钮（假设只有一个元素）
document.querySelector('.b_pcl').addEventListener('click', function() {
    window.alert('建议使用PCL2而不是PCL 1');
    window.location.href = 'https://wwre.lanzouq.com/iEpJ02jbjd8d';
});
