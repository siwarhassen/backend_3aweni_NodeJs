const mongoose = require('mongoose');
const CvSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    cv: String
});

const Cv = mongoose.model("cvs",CvSchema);

module.exports = Cv;