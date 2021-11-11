const { response } = require("express");
const User = require("../models/User");

const create = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res
      .status(201)
      .json({ message: "Usuário cadastrado com sucesso!", user: user });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const index = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const find = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    return res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await User.update(req.body, { where: { id: id } });
    if (updated) {
      const user = await User.findByPk(id);
      return res.status(200).send(user);
    }
    throw new Error();
  } catch (err) {
    res.status(500).json("Usuário não encontrado.");
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const [deleted] = await User.destroy(req.body, { where: { id: id } });
    if (deleted) {
      return res.status(200).json("Usuário deletado com sucesso.");
    }
    throw new Error();
  } catch (err) {
    res.status(500).json("Usuário não encontrado.");
  }
};

module.exports = {
  index,
  find,
  create,
  update,
  destroy,
};
