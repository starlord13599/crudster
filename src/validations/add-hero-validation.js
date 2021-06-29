import joi from 'joi';

const addHeroSchema = joi.object({
	name: joi.string().required(),
	age: joi.number().min(10).required(),
	superpower: joi.string().required(),
});

export default addHeroSchema;
