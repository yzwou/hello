document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search_cfm');
    const searchButton = document.getElementById('search_button');
    const resultContainer = document.getElementById('result_cfm');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (!query) {
            resultContainer.innerHTML = '<p>请输入关键词进行搜索</p>';
            return;
        }

        resultContainer.innerHTML = '<p>正在搜索中，请稍候...</p>';

        // 调用 CurseForge 和 Modrinth API 进行搜索
        Promise.all([
            searchCurseForge(query),
            searchModrinth(query)
        ])
            .then(([curseForgeData, modrinthData]) => {
                // 合并结果
                const results = [...curseForgeData, ...modrinthData];

                if (results.length === 0) {
                    resultContainer.innerHTML = '<p>没有找到相关模组</p>';
                    return;
                }
                resultContainer.innerHTML = '';  // 清空结果容器
                results.forEach(mod => {
                    const modElement = document.createElement('div');
                    modElement.classList.add('mod-result');

                    // 拼接模组信息
                    modElement.innerHTML = `
                    <h3><a href="${mod.url}" target="_blank">${mod.name}</a></h3>
                    <p><strong>平台：</strong>${mod.platform}</p>
                    <p>${mod.summary || '暂无简介'}</p>
                    <img src="${mod.logoUrl || '默认图片URL'}" alt="${mod.name} logo" style="width: 100px; height: 100px;">
                    <p><strong>下载次数：</strong>${mod.downloadCount}</p>
                    <p><a href="${mod.websiteUrl || mod.url}" target="_blank">更多信息</a></p>
                `;

                    resultContainer.appendChild(modElement);
                });
            })
            .catch(error => {
                console.error('搜索失败:', error);
                resultContainer.innerHTML = '<p>搜索出错，请稍后再试</p>';
            });
    });

    // 调用 CurseForge API 进行搜索
    function searchCurseForge(query) {
        return fetch(`https://api.curseforge.com/v1/mods/search?gameId=432&searchFilter=${encodeURIComponent(query)}`, {
            headers: {
                "x-api-key": "$2a$10$6QnlrKOnAwqIbxdGMUe3A.hPjswDK9Ob1pn3TI/E6xu.4rKe5ojMy" // 确保 API Key 中没有特殊字符
            }
        })
            .then(res => res.json())
            .then(data => {
                return data.data.map(mod => ({
                    name: mod.name,
                    url: mod.links?.websiteUrl || `https://www.curseforge.com/minecraft/mods/${mod.slug}`,
                    platform: 'CurseForge',
                    summary: mod.summary,
                    logoUrl: mod.logo?.thumbnailUrl,
                    downloadCount: mod.downloadCount,
                    websiteUrl: mod.links?.websiteUrl || `https://www.curseforge.com/minecraft/mods/${mod.slug}`
                }));
            })
            .catch(error => {
                console.error('CurseForge 搜索失败:', error);
                return [];  // 如果 CurseForge 请求失败，返回空数组
            });
    }

    // 调用 Modrinth API 进行搜索
    function searchModrinth(query) {
        return fetch(`https://api.modrinth.com/v2/search?query=${encodeURIComponent(query)}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                return data.hits.map(mod => ({
                    name: mod.title,
                    url: `https://modrinth.com/mod/${mod.slug}`,
                    platform: 'Modrinth',
                    summary: mod.excerpt,
                    logoUrl: mod.icon_url,
                    downloadCount: mod.downloads,
                    websiteUrl: mod.website_url || '#'
                }));
            })
            .catch(error => {
                console.error('Modrinth 搜索失败:', error);
                return [];  // 如果 Modrinth 请求失败，返回空数组
            });
    }
});
