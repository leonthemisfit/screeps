var build_cost = require("build_cost");

var util = {};

util.find_source = (creep) => creep.room.find(FIND_SOURCES)[0];

util.can_harvest_energy = (creep) => creep.carry.energy < creep.carryCapacity;

util.try_harvest = (creep, source) => creep.harvest(source) != ERR_NOT_IN_RANGE;

util.try_transfer_energy = (creep, target) => creep.transfer(target, RESOURCE_ENERGY) != ERR_NOT_IN_RANGE;

util.try_spawn = (spawner, name, creep_type, role) => spawner.spawnCreep(creep_type, name, { memory: { role: role } }) == 0;

util.try_upgrade = (creep, controller) => creep.upgradeController(controller) != ERR_NOT_IN_RANGE;

util.try_build = (creep, target) => creep.build(target) != ERR_NOT_IN_RANGE;

util.is_spawner_full = (spawner) => spawner.energy == spawner.energyCapacity;

util.is_spawning = (spawner) => spawner.spawning != null;

util.can_spawn = (spawner, parts) => spawner.spawnCreep(parts, "test", { dryRun: true }) == 0;

util.is_construction = (creep) => util.find_construction(creep) ? true : false;

util.find_extensions = (room) => room.find(FIND_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_EXTENSION });

util.clean_memory = () => {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
}

util.find_construction = (creep) => {
    var construction = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (construction.length > 0) {
        return construction[0];
    }
}

util.coalesce = (args) => {
    for (var i = 0; i < args.length; i++) {
        var val = args[i];
        if (val !== null && val !== undefined) {
            return val;
        }
    }
    return null;
};

module.exports = util;