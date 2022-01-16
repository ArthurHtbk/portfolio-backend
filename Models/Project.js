const mongoose = require("mongoose");

const Project = mongoose.model("Project", {
  image: { type: mongoose.Schema.Types.Mixed, default: {} },
  name: String,
  description: {
    english: String,
    french: String,
  },
  tools: [String],
  url: String,
  repository: {
    backend: String,
    frontend: String,
  },
});

module.exports = Project;
