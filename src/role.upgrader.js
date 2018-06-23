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
    creep.memory.upgrade_mode = creep.memory.upgrade_mode == modes.upgrading && creep.energy > 0 ? modes.upgrading : modes.harvest;
    if (creep.memory.upgrade_mode == modes.harvesting && util.can_harvest_energy(creep)) {
        harvest(creep);
    }
    else {
        if (!util.try_upgrade(creep, creep.room.controller)) {
            creep.moveTo(creep.room.controller);
        }
    }
}

module.exports = run;