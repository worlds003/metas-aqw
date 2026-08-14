export const PRESETS = {
    vhl: {
        title: "Void Highlord (VHL)",
        steps: [
            {
                title: "Passo 1: Materiais Base do Nulgath",
                requirements: [
                    { name: "Diamond of Nulgath", current: 0, max: 200, isDaily: false },
                    { name: "Gem of Nulgath", current: 0, max: 500, isDaily: false },
                    { name: "Tainted Gem", current: 0, max: 500, isDaily: false },
                    { name: "Dark Crystal Shard", current: 0, max: 500, isDaily: false },
                    { name: "Voucher of Nulgath (non-mem)", current: 0, max: 20, isDaily: false },
                    { name: "Totem of Nulgath", current: 0, max: 15, isDaily: false },
                    { name: "Blood Plate", current: 0, max: 1, isDaily: false }
                ]
            },
            {
                title: "Passo 2: Gestão de Void Auras",
                requirements: [
                    { name: "Void Aura", current: 0, max: 1000, isDaily: false }
                ]
            },
            {
                title: "Passo 3: Roentgenium of Nulgath (Diárias)",
                requirements: [
                    { name: "Roentgenium of Nulgath", current: 0, max: 15, isDaily: true }
                ]
            }
        ]
    },
    archmage: {
        title: "ArchMage",
        steps: [
            {
                title: "Passo 1: Requisitos de Acesso e Rank",
                requirements: [
                    { name: "Arcana Staff", current: 0, max: 1, isDaily: false },
                    { name: "Eternia Mind Token", current: 0, max: 100, isDaily: true },
                    { name: "Spark of Life", current: 0, max: 75, isDaily: false }
                ]
            },
            {
                title: "Passo 2: Materiais Avançados",
                requirements: [
                    { name: "Resonance", current: 0, max: 300, isDaily: false },
                    { name: "Life Energy", current: 0, max: 150, isDaily: false }
                ]
            }
        ]
    },
    loo: {
        title: "Lord of Order (LoO)",
        steps: [
            {
                title: "Passo único: Missões Diárias",
                requirements: [
                    { name: "Destiny Token", current: 0, max: 10, isDaily: true }
                ]
            }
        ]
    },
    valiance: {
        title: "Valiance",
        steps: [
            {
                title: "Passo 1: Insígnias Ultra Bosses",
                requirements: [
                    { name: "Ultra Tyndarius Insignia", current: 0, max: 10, isDaily: true },
                    { name: "Ultra Dage Insignia", current: 0, max: 10, isDaily: true },
                    { name: "Ultra Nulgath Insignia", current: 0, max: 10, isDaily: true }
                ]
            }
        ]
    },
    ldk: {
        title: "Legion DoomKnight",
        steps: [
            {
                title: "Passo 1: Insígnias e Honorable",
                requirements: [
                    { name: "Ultra Dage Insignia", current: 0, max: 10, isDaily: true },
                    { name: "Diamond Token of Dage", current: 0, max: 300, isDaily: false }
                ]
            }
        ]
    },
    nsod: {
        title: "NSoD (Necrotic Sword of Doom)",
        steps: [
            {
                title: "Passo 1: Acesso e Void Skulls",
                requirements: [
                    { name: "Void Skulls", current: 0, max: 25000, isDaily: false },
                    { name: "Doom Aura", current: 0, max: 100, isDaily: false }
                ]
            }
        ]
    },
    vdk: {
        title: "Verus DoomKnight",
        steps: [
            {
                title: "Passo 1: Insígnias e Itens de Doom",
                requirements: [
                    { name: "Ultra Dage Insignia", current: 0, max: 12, isDaily: true },
                    { name: "Dark Metal", current: 0, max: 150, isDaily: false }
                ]
            }
        ]
    }
};
