var util = {};

util.find_source = (creep) => creep.room.find(FIND_SOURCES)[0];

util.can_harvest_energy = (creep) => creep.carry.energy < creep.carryCapacity;

util.try_harvest = (creep, source) => creep.harvest(source) != ERR_NOT_IN_RANGE;

util.try_transfer_energy = (creep, target) => creep.transfer(target, RESOURCE_ENERGY) != ERR_NOT_IN_RANGE;

util.try_spawn = (spawner, name, creep_type, role) => spawner.spawnCreep(creep_type, name, { memory: { role: role } })

util.try_upgrade = (creep, controller) => creep.upgradeController(controller) != ERR_NOT_IN_RANGE;

util.is_spawner_full = (spawner) => spawner.energy == spawner.energyCapacity;

util.is_spawning = (spawner) => spawner.spawning != null;

util.clean_memory = () => {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
}

module.exports = util;