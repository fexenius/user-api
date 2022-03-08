const User = require("../models/user");

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getUsers = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  try {
    if (page != null && size != null) {
      const users = await User.findAll({ limit: limit, offset: offset });
      res.status(200).json(users);
    } else {
      const users = await User.findAll();
      res.status(200).json(users);
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const user = await User.findAll({
      where: {
        id: id,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ newUserId: user.getDataValue("id") });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await User.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).json({ updateUserId: id });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await User.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({ deleteUserId: id });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  deleteUser,
  createUser,
  getUsers,
  getUserById,
  updateUser,
};
