document.getElementById('search_button').addEventListener('click', async () => {
    console.log('别按了', document.getElementById('search_cfm').value)
    try {
        const inputMessage = document.getElementById('search_cfm').value;
        const response = await fetch('https://8.136.126.91:5000/api/endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: inputMessage })  // 发送数据
        });
        const result = await response.json(); // 解析响应
        console.log('服务器返回: ', result.message);

        // 遍历返回的所有元素，并创建多个链接
        let resultContainer = document.getElementById('result_cfm');
        result.message[0].forEach(item => {
            const link = document.createElement('a'); // 创建一个新的 <a> 标签
            link.href = "https://www.curseforge.com" + item[1]; // 设置 href 为服务器返回的地址
            link.innerHTML = item[0]; // 设置链接文本为返回的第一个值
            link.target = '_blank'; // 设置点击后在新窗口打开链接
            resultContainer.appendChild(link); // 将新链接添加到容器中
            resultContainer.appendChild(document.createElement('br')); // 添加换行符
        });
        resultContainer = document.getElementById('result_mrm');
        result.message[1].forEach(item => {
            const link = document.createElement('a'); // 创建一个新的 <a> 标签
            link.href = "https://modrinth.com/" + item[1]; // 设置 href 为服务器返回的地址
            link.innerHTML = item[0]; // 设置链接文本为返回的第一个值
            link.target = '_blank'; // 设置点击后在新窗口打开链接
            resultContainer.appendChild(link); // 将新链接添加到容器中
            resultContainer.appendChild(document.createElement('br')); // 添加换行符
        });
    } catch (error) {
        console.log('请求失败: ' + error.message);
    }
});
