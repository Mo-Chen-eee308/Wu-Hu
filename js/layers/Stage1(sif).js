addLayer("s", {		//灵魂
    name: "Soul",
    symbol: "S", 
    position: 0, 
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
		scl11: new ExpantaNum(0),
		scl12: new ExpantaNum(0),
		autocl:false,
		autoup:false,
    }},
    color: "#64A600",
	requires: new ExpantaNum(10),
    resource: "灵魂",
	baseResource: "点数",
	baseAmount() {return player.points}, 
    type: "none",
	exponent: 0.5,
    gainMult() { 
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() {
		var exp = new ExpantaNum(1)
        return exp
    },
	passiveGeneration(){
		//return a   
         },
    row: 1, 
doReset(resettingLayer) {
        let keep = [];
        if (layers[resettingLayer].row > this.row) {
            layerDataReset(this.layer,keep)	
		}
	},
update(delta) {		
		var spsec = player.points.pow(0.25).sub(1.5)
		if(hasUpgrade("s",12)) spsec = spsec.mul(player.points.pow(0.125).max(1))
		if(hasUpgrade("s",21)) spsec = spsec.pow(1.2)
		player.s.points = player.s.points.add(  spsec.max(0).mul(delta)  )
	if(hasMilestone("o",2) && player.o.autocl && this.clickables[11].canClick() ) this.clickables[11].onClick()
	if(hasMilestone("o",2) && player.o.autocl && this.clickables[12].canClick() ) this.clickables[12].onClick()
	if( hasMilestone("o",3) && player.o.autoup ){
				buyUpgrade("s",11),buyUpgrade("s",12),buyUpgrade("s",13),buyUpgrade("s",21),buyUpgrade("s",22),buyUpgrade("s",23)
				}
    },
////////////////////////////////////////////////////////////////////////////////////////////////////
clickables:{
			11:{
				title(){
					return "增量获取<br>数量：" + player.s.scl11 + "/25" + "<br>效果：" + 
					format(new ExpantaNum(1.55).pow(player.s.scl11)) +"×" + "<br>" + "价格：" + 
					format( player.s.scl11.pow(4.5).mul(player.s.scl11) ) + "灵魂<br>" + "增加你的点数获取"
					},
				style() {return {'height':'175px','width':'175px'}},
				canClick(){
					return player.s.points.gte( player.s.scl11.pow(4.5).mul(player.s.scl11) ) && player.s.scl11.lt(25)
					},
				unlocked(){return hasUpgrade("s",22)},
				onClick(){
					player.s.points = player.s.points.sub( player.s.scl11.pow(4.5).mul(player.s.scl11) )
					player.s.scl11 = player.s.scl11.add(1)
					},
				},
			12:{
				title(){
					return 	"增量加成<br>数量：" + player.s.scl12 + "/25" + "<br>效果：" + "^" + 
							format(new ExpantaNum(1).add(player.s.scl12.mul(0.02)).max(1),4) +
							"<br>" + "价格：" + format( player.s.scl12.pow(7.5).mul(player.s.scl12) ) + "灵魂<br>" + 
							"增加你的点数获取"
					},
				style() {return {'height':'175px','width':'175px'}},
				canClick(){
					return player.s.points.gte( player.s.scl12.pow(7.5).mul(player.s.scl12) ) && player.s.scl12.lt(25)
					},
				unlocked(){return hasUpgrade("o",11)},
				onClick(){
					player.s.points = player.s.points.sub( player.s.scl12.pow(7.5).mul(player.s.scl12) )
					player.s.scl12 = player.s.scl12.add(1)
					},
				},
			},
			
			
upgrades: {
			11: {
				title:"点数的获取根据您的灵魂增加",
				cost(){return new ExpantaNum(3)},
				effect(){
					let eff = player.s.points.add(1).pow(0)
						eff = eff.mul(player.s.points.pow(0.5).max(1))
					return eff
				},
				effectDisplay(){return format(upgradeEffect(this.layer,this.id))+"×"},
				unlocked(){return true},
				},
			12: {
				title:"灵魂的获取根据您的点数增加",
				cost(){return new ExpantaNum(17)},
				effect(){
					let eff = player.points.add(1).pow(0)
						eff = eff.mul(player.points.pow(0.125).max(1))
					return eff
				},
				effectDisplay(){return format(upgradeEffect(this.layer,this.id))+"×"},
				unlocked(){return hasUpgrade("s",11)},
				},
			13: {
				title:"秒产灵魂倍增你的点数获取",
				cost(){return new ExpantaNum(75)},
				effect(){
					let eff = player.points.add(1).pow(0)
						var spsec = player.points.pow(0.25).sub(1.5)
						if(hasUpgrade("s",12)) spsec = spsec.mul(player.points.pow(0.125).max(1))
						if(hasUpgrade("s",21)) spsec = spsec.pow(1.2)
						eff = eff.mul(spsec.pow(0.85).max(0))
					return eff
				},
				effectDisplay(){return format(upgradeEffect(this.layer,this.id))+"×"},
				unlocked(){return hasUpgrade("s",12)},
				},
			21: {
				title:"点数获取开根但是灵魂获取^1.2",
				cost(){return new ExpantaNum(350)},
				unlocked(){return hasUpgrade("s",13)},
				},
			22: {
				title:"添加断臂升级“增量获取”",
				cost(){return new ExpantaNum(1250)},
				unlocked(){return hasUpgrade("s",21)},
				},
			23: {
				title:"解锁新的节点",
				cost(){return new ExpantaNum(25000)},
				unlocked(){return hasUpgrade("s",22)},
				},
	},
	
	tabFormat: [
			"blank","blank",
			["display-text",
              	function() {
					var spsec = player.points.pow(0.25).sub(1.5)
					if(hasUpgrade("s",12)) spsec = spsec.mul(player.points.pow(0.125).max(1))
					if(hasUpgrade("s",21)) spsec = spsec.pow(1.2)
									return"您每秒获得 <span style='color: " + tmp[this.layer].color + " ; font-size: 25px;'>" + 
									format(spsec.max(0)) + "</span>" + " 灵魂" + "<br><br>" 
						},
			],
			"main-display",//你有xxx该重置点
			"blank",
            //"prestige-button",//获取重置点按钮
			//"resource-display",//你有xxx什么
			"milestones",//里程碑
			"blank",//空
			"challenges",//挑战
			"clickables",
			"buyables",//重复购买项
			"upgrades",//升级
			
			
			],
			
			
})


addLayer("o", {		//重叠
    name: "Overlap",
    symbol: "O", 
    position: 0, 
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
		oopen: false,
    }},
    color: "#FFFF93",
	requires: new ExpantaNum(100000),
	branches: ["s"],
    resource: "重叠",
	baseResource: "灵魂",
	baseAmount() {return player.s.points}, 
    type: "normal",
	exponent(){
		if(!hasMilestone("o",1)) return 0
		if( hasMilestone("o",1)) return 0.1
	},
    gainMult() { 
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() {
		var exp = new ExpantaNum(1)
        return exp
    },
	passiveGeneration(){
		//return a   
         },
    row: 2, 
doReset(resettingLayer) {
        let keep = [];
			keep.push("best");
        if (layers[resettingLayer].row > this.row) {
            layerDataReset(this.layer,keep)	
		}
	},
update(delta) {		
    },
layerShown(){return hasUpgrade("s",23)||player.o.best.gt(0)},
////////////////////////////////////////////////////////////////////////////////////////////////////
upgrades: {
			11: {
				title:"添加灵魂节点断臂升级“增量加成”",
				cost(){return new ExpantaNum(4)},
				unlocked(){return true},
				},
			12: {
				title:"添加灵魂节点断臂升级“增量加成”",
				cost(){return new ExpantaNum(9)},
				unlocked(){return hasUpgrade("o",11)},
				},
			
	},
	
	milestones: {
		1: {
			requirementDescription: "3 重叠",
			effectDescription: "你可以获取最大重叠",
			done() {return player.o.points.gte(3)},
			},
		2: {
			requirementDescription: "8 重叠",
			effectDescription: "自动购买灵魂重购",
			toggles: [["o","autocl"]],
			done() {return player.o.points.gte(8)},
			},
		3: {
			requirementDescription: "15 重叠",
			effectDescription: "自动购买灵魂升级",
			toggles: [["o","autoup"]],
			done() {return player.o.points.gte(15)},
			},
	},
			
	tabFormat: [
			"blank","blank",
			"main-display",//你有xxx该重置点
			["display-text",
              	function() {
					var oo = player.o.points.add(1).pow(2.5)
					return	"这使你的点数获取变为 " + format(oo.max(1)) + " 倍"
						},
			],
			"blank",
            "prestige-button",//获取重置点按钮
			"resource-display",//你有xxx什么
			"milestones",//里程碑
			"blank",//空
			"challenges",//挑战
			"clickables",
			"buyables",//重复购买项
			"upgrades",//升级
			
			
			],
			
			
})













