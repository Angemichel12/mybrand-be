import Joi from "joi";

interface UserData {
  name: string;
  email: string;
  password: string;
}

const UserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

const validateUser = (userData: UserData) => {
  return UserSchema.validate(userData);
};

export default validateUser;
