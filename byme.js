// 动态生成最近的Minecraft Java Edition版本列表（更新到2026年，包括26.1及1.21.x补丁）
const versions = [
    '26.1',  // 新编号系统，2026年首个版本
    '1.21.11', '1.21.10', '1.21.9', '1.21.8', '1.21.7', '1.21.6', '1.21.5', '1.21.4', '1.21.3', '1.21.2', '1.21.1', '1.21',
    '1.20.6', '1.20.5', '1.20.4', '1.20.3', '1.20.2', '1.20.1', '1.20',
    '1.19.4', '1.19.3', '1.19.2', '1.19.1', '1.19',
    '1.18.2', '1.18.1', '1.18',
    '1.17.1', '1.17',
    '1.16.5', '1.16.4', '1.16.3', '1.16.2', '1.16.1', '1.16',
    '1.15.2', '1.15.1', '1.15',
    '1.14.4', '1.14.3', '1.14.2', '1.14.1', '1.14'
];

const select = document.getElementById('version');
select.innerHTML = '<option value="">不限</option>' + versions.map(v => `<option value="${v}">${v}</option>`).join('');

const btn = document.getElementById('toggle-theme');
const body = document.body;

// 加载时应用保存的主题
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    btn.innerText = '切换到浅色';
    btn.style.backgroundColor = '#000';
    btn.style.color = '#fff';
} else {
    btn.innerText = '切换到深色';
    btn.style.backgroundColor = '#fff';
    btn.style.color = '#000';
}

// 点击切换主题
btn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    btn.innerText = isDark ? '切换到浅色' : '切换到深色';
    btn.style.backgroundColor = isDark ? '#000' : '#fff';
    btn.style.color = isDark ? '#fff' : '#000';
});