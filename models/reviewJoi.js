const joi = require("joi");

const reviewSchema = joi.object({
  review: joi
    .object({
      comment: joi.string().required(),
      rating: joi.number().required(),
    })
    .required(),
});

module.exports = reviewSchema;
