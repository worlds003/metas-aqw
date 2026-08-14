export let aqwDatabase = {
    "vhl": {
        title: "Void Highlord (VHL)",
        subtasks: [
            {
                id: 1,
                title: "Roents & Hard Farming",
                items: [
                    { id: 101, title: "Roentgenium", hasQuantity: true, currentQty: 0, totalQty: 15, isDaily: true, completed: false },
                    { id: 102, title: "Void Crystal A", hasQuantity: true, currentQty: 0, totalQty: 15, isDaily: false, completed: false },
                    { id: 103, title: "Void Crystal B", hasQuantity: true, currentQty: 0, totalQty: 6, isDaily: false, completed: false }
                ]
            }
        ]
    },
    "loo": {
        title: "Lord of Order (LoO)",
        subtasks: [
            {
                id: 2,
                title: "Missões Semanais",
                items: [
                    { id: 201, title: "Destiny Token", hasQuantity: true, currentQty: 0, totalQty: 10, isDaily: false, completed: false }
                ]
            }
        ]
    },
    "valiance": {
        title: "Valiance",
        subtasks: [
            {
                id: 3,
                title: "Requisitos de Forge",
                items: [
                    { id: 301, title: "Abyssal Token", hasQuantity: true, currentQty: 0, totalQty: 100, isDaily: false, completed: false }
                ]
            }
        ]
    },
    "ldk": {
        title: "Legion DoomKnight",
        subtasks: [
            {
                id: 4,
                title: "Requisitos da Quest",
                items: [
                    { id: 401, title: "Undead Legend", hasQuantity: false, currentQty: 0, totalQty: 1, isDaily: false, completed: false }
                ]
            }
        ]
    },
    "nsod": {
        title: "Necrotic Sword of Doom (NSoD)",
        subtasks: [
            {
                id: 5,
                title: "Farma Principal",
                items: [
                    { id: 501, title: "Void Energy", hasQuantity: true, currentQty: 0, totalQty: 7500, isDaily: false, completed: false }
                ]
            }
        ]
    },
    "vdk": {
        title: "Verus DoomKnight",
        subtasks: [
            {
                id: 6,
                title: "Farma Principal",
                items: [
                    { id: 601, title: "Verus Medal", hasQuantity: true, currentQty: 0, totalQty: 10, isDaily: true, completed: false }
                ]
            }
        ]
    }
};

export async function loadAqwDatabase() {
    try {
        const response = await fetch('data/dados.json');
        if (!response.ok) return;
        const data = await response.json();

        let itemsList = [];
        if (Array.isArray(data)) {
            itemsList = data;
        } else if (data && typeof data === 'object') {
            itemsList = Object.values(data).flat().filter(item => typeof item === 'object' && item !== null && (item.nome || item.name));
        }

        itemsList.forEach((item) => {
            if (!item || (!item.nome && !item.name)) return;
            const rawId = String(item.id || item.nome || item.name).toLowerCase();
            const nome = item.nome || item.name;
            const passos = item.passos || item.steps || [];

            if (!passos || !Array.isArray(passos)) return;

            const converted = {
                title: nome,
                subtasks: passos.map((passo, pIdx) => ({
                    id: Date.now() + pIdx,
                    title: `${passo.titulo || passo.title || 'Passo'} — ${passo.descricao || passo.description || ''}`,
                    items: (passo.requisitos || passo.requirements || []).map((req, rIdx) => ({
                        id: Date.now() + (pIdx * 10) + rIdx + 100,
                        title: req.nome || req.name || 'Item',
                        hasQuantity: true,
                        currentQty: req.quantidadeAtual || 0,
                        totalQty: req.quantidadeTotal || 1,
                        isDaily: req.isDaily || false,
                        completed: false
                    }))
                }))
            };

            aqwDatabase[rawId] = converted;
            aqwDatabase[nome.toLowerCase()] = converted;
        });
    } catch (err) {
        console.log("Usando banco de dados interno de segurança.");
    }
}
