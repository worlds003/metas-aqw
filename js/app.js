import { PRESETS } from './database.js';

let tasks = [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    document.getElementById('user-email-display').innerText = 'Modo Local / Convidado';

    loadTasksFromStorage();
    initTimer();
    setupEventListeners();
});

function loadTasksFromStorage() {
    const saved = localStorage.getItem('aqw_metas_tasks');
    if (saved) {
        try {
            tasks = JSON.parse(saved);
        } catch (e) {
            tasks = [];
        }
    }
    renderTasks();
    updateStats();
}

function saveTasksToStorage() {
    localStorage.setItem('aqw_metas_tasks', JSON.stringify(tasks));
    updateStats();
}

window.handleGuestLogin = () => {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    document.getElementById('user-email-display').innerText = 'Modo Convidado';
    loadTasksFromStorage();
};

window.handleLogin = () => { window.handleGuestLogin(); };
window.handleRegister = () => { window.handleGuestLogin(); };
window.handleLogout = () => {
    document.getElementById('app-container').classList.add('hidden');
    document.getElementById('auth-container').classList.remove('hidden');
};

function initTimer() {
    setInterval(() => {
        const now = new Date();
        const estTime = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
        const hours = String(estTime.getHours()).padStart(2, '0');
        const minutes = String(estTime.getMinutes()).padStart(2, '0');
        const seconds = String(estTime.getSeconds()).padStart(2, '0');
        
        const timeEl = document.getElementById('aqw-server-time');
        if (timeEl) timeEl.innerText = `${hours}:${minutes}:${seconds} EST`;

        const nextEstMidnight = new Date(estTime);
        nextEstMidnight.setHours(24, 0, 0, 0);
        const diff = nextEstMidnight - estTime;

        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        const s = Math.floor((diff / 1000) % 60);

        const resetEl = document.getElementById('aqw-reset-timer');
        if (resetEl) resetEl.innerText = `in ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }, 1000);
}

function setupEventListeners() {
    const form = document.getElementById('task-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('task-input');
            const title = input.value.trim();
            if (!title) return;

            const newTask = {
                id: Date.now().toString(),
                title: title,
                steps: [
                    {
                        title: "Passo 1: Objetivos Iniciais",
                        requirements: []
                    }
                ]
            };

            tasks.push(newTask);
            saveTasksToStorage();
            renderTasks();
            input.value = '';
        });
    }
}

window.loadPreset = (key) => {
    const preset = PRESETS[key];
    if (!preset) return;

    const newTask = {
        id: Date.now().toString(),
        title: preset.title,
        steps: JSON.parse(JSON.stringify(preset.steps))
    };

    tasks.push(newTask);
    saveTasksToStorage();
    renderTasks();
};

window.setFilter = (filter) => {
    currentFilter = filter;
    ['all', 'active', 'completed'].forEach(f => {
        const btn = document.getElementById(`filter-${f}`);
        if (btn) {
            if (f === filter) {
                btn.className = "filter-btn text-xs px-3 py-1.5 rounded-lg border font-medium transition bg-indigo-600/20 text-indigo-300 border-indigo-500/40";
            } else {
                btn.className = "filter-btn text-xs px-3 py-1.5 rounded-lg border font-medium transition bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-zinc-200";
            }
        }
    });
    renderTasks();
};

function updateStats() {
    let totalReqs = 0;
    let compReqs = 0;

    tasks.forEach(task => {
        if (task.steps) {
            task.steps.forEach(step => {
                if (step.requirements) {
                    step.requirements.forEach(req => {
                        totalReqs++;
                        if (req.current >= req.max) compReqs++;
                    });
                }
            });
        }
    });

    const overall = totalReqs > 0 ? Math.round((compReqs / totalReqs) * 100) : 0;

    const totalEl = document.getElementById('stat-total-tasks');
    const compEl = document.getElementById('stat-completed-tasks');
    const overallEl = document.getElementById('stat-overall-progress');

    if (totalEl) totalEl.innerText = tasks.length;
    if (compEl) compEl.innerText = compReqs;
    if (overallEl) overallEl.innerText = `${overall}%`;
}

window.renderTasks = () => {
    const container = document.getElementById('tasks-container');
    const searchInput = document.getElementById('search-input');
    const query = searchInput ? searchInput.value.toLowerCase() : '';

    if (!tasks.length) {
        container.innerHTML = `
            <div class="text-center py-16 text-zinc-500 bg-zinc-900 rounded-xl border border-zinc-800">
                <i class="fa-solid fa-dragon text-4xl mb-3 text-zinc-700"></i>
                <p class="text-sm">Nenhuma meta cadastrada. Crie uma acima ou selecione um Preset Rápido!</p>
            </div>
        `;
        return;
    }

    let html = '';

    tasks.forEach((task, tIndex) => {
        if (query && !task.title.toLowerCase().includes(query)) {
            let match = false;
            task.steps.forEach(step => {
                step.requirements.forEach(req => {
                    if (req.name.toLowerCase().includes(query)) match = true;
                });
            });
            if (!match) return;
        }

        let totalR = 0;
        let compR = 0;
        task.steps.forEach(step => {
            step.requirements.forEach(req => {
                totalR++;
                if (req.current >= req.max) compR++;
            });
        });
        const taskProgress = totalR > 0 ? Math.round((compR / totalR) * 100) : 0;

        if (currentFilter === 'active' && taskProgress === 100) return;
        if (currentFilter === 'completed' && taskProgress < 100) return;

        html += `
            <div class="bg-zinc-900 rounded-xl border border-zinc-800 p-5 space-y-4 shadow-lg">
                <div class="flex justify-between items-start border-b border-zinc-800 pb-3">
                    <div>
                        <div class="flex items-center gap-2">
                            <h3 class="text-base font-bold text-white">${task.title}</h3>
                            <span class="text-xs px-2 py-0.5 rounded-full font-mono ${taskProgress === 100 ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/50' : 'bg-indigo-950 text-indigo-400 border border-indigo-900/50'}">${taskProgress}%</span>
                        </div>
                    </div>
                    <div class="flex items-center gap-2">
                        <button onclick="deleteTask(${tIndex})" class="text-zinc-500 hover:text-red-400 p-1.5 transition" title="Excluir Meta">
                            <i class="fa-solid fa-trash text-xs"></i>
                        </button>
                    </div>
                </div>

                <div class="space-y-4">
        `;

        task.steps.forEach((step, sIndex) => {
            let stepTotal = step.requirements.length;
            let stepComp = step.requirements.filter(r => r.current >= r.max).length;
            let stepProg = stepTotal > 0 ? Math.round((stepComp / stepTotal) * 100) : 0;

            html += `
                <div class="bg-zinc-950/60 p-4 rounded-lg border border-zinc-800/80 space-y-3">
                    <div class="flex justify-between items-center text-xs">
                        <span class="font-semibold text-zinc-300 flex items-center gap-1.5">
                            <i class="fa-solid fa-angles-right text-indigo-400"></i> ${step.title}
                        </span>
                        <span class="text-zinc-500 font-mono">${stepProg}%</span>
                    </div>

                    <div class="space-y-2">
            `;

            step.requirements.forEach((req, rIndex) => {
                const isDone = req.current >= req.max;
                html += `
                    <div class="flex items-center justify-between bg-zinc-900 p-2.5 rounded-lg border border-zinc-800 gap-2">
                        <div class="flex items-center gap-2.5 min-w-0 flex-1">
                            <input type="checkbox" ${isDone ? 'checked' : ''} onchange="toggleReq(${tIndex}, ${sIndex}, ${rIndex})" class="rounded bg-zinc-950 border-zinc-700 text-indigo-600 focus:ring-0 cursor-pointer">
                            <span class="text-xs truncate ${isDone ? 'line-through text-zinc-500' : 'text-zinc-200'}">${req.name}</span>
                            ${req.isDaily ? '<span class="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-900/50 px-1.5 py-0.5 rounded font-medium">DAILY</span>' : ''}
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="flex items-center gap-1 font-mono text-xs">
                                <input type="number" value="${req.current}" onchange="updateReqValue(${tIndex}, ${sIndex}, ${rIndex}, this.value)" class="w-14 bg-zinc-950 border border-zinc-800 rounded px-1.5 py-0.5 text-right text-zinc-200 focus:outline-none focus:border-indigo-500">
                                <span class="text-zinc-500">/ ${req.max}</span>
                            </div>
                            <button onclick="setMaxReq(${tIndex}, ${sIndex}, ${rIndex})" class="text-[10px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-2 py-1 rounded transition">Max</button>
                            <button onclick="deleteReq(${tIndex}, ${sIndex}, ${rIndex})" class="text-zinc-600 hover:text-red-400 p-1 transition"><i class="fa-solid fa-xmark text-xs"></i></button>
                        </div>
                    </div>
                `;
            });

            html += `
                    </div>
                    <div class="pt-2 border-t border-zinc-900 flex gap-2 items-center">
                        <input type="text" id="new-req-${tIndex}-${sIndex}" placeholder="Nome do requisito..." class="flex-1 bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500">
                        <input type="number" id="new-max-${tIndex}-${sIndex}" placeholder="Qtd" value="1" min="1" class="w-16 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-200 text-center focus:outline-none focus:border-indigo-500">
                        <label class="flex items-center gap-1 text-[10px] text-zinc-400 cursor-pointer">
                            <input type="checkbox" id="new-daily-${tIndex}-${sIndex}" class="rounded bg-zinc-900 border-zinc-700 text-indigo-600"> Diário?
                        </label>
                        <button onclick="addReq(${tIndex}, ${sIndex})" class="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs px-3 py-1 rounded transition">Adicionar</button>
                    </div>
                </div>
            `;
        });

        html += `
                    <div class="flex gap-2 pt-2">
                        <input type="text" id="new-step-${tIndex}" placeholder="Novo passo (ex: Passo ${task.steps.length + 1})..." class="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500">
                        <button onclick="addStep(${tIndex})" class="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs px-3 py-1.5 rounded-lg border border-zinc-700 transition">+ Passo</button>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    updateStats();
};

window.toggleReq = (tIndex, sIndex, rIndex) => {
    const req = tasks[tIndex].steps[sIndex].requirements[rIndex];
    if (req.current >= req.max) {
        req.current = 0;
    } else {
        req.current = req.max;
    }
    saveTasksToStorage();
    renderTasks();
};

window.updateReqValue = (tIndex, sIndex, rIndex, val) => {
    const num = parseInt(val);
    if (!isNaN(num)) {
        tasks[tIndex].steps[sIndex].requirements[rIndex].current = Math.max(0, Math.min(num, tasks[tIndex].steps[sIndex].requirements[rIndex].max));
        saveTasksToStorage();
        renderTasks();
    }
};

window.setMaxReq = (tIndex, sIndex, rIndex) => {
    const req = tasks[tIndex].steps[sIndex].requirements[rIndex];
    req.current = req.max;
    saveTasksToStorage();
    renderTasks();
};

window.deleteReq = (tIndex, sIndex, rIndex) => {
    tasks[tIndex].steps[sIndex].requirements.splice(rIndex, 1);
    saveTasksToStorage();
    renderTasks();
};

window.addReq = (tIndex, sIndex) => {
    const nameInput = document.getElementById(`new-req-${tIndex}-${sIndex}`);
    const maxInput = document.getElementById(`new-max-${tIndex}-${sIndex}`);
    const dailyInput = document.getElementById(`new-daily-${tIndex}-${sIndex}`);

    const name = nameInput.value.trim();
    const max = parseInt(maxInput.value) || 1;
    const isDaily = dailyInput ? dailyInput.checked : false;

    if (!name) return;

    tasks[tIndex].steps[sIndex].requirements.push({
        name,
        current: 0,
        max,
        isDaily
    });

    saveTasksToStorage();
    renderTasks();
};

window.addStep = (tIndex) => {
    const input = document.getElementById(`new-step-${tIndex}`);
    const title = input.value.trim();
    if (!title) return;

    tasks[tIndex].steps.push({
        title,
        requirements: []
    });

    saveTasksToStorage();
    renderTasks();
};

window.deleteTask = (tIndex) => {
    if (confirm("Deseja realmente excluir esta meta?")) {
        tasks.splice(tIndex, 1);
        saveTasksToStorage();
        renderTasks();
    }
};

window.resetDailies = () => {
    let count = 0;
    tasks.forEach(task => {
        task.steps.forEach(step => {
            step.requirements.forEach(req => {
                if (req.isDaily && req.current > 0) {
                    req.current = 0;
                    count++;
                }
            });
        });
    });
    saveTasksToStorage();
    renderTasks();
    alert(`Reset de Dailies aplicado! ${count} requisitos diários zerados.`);
};

window.exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `metas_aqw_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
};

window.importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const imported = JSON.parse(e.target.result);
            if (Array.isArray(imported)) {
                tasks = imported;
                saveTasksToStorage();
                renderTasks();
                alert("Dados importados com sucesso!");
            } else {
                alert("Arquivo inválido.");
            }
        } catch (err) {
            alert("Erro ao ler o arquivo JSON.");
        }
    };
    reader.readAsText(file);
};
