var structureTower = {

    /** @param {Creep} creep **/
    run: function(tower) {

        var invaders = tower.room.find(FIND_HOSTILE_CREEPS);
        
        var hurtAllies = tower.room.find(FIND_MY_CREEPS, {
            filter: function(creeps) {
                return (creeps.hits < creeps.hitsMax);
            }
        });
        
        if(invaders.length){
            tower.attack(invaders[0])
        } else if(hurtAllies.length){
            tower.heal(hurtAllies[0]);
        };
	    
	}
};

module.exports = structureTower;