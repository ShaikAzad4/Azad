const {model} = require("mongoose");
const {PositionsSchema} = require("../schemas/PositioinsSchema");

const PositionModel = new model("Position",PositionsSchema);

module.exports = {PositionModel};