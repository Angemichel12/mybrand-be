import Joi from "joi";

interface BlogData {
  title: string;
  content: string;
  author: string;
}

const BlogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string(),
});

const validateBlog = (blogData: BlogData) => {
  return BlogSchema.validate(blogData);
};

export default validateBlog;
