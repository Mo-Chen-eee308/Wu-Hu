let modInfo = {
	name: "Tree",
	id: "nmsl",
	author: "陌尘",
	pointsName: "点数",
	discordName: "",
	discordLink: "",
	initialStartPoints: new ExpantaNum (0), // Used for hard resets and new players
	
	offlineLimit: 10,  // In hours
}

// Set your version in num and name
let VERSION = {
	num:  "0.0.1",
	name: "",
}

let changelog = `<h1>更新日志:</h1><br>
	<h3>v0.0</h3><br>
		
		
		
		`

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
	
	if(hasUpgrade("q",11)) eff = eff.mul( player.q.points.pow(0.15) )
	if(hasAchievement("T",14)) eff = eff.mul(1.5)
	if(hasAchievement("T",24)) eff = eff.mul(1.5)
	if(hasAchievement("T",34)) eff = eff.mul(1.25)
	
	var p = player.q.points.floor()
		if(p.div(3).floor().eq(p.div(3))) eff = eff.pow(1.1)
		if(!p.div(3).floor().eq(p.div(3))) eff = eff.pow(1)
	if(hasUpgrade("q",14)) eff = eff.pow(1.05)
	
if(player.q.y.gt(0)&&player.q.z.eq(0)) eff = eff.mul(player.q.y.pow(0.01).max(1))
if(player.q.y.gt(0)&&player.q.z.neq(0)) eff = eff.mul(player.q.y.pow(0.01).mul(player.q.z.pow(0.075)))
			
	eff = eff.max(1)
	return eff
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function(){return"当前版本endgame 为/约 1 中微子"},
	function(){return"作者陌尘 QQ3168704134 9.1已开学"},
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