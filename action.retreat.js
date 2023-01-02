var actionRetreat = {

    /** @param {Creep} creep **/
    run: function(creep, sourceDecider) {
        
        var shelter = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_RAMPART
        });
        
        if(creep.room.find(FIND_MY_STRUCTURES, { 
            filter: (structure) => structure.pos.x == shelter[5].pos.x && structure.pos.y == shelter[sourceDecider].pos.y
        }).length == 1){
            creep.moveTo(shelter[sourceDecider], {visualizePathStyle: {stroke: '#ffffff'}});
        } else {
            creep.moveTo(shelter[sourceDecider + 1], {visualizePathStyle: {stroke: '#ffffff'}});
        }
        
    }
}

module.exports = actionRetreat;