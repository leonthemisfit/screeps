"use strict";

require("config");

var util = require("util");
var creeps = require("creeps");
var cost = require("build_cost");

var roles = {
    harvester: require("role.harvester"),
    upgrader: require("role.upgrader"),
    builder: require("role.builder"),
    fixer: require("role.fixer")
};

const DEFAULT_ROLE = "harvester";
const WORKER_NAME = "worker_";

var worker_roles = ["harvester", "upgrader", "builder", "fixer"];
var worker_filter = (creep) => worker_roles.includes(creep.memory.role);

var worker_spawns = [
    creeps.fastheavy_worker,
    creeps.heavy_worker,
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

var decay_check = (creep) => creep.room.controller.ticksToDowngrade < Memory.decay_threshold;

function autospawn() {
    var workers = _.filter(Game.creeps, worker_filter);
    var spawner = Game.spawns.Main;
    if (workers.length < Memory.worker_limit) {
        for (var i = 0; i < worker_spawns.length; i++) {
            var template = worker_spawns[i];
            if (util.can_spawn(spawner, template.body)) {
                var name = WORKER_NAME + Memory.worker_id++;
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

        var extensions = util.find_extensions(creep.room);
        var ext_needed = false;
        var spn_needed = !util.is_spawner_full(Game.spawns.Main);
        var full = !ext_needed && !spn_needed;
        for (var i in extensions) {
            var ext = extensions[i];
            if (ext.energy < ext.energyCapacity) {
                ext_needed = true;
                break;
            }
        }

        if (full) autospawn();

        if (decay_check(creep)) {
            creep.memory.role = "upgrader";
        }
        else if (ext_needed || spn_needed) {
            creep.memory.role = "harvester";
        }
        else if (util.are_broken_walls(creep.room)) {
            creep.memory.role = "fixer";
        }
        else if (full) {
            creep.memory.role = util.is_construction(creep) ? "builder" : "upgrader";
        }
        else {
            creep.memory.role = "upgrader";
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

function clean_flags() {
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role != "upgrader" && creep.memory.flag_id !== undefined) {
            var flag = Game.flags[creep.memory.flag_id];
            flag.memory.available = true;
            delete creep.memory.flag_id;
        } 
    }
}

module.exports.loop = () => {
    role_check();
    clean_flags();
    do_roles();
    util.clean_memory();
}
