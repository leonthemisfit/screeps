var util = require("util");

function harvest(creep) {
    var source = util.find_source(creep);
    if (!util.try_harvest(creep, source)) {
        creep.moveTo(source);
    }
}

function run(creep) {
    if (util.can_harvest_energy(creep)) {
        harvest(creep);
    }
    else {
        if (!util.try_upgrade(creep, creep.room.controller)) {
            creep.moveTo(creep.room.controller);
        }
    }
}

module.exports = run;