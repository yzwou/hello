document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search_cfm');
    const searchButton = document.getElementById('search_button');
    const resultContainer = document.getElementById('result_cfm');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        const version = document.getElementById('version')?.value || "";
        const loader = document.getElementById('loader')?.value || "";
        const source = document.getElementById('source')?.value || "all";

        if (!query) {
            resultContainer.innerHTML = '<p>请输入关键词进行搜索</p>';
            return;
        }

        resultContainer.innerHTML = '<p>正在搜索中，请稍候...</p>';

        let searches = [];
        if (source === 'curseforge' || source === 'all') {
            searches.push(searchCurseForge(query, version, loader));
        }
        if (source === 'modrinth' || source === 'all') {
            searches.push(searchModrinth(query, version, loader));
        }

        Promise.all(searches)
            .then(resultsArr => {
                const results = resultsArr.flat();

                if (results.length === 0) {
                    resultContainer.innerHTML = '<p>没有找到相关模组</p>';
                    return;
                }
                resultContainer.innerHTML = '';  // 清空结果容器
                results.forEach(mod => {
                    const modElement = document.createElement('div');
                    modElement.classList.add('mod-result');

                    // modElement.innerHTML = `
                    //     <h3><a href="${mod.url}" target="_blank">${mod.name}</a></h3>
                    //     <p><strong>平台：</strong>${mod.platform}</p>
                    //     <p>${mod.summary || '暂无简介'}</p>
                    //     <img src="${mod.logoUrl || '默认图片URL'}" alt="${mod.name} logo" style="width: 100px; height: 100px;">
                    //     <p><strong>下载次数：</strong>${mod.downloadCount}</p>
                    // `;
                    modElement.innerHTML = `
                      <img src="${mod.logoUrl || '默认图片URL'}" alt="${mod.name} logo">
                      <div class="mod-content">
                        <h3><a href="${mod.url}" target="_blank">${mod.name}</a></h3>
                        <div class="mod-summary">${mod.summary || '暂无简介'}</div>
                        <div class="mod-meta">
                          平台：${mod.platform} | 下载次数：${mod.downloadCount}
                        </div>
                      </div>
                    `;


                    resultContainer.appendChild(modElement);
                });
            })
            .catch(error => {
                console.error('搜索失败:', error);
                resultContainer.innerHTML = '<p>搜索出错，请稍后再试</p>';
            });
    });

    // CurseForge 搜索
    function searchCurseForge(query, version, loader) {
        const loaderMap = { forge: 1, fabric: 4, quilt: 5, neoforge: 6 };
        const params = new URLSearchParams({
            gameId: 432, // Minecraft
            searchFilter: query
        });
        if (version) params.append("gameVersion", version);
        if (loader && loaderMap[loader]) params.append("modLoaderType", loaderMap[loader]);

        return fetch(`https://api.curseforge.com/v1/mods/search?${params.toString()}`, {
            headers: {
                "x-api-key": "$2a$10$6QnlrKOnAwqIbxdGMUe3A.hPjswDK9Ob1pn3TI/E6xu.4rKe5ojMy" // 记得替换成你的 CurseForge API Key
            }
        })
            .then(res => res.json())
            .then(data => {
                return (data.data || []).map(mod => ({
                    name: mod.name,
                    url: mod.links?.websiteUrl || `https://www.curseforge.com/minecraft/mods/${mod.slug}`,
                    platform: 'CurseForge',
                    summary: mod.summary,
                    logoUrl: mod.logo?.thumbnailUrl,
                    downloadCount: mod.downloadCount
                }));
            })
            .catch(error => {
                console.error('CurseForge 搜索失败:', error);
                return [];
            });
    }

    // Modrinth 搜索
    function searchModrinth(query, version, loader) {
        let facets = [];
        if (version) facets.push(`["versions:${version}"]`);
        if (loader) facets.push(`["categories:${loader}"]`);

        const url = `https://api.modrinth.com/v2/search?query=${encodeURIComponent(query)}`
            + (facets.length ? `&facets=[${facets.join(",")}]` : "");

        return fetch(url, {
            headers: { "Content-Type": "application/json" }
        })
            .then(res => res.json())
            .then(data => {
                return (data.hits || []).map(mod => ({
                    name: mod.title,
                    url: `https://modrinth.com/mod/${mod.slug}`,
                    platform: 'Modrinth',
                    summary: mod.excerpt,
                    logoUrl: mod.icon_url,
                    downloadCount: mod.downloads
                }));
            })
            .catch(error => {
                console.error('Modrinth 搜索失败:', error);
                return [];
            });
    }
});
