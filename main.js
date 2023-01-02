var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var spawner = require('spawn.creeps');
var structureTower = require('structure.tower');
var actionRetreat = require('action.retreat');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairer = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');


    console.log(Game.spawns['Spawn1'].room.energyAvailable + ': energy available.');

    var totalCreeps = harvesters.length + builders.length + upgraders.length

    if(totalCreeps <= 9 && Game.spawns['Spawn1'].room.energyAvailable >= 200){
        if(harvesters.length < 4) {
            spawner.run('harvester')
        } 
        else if(upgraders.length < 2)
        {
            spawner.run('upgrader')
        } 
        else if(builders.length < 2)
        {
            spawner.run('builder')
        }

        else if(repairer.length < 1)
        {
            spawner.run('repairer')
        }
    }

    let sourceDecider = 0
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
        
        var shelter = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => structure.structureType == STRUCTURE_RAMPART
        });
        
     
        
        if(creep.ticksToLive < 50) {
            creep.say('TTL: ' + creep.ticksToLive)
        };
        
        if(hostiles.length > 0) 
        {
            actionRetreat.run(creep, sourceDecinder);
        }
        else 
        {
            if(creep.memory.role == 'harvester') 
            {
                roleHarvester.run(creep, sourceDecider);
            }
            if(creep.memory.role == 'upgrader') 
            {
                roleUpgrader.run(creep, sourceDecider);
            }
            if(creep.memory.role == 'builder' || creep.memory.role == 'repairer') 
            {
                roleBuilder.run(creep, sourceDecider);
            }
        }
        sourceDecider++;
    }
    
   /* var towers = Game.rooms.E26S3.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER});
    console.log(towers.length)
    for (let tower of towers) {
        structureTower.run(tower);
    }*/
    
    
}