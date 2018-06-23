var util = require("util");
var creeps = require("creeps");

var roles = {
    harvester: require("role.harvester"),
    upgrader: require("role.upgrader")
}

const WORKER_LIMIT = 2;
var worker_id = 20;

var worker_filter = (creep) => creep.memory.role == "harvester" || creep.memory.role == "upgrader";

var worker_spawns = [creeps.hard_worker, creeps.basic_worker];

module.exports.loop = () => {
    util.clean_memory();

    if (util.is_spawner_full(Game.spawns.Main)) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == "harvester");
        for (var i in harvesters) {
            var creep = harvesters[i];
            creep.memory.role = "upgrader";
        }
        var workers = _.filter(Game.creeps, worker_filter);
        if (workers.length < WORKER_LIMIT) {
            for (var i in worker_spawns) {
                var parts = worker_spawns[i];
                if (util.can_spawn(Game.spawns.Main, parts)) {
                    util.try_spawn(Game.spawns.Main, "worker_" + worker_id++, parts, "harvester");
                }
            }
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