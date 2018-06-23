var util = require("util");

var modes = {
    harvesting: 0,
    building: 1
}

function harvest(creep) {
    var source = util.find_source(creep);
    if (!util.try_harvest(creep, source)) {
        creep.moveTo(source);
    }
}

function check_mode(creep) {
    if (creep.memory.build_mode == modes.harvesting) {
        creep.memory.build_mode = util.can_harvest_energy(creep) ? modes.harvesting : modes.building;
    }
    else if (creep.memory.build_mode == modes.building) {
        creep.memory.build_mode = creep.carry.energy > 0 ? modes.building : modes.harvesting;
    }
}

function run(creep) {
    check_mode(creep);

    if (creep.memory.build_mode == modes.harvesting) {
        harvest(creep);
    }
    else if (creep.memory.build_mode == modes.building) {
        var construction = util.find_construction(creep);
        if (!util.try_build(creep, construction)) {
            creep.moveTo(construction);
        }
    }
    else {
        creep.memory.build_mode = modes.harvesting;
    }
}

module.exports = run;