const mongoose = require("mongoose");

const Skill = mongoose.model("Skill", {
  logo: { type: mongoose.Schema.Types.Mixed, default: {} },
  name: String,
});

module.exports = Skill;
