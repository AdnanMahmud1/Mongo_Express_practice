import models from "../models";

export const saveUser = async (user) => {
  const model = new models.User({
    username: user.username,
    createdAt: new Date(),
  });
  const saveUser = await model.save();
  return saveUser;
};

export const getAllUsers = async () => {
  const User = models.User;
  const users = await User.find();
  return users;
};
