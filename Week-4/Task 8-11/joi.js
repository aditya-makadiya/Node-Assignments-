//Task 10

const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .required(),
  age:Joi.number()
  .positive()
  .required()
})

module.exports = {schema};