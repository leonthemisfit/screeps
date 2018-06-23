var roles = {
    harvester: require("role.harvester")
}

module.exports.loop = () => {
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        var role = roles[creep.role];
        role.run(creep);
    }
}