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
    },
    voidhighlordclass: {
        title: "Void Highlord (Class)",
        wiki: "http://aqwwiki.wikidot.com/void-highlord-class",
        steps: [
            {
                title: "Passo 1: Void Highlord (Class)",
                description: "Materiais necessários para fundir Void Highlord (Class).",
                requirements: []
            }
        ]
    },
    voidhighlordsquest: {
        title: "Void HighLord's Quest",
        wiki: "http://aqwwiki.wikidot.com/void-highlord-s-quest",
        steps: [
            {
                title: "Passo 1: Void HighLord's Quest",
                description: "Materiais necessários para fundir Void HighLord's Quest.",
                requirements: [
                    { name: "Unidentified 10: \"Bag of Dirt\"", current: 0, max: 20, isDaily: false }
                ]
            }
        ]
    },
    nulgathinsignia: {
        title: "Nulgath Insignia",
        wiki: "http://aqwwiki.wikidot.com/nulgath-insignia",
        steps: [
            {
                title: "Passo 1: Nulgath Insignia",
                description: "Materiais necessários para fundir Nulgath Insignia.",
                requirements: []
            }
        ]
    },
    voidcrystala: {
        title: "Void Crystal A",
        wiki: "http://aqwwiki.wikidot.com/void-crystal-a",
        steps: [
            {
                title: "Passo 1: Void Crystal A",
                description: "Materiais necessários para fundir Void Crystal A.",
                requirements: [
                    { name: "Merge the following:Unidentified 10 (Item): \"Bag of Dirt\"", current: 0, max: 200, isDaily: false },
                    { name: "Unidentified 10 (Item): \"Bag of Dirt\"", current: 0, max: 200, isDaily: false }
                ]
            }
        ]
    },
    voidcrystalb: {
        title: "Void Crystal B",
        wiki: "http://aqwwiki.wikidot.com/void-crystal-b",
        steps: [
            {
                title: "Passo 1: Void Crystal B",
                description: "Materiais necessários para fundir Void Crystal B.",
                requirements: []
            }
        ]
    },
    roentgeniumofnulgath: {
        title: "Roentgenium of Nulgath",
        wiki: "http://aqwwiki.wikidot.com/roentgenium-of-nulgath",
        steps: [
            {
                title: "Passo 1: Roentgenium of Nulgath",
                description: "Materiais necessários para fundir Roentgenium of Nulgath.",
                requirements: []
            }
        ]
    },
    nulgathsquests: {
        title: "Nulgath's Quests",
        wiki: "http://aqwwiki.wikidot.com/nulgath-s-quests#UltraEmpowered",
        steps: [
            {
                title: "Passo 1: Nulgath's Quests",
                description: "Materiais necessários para fundir Nulgath's Quests.",
                requirements: [
                    { name: "Unidentified 10: \"Bag of Dirt\"", current: 0, max: 1, isDaily: false },
                    { name: "Charged Mana Energy for Nulgath", current: 0, max: 5, isDaily: false },
                    { name: "Ice Cubes", current: 0, max: 1, isDaily: false },
                    { name: "Tibicenas' Chain", current: 0, max: 1, isDaily: false },
                    { name: "Undead Bruiser Rune", current: 0, max: 1, isDaily: false },
                    { name: "Legion Fenrir Rune", current: 0, max: 1, isDaily: false },
                    { name: "Undead Legend Rune", current: 0, max: 1, isDaily: false },
                    { name: "Dark Makai Rune", current: 0, max: 1, isDaily: false },
                    { name: "DoomKitten Claw", current: 0, max: 3, isDaily: false },
                    { name: "Legion Fenrir Fang", current: 0, max: 10, isDaily: false },
                    { name: "Chaos Lycan Tongue", current: 0, max: 8, isDaily: false },
                    { name: "Weaver Queen's Hound Collar", current: 0, max: 10, isDaily: false },
                    { name: "Blade Master Rune", current: 0, max: 1, isDaily: false },
                    { name: "Skull Warrior Rune", current: 0, max: 1, isDaily: false },
                    { name: "Undead Bruiser Sigil", current: 0, max: 1, isDaily: false },
                    { name: "Unidentified 21 (Axe): \"Dragonbone Axe\"", current: 0, max: 1, isDaily: false },
                    { name: "Tainted Rune of Evil", current: 0, max: 1, isDaily: false },
                    { name: "Wilhelm VorKrieg defeated", current: 0, max: 1, isDaily: false },
                    { name: "Dage defeated", current: 0, max: 1, isDaily: false },
                    { name: "Artix Found", current: 0, max: 1, isDaily: false },
                    { name: "Fluffy Clouds", current: 0, max: 10, isDaily: false },
                    { name: "Silky Makai Hair", current: 0, max: 10, isDaily: false },
                    { name: "Pink Rat Squeakers", current: 0, max: 10, isDaily: false },
                    { name: "Pony Beleen Placed", current: 0, max: 1, isDaily: false },
                    { name: "Chaos Queen Beleen Defeated", current: 0, max: 1, isDaily: false },
                    { name: "Legionnaire Defeated", current: 0, max: 10, isDaily: false },
                    { name: "Nulgath the Archfiend Defeated?", current: 0, max: 1, isDaily: false },
                    { name: "Dark Cloth Scrap", current: 0, max: 6, isDaily: false },
                    { name: "Handprints Investigated", current: 0, max: 1, isDaily: false },
                    { name: "Pulsating Shadows", current: 0, max: 6, isDaily: false },
                    { name: "Congealed Darkness", current: 0, max: 8, isDaily: false },
                    { name: "Beast Eyes", current: 0, max: 6, isDaily: false },
                    { name: "Troll Tusks", current: 0, max: 6, isDaily: false },
                    { name: "Oblivion Defeated", current: 0, max: 1, isDaily: false },
                    { name: "Oblivion's Gem", current: 0, max: 1, isDaily: false },
                    { name: "Dark Remnants", current: 0, max: 7, isDaily: false },
                    { name: "Paladin Armament", current: 0, max: 7, isDaily: false },
                    { name: "Paladin's Keepsake", current: 0, max: 8, isDaily: false },
                    { name: "Infested Troll Hide", current: 0, max: 7, isDaily: false },
                    { name: "Statue Inspected", current: 0, max: 2, isDaily: false },
                    { name: "Window Inspected", current: 0, max: 2, isDaily: false },
                    { name: "Beasts Freed", current: 0, max: 6, isDaily: false },
                    { name: "Torches Examined", current: 0, max: 4, isDaily: false },
                    { name: "Fractured Light Shard", current: 0, max: 4, isDaily: false },
                    { name: "Nation Eliminated", current: 0, max: 4, isDaily: false },
                    { name: "Pedestal Moved", current: 0, max: 1, isDaily: false },
                    { name: "Nation Remains", current: 0, max: 6, isDaily: false },
                    { name: "Elemental Rune", current: 0, max: 10, isDaily: false },
                    { name: "Shelves Examined", current: 0, max: 3, isDaily: false },
                    { name: "Read Travel Log", current: 0, max: 1, isDaily: false },
                    { name: "Elemental Vanquished", current: 0, max: 6, isDaily: false },
                    { name: "Talk to Astero", current: 0, max: 1, isDaily: false },
                    { name: "Pedestal Examined", current: 0, max: 1, isDaily: false },
                    { name: "Frenzied Essence", current: 0, max: 6, isDaily: false },
                    { name: "Nation Essence", current: 0, max: 6, isDaily: false },
                    { name: "Doom Fiend Dewormed", current: 0, max: 1, isDaily: false },
                    { name: "Elemental Study", current: 0, max: 6, isDaily: false },
                    { name: "Infestation Study", current: 0, max: 6, isDaily: false },
                    { name: "Fiend Worm", current: 0, max: 1, isDaily: false },
                    { name: "Outrider's Skull", current: 0, max: 20, isDaily: false },
                    { name: "Scarvitas' Skull", current: 0, max: 1, isDaily: false },
                    { name: "Shadowblade Destroyed", current: 0, max: 20, isDaily: false },
                    { name: "Portion of your soul", current: 0, max: 1, isDaily: false },
                    { name: "Unidentified (Dagger): \"Spinal Tap\"", current: 0, max: 1, isDaily: false }
                ]
            }
        ]
    },
    nulgathsmergeshop: {
        title: "Nulgath's Merge Shop",
        wiki: "http://aqwwiki.wikidot.com/nulgath-s-merge-shop",
        steps: [
            {
                title: "Passo 1: Nulgath's Merge Shop",
                description: "Materiais necessários para fundir Nulgath's Merge Shop.",
                requirements: []
            }
        ]
    },
    eldersblood: {
        title: "Elders' Blood",
        wiki: "http://aqwwiki.wikidot.com/elders-blood",
        steps: [
            {
                title: "Passo 1: Elders' Blood",
                description: "Materiais necessários para fundir Elders' Blood.",
                requirements: []
            }
        ]
    },
    reensquests: {
        title: "Reens' Quests",
        wiki: "http://aqwwiki.wikidot.com/reens-quests#Daily",
        steps: [
            {
                title: "Passo 1: Reens' Quests",
                description: "Materiais necessários para fundir Reens' Quests.",
                requirements: [
                    { name: "Batch of Mustard Seeds", current: 0, max: 3, isDaily: false },
                    { name: "Pretzel Root", current: 0, max: 4, isDaily: false },
                    { name: "Bundle of Thyme", current: 0, max: 10, isDaily: false },
                    { name: "Slain Gorillaphant", current: 0, max: 50, isDaily: false },
                    { name: "DOOM Dirt", current: 0, max: 12, isDaily: false },
                    { name: "Snapdrake", current: 0, max: 17, isDaily: false },
                    { name: "Blood Lily", current: 0, max: 30, isDaily: false },
                    { name: "Jagged Cherries", current: 0, max: 20, isDaily: false },
                    { name: "Shard Cabbage", current: 0, max: 10, isDaily: false },
                    { name: "Joyshard", current: 0, max: 15, isDaily: false },
                    { name: "Sourpalm", current: 0, max: 1, isDaily: false },
                    { name: "Hot Pepper", current: 0, max: 4, isDaily: false },
                    { name: "Chimilk Cheese", current: 0, max: 4, isDaily: false },
                    { name: "Bunch of Sage", current: 0, max: 10, isDaily: false },
                    { name: "Talk to Bulbug", current: 0, max: 1, isDaily: false }
                ]
            }
        ]
    },
    tendurrrtheassistantsquests: {
        title: "Tendurrr The Assistant's Quests",
        wiki: "http://aqwwiki.wikidot.com/tendurrr-the-assistant-s-quests",
        steps: [
            {
                title: "Passo 1: Tendurrr The Assistant's Quests",
                description: "Materiais necessários para fundir Tendurrr The Assistant's Quests.",
                requirements: [
                    { name: "Unidentified 10: \"Bag of Dirt\"", current: 0, max: 5, isDaily: false }
                ]
            }
        ]
    },
    bloodgemofthearchfiend: {
        title: "Blood Gem of the Archfiend",
        wiki: "http://aqwwiki.wikidot.com/blood-gem-of-the-archfiend",
        steps: [
            {
                title: "Passo 1: Blood Gem of the Archfiend",
                description: "Materiais necessários para fundir Blood Gem of the Archfiend.",
                requirements: [
                    { name: "Merge the following to make 2 Blood Gems:Unidentified 10: \"Bag of Dirt\"", current: 0, max: 50, isDaily: false },
                    { name: "Unidentified 10: \"Bag of Dirt\"", current: 0, max: 50, isDaily: false }
                ]
            }
        ]
    }
};
