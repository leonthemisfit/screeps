var util = require("util");

var roles = {
    harvester: require("role.harvester"),
    upgrader: require("role.upgrader")
}

module.exports.loop = () => {
    if (util.is_spawner_full(Game.spawns.Main)) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == "harvester");
        for (var i in harvesters) {
            var creep = harvesters[i];
            creep.memory.role = "upgrader";
        }
    }
    else {
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == "upgrader");
        for (var i in upgraders) {
            var creep = upgraders[i];
            creep.memory.role = "harvester";
        }
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        var role = roles[creep.memory.role];
        role(creep);
    }
}