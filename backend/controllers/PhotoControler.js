const Photo = require("../models/Photo");
const mongoose = require("mongoose");
const User = require("../models/User");

// incerindo uma foto com um usuario vinculado a ela

const InsertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;
  const user = await User.findById(reqUser._id);

  //Create a photo
//sss
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  // Criado com sucesso
  if (!newPhoto) {
    res.status(422).json({
      errors: ["Houve um problema, por favor tente novamente mais tarde."],
    });
  }

  console.log(req.body);
  res.status(201).json(newPhoto);
};

// removendo a foto no banco

const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;
  try {
    const objectId = await new mongoose.Types.ObjectId(id);
    const photo = await Photo.findById(objectId);
    //foto existe ?

    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
    }

    // foto pertence ao usuario

    if (!photo.userId.equals(reqUser._id)) {
      res.status(422).json({
        errors: ["Ocorreu um erro, por favor tente novamente mais tarde!"],
      });
    }

    await Photo.findByIdAndDelete(photo._id);

    res
      .status(200)
      .json({ id: photo._id, message: "Foto excluida com sucesso!!" });
  } catch (error) {
    res.status(404).json({
      errors: ["Foto não encontrada!"],
    });
  }
};

// pegar todas as fotos

const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["cratedAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

// pegar todas as fotos do usuario

const getUserPhotos = async (req, res) => {
  const { id } = req.params;
  const userId = id;

  const photos = await Photo.find({ userId })
    .sort([["createdAt", -1]])
    .exec();
  
  return res.status(200).json(photos);
};

// foto pelo ID

const getPhotoById = async (req, res) => {
  try {
    const { id } = req.params;

    const objectId = await new mongoose.Types.ObjectId(id);
    const photo = await Photo.findById(objectId);

    // Foto existe ?
    if (!photo) {
      res.status(404).json({
        errors: ["Foto não encontrada!"],
      });
      return;
    }
    res.status(200).json(photo);
  } catch (error) {
    res.status(404).json({
      errors: ["Foto não encontrada!"],
    });
  }
};

const updatePhoto = async (req, res) => {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const reqUser = req.user;
      const photo = await Photo.findById(id);

      //verifica se a photo existe

      if (!photo) {
        res.status(404).json({
          errors: ["Foto não encontrada!"],
        });
        return;
      }

      // verificar se a foto pertence ao usuario da requisição
      if (!photo.userId.equals(reqUser._id)) {
        res.status(404).json({
          errors: ["Ocorreu um erro, p-or favor tente novamente mais tarde."],
        });
        return;
      }

      if (title) {
        photo.title = title;
      }

      await photo.save();
      res.status(200).json({ photo, message: "Foto atualizada com sucesso" });
    } catch (error) {
      res.status(404).json({
        errors: ["Ocorreu um erro, por favor tente novamente mais tarde."],
      });
    }
};

const likePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const reqUser = req.user;
    const photo = await Photo.findById(id);

    if (!photo) {
      res.status(404).json({
        errors: ["Foto não encontrada!"],
      });
      return;
    }

    //verificar se o usuario ja deu like

    if (photo.likes.includes(reqUser._id)) {
      res.status(422).json({ errors: ["Você ja curtiu a foto."] });
    }

    //  adiciona o like do usuario na foto
    photo.likes.push(reqUser._id);
    photo.save();
    res.status(200).json({
      photoId: id,
      userId: reqUser._id,
      message: "a foto foi curtida",
    });
  } catch (error) {
    res.status(404).json({
      errors: ["Ocorreu um erro, por favor tente novamente mais tarde."],
    });
  }
};

//comentar uma foto
const commentPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const userReq = req.user;
    const { comment } = req.body;
    const user = await User.findById(userReq._id);
    const photo = await Photo.findById(id);

    if (!photo) {
      res.status(404).json({
        errors: ["Foto não encontrada!"],
      });
      return;
    }
    console.log(user);

    const userComment = {
      comment,
      userName: user.name,
      userImage: user.profileImage,
      userId: user._id,
    };
    photo.comments.push(userComment);
    await photo.save();
    res.status(200).json({
      comment: userComment,
      message: "O comentário foi adicionado com sucesso!!.",
    });
  } catch (error) {
    res.status(404).json({
      errors: ["Ocorreu um erro, por favor tente novamente mais tarde."],
    });
  }
};

// buscar uma foto pelo titulo
const searchPhotos = async (req, res) => {
  try {
    const { q } = req.query;
    const photos = await Photo.find({ title: new RegExp(q, "i") }).exec();
    res.status(200).json(photos)



  } catch (error) {
    res.status(404).json({
      errors: ["Ocorreu um erro, por favor tente novamente mais tarde."],
    });
  }
};

module.exports = {
  InsertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
};
