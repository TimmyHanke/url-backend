import mongoose from "mongoose";
import joi from "joi";

interface IUrl {
  original: String;
  validTo: String;
}

//Mongoose Schema
const urlSchema = new mongoose.Schema({
  original: { type: String, maxLength: 1000 },
  addon: String,
  newUrl: String,
  validTo: { type: String, default: null },
});

//Mongoose model
const Url = mongoose.model("url", urlSchema);

//Joi validation
function validateUrl(url: IUrl) {
  const schema = joi.object({
    original: joi.string().max(1000),
    validTo: joi.string().allow(null),
  });
  return schema.validate(url);
}

export { Url };
export { validateUrl };
