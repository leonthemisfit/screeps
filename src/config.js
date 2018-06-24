"use strict";

var util = require("util");

Memory.worker_id = util.coalesce([Memory.worker_id, 0]);
Memory.worker_limit = util.coalesce([Memory.worker_limit, 3]);
Memory.decay_threshold = util.coalesce([Memory.decay_threshold, 4500]);
Memory.wall_threshold = util.coalesce([Memory.wall_threshold, 20000]);
Memory.wall_max = util.coalesce([Memory.wall_max, 50000]);