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
                title: "Passo 2: Void Auras (Farm de Auras)",
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
                title: "Passo 1: Acesso Inicial e Tokens",
                requirements: [
                    { name: "Arcana Staff", current: 0, max: 1, isDaily: false },
                    { name: "Eternia Mind Token", current: 0, max: 100, isDaily: true },
                    { name: "Spark of Life", current: 0, max: 75, isDaily: false }
                ]
            },
            {
                title: "Passo 2: Materiais e Essências",
                requirements: [
                    { name: "Resonance", current: 0, max: 300, isDaily: false },
                    { name: "Life Energy", current: 0, max: 150, isDaily: false },
                    { name: "Transcendence", current: 0, max: 100, isDaily: false },
                    { name: "Origin Index", current: 0, max: 1, isDaily: false }
                ]
            }
        ]
    },
    nsod: {
        title: "Necrotic Sword of Doom (NSoD)",
        steps: [
            {
                title: "Passo 1: Acesso e Void Skulls",
                requirements: [
                    { name: "Void Skulls", current: 0, max: 25000, isDaily: false },
                    { name: "Corrupted Skull", current: 0, max: 800, isDaily: false }
                ]
            },
            {
                title: "Passo 2: Auras e Minérios de Doom",
                requirements: [
                    { name: "Doom Aura", current: 0, max: 100, isDaily: false },
                    { name: "Dark Energy", current: 0, max: 5000, isDaily: false },
                    { name: "Barium", current: 0, max: 30, isDaily: true }
                ]
            }
        ]
    },
    exalted: {
        title: "Exalted Apotheosis",
        steps: [
            {
                title: "Passo 1: Insígnias e Desafios Ultra",
                requirements: [
                    { name: "Ultra Engineer Insignia", current: 0, max: 12, isDaily: true },
                    { name: "Ultra Warden Insignia", current: 0, max: 12, isDaily: true },
                    { name: "Ultra Tyndarius Insignia", current: 0, max: 12, isDaily: true }
                ]
            },
            {
                title: "Passo 2: Crafting Final da Arma",
                requirements: [
                    { name: "Exalted Crown", current: 0, max: 1, isDaily: false },
                    { name: "Apotheosis Blade", current: 0, max: 1, isDaily: false }
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
        title: "Valiance (Enchantment)",
        steps: [
            {
                title: "Passo 1: Insígnias de Ultra Bosses",
                requirements: [
                    { name: "Ultra Tyndarius Insignia", current: 0, max: 10, isDaily: true },
                    { name: "Ultra Dage Insignia", current: 0, max: 10, isDaily: true },
                    { name: "Ultra Nulgath Insignia", current: 0, max: 10, isDaily: true }
                ]
            }
        ]
    },
    vdk: {
        title: "Verus DoomKnight",
        steps: [
            {
                title: "Passo 1: Insígnias e Metais",
                requirements: [
                    { name: "Ultra Dage Insignia", current: 0, max: 12, isDaily: true },
                    { name: "Dark Metal", current: 0, max: 150, isDaily: false },
                    { name: "Infected Essence", current: 0, max: 300, isDaily: false }
                ]
            }
        ]
    }
};
