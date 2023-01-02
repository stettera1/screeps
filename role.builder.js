var roleUpgrader = require('role.upgrader');
var actionHarvest = require('action.harvest');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep, sourceDecider) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            var structuresToRepair = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < (structure.hitsMax * .85) && structure.structureType != STRUCTURE_WALL});
            
           if(targets.length > 0 && creep.memory.role != 'reparier') {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE ) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } 
             else if (structuresToRepair != null){
                if(creep.repair(structuresToRepair) == ERR_NOT_IN_RANGE){
                    creep.moveTo(structuresToRepair, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } 
            else 
            {
                roleUpgrader.run(creep);
            }
	    }
	    else {
	        actionHarvest.run(creep);
	    }
	}
};

module.exports = roleBuilder;
