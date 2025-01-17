window.onload = async () => {
    console.log('6')
    try {
        // 替换为你的 Flask 后端地址a
        const response = await fetch('https://8.136.126.91:5000/api/endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: '测试数据' })  // 发送数据
        });
        const result = await response.json(); // 解析响应
        console.log('服务器返回: ' + result.message);
        document.getElementById('search_button').addEventListener('click', async () => {
            document.getElementById("s_result").innerHTML = result.message[0][0];
            document.getElementById("s_result").href = "https://www.curseforge.com" + result.message[0][1];
        });
    } catch (error) {
        console.log('请求失败: ' + error.message);
    }
};