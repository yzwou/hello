document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("query_server_btn");
    const resultBox = document.getElementById("mcserver_result");
    const background = document.getElementById("mcserver_background");

    btn.addEventListener("click", async () => {
        const ip = document.getElementById("server_ip").value.trim();
        const type = document.getElementById("server_type").value;
        const portInput = document.getElementById("server_port").value.trim();

        if (!ip) {
            alert("请输入服务器地址");
            return;
        }

        background.style.display = "block";
        resultBox.innerHTML = "<p>正在查询服务器状态，请稍候……</p>";

        let apiUrl = "";
        if (type === "java") {
            apiUrl = `https://api.mcstatus.io/v2/status/java/${ip}`;
        } else {
            const port = portInput || 19132;
            apiUrl = `https://api.mcstatus.io/v2/status/bedrock/${ip}:${port}`;
        }

        try {
            const resp = await fetch(apiUrl);
            const data = await resp.json();

            if (!data.online) {
                resultBox.innerHTML = `
                    <div class="mod-result">
                        <div class="mod-content">
                            <h3>服务器离线</h3>
                            <p class="mod-summary">无法连接到该服务器</p>
                        </div>
                    </div>
                `;
                return;
            }

            const players = data.players || {};
            const version = data.version?.name || "未知";
            const getMotd = (motdPart) => {
                if (Array.isArray(motdPart)) {
                    return motdPart.join("<br>");
                } else if (typeof motdPart === "string") {
                    return motdPart;
                }
                return "";
            };

            const motd =
                getMotd(data.motd?.clean) ||
                getMotd(data.motd?.raw) ||
                "无 MOTD";

            const icon = data.icon
                ? `<img src="${data.icon}" alt="icon">`
                : "";

            resultBox.innerHTML = `
                <div class="mod-result">
                    ${icon}
                    <div class="mod-content">
                        <h3>${ip}</h3>
                        <p class="mod-summary">${motd}</p>
                        <p class="mod-meta">
                            版本：${version}<br>
                            在线人数：${players.online ?? "?"} / ${players.max ?? "?"}<br>
                            类型：${type === "java" ? "Java 版" : "基岩版"}
                        </p>
                    </div>
                </div>
            `;
        } catch (err) {
            resultBox.innerHTML = `
                <div class="mod-result">
                    <div class="mod-content">
                        <h3>查询失败</h3>
                        <p class="mod-summary">
                            可能原因：<br>
                            · 服务器不存在<br>
                            · API 暂时不可用<br>
                            · 网络问题
                        </p>
                    </div>
                </div>
            `;
            console.error(err);
        }
    });
});
