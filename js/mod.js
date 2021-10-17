let modInfo = {
	name: "The Points Tree",
	id: "The Points Tree",
	author: "陌尘",
	pointsName: "点数",
	discordName: "",
	discordLink: "",
	initialStartPoints: new ExpantaNum (0), // Used for hard resets and new players
	
	offlineLimit: 10,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.1",
	name: "",
}

let changelog = `<h1更新日志:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new ExpantaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
		return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()) return new ExpantaNum(0)
	
	let eff = new ExpantaNum(1)
		if(hasUpgrade("s",11)) eff = eff.mul(player.s.points.pow(0.5).max(1))
	var spsec = player.points.pow(0.25).sub(1.5)
	if(hasUpgrade("s",12)) spsec = spsec.mul(player.points.pow(0.125).max(1))
	if(hasUpgrade("s",21)) eff = eff.pow(0.5)
	if(hasUpgrade("s",21)) spsec = spsec.pow(1.2)
		
		if(hasUpgrade("s",13)) eff = eff.mul(spsec.max(0))
			
	if(player.s.scl11.gt(0)) eff = eff.mul(new ExpantaNum(1.55).pow(player.s.scl11))
	if(player.s.scl12.gt(0)) eff = eff.mul(new ExpantaNum(1).add(player.s.scl12.mul(0.02)).max(1))
	eff = eff.mul(player.o.points.add(1).pow(2.5).max(1))


softcap(eff,new ExpantaNum(1e308),0.001)
	return eff
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}