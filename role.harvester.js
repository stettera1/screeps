var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var actionHarvest = require('action.harvest');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, sourceDecider) {
        
        if(creep.memory.harvesting && creep.store.getFreeCapacity() == 0 || creep.memory.harvesting && creep.ticksToLive < 21) {
            creep.memory.harvesting = false;
            creep.memory.building = true;
            creep.memory.upgrading = true;
            creep.say('⚡ storing');
	    } else if(!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
	        creep.memory.harvesting = true;
	        creep.memory.building = false;
            creep.memory.upgrading = false;
	        creep.say('🔄 harvest');
	    }
        
        
	    if(creep.memory.harvesting) {
            actionHarvest.run(creep);
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_EXTENSION 
                                || structure.structureType == STRUCTURE_SPAWN  || structure.structureType == STRUCTURE_TOWER ) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#000000'}});
                }
            } else if (targets.length == 0){
                if(creep.memory.harvestLoc == 0){
                    roleUpgrader.run(creep, sourceDecider);
                } else {
                    roleBuilder.run(creep, sourceDecider);
                }
            }
        }
	}
};

module.exports = roleHarvester;