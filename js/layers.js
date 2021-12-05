addLayer("T", {
    name: "Time",
    symbol: "<h6>Time", 
    position: 0, 
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
		jieduan: new ExpantaNum(0),
    }},
    color: "lime",
	requires: new ExpantaNum(5),
    resource: "时间",
	baseResource: "点数",
	baseAmount() {return player.points}, 
    type: "none", 
	exponent: 1,
    gainMult() { 
        mult = new ExpantaNum(1)
			
        return mult
    },
    gainExp() {
		var exp = new ExpantaNum(1)
			
        return exp
    },
	passiveGeneration(){
		var a = new ExpantaNum(0)
		//return a   
         },
    row: "side", 
doReset(resettingLayer) {
        let keep = [];
				//if (hasMilestone("P4",1)) keep.push("buyables","milestones","upgrades");
        if (layers[resettingLayer].row > this.row) {
            layerDataReset(this.layer,keep)	
		}
	},
update(diff) {
	player.T.points = player.T.points.add(new ExpantaNum(1).mul(diff)).max(0)
/////////////////////////////////////////////////////////////////
	var pointscap = new ExpantaNum(10)
	if(hasUpgrade("q",41)) pointscap = pointscap.add(5)
	if(hasUpgrade("q",13)) pointscap = pointscap.mul( player.q.points.pow(0.1) )
		
if(hasUpgrade("q",21)){
var p = player.q.points.floor()
	if(!hasUpgrade("q",32)){
			if(p.div(2).floor().eq(p.div(2)) && !hasAchievement("T",15)) var pointscap = pointscap.add(20)
			if(p.div(2).floor().eq(p.div(2)) && hasAchievement("T",15)) var pointscap = pointscap.add(20)
			if(!p.div(2).floor().eq(p.div(2)) && !hasAchievement("T",15)) var pointscap = pointscap.add(0)
			if(!p.div(2).floor().eq(p.div(2)) && hasAchievement("T",15) && !hasUpgrade("q",25)) var pointscap = pointscap.add(5)
		if(hasUpgrade("q",25) && !p.div(2).floor().eq(p.div(2)) ) pointscap = pointscap.add( new ExpantaNum(20) )
						}
	if(hasUpgrade("q",32)){
			if(p.div(2).floor().eq(p.div(2)) && !hasAchievement("T",15)) var pointscap = pointscap.add(new ExpantaNum(20).pow(1.1))
			if(p.div(2).floor().eq(p.div(2)) && hasAchievement("T",15)) var pointscap = pointscap.add(new ExpantaNum(20).pow(1.1))
			if(!p.div(2).floor().eq(p.div(2)) && !hasAchievement("T",15)) var pointscap = pointscap.add(new ExpantaNum(0).pow(1.1))
			if(!p.div(2).floor().eq(p.div(2)) && hasAchievement("T",15) && !hasUpgrade("q",25)) var pointscap = pointscap.add(new ExpantaNum(5).pow(1.1))
		if(hasUpgrade("q",25) && !p.div(2).floor().eq(p.div(2)) ) pointscap = pointscap.add( new ExpantaNum(20).pow(1.1) )
						}
}
if(hasUpgrade("q",22)){
var p = player.q.points.floor()
	if(!hasUpgrade("q",32)){
		if(p.div(3).floor().eq(p.div(3))) var pointscap = pointscap.add(30)
		if(!p.div(3).floor().eq(p.div(3))) var pointscap = pointscap.add(0)
	if(hasUpgrade("q",25) &&!p.div(3).floor().eq(p.div(3)) ) pointscap = pointscap.add( new ExpantaNum(30) )
	}
	if(hasUpgrade("q",32)){
		if(p.div(3).floor().eq(p.div(3))) var pointscap = pointscap.add(new ExpantaNum(30).pow(1.1))
		if(!p.div(3).floor().eq(p.div(3))) var pointscap = pointscap.add(new ExpantaNum(0).pow(1.1))
	if(hasUpgrade("q",25) &&!p.div(3).floor().eq(p.div(3)) ) pointscap = pointscap.add( new ExpantaNum(30).pow(1.1) )
	}
}
	if(hasUpgrade("q",31)) {
		if(hasUpgrade("q",33)) pointscap = pointscap.max( new ExpantaNum(50).pow(1.075) )
		if(!hasUpgrade("q",33))pointscap = pointscap.max(50)
	}
if(player.q.x.gt(0)&&player.q.z.eq(0)) pointscap = pointscap.add(player.q.x.pow(0.25).max(1))
if(player.q.x.gt(0)&&player.q.z.neq(0)) pointscap = pointscap.add(player.q.x.pow(0.25).mul(player.q.z.pow(0.3).max(1)))
if(hasUpgrade("q",42)) pointscap = pointscap.sub(5)
	pointscap = pointscap.max(10)
	player.points = player.points.min( pointscap )
	
////////////////////////////////////////////////////////////////////
	
   },
   
achievements: {
        11: {
            name: "<h3>突破!",
            done() {return player.points.gt(10)},
            tooltip: "突破10点数硬上限",
            unlocked() { return true },
			},
		12: {
            name: "<h3>夸克堆叠Ⅰ",
            done() {return player.q.points.gt(100)},
            tooltip: "夸克数量超过100<br>奖励:开启夸克另外三个升级",
            unlocked() { return true },
			},
		13: {
            name: "<h3>全升级...吗",
            done() {return hasUpgrade("q",11)&&hasUpgrade("q",12)&&hasUpgrade("q",13)&&hasUpgrade("q",21)&&hasUpgrade("q",22)&&hasUpgrade("q",23)},
            tooltip: "购买夸克的前6个升级",
            unlocked() { return true },
			},
		14: {
            name: "<h3>夸克堆叠Ⅱ",
            done() {return player.q.points.gt(500)},
            tooltip: "夸克数量超过500<br>奖励:点数获取增加50%",
            unlocked() { return true },
			},
		15: {
            name: "<h3>人干的事Ⅰ",
            done() {return player.points.gt(75)},
            tooltip: "点数大于75<br>奖励：夸克升级21效果不低于5",
            unlocked() { return true },
			},
		21: {
            name: "<h3>怪怪的...",
            done() {return player.points.gt(85)},
            tooltip: "点数超过85点",
            unlocked() { return hasAchievement("T",15) },
			},
		22: {
            name: "<h3>升级堆叠Ⅰ",
            done() {return hasUpgrade("q",31)&&hasUpgrade("q",32)&&hasUpgrade("q",33)},
            tooltip: "购买增强Ⅰ绝绝子Ⅰ芜湖Ⅰ<br>奖励：夸克获取变为1.5倍",
            unlocked() { return hasAchievement("T",15) },
			},
		23: {
            name: "<h3>夸克堆叠Ⅲ",
            done() {return player.q.points.gte(2500)},
            tooltip: "夸克数量超过2500<br>奖励:开启第四排夸克升级",
            unlocked() { return hasAchievement("T",15) },
			},
		24: {
            name: "<h3>人干的事Ⅱ",
            done() {return player.points.gt(100)},
            tooltip: "点数超过100点<br>奖励:点数获取增加50%",
            unlocked() { return hasAchievement("T",15) },
			},
		25: {
            name: "<h3>升级堆叠Ⅱ",
            done() {return hasUpgrade("q",41)&&hasUpgrade("q",42)&&hasUpgrade("q",43)},
            tooltip: "获得能量守恒定律三件套升级",
            unlocked() { return hasAchievement("T",15) },
			},
		31: {
            name: "<h3>夸克堆叠Ⅳ",
            done() {return player.q.points.gt(10000)},
            tooltip: "夸克数量超过10000<br>奖励:开启第四列夸克升级",
            unlocked() { return hasAchievement("T",25) },
			},
		32: {
            name: "<h3>升级堆叠Ⅲ",
            done() {return hasUpgrade("q",14)&&hasUpgrade("q",24)&&hasUpgrade("q",34)&&hasUpgrade("q",44)},
            tooltip: "获得直角坐标系一套升级<br>奖励:开启第五列夸克升级",
            unlocked() { return hasAchievement("T",25) },
			},
		33: {
            name: "<h3>无限拓展",
            done() {return player.q.x.eq(1000)&&player.q.y.eq(1000)&&player.q.z.eq(1000)},
            tooltip: "xyz点都到达上限",
            unlocked() { return hasAchievement("T",25) },
			},
		34: {
            name: "<h3>人干的事Ⅲ",
            done() {return player.points.gt(150)},
            tooltip: "点数超过150点<br>奖励:点数获取增加25%",
            unlocked() { return hasAchievement("T",25) },
			},
		35: {
            name: "<h3>升级堆叠Ⅳ",
            done() {return hasUpgrade("q",15)&&hasUpgrade("q",25)&&hasUpgrade("q",35)&&hasUpgrade("q",45)},
            tooltip: "获得夸克节点全部升级(目前",
            unlocked() { return hasAchievement("T",25) },
			},
		41: {
            name: "<h3>微子?",
            done() {return player.n.points.gte(2)},
            tooltip: "拥有一个以上中微子<br>奖励：你的中微子增强你的夸克上限",
            unlocked() { return hasAchievement("T",35) },
			},
		42: {
            name: "<h3>河里?",
            done() {return player.n.points.gte(4)},
            tooltip: "拥有四点以上中微子<br>奖励：不管何时点数硬上限不低于200",
            unlocked() { return hasAchievement("T",35) },
			},
},

tabFormat: [
			"main-display",//你有xxx该重置点
            "prestige-button",//获取重置点按钮
			//"resource-display",//你有xxx什么
			"milestones",//里程碑
			"blank","blank","blank",
			"achievements",
			"blank",//空
			"challenges",//挑战
			"buyables",//重复购买项
			//"clickables",//按钮
			"blank",
			"blank",
			"upgrades",//升级
			],
			
			
})

addLayer("q", {
    name: "Quark",
    symbol: "Q", 
    position: 0, 
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
		x: new ExpantaNum(0),
		y: new ExpantaNum(0),
		z: new ExpantaNum(0),
    }},
    color: "#FFFF93",
	requires: new ExpantaNum(5),
    resource: "夸克",
	baseResource: "点数",
	baseAmount() {return player.points}, 
    type: "normal", 
	exponent: 1,
    gainMult() { 
        mult = new ExpantaNum(1)
			if(hasUpgrade("q",12)&&!hasUpgrade("q",43)) mult = mult.mul( player.q.points.pow(0.2) )
			if(hasUpgrade("q",12)&& hasUpgrade("q",43)) mult = mult.mul( player.q.points.pow(0.2).mul(2.5) )
			if(hasAchievement("T",22)) mult = mult.mul(1.5)
			if(hasUpgrade("q",15)) mult = mult.mul(1.25)
			if(hasUpgrade("q",35)) mult = mult.mul(1.15)
				mult = mult.max(1)
        return mult
    },
    gainExp() {
		var exp = new ExpantaNum(1)
			if(hasUpgrade("q",42)) exp = exp.add(0.05)
			if(hasUpgrade("q",45)) exp = exp.pow(1.25)
		exp = exp.max(1)
        return exp
    },
	passiveGeneration(){
		var a = new ExpantaNum(0)
		return a   
         },
    row: 1, 
doReset(resettingLayer) {
        let keep = [];
				//if (hasMilestone("P4",1)) keep.push("buyables","milestones","upgrades");
        if (layers[resettingLayer].row > this.row) {
            layerDataReset(this.layer,keep)	
		}
	},
update(diff) {
	if(hasUpgrade("q",24)) player.q.x = player.q.x.add( new ExpantaNum(2).mul(diff) )
	if(hasUpgrade("q",34)) player.q.y = player.q.y.add( new ExpantaNum(1).mul(diff) )
	if(hasUpgrade("q",44)) player.q.z = player.q.z.add( new ExpantaNum(0.5).mul(diff) )

player.q.x = player.q.x.min(1000)
player.q.y = player.q.y.min(1000)
player.q.z = player.q.z.min(1000)

   },
	//layerShown(){return player.points.gte(1)|| player.P1.points > 0},
	
	upgrades: {
			11: {
				title:"夸克速率",
				description:"夸克增强点数获取",
				unlocked() { return player[this.layer].unlocked || player.T.jieduan.gte(1) },
				cost:new ExpantaNum(4),
				effect() {
					let eff = player.q.points
						eff = eff.pow(0.15)
						eff = eff.max(1)
					return eff
				},
				effectDisplay() { return format(this.effect())+"x" },
				},
			12: {
				title:"夸克配对",
				description:"夸克增强夸克获取",
				unlocked() { return (hasUpgrade(this.layer,11)) || player.T.jieduan.gte(1)},
				cost:new ExpantaNum(8),
				effect() {
					let eff = player.q.points
						eff = eff.pow(0.2)
					if(hasUpgrade("q",43)) eff = eff.mul(2.5)
						eff = eff.max(1)
					return eff
				},
				effectDisplay() { return format(this.effect())+"x" },
				},
			13: {
				title:"夸克增强",
				description:"夸克加大<br>点数硬上限",
				unlocked() { return (hasUpgrade(this.layer,12)) || player.T.jieduan.gte(1)},
				cost:new ExpantaNum(30),
				effect() {
					let eff = player.q.points
						eff = eff.pow(0.1)
						eff = eff.max(1)
					return eff
				},
				effectDisplay() { return format(this.effect())+"x" },
				},
			21: {
				title:"夸克连锁",
				description:"如果你的夸克的整数部分能被2整除,点数硬上限增加20",
				unlocked() { return (hasAchievement("T",12)) || player.T.jieduan.gte(1)},
				cost:new ExpantaNum(120),
				effect() {
					var p = player.q.points.floor()
						if(!hasUpgrade("q",32)){
							if(p.div(2).floor().eq(p.div(2)) && !hasAchievement("T",15)) var eff = new ExpantaNum(20)
							if(p.div(2).floor().eq(p.div(2)) && hasAchievement("T",15)) var eff = new ExpantaNum(20)
							if(!p.div(2).floor().eq(p.div(2)) && !hasAchievement("T",15)) var eff = new ExpantaNum(0)
							if(!p.div(2).floor().eq(p.div(2)) && hasAchievement("T",15)) var eff = new ExpantaNum(5)
							if(hasUpgrade("q",25)) eff = new ExpantaNum(20)
						}
						if(hasUpgrade("q",32)){
							if(p.div(2).floor().eq(p.div(2)) && !hasAchievement("T",15)) var eff = new ExpantaNum(20).pow(1.1)
							if(p.div(2).floor().eq(p.div(2)) && hasAchievement("T",15)) var eff = new ExpantaNum(20).pow(1.1)
							if(!p.div(2).floor().eq(p.div(2)) && !hasAchievement("T",15)) var eff = new ExpantaNum(0).pow(1.1)
							if(!p.div(2).floor().eq(p.div(2)) && hasAchievement("T",15)) var eff = new ExpantaNum(5).pow(1.1)
							if(hasUpgrade("q",25)) eff = new ExpantaNum(20).pow(1.1)
						}
					return eff
				},
				effectDisplay() { return "+" + format(this.effect()) + "最后计算"},
				},
			22: {
				title:"夸克分离",
				description:"如果你的夸克的整数部分能被3整除,点数硬上限增加30",
				unlocked() { return (hasAchievement("T",12)) || player.T.jieduan.gte(1)},
				cost:new ExpantaNum(160),
				effect() {
					var p = player.q.points.floor()
						if(!hasUpgrade("q",32)){
							if(p.div(3).floor().eq(p.div(3))) var eff = new ExpantaNum(30)
							if(!p.div(3).floor().eq(p.div(3))) var eff = new ExpantaNum(0)
						if(hasUpgrade("q",25)) eff = new ExpantaNum(30)
						}
						if(hasUpgrade("q",32)){
							if(p.div(3).floor().eq(p.div(3))) var eff = new ExpantaNum(30).pow(1.1)
							if(!p.div(3).floor().eq(p.div(3))) var eff = new ExpantaNum(0).pow(1.1)
						if(hasUpgrade("q",25)) eff = new ExpantaNum(30).pow(1.1)
						}
					return eff
				},
				effectDisplay() { return "+" + format(this.effect()) + "最后计算"},
				},
			23: {
				title:"平行线相交",
				description:"前两个升级同时触发时点数秒产^1.1",
				unlocked() { return (hasAchievement("T",12)) || player.T.jieduan.gte(1)},
				cost:new ExpantaNum(240),
				effect() {
					var p = player.q.points.floor()
						if(p.div(6).floor().eq(p.div(6))) var eff = new ExpantaNum(1.1)
						if(!p.div(6).floor().eq(p.div(6))) var eff = new ExpantaNum(1)
					return eff
				},
				effectDisplay() { return "^" + format(this.effect()) + "<br>最后计算" },
				},
			31: {
				title:"增强Ⅰ",
				description(){
					var distxt = new ExpantaNum(50)
					if(hasUpgrade("q",33)) distxt = distxt.pow(1.075)
					return "你的点数硬上限<br>永远不低于" + format(distxt,2) },
				unlocked() { return (hasUpgrade(this.layer,23)) || player.T.jieduan.gte(1)},
				cost:new ExpantaNum(600),
				},
			32: {
				title:"绝绝子Ⅰ",
				description:"将第二排升级的效果全部^1.1",
				unlocked() { return (hasUpgrade(this.layer,31)) || player.T.jieduan.gte(1)},
				cost:new ExpantaNum(800),
				},
			33: {
				title:"芜湖Ⅰ",
				description:"将 增强Ⅰ 的效果^1.075",
				unlocked() { return (hasUpgrade(this.layer,32)) || player.T.jieduan.gte(1)},
				cost:new ExpantaNum(1000),
				},
			41: {
				title:"凭空产生",
				description:"点数硬上限增加5<br>最先计算(能被夸克升级13影响)",
				unlocked() { return (hasAchievement("T",23)) || player.T.jieduan.gte(1)},
				cost:new ExpantaNum(1500),
				},
			42: {
				title:"凭空消失",
				description:"点数硬上限减少5<br>最后计算<br>夸克获取^1.05",
				unlocked() { return (hasAchievement("T",23)) || player.T.jieduan.gte(1)},
				cost:new ExpantaNum(2500),
				},
			43: {
				title:"能量守恒",
				description:"这真的守恒...吗?<br>增强“夸克配对”的效果",
				unlocked() { return (hasAchievement("T",23)) || player.T.jieduan.gte(1)},
				cost:new ExpantaNum(5000),
				},
			14: {
				title:"体系?",
				description:"建立直角坐标系<br>点数生产^1.05",
				unlocked() { return (hasAchievement("T",31)) || player.T.jieduan.gte(1)},
				cost:new ExpantaNum(5000),
				},
			24: {
				title:"建立x轴",
				description(){return "成正比(?生产x点增加你的硬上限<br>x点:" + format(player.q.x)},
				unlocked() { return (hasAchievement("T",31)) || player.T.jieduan.gte(1)},
				cost:new ExpantaNum(7500),
				},
			34: {
				title:"建立y轴",
				description(){return "成反比(?产生y点增加你的点数生产<br>y点:" + format(player.q.y)},
				unlocked() { return (hasAchievement("T",31)) || player.T.jieduan.gte(1)},
				cost:new ExpantaNum(7500),
				},
			44: {
				title:"建立...z轴?",
				description(){return "双曲线(?产生z点增强x点y点效果<br>z点:" + format(player.q.z)},
				unlocked() { return (hasAchievement("T",31)) || player.T.jieduan.gte(1)},
				cost:new ExpantaNum(7500),
				},
			15: {
				title:"受热膨胀",
				description:"夸克获取增加25%",
				unlocked() { return (hasAchievement("T",32)) || player.T.jieduan.gte(1)},
				cost(){return new ExpantaNum(10000)},
				},
			25: {
				title:"恒定不变",
				description:"‘夸克连锁’和‘夸克分离’效果一直拥有(‘平行线相交’不一定)",
				unlocked() { return (hasAchievement("T",32)) || player.T.jieduan.gte(1)},
				cost(){return new ExpantaNum(20000)},
				},
			35: {
				title:"遇冷收缩",
				description:"夸克获取增加15%",
				unlocked() { return (hasAchievement("T",32)) || player.T.jieduan.gte(1)},
				cost(){return new ExpantaNum(30000)},
				},
			45: {
				title:"理想情况",
				description:"夸克获取^1.25<br>解锁新的节点",
				unlocked() { return (hasAchievement("T",32)) || player.T.jieduan.gte(1)},
				canAfford() {return player.q.points.gte( this.cost() )},
				pay(){
					player.q.points = player.q.points.sub( this.cost() )
					if(player.T.jieduan.eq(0))player.T.jieduan = player.T.jieduan.add(1)
				},
				cost(){return new ExpantaNum(40000)},
				},
	},

tabFormat: [
			"main-display",//你有xxx该重置点
            "prestige-button",//获取重置点按钮
			"resource-display",//你有xxx什么
			"milestones",//里程碑
			"challenges",//挑战
			"buyables",//重复购买项
			//"clickables",//按钮
			"blank",
			"blank",
			"upgrades",//升级
			],
			
			
})

addLayer("n", {
    name: "Neutrino",
    symbol: "N", 
    position: 0, 
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
    }},
    color: "#a0ffff",
	requires: new ExpantaNum(50000),
	branches: ["q"],
    resource: "中微子",
	baseResource: "夸克",
	baseAmount() {return player.q.points}, 
    type: "normal", 
	exponent: 0.5,
    gainMult() { 
        mult = new ExpantaNum(1)
		
			mult = mult.max(1)
        return mult
    },
    gainExp() {
		var exp = new ExpantaNum(1)
		exp = exp.max(1)
        return exp
    },
	passiveGeneration(){
		var a = new ExpantaNum(0)
		//return a   
         },
    row: 2, 
doReset(resettingLayer) {
        let keep = [];
				//if (hasMilestone("P4",1)) keep.push("buyables","milestones","upgrades");
        if (layers[resettingLayer].row > this.row) {
            layerDataReset(this.layer,keep)	
		}
	},
update(diff) {
	var quarkcap = new ExpantaNum(50000)
	
	
	
	
	
	
	
	player.q.points = player.q.points.min( quarkcap )
   },
layerShown(){return hasUpgrade("q",45)||player.T.jieduan.gte(1)},
	

tabFormat: [
			"main-display",//你有xxx该重置点
			[
			"display-text",function(){
				//return "你拥有 " + player.n.points + " 中微子" + "这使你的点数硬上限增加 " + new ExpantaNum(3).pow(player.n.points) + " 最先计算"
									}
			],"blank",
            "prestige-button",//获取重置点按钮
			//"resource-display",//你有xxx什么
			"milestones",//里程碑
			"blank",//空
			"challenges",//挑战
			"buyables",//重复购买项
			//"clickables",//按钮
			"blank",
			"blank",
			"upgrades",//升级
			],
			
			
})

