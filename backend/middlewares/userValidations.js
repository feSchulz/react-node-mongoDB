const { body } = require("express-validator")

const userCreateValidation = () => {
    return [
      body("name")
        .isString()
        .withMessage("O nome é obrigatório.")
        .isLength({ min: 3 })
        .withMessage("O Nome precisa conter mais de 3 caracteres."),
      body("email")
        .isString()
        .withMessage("O e-mail é obrigatório.")
        .isEmail()
        .withMessage("Insira um e-mail valido."),
      body("password")
        .isString()
        .withMessage("A senha é obrigatória.")
        .isLength({ min: 6 })
        .withMessage("A senha precisa ter no minimo 6 caracteres."),
      body("confirmPassword")
        .isString()
        .withMessage("a confirmação da senha é obrigatória.")
        .custom((value, { req }) => {
          if (value != req.body.password) {
            throw new Error("as senhas não são iguais.");
          }
          return true;
        }),
    ];
};

const loguinValidation = () => {
    return [
      body("email")
        .isString()
        .withMessage("O e-mail é obrigatório.")
        .isEmail()
        .withMessage("Insira um e-mail valido."),
      body("password")
        .isString()
        .withMessage("A senha é obrigatória.")
        .isLength({ min: 6 })
        .withMessage("A senha precisa ter no minimo 6 caracteres."),
    ];
}

const userUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("O nome precisa de pelo menos 3 carcteres"),
    body("password")
      .optional().isLength({ min: 6 })
      .withMessage("A senha precis ter no minimo 5 caracteres"),
  ];
}

module.exports = {
  userCreateValidation,
  loguinValidation,
  userUpdateValidation,
};