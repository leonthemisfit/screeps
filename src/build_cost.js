"use strict";

var parts = {};

parts[MOVE] = 50;
parts[WORK] = 100;
parts[CARRY] = 50;
parts[ATTACK] = 80;
parts[RANGED_ATTACK] = 150;
parts[HEAL] = 250;
parts[CLAIM] = 600;
parts[TOUGH] = 10;

function calc(body) {
    var total = 0;
    for (var i in body) {
        var part = body[i];
        if (parts[part]) {
            total += parts[part];
        }
    }
    return total;
}

module.exports = {
    part_costs: parts,
    calculate_cost: calc
};