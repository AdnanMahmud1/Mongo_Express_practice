import { GeneralError } from "./../utils/errors";

export const handleErrors = async (err, req, res, next) => {
  if (err instanceof GeneralError) {
    const code = err.getCode();
    return res.status(code).json({ name: err.name, message: err.message });
  }
  // no known error
  return res.status(500).json({
    name: "Internal server error",
    message: err.message,
  });
};