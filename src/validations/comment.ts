import Joi from "joi";

const schema = Joi.object({
  description: Joi.string().required(),
});

const validateComment = (data: any) => {
  const result = schema.validate(data);
  return result;
};

export default validateComment;
