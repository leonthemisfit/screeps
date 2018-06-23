var util = require("util");

var modes = {
    harvesting: 0,
    upgrading: 1
}

function harvest(creep) {
    var source = util.find_source(creep);
    if (!util.try_harvest(creep, source)) {
        creep.moveTo(source);
    }
}

function run(creep) {
    if (creep.memory.upgrade_mode == modes.harvesting && !util.can_harvest_energy(creep)) {
        creep.memory.upgrade_mode = modes.upgrading;
    }
    else if (creep.memory.upgrade_mode == modes.upgrading && creep.energy == 0) {
        creep.memory.upgrade_mode = modes.harvesting;
    }

    if (creep.memory.upgrade_mode == modes.harvesting) {
        harvest(creep);
    }
    else if (creep.memory.upgrade_mode == modes.upgrading) {
        if (!util.try_upgrade(creep, creep.room.controller)) {
            creep.moveTo(creep.room.controller);
        }
    }
    else {
        creep.memory.upgrade_mode = modes.harvesting;
    }
}

module.exports = run;