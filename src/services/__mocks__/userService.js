import models from "../../models";

let users = [
  {
    _id: "01",
    usename: "testUser 001",
  },
];

export const getAllUsers = async () => {
  return users;
};

export const saveUser = async (user) => {
  const model = new models.User(user);
  model._id = "2";
  users.push(model);
  return model;
};

export const getUserById = async (nid) => {
  let model = users.find((x) => x.id === nid);
  return model;
};
