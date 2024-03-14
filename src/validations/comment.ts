import Joi from "joi";

const schema = Joi.object({
  blog: Joi.string().required(),
  description: Joi.string().required(),
});

const validateComment = (data: any) => {
  const result = schema.validate(data);
  return result;
};

export default validateComment;
