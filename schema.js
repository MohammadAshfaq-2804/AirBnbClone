const Joi = require("joi");

module.exports.validSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description:Joi.string().required(),
    price:Joi.number().required(),
    country:Joi.string().required(),
    location:Joi.string().required(),
    image: Joi.object({
      filename: Joi.string().allow(""),
      url: Joi.string().allow("")
    }).allow(null)
  }).required(),
});

module.exports.validReview=Joi.object({
  review:Joi.object({
    rating:Joi.number().required().min(1).max(5),
    comment:Joi.string().required(),
  }).required(),
});

