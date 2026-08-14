export const PRESETS = {
    vhl: {
        title: "Void Highlord (VHL)",
        wiki: "http://aqwwiki.wikidot.com/void-highlord-class",
        steps: [
            {
                title: "Passo 1: Void Crystal A",
                description: "Materiais necessários para fundir o Void Crystal A no merge de Tercessuinotlim.",
                requirements: [
                    { name: "Unidentified 10", current: 0, max: 200, isDaily: false },
                    { name: "Gem of Nulgath", current: 0, max: 150, isDaily: false },
                    { name: "Dark Crystal Shard", current: 0, max: 200, isDaily: false },
                    { name: "Tainted Gem", current: 0, max: 200, isDaily: false }
                ]
            },
            {
                title: "Passo 2: Void Crystal B",
                description: "Materiais necessários para fundir o Void Crystal B no merge de Tercessuinotlim.",
                requirements: [
                    { name: "Diamond of Nulgath", current: 0, max: 200, isDaily: false },
                    { name: "Blood Gem of the Archfiend", current: 0, max: 30, isDaily: false },
                    { name: "Totem of Nulgath", current: 0, max: 15, isDaily: false },
                    { name: "Elders' Blood", current: 0, max: 2, isDaily: true }
                ]
            },
            {
                title: "Passo 3: Roentgenium of Nulgath (15 Diárias)",
                description: "Missão diária 'Void HighLord's Challenge' (Exige 15 turn-ins diários)",
                requirements: [
                    { 
                        name: "Roentgenium of Nulgath", 
                        current: 0, 
                        max: 15, 
                        isDaily: true,
                        subRequirements: [
                            { name: "Black Knight Orb", current: 0, max: 1, isDaily: false },
                            { name: "Nulgath Shaped Chocolate", current: 0, max: 1, isDaily: false },
                            { name: "Elders' Blood", current: 0, max: 1, isDaily: true },
                            { name: "Aelita's Emerald", current: 0, max: 1, isDaily: false },
                            { name: "Unidentified 13", current: 0, max: 1, isDaily: true },
                            { name: "Gem of Nulgath", current: 0, max: 20, isDaily: false },
                            { name: "Emblem of Nulgath", current: 0, max: 20, isDaily: false },
                            { name: "Essence of Nulgath", current: 0, max: 50, isDaily: false },
                            { name: "Tainted Gem", current: 0, max: 100, isDaily: false },
                            { name: "Nulgath's Approval", current: 0, max: 300, isDaily: false },
                            { name: "Archfiend's Favor", current: 0, max: 300, isDaily: false }
                        ]
                    }
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
                    { name: "Eternia Mind Token", current: 0, max: 100, isDaily: true },
                    { 
                        name: "Spark of Life", 
                        current: 0, 
                        max: 75, 
                        isDaily: false,
                        subRequirements: [
                            { name: "Life Essence", current: 0, max: 150, isDaily: false }
                        ]
                    }
                ]
            },
            {
                title: "Passo 2: Materiais Avançados",
                requirements: [
                    { name: "Resonance", current: 0, max: 300, isDaily: false },
                    { name: "Life Energy", current: 0, max: 150, isDaily: false },
                    { name: "Transcendence", current: 0, max: 100, isDaily: false }
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
                    { 
                        name: "Void Skulls", 
                        current: 0, 
                        max: 25000, 
                        isDaily: false,
                        subRequirements: [
                            { name: "Corrupted Skull", current: 0, max: 800, isDaily: false }
                        ]
                    },
                    { name: "Doom Aura", current: 0, max: 100, isDaily: false }
                ]
            },
            {
                title: "Passo 2: Minérios e Auras de Doom",
                requirements: [
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
                title: "Passo 1: Insígnias Ultra Bosses",
                requirements: [
                    { name: "Ultra Engineer Insignia", current: 0, max: 12, isDaily: true },
                    { name: "Ultra Warden Insignia", current: 0, max: 12, isDaily: true },
                    { name: "Ultra Tyndarius Insignia", current: 0, max: 12, isDaily: true }
                ]
            },
            {
                title: "Passo 2: Crafting Final",
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
                title: "Passo Único: Missões Diárias",
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
                title: "Passo 1: Insígnias e Materiais",
                requirements: [
                    { name: "Ultra Tyndarius Insignia", current: 0, max: 10, isDaily: true },
                    { name: "Ultra Dage Insignia", current: 0, max: 10, isDaily: true },
                    { name: "Ultra Nulgath Insignia", current: 0, max: 10, isDaily: true }
                ]
            }
        ]
    }
};
