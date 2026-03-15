import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.string(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const sightingSpec = Joi.object()
  .keys({
    species: Joi.string().required().example("Short Ear Owl"),
    description: Joi.string().required().example("Only owls in ireland to hunt in the day time"),
    season: Joi.string().required().example("Autumn"),
  })
  .label("sighting");

export const sightingSpecPlus = sightingSpec
  .keys({
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("sightingPlus");

export const sightingArraySpec = Joi.array().items(sightingSpecPlus).label("sightingArray");

export const spotSpec = Joi.object()
  .keys({
    title: Joi.string().required(),
    userid: IdSpec,
    description: Joi.string().allow("").optional(),
    image: Joi.string().allow("").optional(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    category: Joi.string().allow("").optional(),
  })
  .label("spot");

export const spotSpecPlus = spotSpec
  .keys({
    _id: IdSpec,
    __v: Joi.string(),
  })
  .label("spotPlus");

export const spotArraySpec = Joi.array().items(spotSpecPlus).label("spotArray");
