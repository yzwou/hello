function redirectTo(url) {
    window.location.href = url; // 跳转到指定的URL
}

// 监听 ID 为 ys 的按钮
document.getElementById('ys').addEventListener('click', function() {
    window.alert('原神启动！');
    window.location.href = 'https://ys.mihoyo.com/';
});
document.querySelector('.d_java').addEventListener('click', function() {
    window.alert('将进入JDK官网下载Java，下载速度可能较慢');
    window.location.href = 'https://www.oracle.com/cn/java/technologies/downloads/#jdk20-windows';
});
document.querySelector('.pcl').addEventListener('click', function() {
    window.alert('建议使用PCL2而不是PCL 1');
    window.location.href = 'https://wwre.lanzouq.com/iEpJ02jbjd8d';
});
document.querySelector('.pcl2').addEventListener('click', function() {
    window.alert('访问密码：pcl2');
    window.location.href = 'https://ltcat.lanzouv.com/b0aj6gsid';
});
document.querySelector('.hmcl').addEventListener('click', function() {
    window.alert('访问密码：hmcl');
    window.location.href = 'https://wwre.lanzouq.com/iEpJ02jbjd8d';
});

