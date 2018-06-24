class CreepTemplate {
    constructor (body, name) {
        this.body = body;
        this.name = name;
    }
}

module.exports = {
    basic_worker: new CreepTemplate([WORK, CARRY, MOVE], "Basic Worker"),
    better_worker: new CreepTemplate([WORK, WORK, CARRY, MOVE], "Better Worker"),
    balanced_worker: new CreepTemplate([WORK, WORK, CARRY, MOVE, MOVE], "Balanced Worker"),
    hard_worker: new CreepTemplate([WORK, WORK, WORK, CARRY, MOVE], "Hard Worker"),
    hardfast_worker: new CreepTemplate([WORK, WORK, WORK, CARRY, MOVE, MOVE], "Hard & Fast Worker"),
    heavy_worker: new CreepTemplate([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], "Heavy Worker")
};
