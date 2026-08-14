export const PRESETS = {
    vhl: {
        title: "Void Highlord (VHL)",
        steps: [
            {
                title: "Passo 1: Roentgenium e Materiais Complexos",
                requirements: [
                    { 
                        name: "Roentgenium of Nulgath", 
                        current: 0, 
                        max: 15, 
                        isDaily: true,
                        subRequirements: [
                            { name: "Diamond of Nulgath", current: 0, max: 30, isDaily: false },
                            { name: "Blood Gem of the Archfiend", current: 0, max: 1, isDaily: false },
                            { name: "Dark Crystal Shard", current: 0, max: 30, isDaily: false }
                        ]
                    },
                    { 
                        name: "Totem of Nulgath", 
                        current: 0, 
                        max: 15, 
                        isDaily: false,
                        subRequirements: [
                            { name: "Essence of Nulgath", current: 0, max: 60, isDaily: false },
                            { name: "Blood Stone", current: 0, max: 1, isDaily: false }
                        ]
                    }
                ]
            },
            {
                title: "Passo 2: Gestão de Void Auras",
                requirements: [
                    { name: "Void Aura", current: 0, max: 1000, isDaily: false }
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
                    { 
                        name: "Arcana Staff", 
                        current: 0, 
                        max: 1, 
                        isDaily: false,
                        subRequirements: [
                            { name: "Eternia Dust", current: 0, max: 100, isDaily: false },
                            { name: "Mana Energy", current: 0, max: 50, isDaily: false }
                        ]
                    },
                    { name: "Eternia Mind Token", current: 0, max: 100, isDaily: true }
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
                    { name: "Void Skulls", current: 0, max: 25000, isDaily: false }
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
                    { name: "Ultra Engineer Insignia", current: 0, max: 12, isDaily: true }
                ]
            }
        ]
    }
};
