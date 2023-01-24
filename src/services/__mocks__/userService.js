export const getAllUsers = async () => {

  const users = [
    { '_id': '1', "usename": "testUser 001" },
    { '_id': '2', "usename": "testUser 002" },

  ];

  return users;
};

export const saveUser = async (user) => {
  const model = new models.User(user);
  const saveUser = await model.save();
  return saveUser;
};