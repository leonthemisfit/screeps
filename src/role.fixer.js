var util = require("util");

var modes = {
    harvesting: 0,
    repairing: 1
}

function harvest(creep) {
    var source = util.find_source(creep);
    if (!util.try_harvest(creep, source)) {
        creep.moveTo(source);
    }
}

function check_mode(creep) {
    if (creep.memory.build_mode == modes.harvesting) {
        creep.memory.build_mode = util.can_harvest_energy(creep) ? modes.harvesting : modes.repairing;
    }
    else if (creep.memory.build_mode == modes.repairing) {
        creep.memory.build_mode = creep.carry.energy > 0 ? modes.repairing : modes.harvesting;
    }
}

function run(creep) {
    check_mode(creep);

    if (creep.memory.build_mode == modes.harvesting) {
        harvest(creep);
    }
    else if (creep.memory.build_mode == modes.repairing) {
        var wall = util.get_broken_wall;
        if (wall !== null) {
            if (creep.repair(wall) == ERR_NOT_IN_RANGE) {
                creep.moveTo(wall);
            }
        }
    }
    else {
        creep.memory.build_mode = modes.harvesting;
    }
}

module.exports = run;