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

function run(creep) {
    if (creep.memory.build_mode == modes.harvesting && !util.can_harvest_energy(creep)) {
        creep.memory.build_mode = modes.building;
    }
    else if (creep.memory.build_mode == modes.building && creep.carry.energy == 0) {
        creep.memory.build_mode = modes.harvesting;
    }

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