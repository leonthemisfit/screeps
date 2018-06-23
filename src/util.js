var util = {};

util.find_source = (creep) => creep.room.find(FIND_SOURCES)[0];

util.can_harvest_energy = (creep) => creep.carry.energy < creep.carryCapacity;

util.try_harvest = (creep, source) => creep.harvest(source) != ERR_NOT_IN_RANGE;

util.try_transfer_energy = (creep, target) => creep.transfer(target, RESOURCE_ENERGY) != ERR_NOT_IN_RANGE;

module.exports = util;