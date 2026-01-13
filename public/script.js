// public/script.js
async function startDeploy() {
    const btn = document.getElementById('btn');
    const status = document.getElementById('status');
    
    // Kuchukua data kutoka kwenye input fields
    const apiKey = document.getElementById('apiKey').value.trim();
    const sessionId = document.getElementById('sessionId').value.trim();
    const serviceId = document.getElementById('serviceId').value.trim();

    // Validations ndogo
    if (!apiKey || !sessionId || !serviceId) {
        showStatus("Tafadhali jaza nafasi zote!", "bg-red-500/20 text-red-400");
        return;
    }

    // Badilisha button kuwa inazunguka (loading)
    btn.disabled = true;
    btn.innerHTML = `<span class="animate-pulse">INAPROSESI...</span>`;
    
    try {
        const response = await fetch('/deploy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ apiKey, sessionId, serviceId })
        });

        const data = await response.json();

        if (response.ok) {
            showStatus(data.message, "bg-green-500/20 text-green-400");
        } else {
            showStatus(data.message, "bg-red-500/20 text-red-400");
        }
    } catch (error) {
        showStatus("Server imeshindwa kujibu. Jaribu tena!", "bg-red-500/20 text-red-400");
    } finally {
        btn.disabled = false;
        btn.innerHTML = "ANZA KU-DEPLOY 🚀";
    }
}

function showStatus(text, classes) {
    const status = document.getElementById('status');
    status.className = `mt-6 p-4 rounded-lg text-sm font-medium show ${classes}`;
    status.innerText = text;
    status.classList.remove('hidden');
}
