const { forEach } = require("lodash");

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(spawnType) {
        var newName = spawnType + Game.time;
        
        //getting data to find how many creeps are assigned each location.
        var harvestLocation0 = _.filter(Game.creeps, (creep) => creep.memory.harvestLoc == 0);
        var harvestLocation1 = _.filter(Game.creeps, (creep) => creep.memory.harvestLoc == 1);
        let locationDecider = 1;
        
        if(harvestLocation0.length < harvestLocation1.length){
            locationDecider = 0;
        }

        var energySources = Game.spawns['Spawn1'].room.find(FIND_SOURCES);
        var terrain = Game.spawns['Spawn1'].room.getTerrain()
        //console.log('x: ' + sources[0].pos.x + ' y: ' + sources[0].pos.y)
        energySources.forEach(source => {
            for (let y = 0; y < 3; y++) {
                for (let x = 0; x < 3; x++) {
                    let xPos = (x - 1) + source.pos.x;
                    let yPos =  (y - 1) + source.pos.y;
                    console.log(terrain.get(xPos, yPos) + ' Cords: x:' + xPos + ' y:' + yPos);
                }  
            } 
        })



        
	    if(spawnType == 'harvester') {
	                console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([ WORK, CARRY, CARRY, MOVE], 'BIG' + newName, 
                {memory: {role: 'harvester', harvestLoc: locationDecider}});
	    }
	    
        if(spawnType == 'builder') {
	                console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, 
                {memory: {role: 'builder', harvestLoc: locationDecider}});
	    }
	    
        if(spawnType == 'repairer') {
	                console.log('Spawning new repairer: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName, 
                {memory: {role: 'repairer', harvestLoc: locationDecider}});
	    }
	    
        if(spawnType == 'upgrader') {
	                console.log('Spawning new upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName, 
                {memory: {role: 'upgrader', harvestLoc: locationDecider}});
	    }
    }
}

module.exports = roleBuilder;