var util = require("util");

function harvest(creep) {
    var source = util.find_source(creep);
    if (!util.try_harvest(creep, source)) {
        creep.moveTo(source);
    }
}

function struct_filter(structure) {
    var is_ext = structure.structureType == STRUCTURE_EXTENSION;
    var is_spwn = structure.structureType == STRUCTURE_SPAWN;
    var needs_energy = structure.energy < structure.energyCapacity;
    return (is_ext || is_spwn) && needs_energy;
}

function run(creep) {
    if (util.can_harvest_energy(creep)) {
        harvest(creep);
    }
    else {
        var structs = creep.room.find(FIND_STRUCTURES, { filter: struct_filter });
        if (structs.length > 0) {
            if (!util.try_transfer_energy(targets[0])) {
                creep.moveTo(targets[0])
            }
        }
    }
}

module.exports = run;