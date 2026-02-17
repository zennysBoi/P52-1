addLayer("Seconds", {
    name: "Seconds", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#a86fdd",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Seconds Wasted", // Name of prestige currency
    baseResource: "seconds passed", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "I'm Bored",
            description: "Take up card shuffling, inadvertantly Wasting an additional Second every Second.",
            cost: new Decimal(10),
        },
        12: {
            title: "Jerry",
            description: "Your friend Jerry inquires as to what you're doing. You convinced him to join you in your pursuits, doubling Seconds Wasted.",
            cost: new Decimal(12),
        },
        21: {
            title: "Hyperbolic Resecondizer",
            description: "You realize the more seconds you've wasted, the faster new seconds pass. Time passes faster based on current number of Seconds Wasted.",
            cost: new Decimal(240),
            effect() {
                    return player[this.layer].points.add(1).pow(0.35)
                },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
        },
        layerShown(){return true}

    })