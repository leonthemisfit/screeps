var roles = {
    harvester: require("role.harvest")
}

module.exports.loop = () => {
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        var role = roles[creep.role];
        role(creep);
    }
}