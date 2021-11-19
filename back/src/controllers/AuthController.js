const { Op } = require("sequelize");
const User = require("../models/User");
const Auth = require("../config/auth");

const register = async (req, res) => {
  try {
    const { password } = req.body;
    const hashAndSalt = Auth.generatePassword(password);
    const salt = hashAndSalt.salt;
    const hash = hashAndSalt.hash;
    const newUserData = {
      cpf: req.body.cpf,
      pis: req.body.pis,
      name: req.body.name,
      email: req.body.email,
      hash: hash,
      salt: salt,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      postalCode: req.body.postalCode,
      street: req.body.street,
      number: req.body.number,
      additionalInfo: req.body.additionalInfo,
    };

    const isNotUnique = await User.findOne({
      where: {
        [Op.or]: [
          { cpf: newUserData.cpf },
          { pis: newUserData.pis },
          { email: newUserData.email },
        ],
      },
    });

    if (isNotUnique !== null) {
      throw new Error("Usuário já cadastrado!");
    }

    const user = await User.create(newUserData);
    const token = Auth.generateJWT(user);
    return res
      .status(201)
      .cookie("token", token, { httpOnly: true, secure: false })
      .json({
        message: "Usuário criado com sucesso!",
        user: user,
      });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const login = async (req, res) => {
  try {
    const loginId = req.body.loginId;
    let user;

    // Testa o loginId para ver por qual informação ele deve ser procurado na base
    if (/[A-Z0-9._%+-]+@[A-Z0-9-]+(\.[A-Z]{2,4})+/i.test(loginId)) {
      user = await User.findOne({ where: { email: loginId } });
    } else if (/\d{3}\.\d{3}\.\d{3}-\d{2}/i.test(loginId)) {
      user = await User.findOne({ where: { cpf: loginId } });
    } else if (/\d{3}\.\d{4}\.\d{3}-\d{1}/i.test(loginId)) {
      user = await User.findOne({ where: { pis: loginId } });
    }

    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado." });
    const { password } = req.body;
    if (Auth.checkPassword(password, user.hash, user.salt)) {
      const token = Auth.generateJWT(user);
      return res
        .status(200)
        .cookie("token", token, { httpOnly: true, secure: false })
        .json({ message: "Login realizado com sucesso!" });
    } else {
      return res.status(401).json({ message: "Senha inválida" });
    }
  } catch (e) {
    return res.status(500).json({ err: e });
  }
};

const auth = async (req, res) => {
  try {
    const token = req.cookies["token"];
    if (!token) return res.status(401).json({ message: "Não autorizado" });
    return res.status(200).json({ message: "Logado" });
  } catch (err) {
    return res.status(err.status).json({ err: err.message });
  }
};

const getDetails = async (req, res) => {
  try {
    const token = req.cookies["token"];
    if (!token) return res.status(401).json({ message: "Não autorizado." });
    const payload = Auth.decodeJwt(token);
    const user = await User.findByPk(payload.sub); //pegar_informação_do_usuário_logado
    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado." });
    return res.status(200).json({ user: user });
  } catch (e) {
    return res.status(500).json({ err: e });
  }
};

const update = async (req, res) => {
  const token = req.cookies["token"];

  if (!token) return res.status(401).json({ message: "Não autorizado." });
  const payload = Auth.decodeJwt(token);
  const id = payload.sub;

  try {
    const { password } = req.body;
    const newUserData = {
      cpf: req.body.cpf,
      pis: req.body.pis,
      name: req.body.name,
      email: req.body.email,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      postalCode: req.body.postalCode,
      street: req.body.street,
      number: req.body.number,
      additionalInfo: req.body.additionalInfo,
    };

    if (password !== "") {
      const hashAndSalt = Auth.generatePassword(password);
      newUserData.salt = hashAndSalt.salt;
      newUserData.hash = hashAndSalt.hash;
    }

    const [updated] = await User.update(newUserData, {
      where: { id: id },
    });

    if (updated) {
      const user = await User.findByPk(id);
      return res
        .status(200)
        .send({ user: user, message: "Usuário atualizado." });
    } else {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (err) {
    res.status(err.status).json({ message: err.message });
    return;
  }
};

const remove = async (req, res) => {
  const token = req.cookies["token"];
  if (!token) return res.status(401).json({ message: "Não autorizado." });
  const payload = Auth.decodeJwt(token);
  const id = payload.sub;

  try {
    User.destroy({ where: { id: id } })
      .then(() => {
        return res
          .clearCookie("token")
          .status(200)
          .json({ message: "Usuário deletado com sucesso." });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
    return;
  }
};

const logout = async (req, res) => {
  try {
    if (req.cookies["token"]) {
      return res.clearCookie("token").status(200).json({
        message: "Você foi deslogado",
      });
    } else {
      return res.status(404).json({
        message: "Token não encontrado",
      });
    }
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};

module.exports = {
  register,
  login,
  auth,
  getDetails,
  update,
  remove,
  logout,
};
