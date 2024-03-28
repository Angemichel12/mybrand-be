import Joi from "joi";
import { userLoginData } from "../mock/statics";

interface UserData {
  name: string;
  email: string;
  password: string;
}

interface IUserLogin {
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

const UserLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

const validateUserLogin = (userData: IUserLogin) => {
  return UserLoginSchema.validate(userData);
};

export { validateUser, validateUserLogin };
