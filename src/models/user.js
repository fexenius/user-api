const pool = require("../postgres");

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getUsers = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  if (page != null && size != null) {
    await pool.query(
      "SELECT * FROM users ORDER BY id ASC LIMIT $1 OFFSET $2",
      [limit, offset],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
      }
    );
  } else {
    await pool.query(
      "SELECT * FROM users ORDER BY id ASC",
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
      }
    );
  }
};

const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);

  await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const createUser = async (req, res) => {
  const { firstName, lastName, birth, email } = req.body;

  await pool.query(
    'INSERT INTO users ("firstName", "lastName", birth, email) VALUES ($1, $2, $3, $4) RETURNING *',
    [firstName, lastName, birth, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({ newUserId: results.rows[0].id });
    }
  );
};

const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { firstName, lastName, birth, email } = req.body;

  await pool.query(
    'UPDATE users SET "firstName" = $1, "lastName" = $2, birth = $3, email = $4 WHERE id = $5',
    [firstName, lastName, birth, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json({ updateUserId: id });
    }
  );
};

const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);

  await pool.query(
    "DELETE FROM users WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json({ deleteUserId: id });
    }
  );
};

module.exports = {
  deleteUser,
  createUser,
  getUsers,
  getUserById,
  updateUser,
};
