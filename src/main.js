var roles = {
    harvester: role_harvester
}

module.exports.loop = () => {
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        var role = roles[creep.Memory.role];
        role(creep);
    }
}