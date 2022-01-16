const mongoose = require("mongoose");

const Project = mongoose.model("Project", {
  image: { type: mongoose.Schema.Types.Mixed, default: {} },
  name: String,
});

module.exports = Project;
