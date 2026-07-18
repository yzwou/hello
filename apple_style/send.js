const supabaseUrl = "https://ixoieamdagpzwbwjjwbp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4b2llYW1kYWdwendid2pqd2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU2NTM3NDQsImV4cCI6MjA1MTIyOTc0NH0.YxtdvQbCEux1XVnBxpyh8LBEMOAnfXPg4qlhQn-9_BY";

async function storeData(content) {
    const data = {
        content: content,
        timestamp: new Date().toISOString(),
    };

    const response = await fetch(`${supabaseUrl}/rest/v1/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        alert("数据上传成功！");
    } else {
        alert("数据上传失败：" + (await response.text()));
    }
}

// 只在页面包含建议表单时绑定，避免影响其他页面脚本。
const suggestsForm = document.getElementById("suggests");

if (suggestsForm) {
    suggestsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const message = document.getElementById("message")?.value || "";
        storeData(message);
    });
}
