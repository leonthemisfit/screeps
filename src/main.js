var util = require("util");
var creeps = require("creeps");
var cost = require("build_cost");

var roles = {
    harvester: require("role.harvester"),
    upgrader: require("role.upgrader"),
    builder: require("role.builder")
}

const WORKER_LIMIT = 2;
const DEFAULT_ROLE = "harvester";
const WORKER_NAME = "worker_";
const DECAY_THRESHOLD = 3000;

var worker_id = 20;

var worker_roles = ["harvester", "upgrader", "builder"];
var worker_filter = (creep) => worker_roles.includes(creep.memory.role);

var worker_spawns = [
    creeps.hardfast_worker,
    creeps.hard_worker,
    creeps.balanced_worker,
    creeps.better_worker,
    creeps.basic_worker
];

function log_spawn(template) {
    var msg = "Created new creep of type '";
    msg += template.name;
    msg += "' with an energy cost of ";
    msg += cost.calculate_cost(template.body);
    console.log(msg);
}

var decay_check = (creep) => creep.room.controller.ticksToDowngrade < DECAY_THRESHOLD;

function autospawn() {
    var workers = _.filter(Game.creeps, worker_filter);
    var spawner = Game.spawns.Main;
    if (workers.length < WORKER_LIMIT) {
        for (var i = 0; i < worker_spawns.length; i++) {
            var template = worker_spawns[i];
            if (util.can_spawn(spawner, template.body)) {
                var name = WORKER_NAME + worker_id++;
                if (util.try_spawn(spawner, name, template.body, DEFAULT_ROLE)) {
                    Game.creeps[name].memory.type = template.name;
                    log_spawn(template);
                }
                break;
            }
        }
    }
}

function role_check() {
    var workers = _.filter(Game.creeps, worker_filter);
    for (var i in workers) {
        var creep = workers[i];
        if (decay_check(creep)) {
            creep.memory.role = "upgrader";
        }
        else if (util.is_spawner_full(Game.spawns.Main)) {
            var extensions = util.find_extensions(creep.room);
            var ext_needed = false;
            for (var i in extensions) {
                var ext = extensions[i];
                if (ext.energy < ext.energyCapacity) {
                    ext_needed = true;
                    break;
                }
            }
            if (ext_needed) {
                creep.memory.role = "harvester";
            }
            else {
                creep.memory.role = util.is_construction(creep) ? "builder" : "upgrader";
                autospawn();
            }
        }
        else {
            creep.memory.role = "harvester";
        }
    }
}

function do_roles() {
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        var role = roles[creep.memory.role];
        role(creep);
    }
}

module.exports.loop = () => {
    util.clean_memory();
    role_check();
    do_roles();
}