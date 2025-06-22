const mongoose = require("mongoose");
const {model} = mongoose;
const {AuthSchema} = require("../schemas/AuthSchema");
const AuthModel = new model("User",AuthSchema);
module.exports = AuthModel;