const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { mongoose } = require("mongoose");
const jwtSecret = process.env.JWT_SECRET;

// Generate user token
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

// Registrar e logar usuario

const register = async (req, res) => {
  const { name, email, password } = req.body;

  //Usuario existe ?
  const user = await User.findOne({ email });

  if (user) {
    res.status(422).json({ errors: ["Por favor, utilize outro e-mail"] });
    return;
  }

  // Gerar um hash de senha
  const satlt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, satlt);

  //Criar o usuario

  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  // criado com sucesso, retorna o token
  if (!newUser) {
    res
      .status(422)
      .json({ errors: ["Houve um erro, por favor tente mais tarde"] });
    return;
  }

  res.status(201).json({
    _id: newUser.id,
    token: generateToken(newUser._id),
  });
};
// loguin de usuario
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  //verificar se o usuario existe
  if (!user) {
    res.status(404).json({ errors: ["Usuarios Não encontrado."] });
    return;
  }

  // verificar se a senha que o usuario mandou é a mesma do usuario no banco
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Senha invalida"] });
    return;
  }

  //return user with token
  res.status(201).json({
    _id: user.id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};

// Get current logged in user
const getCurrentUser = async (req, res) => {
  const user = req.user;
  res.status(200).json(user);
};

//update an user
const update = async (req, res) => {
  const { name, password, bio } = req.body;
  let profileImage = null;
  // Verifica se há um arquivo enviado pelo multer
  if (req.file) {
    profileImage = req.file.filename;
  }

  // Obtém o usuário da requisição (autenticado)
  const reqUser = req.user;
  
  try {
    // Valida o ID do usuário
    if (!mongoose.Types.ObjectId.isValid(reqUser._id)) {
      return res.status(400).json({ errors: ["Invalid user ID"] });
    }

    // Converte o ID para ObjectId
    const userId = new mongoose.Types.ObjectId(reqUser._id);

    // Busca o usuário no banco, excluindo a senha
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ errors: ["User not found"] });
    }

    // Atualiza os campos, se fornecidos
    if (name) {
      user.name = name;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10); // Especifica o custo do salt
      const passwordHash = await bcrypt.hash(password, salt);
      user.password = passwordHash;
    }

    if (profileImage) {
      user.profileImage = profileImage;
    }

    if (bio) {
      user.bio = bio;
    }

    // Salva as alterações
   const newUser = await user.save();
    console.log(newUser);
    // Retorna o usuário atualizado
    res.status(200).json(newUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ errors: ["Internal server error"] });
  }
};

const getUserByid = async (req, res) => {
  const { id } = req.params;

  try {
    const userId = new mongoose.Types.ObjectId(id);
    // Busca o usuário no banco, excluindo a senha
    const user = await User.findById(userId).select("-password");
    //check if user exists
    if (!user) {
      res.status(404).json({ errors: ["Usuario não encontrado"] });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ errors: ["Usuario não encontrado"] });
    return;
  }

  
};

module.exports = {
  register,
  login,
  getCurrentUser,
  update,
  getUserByid,
};
