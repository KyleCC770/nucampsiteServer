const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoritesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  campsite: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campsite",
    },
  ],
});

const Favorite = mongoose.model("Favorite", favoritesSchema);

module.exports = Favorite;
