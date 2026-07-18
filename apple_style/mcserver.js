(() => {
    const form = document.getElementById('search_mcserver');
    const addressInput = document.getElementById('server_ip');
    const typeSelect = document.getElementById('server_type');
    const portInput = document.getElementById('server_port');
    const queryButton = document.getElementById('query_server_btn');
    const resultPanel = document.getElementById('mcserver_background');
    const resultContainer = document.getElementById('mcserver_result');

    if (!form || !addressInput || !typeSelect || !portInput || !queryButton || !resultPanel || !resultContainer) {
        return;
    }

    let activeController = null;

    const createElement = (tagName, className, text) => {
        const element = document.createElement(tagName);
        if (className) element.className = className;
        if (text !== undefined && text !== null) element.textContent = String(text);
        return element;
    };

    const showResult = (content, state = 'ready') => {
        resultPanel.classList.add('is-visible');
        resultPanel.dataset.state = state;
        resultPanel.setAttribute('aria-busy', state === 'loading' ? 'true' : 'false');
        resultContainer.replaceChildren(content);
    };

    const showMessage = (message, type = 'status') => {
        const className = type === 'error' ? 'server-message server-message--error' : 'server-message';
        const messageElement = createElement('p', className, message);
        messageElement.setAttribute('role', type === 'error' ? 'alert' : 'status');
        showResult(messageElement, type);
    };

    const hasExplicitPort = (address) => {
        if (address.startsWith('[')) return /^\[[^\]]+\]:\d+$/.test(address);
        return /^[^:]+:\d+$/.test(address);
    };

    const buildAddress = () => {
        const host = addressInput.value.trim();
        const portValue = portInput.value.trim();

        if (!host) throw new Error('请输入服务器地址');
        if (host.length > 255 || host.includes('://') || /[\s\/?#@]/.test(host)) {
            throw new Error('服务器地址格式不正确');
        }

        const colonCount = (host.match(/:/g) || []).length;
        if (colonCount > 1 && !/^\[[0-9a-fA-F:]+\](?::\d+)?$/.test(host)) {
            throw new Error('IPv6 地址请使用方括号，例如 [::1]');
        }

        if (!portValue) return host;
        if (!/^\d+$/.test(portValue)) throw new Error('端口必须是数字');

        const port = Number(portValue);
        if (port < 1 || port > 65535) throw new Error('端口必须在 1–65535 之间');
        if (hasExplicitPort(host)) throw new Error('地址栏已包含端口，请清空单独的端口栏');

        return `${host}:${port}`;
    };

    const createStat = (label, value) => {
        const stat = createElement('div', 'server-stat');
        stat.append(createElement('span', '', label), createElement('strong', '', value ?? '—'));
        return stat;
    };

    const createServerResult = (data, requestedAddress, edition) => {
        const isOnline = Boolean(data.online);
        const editionLabel = edition === 'bedrock' ? '基岩版' : 'Java 版';
        const wrapper = createElement('article', `server-result${isOnline ? '' : ' server-result--offline'}`);
        const header = createElement('header', 'server-result__header');
        const icon = createElement('div', 'server-result__icon');

        if (isOnline && typeof data.icon === 'string' && /^data:image\/png;base64,/i.test(data.icon)) {
            const image = document.createElement('img');
            image.src = data.icon;
            image.alt = '服务器图标';
            icon.append(image);
        } else {
            icon.textContent = isOnline ? '◈' : '—';
        }

        const identity = createElement('div', 'server-result__identity');
        identity.append(
            createElement('p', `server-status server-status--${isOnline ? 'online' : 'offline'}`, isOnline ? '在线' : '离线'),
            createElement('h3', '', requestedAddress)
        );

        if (data.host) {
            const resolvedAddress = data.port ? `${data.host}:${data.port}` : data.host;
            identity.append(createElement('span', 'server-result__meta', `解析为 ${resolvedAddress}`));
        }

        header.append(icon, identity, createElement('span', 'server-result__edition', editionLabel));
        wrapper.append(header);

        if (!isOnline) {
            wrapper.append(createElement('p', 'server-message', '未能连接到该服务器。请检查版本、地址与端口是否正确。'));
            return wrapper;
        }

        const playerOnline = data.players?.online ?? '—';
        const playerMax = data.players?.max ?? '—';
        const version = data.version?.name_clean || data.version?.name || '—';
        const software = data.software || data.gamemode || '—';
        const stats = createElement('div', 'server-result__stats');
        stats.append(
            createStat('玩家', `${playerOnline} / ${playerMax}`),
            createStat('版本', version),
            createStat(data.software ? '服务端' : '游戏模式', software)
        );
        wrapper.append(stats);

        const motd = data.motd?.clean?.trim();
        if (motd) wrapper.append(createElement('p', 'server-result__motd', motd));
        if (data.eula_blocked) wrapper.append(createElement('p', 'server-result__warning', '此服务器地址已被 Mojang 的 EULA 阻止列表标记。'));

        return wrapper;
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        let address;
        try {
            address = buildAddress();
        } catch (error) {
            showMessage(error.message, 'error');
            addressInput.focus();
            return;
        }

        activeController?.abort();
        const controller = new AbortController();
        activeController = controller;
        let didTimeout = false;
        const timeoutId = window.setTimeout(() => {
            didTimeout = true;
            controller.abort();
        }, 9000);

        queryButton.disabled = true;
        queryButton.textContent = '查询中…';
        showMessage('正在查询服务器状态…');

        const edition = typeSelect.value === 'bedrock' ? 'bedrock' : 'java';
        const endpoint = `https://api.mcstatus.io/v2/status/${edition}/${encodeURIComponent(address)}?timeout=5`;

        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {Accept: 'application/json'},
                signal: controller.signal
            });

            if (!response.ok) {
                if (response.status === 400) throw new Error('服务器地址格式不正确');
                if (response.status === 429) throw new Error('查询过于频繁，请稍后再试');
                throw new Error(`查询服务暂时不可用（${response.status}）`);
            }

            const data = await response.json();
            showResult(createServerResult(data, address, edition));
        } catch (error) {
            if (error.name === 'AbortError' && activeController !== controller) return;
            if (didTimeout) {
                showMessage('查询超时，请检查地址后重试', 'error');
            } else {
                showMessage(error.message || '查询失败，请稍后再试', 'error');
            }
        } finally {
            window.clearTimeout(timeoutId);
            if (activeController === controller) {
                activeController = null;
                queryButton.disabled = false;
                queryButton.textContent = '查询';
            }
        }
    });
})();
