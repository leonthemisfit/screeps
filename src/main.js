var util = require("util");
var creeps = require("creeps");

var roles = {
    harvester: require("role.harvester"),
    upgrader: require("role.upgrader"),
    builder: require("role.builder")
}

const WORKER_LIMIT = 2;
var worker_id = 20;

var worker_roles = ["harvester", "upgrader", "builder"];
var worker_filter = (creep) => worker_roles.includes(creep.memory.role);

var worker_spawns = [creeps.hard_worker, creeps.basic_worker];

module.exports.loop = () => {
    util.clean_memory();

    var workers = _.filter(Game.creeps, worker_filter);
    if (util.is_spawner_full(Game.spawns.Main)) {
        for (var i in workers) {
            var creep = workers[i];
            creep.memory.role = util.is_construction(creep) ? "builder" : "upgrader";
        }
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
        for (var i in workers) {
            var creep = workers[i];
            creep.memory.role = "harvester";
        }
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        var role = roles[creep.memory.role];
        role(creep);
    }
}