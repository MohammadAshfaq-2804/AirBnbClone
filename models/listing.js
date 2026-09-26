const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Review = require("./review.js");
const User = require("./user.js");

const listingSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1787514375953-85843e223871?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      set: (v) => (v === "" ? undefined : v),
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: schema.Types.ObjectId,
    ref: "User",
  },
   geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

//handiling the deletion of reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async function (listing) {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
