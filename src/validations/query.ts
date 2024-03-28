import Joi from "joi";

interface QueryData {
  email: string;
  message: string;
}

const QuerySchema = Joi.object({
  email: Joi.string().required().email(),
  message: Joi.string().required(),
});

const validateQuery = (queryData: QueryData) => {
  return QuerySchema.validate(queryData);
};

export default validateQuery;
