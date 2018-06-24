var util = require("util");

var modes = {
    harvesting: 0,
    upgrading: 1
}

var flags = ["upgrade_1", "upgrade_2", "upgrade_3"]

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
    else if (creep.memory.upgrade_mode == modes.upgrading && creep.carry.energy == 0) {
        creep.memory.upgrade_mode = modes.harvesting;
    }

    if (creep.memory.upgrade_mode == modes.harvesting) {
        harvest(creep);
    }
    else if (creep.memory.upgrade_mode == modes.upgrading) {
        if (!util.try_upgrade(creep, creep.room.controller)) {
            if (creep.memory.moving) {
                return;
            }
            for (var id in flags) {
                var flag = Game.flags[id]
                if (flag.memory.available === undefined) {
                    flag.memory.available = true;
                }
                if (flag.memory.available) {
                    flag.memory.available = false;
                    creep.memory.moving = true;
                    creep.memory.flag_id = id;
                    creep.moveTo(flag);
                    break;
                }
            }
        }
        else {
            creep.memory.moving = false;
            if (creep.carry.energy == 0) {
                var flag = Game.flags[creep.memory.flag_id];
                flag.memory.available = true;
                delete creep.memory.flag_id;
            }
        }
    }
    else {
        creep.memory.upgrade_mode = modes.harvesting;
    }
}

module.exports = run;