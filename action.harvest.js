var actionHarvest = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[creep.memory.harvestLoc]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[creep.memory.harvestLoc], {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
}

module.exports = actionHarvest;