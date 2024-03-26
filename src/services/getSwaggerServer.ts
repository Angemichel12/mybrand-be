import dotenv from "dotenv";

dotenv.config();

function getSwaggerServer(): string {
  if (process.env.SWAGGER_SERVER !== undefined) {
    return process.env.SWAGGER_SERVER;
  }

  return "http://localhost:5000/api/v1/";
}

export { getSwaggerServer };
