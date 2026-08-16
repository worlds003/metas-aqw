import { PRESETS } from './database.js';

let tasks = [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    document.getElementById('user-email-display').innerText = 'Modo Local / Convidado';

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes waterFlow {
            0% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .animate-water-flow {
            background: linear-gradient(90deg, #3b82f6, #06b6d4, #4f46e5, #3b82f6);
            background-size: 200% auto;
            animation: waterFlow 2.5s linear infinite;
        }
        .transition-transform {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);

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
                observation: "",
                collapsed: false,
                steps: [
                    {
                        title: "Passo 1: Objetivos Iniciais",
                        collapsed: false,
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

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            renderTasks();
        });
    }
}

window.loadPreset = (key) => {
    const preset = PRESETS[key];
    if (!preset) return;

    const newTask = {
        id: Date.now().toString(),
        title: preset.title,
        observation: preset.observation || "",
        collapsed: false,
        steps: JSON.parse(JSON.stringify(preset.steps))
    };

    newTask.steps.forEach(s => { if (s.collapsed === undefined) s.collapsed = false; });

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
                btn.className = "filter-btn text-sm px-4 py-2 rounded-lg border font-medium transition bg-indigo-600/20 text-indigo-300 border-indigo-500/40";
            } else {
                btn.className = "filter-btn text-sm px-4 py-2 rounded-lg border font-medium transition bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-zinc-200";
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
                        if (req.subRequirements) {
                            req.subRequirements.forEach(sub => {
                                totalReqs++;
                                if (sub.current >= sub.max) compReqs++;
                            });
                        }
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
                <i class="fa-solid fa-dragon text-5xl mb-4 text-zinc-700"></i>
                <p class="text-base">Nenhuma meta cadastrada. Crie uma acima ou selecione um Preset Rápido!</p>
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
                    if (req.subRequirements) {
                        req.subRequirements.forEach(sub => {
                            if (sub.name.toLowerCase().includes(query)) match = true;
                        });
                    }
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
                if (req.subRequirements) {
                    req.subRequirements.forEach(sub => {
                        totalR++;
                        if (sub.current >= sub.max) compR++;
                    });
                }
            });
        });
        const taskProgress = totalR > 0 ? Math.round((compR / totalR) * 100) : 0;

        if (currentFilter === 'active' && taskProgress === 100) return;
        if (currentFilter === 'completed' && taskProgress < 100) return;

        const isTaskCollapsed = task.collapsed || false;

        html += `
            <div class="bg-zinc-900 rounded-xl border border-zinc-800 p-6 space-y-5 shadow-lg">
                <div class="flex justify-between items-start border-b border-zinc-800 pb-4">
                    <div class="flex items-center gap-3">
                        <button onclick="toggleTaskCollapse(${tIndex})" class="text-purple-400 hover:text-purple-300 transition-transform p-1" title="Minimizar/Expandir Meta">
                            <span class="inline-block transition-transform duration-300" style="transform: rotate(${isTaskCollapsed ? '-90deg' : '0deg'});">▼</span>
                        </button>
                        <div class="flex items-center gap-3">
                            <h3 class="text-xl font-bold text-white">${task.title}</h3>
                            <button onclick="editTaskTitle(${tIndex})" class="text-zinc-500 hover:text-indigo-400 p-1.5 transition" title="Editar Nome da Meta">
                                <i class="fa-solid fa-pen text-sm"></i>
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-3">
                            <div class="w-48 sm:w-64 bg-zinc-800 rounded-full h-3 overflow-hidden shadow-inner border border-zinc-700/50">
                                <div class="h-full transition-all duration-300 ${taskProgress > 0 ? 'animate-water-flow' : ''}" style="width: ${taskProgress}%"></div>
                            </div>
                            <span class="text-sm px-2.5 py-0.5 rounded-full font-mono ${taskProgress === 100 ? 'bg-emerald-950 text-emerald-400 border border-emerald-900/50' : 'bg-indigo-950 text-indigo-400 border border-indigo-900/50'}">${taskProgress}%</span>
                        </div>
                        <button onclick="deleteTask(${tIndex})" class="text-zinc-500 hover:text-red-400 p-1.5 transition" title="Excluir Meta">
                            <i class="fa-solid fa-trash text-sm"></i>
                        </button>
                    </div>
                </div>

                <div class="space-y-5 ${isTaskCollapsed ? 'hidden' : ''}">
                    <div class="space-y-2 mt-2 mb-4">
                        ${task.observation ? `
                            <div class="flex items-start justify-between gap-3 bg-zinc-950/80 p-3.5 rounded-lg border border-zinc-800 text-sm text-zinc-300 shadow-inner">
                                <div class="flex items-start gap-3 flex-1">
                                    <i class="fa-solid fa-circle-info text-indigo-400 mt-1"></i>
                                    <span class="whitespace-pre-wrap">${task.observation}</span>
                                </div>
                                <button onclick="editTaskObservation(${tIndex})" class="text-zinc-500 hover:text-indigo-400 p-1 transition" title="Editar Observação">
                                    <i class="fa-solid fa-pen text-sm"></i>
                                </button>
                            </div>
                        ` : ''}
                        <div class="flex justify-end">
                            <button onclick="editTaskObservation(${tIndex})" class="text-sm text-zinc-400 hover:text-indigo-300 flex items-center gap-1.5 transition font-medium">
                                <i class="fa-solid fa-plus text-xs"></i> ${task.observation ? 'Editar Obs' : 'Adicionar Observação'}
                            </button>
                        </div>
                    </div>

                    <div class="space-y-5">
        `;

        task.steps.forEach((step, sIndex) => {
            let stepTotal = step.requirements.length;
            let stepComp = step.requirements.filter(r => r.current >= r.max).length;
            step.requirements.forEach(r => {
                if (r.subRequirements) {
                    stepTotal += r.subRequirements.length;
                    stepComp += r.subRequirements.filter(sub => sub.current >= sub.max).length;
                }
            });
            let stepProg = stepTotal > 0 ? Math.round((stepComp / stepTotal) * 100) : 0;
            const isCollapsed = step.collapsed || false;

            html += `
                <div class="bg-zinc-950/60 p-5 rounded-lg border border-zinc-800/80 space-y-4 transition-all">
                    <div class="flex justify-between items-center text-sm">
                        <div class="flex items-center gap-2 min-w-0 flex-1">
                            <button onclick="toggleStepCollapse(${tIndex}, ${sIndex})" class="text-purple-400 hover:text-purple-300 p-1 transition" title="Minimizar/Expandir Passo">
                                <span class="inline-block transition-transform duration-300 text-base" style="transform: rotate(${isCollapsed ? '0deg' : '90deg'});">»</span>
                            </button>
                            <span class="font-semibold text-zinc-200 text-base truncate">${step.title}</span>
                            <button onclick="editStepTitle(${tIndex}, ${sIndex})" class="text-zinc-600 hover:text-indigo-400 p-1.5 transition" title="Editar Passo">
                                <i class="fa-solid fa-pen text-xs"></i>
                            </button>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="flex items-center gap-2.5">
                                <div class="w-28 sm:w-40 bg-zinc-800 rounded-full h-2.5 overflow-hidden shadow-inner border border-zinc-700/50">
                                    <div class="h-full transition-all duration-300 ${stepProg > 0 ? 'animate-water-flow' : ''}" style="width: ${stepProg}%"></div>
                                </div>
                                <span class="text-zinc-500 font-mono text-sm">${stepProg}%</span>
                            </div>
                            <button onclick="deleteStep(${tIndex}, ${sIndex})" class="text-zinc-500 hover:text-red-400 p-1.5 transition" title="Deletar Passo">
                                <span class="text-base font-bold">&times;</span>
                            </button>
                        </div>
                    </div>

                    <div class="space-y-4 ${isCollapsed ? 'hidden' : ''}">
                        <div class="space-y-4">
            `;

            step.requirements.forEach((req, rIndex) => {
                const isDone = req.current >= req.max;
                
                html += `
                    <div class="bg-zinc-900 p-3.5 rounded-lg border border-zinc-800 shadow-sm">
                        <div class="flex items-start justify-between gap-3">
                            <div class="flex items-start gap-3 min-w-0 flex-1">
                                <label class="relative flex items-center cursor-pointer select-none mt-1">
                                    <input type="checkbox" ${isDone ? 'checked' : ''} onchange="toggleReq(${tIndex}, ${sIndex}, ${rIndex})" class="peer sr-only">
                                    <div class="w-6 h-6 bg-zinc-950 border border-zinc-700 rounded-md peer-checked:bg-indigo-600 peer-checked:border-indigo-500 transition flex items-center justify-center shadow-inner">
                                        <i class="fa-solid fa-check text-xs text-white scale-0 peer-checked:scale-100 transition-transform"></i>
                                    </div>
                                </label>
                                
                                <div class="flex flex-wrap items-center gap-1.5 pt-1 flex-1">
                                    <span class="text-sm font-medium ${isDone ? 'line-through text-zinc-500' : 'text-zinc-200'}">${req.name}</span>
                                    <button onclick="editReqName(${tIndex}, ${sIndex}, ${rIndex})" class="text-zinc-600 hover:text-indigo-400 p-1 transition" title="Editar Requisito">
                                        <i class="fa-solid fa-pen text-xs"></i>
                                    </button>

                                    ${req.observation ? `
                                        <div class="flex items-start gap-2 bg-zinc-950 px-3 py-1.5 rounded-md border border-zinc-800 text-xs text-zinc-300 mx-1 max-w-[200px] xl:max-w-[350px]">
                                            <span class="whitespace-pre-wrap break-words flex-1">${req.observation}</span>
                                            <button onclick="editReqObservation(${tIndex}, ${sIndex}, ${rIndex})" class="text-zinc-500 hover:text-indigo-400 p-0.5 transition mt-0.5" title="Editar Observação"><i class="fa-solid fa-pen text-[10px]"></i></button>
                                        </div>
                                    ` : ''}

                                    ${req.isDaily ? '<span class="text-xs bg-emerald-950 text-emerald-400 border border-emerald-900/50 px-2 py-0.5 rounded font-medium ml-1">DAILY</span>' : ''}
                                </div>
                            </div>
                            
                            <div class="flex items-center gap-3 shrink-0 pt-0.5">
                                ${!req.observation ? `
                                    <button onclick="editReqObservation(${tIndex}, ${sIndex}, ${rIndex})" class="text-xs text-zinc-500 hover:text-indigo-300 flex items-center gap-1 transition font-medium mr-1">
                                        <i class="fa-solid fa-plus text-[10px]"></i> Add Obs
                                    </button>
                                ` : ''}
                                
                                <div class="flex items-center gap-1.5 font-mono text-sm">
                                    <input type="number" value="${req.current}" oninput="updateReqValue(${tIndex}, ${sIndex}, ${rIndex}, this.value)" class="w-16 bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-right text-zinc-200 focus:outline-none focus:border-indigo-500">
                                    <span class="text-zinc-500">/ ${req.max}</span>
                                </div>
                                <button onclick="setMaxReq(${tIndex}, ${sIndex}, ${rIndex})" class="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1.5 rounded transition font-medium">Max</button>
                                <button onclick="deleteReq(${tIndex}, ${sIndex}, ${rIndex})" class="text-zinc-600 hover:text-red-400 p-1.5 transition"><i class="fa-solid fa-xmark text-sm"></i></button>
                            </div>
                        </div>
                `;

                if (req.subRequirements && req.subRequirements.length > 0) {
                    html += `<div class="pl-8 pt-3 border-t border-zinc-800/60 space-y-2 mt-3">
                                <div class="text-[11px] uppercase tracking-wider font-semibold text-indigo-400 mb-1.5">Itens necessários:</div>`;
                    
                    req.subRequirements.forEach((sub, subIndex) => {
                        const subDone = sub.current >= sub.max;
                        html += `
                            <div class="bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-800/50">
                                <div class="flex items-start justify-between gap-3">
                                    <div class="flex items-start gap-2.5 min-w-0 flex-1">
                                        <label class="relative flex items-center cursor-pointer select-none mt-1">
                                            <input type="checkbox" ${subDone ? 'checked' : ''} onchange="toggleSubReq(${tIndex}, ${sIndex}, ${rIndex}, ${subIndex})" class="peer sr-only">
                                            <div class="w-5 h-5 bg-zinc-900 border border-zinc-700 rounded peer-checked:bg-indigo-600 peer-checked:border-indigo-500 transition flex items-center justify-center">
                                                <i class="fa-solid fa-check text-[10px] text-white scale-0 peer-checked:scale-100 transition-transform"></i>
                                            </div>
                                        </label>
                                        
                                        <div class="flex flex-wrap items-center gap-1.5 pt-1 flex-1">
                                            <span class="text-sm ${subDone ? 'line-through text-zinc-500' : 'text-zinc-300'}">↳ ${sub.name}</span>
                                            <button onclick="editSubReqName(${tIndex}, ${sIndex}, ${rIndex}, ${subIndex})" class="text-zinc-600 hover:text-indigo-400 p-1 transition" title="Editar Subitem">
                                                <i class="fa-solid fa-pen text-xs"></i>
                                            </button>

                                            ${sub.observation ? `
                                                <div class="flex items-start gap-2 bg-zinc-900 px-2 py-1.5 rounded border border-zinc-800 text-xs text-zinc-300 mx-1 max-w-[180px] xl:max-w-[300px]">
                                                    <span class="whitespace-pre-wrap break-words flex-1">${sub.observation}</span>
                                                    <button onclick="editSubObservation(${tIndex}, ${sIndex}, ${rIndex}, ${subIndex})" class="text-zinc-500 hover:text-indigo-400 p-0.5 transition mt-0.5"><i class="fa-solid fa-pen text-[10px]"></i></button>
                                                </div>
                                            ` : ''}

                                            ${sub.isDaily ? '<span class="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded ml-1">DAILY</span>' : ''}
                                        </div>
                                    </div>
                                    
                                    <div class="flex items-center gap-3 shrink-0 pt-0.5">
                                        ${!sub.observation ? `
                                            <button onclick="editSubObservation(${tIndex}, ${sIndex}, ${rIndex}, ${subIndex})" class="text-[11px] text-zinc-500 hover:text-indigo-300 flex items-center gap-1 transition font-medium mr-1">
                                                <i class="fa-solid fa-plus text-[9px]"></i> Add Obs
                                            </button>
                                        ` : ''}

                                        <div class="flex items-center gap-1.5 font-mono text-sm">
                                            <input type="number" value="${sub.current}" oninput="updateSubReqValue(${tIndex}, ${sIndex}, ${rIndex}, ${subIndex}, this.value)" class="w-16 bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-right text-zinc-200 focus:outline-none focus:border-indigo-500">
                                            <span class="text-zinc-500">/ ${sub.max}</span>
                                        </div>
                                        <button onclick="deleteSubReq(${tIndex}, ${sIndex}, ${rIndex}, ${subIndex})" class="text-zinc-600 hover:text-red-400 p-1 transition"><i class="fa-solid fa-xmark text-sm"></i></button>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                    html += `</div>`;
                }

                html += `
                        <div class="pt-3 flex items-center justify-end">
                            <div id="sub-form-container-${tIndex}-${sIndex}-${rIndex}" class="hidden flex gap-2 items-center w-full bg-zinc-950 p-2.5 rounded border border-zinc-800 animate-fadeIn">
                                <input type="text" id="new-sub-req-${tIndex}-${sIndex}-${rIndex}" placeholder="Nome do item necessário..." class="flex-1 bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500">
                                <input type="number" id="new-sub-max-${tIndex}-${sIndex}-${rIndex}" placeholder="Qtd" value="1" min="1" class="w-16 bg-zinc-900 border border-zinc-800 rounded px-2 py-1.5 text-sm text-zinc-200 text-center focus:outline-none focus:border-indigo-500">
                                <button onclick="addSubReq(${tIndex}, ${sIndex}, ${rIndex})" class="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-1.5 rounded transition">Salvar</button>
                            </div>
                            <button id="sub-btn-${tIndex}-${sIndex}-${rIndex}" onclick="toggleSubForm(${tIndex}, ${sIndex}, ${rIndex})" class="text-zinc-400 hover:text-indigo-400 text-sm px-2 py-1.5 rounded flex items-center gap-1.5 transition font-medium" title="Adicionar Item">
                                <i class="fa-solid fa-plus text-xs"></i> Adicionar item
                            </button>
                        </div>
                    </div>
                `;
            });

            html += `
                        </div>
                        <div class="pt-3 border-t border-zinc-900 flex flex-col gap-3">
                            <div id="req-form-container-${tIndex}-${sIndex}" class="hidden flex gap-3 items-center bg-zinc-900 p-3 rounded-lg border border-zinc-800 animate-fadeIn">
                                <input type="text" id="new-req-${tIndex}-${sIndex}" placeholder="Nome do requisito..." class="flex-1 bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500">
                                <input type="number" id="new-max-${tIndex}-${sIndex}" placeholder="Qtd" value="1" min="1" class="w-20 bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-sm text-zinc-200 text-center focus:outline-none focus:border-indigo-500">
                                <label class="flex items-center gap-1.5 text-sm text-zinc-400 cursor-pointer select-none">
                                    <input type="checkbox" id="new-daily-${tIndex}-${sIndex}" class="rounded bg-zinc-950 border-zinc-700 text-indigo-600 w-4 h-4"> Diário
                                </label>
                                <button onclick="addReq(${tIndex}, ${sIndex})" class="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-1.5 rounded transition">Adicionar</button>
                            </div>
                            <button id="req-btn-${tIndex}-${sIndex}" onclick="toggleReqForm(${tIndex}, ${sIndex})" class="w-full py-2 border border-dashed border-zinc-800 hover:border-indigo-500/50 text-zinc-400 hover:text-indigo-300 rounded-lg text-sm flex items-center justify-center gap-2 transition font-medium">
                                <i class="fa-solid fa-plus text-sm"></i> Adicionar Requisito
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
                    <div class="pt-3">
                        <div id="step-form-container-${tIndex}" class="hidden flex gap-3 items-center bg-zinc-950 p-4 rounded-lg border border-zinc-800 mb-3 animate-fadeIn">
                            <input type="text" id="new-step-${tIndex}" placeholder="Nome do novo passo..." class="flex-1 bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500">
                            <button onclick="addStep(${tIndex})" class="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-5 py-2 rounded transition font-medium">Salvar Passo</button>
                        </div>
                        <button id="step-btn-${tIndex}" onclick="toggleStepForm(${tIndex})" class="w-full py-3 bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded-lg border border-zinc-800 text-sm flex items-center justify-center gap-2 transition font-medium">
                            <i class="fa-solid fa-plus text-sm"></i> Adicionar Passo
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    updateStats();
};

window.openMultilineModal = (title, currentValue, onSave) => {
    const existing = document.getElementById('custom-obs-modal');
    if (existing) existing.remove();

    const modalHtml = `
        <div id="custom-obs-modal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div class="bg-zinc-900 border border-zinc-700 rounded-xl p-5 w-full max-w-md shadow-2xl flex flex-col gap-4">
                <h3 class="text-white font-semibold text-lg">${title}</h3>
                <textarea id="modal-textarea" rows="4" class="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500 resize-y" placeholder="Escreva aqui... Pressione Enter para pular uma linha.">${currentValue}</textarea>
                <div class="flex justify-end gap-3 mt-2">
                    <button onclick="document.getElementById('custom-obs-modal').remove()" class="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white transition">Cancelar</button>
                    <button id="modal-save-btn" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition">Salvar</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    const textarea = document.getElementById('modal-textarea');
    textarea.focus();
    
    document.getElementById('modal-save-btn').onclick = () => {
        onSave(textarea.value.trim());
        document.getElementById('custom-obs-modal').remove();
    };
};

window.toggleTaskCollapse = (tIndex) => {
    if (tasks[tIndex].collapsed === undefined) {
        tasks[tIndex].collapsed = true;
    } else {
        tasks[tIndex].collapsed = !tasks[tIndex].collapsed;
    }
    renderTasks();
};

window.toggleStepCollapse = (tIndex, sIndex) => {
    if (tasks[tIndex].steps[sIndex].collapsed === undefined) {
        tasks[tIndex].steps[sIndex].collapsed = true;
    } else {
        tasks[tIndex].steps[sIndex].collapsed = !tasks[tIndex].steps[sIndex].collapsed;
    }
    renderTasks();
};

window.deleteStep = (tIndex, sIndex) => {
    if (confirm("Deseja realmente excluir este passo?")) {
        tasks[tIndex].steps.splice(sIndex, 1);
        saveTasksToStorage();
        renderTasks();
    }
};

window.toggleStepForm = (tIndex) => {
    const form = document.getElementById(`step-form-container-${tIndex}`);
    const btn = document.getElementById(`step-btn-${tIndex}`);
    if (form) {
        form.classList.toggle('hidden');
        btn.classList.toggle('hidden');
    }
};

window.toggleReqForm = (tIndex, sIndex) => {
    const form = document.getElementById(`req-form-container-${tIndex}-${sIndex}`);
    const btn = document.getElementById(`req-btn-${tIndex}-${sIndex}`);
    if (form) {
        form.classList.toggle('hidden');
        btn.classList.toggle('hidden');
    }
};

window.toggleSubForm = (tIndex, sIndex, rIndex) => {
    const form = document.getElementById(`sub-form-container-${tIndex}-${sIndex}-${rIndex}`);
    const btn = document.getElementById(`sub-btn-${tIndex}-${sIndex}-${rIndex}`);
    if (form) {
        form.classList.toggle('hidden');
        btn.classList.toggle('hidden');
    }
};

window.editTaskObservation = (tIndex) => {
    const current = tasks[tIndex].observation || "";
    window.openMultilineModal("Editar Observação Geral da Meta", current, (newVal) => {
        tasks[tIndex].observation = newVal;
        saveTasksToStorage();
        renderTasks();
    });
};

window.editReqObservation = (tIndex, sIndex, rIndex) => {
    const req = tasks[tIndex].steps[sIndex].requirements[rIndex];
    const current = req.observation || "";
    window.openMultilineModal("Editar Observação do Requisito", current, (newVal) => {
        req.observation = newVal;
        saveTasksToStorage();
        renderTasks();
    });
};

window.editSubObservation = (tIndex, sIndex, rIndex, subIndex) => {
    const sub = tasks[tIndex].steps[sIndex].requirements[rIndex].subRequirements[subIndex];
    const current = sub.observation || "";
    window.openMultilineModal("Editar Observação do Subitem", current, (newVal) => {
        sub.observation = newVal;
        saveTasksToStorage();
        renderTasks();
    });
};

window.editTaskTitle = (tIndex) => {
    const current = tasks[tIndex].title;
    const newTitle = prompt("Editar nome da meta:", current);
    if (newTitle !== null && newTitle.trim() !== "") {
        tasks[tIndex].title = newTitle.trim();
        saveTasksToStorage();
        renderTasks();
    }
};

window.editStepTitle = (tIndex, sIndex) => {
    const current = tasks[tIndex].steps[sIndex].title;
    const newTitle = prompt("Editar nome do passo:", current);
    if (newTitle !== null && newTitle.trim() !== "") {
        tasks[tIndex].steps[sIndex].title = newTitle.trim();
        saveTasksToStorage();
        renderTasks();
    }
};

window.editReqName = (tIndex, sIndex, rIndex) => {
    const current = tasks[tIndex].steps[sIndex].requirements[rIndex].name;
    const newName = prompt("Editar nome do requisito:", current);
    if (newName !== null && newName.trim() !== "") {
        tasks[tIndex].steps[sIndex].requirements[rIndex].name = newName.trim();
        saveTasksToStorage();
        renderTasks();
    }
};

window.editSubReqName = (tIndex, sIndex, rIndex, subIndex) => {
    const current = tasks[tIndex].steps[sIndex].requirements[rIndex].subRequirements[subIndex].name;
    const newName = prompt("Editar nome do item necessário:", current);
    if (newName !== null && newName.trim() !== "") {
        tasks[tIndex].steps[sIndex].requirements[rIndex].subRequirements[subIndex].name = newName.trim();
        saveTasksToStorage();
        renderTasks();
    }
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
        isDaily,
        observation: "",
        subRequirements: []
    });

    saveTasksToStorage();
    renderTasks();
};

window.toggleSubReq = (tIndex, sIndex, rIndex, subIndex) => {
    const sub = tasks[tIndex].steps[sIndex].requirements[rIndex].subRequirements[subIndex];
    sub.current = (sub.current >= sub.max) ? 0 : sub.max;
    saveTasksToStorage();
    renderTasks();
};

window.updateSubReqValue = (tIndex, sIndex, rIndex, subIndex, val) => {
    const num = parseInt(val);
    if (!isNaN(num)) {
        const sub = tasks[tIndex].steps[sIndex].requirements[rIndex].subRequirements[subIndex];
        sub.current = Math.max(0, Math.min(num, sub.max));
        saveTasksToStorage();
    }
};

window.deleteSubReq = (tIndex, sIndex, rIndex, subIndex) => {
    tasks[tIndex].steps[sIndex].requirements[rIndex].subRequirements.splice(subIndex, 1);
    saveTasksToStorage();
    renderTasks();
};

window.addSubReq = (tIndex, sIndex, rIndex) => {
    const nameInput = document.getElementById(`new-sub-req-${tIndex}-${sIndex}-${rIndex}`);
    const maxInput = document.getElementById(`new-sub-max-${tIndex}-${sIndex}-${rIndex}`);

    const name = nameInput.value.trim();
    const max = parseInt(maxInput.value) || 1;

    if (!name) return;

    const req = tasks[tIndex].steps[sIndex].requirements[rIndex];
    if (!req.subRequirements) req.subRequirements = [];

    req.subRequirements.push({
        name,
        current: 0,
        max,
        isDaily: false,
        observation: ""
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
        collapsed: false,
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
