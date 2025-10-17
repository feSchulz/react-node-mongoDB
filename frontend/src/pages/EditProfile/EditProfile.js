import "./EditProfile.css";

import { uploads } from "../../utils/config";
//hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//redux
import {
  profile,
  resetMessage,
  resetProfile,
  updateProfile,
} from "../../slices/userSlice";

//components
import Message from "../../components/Message";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user, message, error, loading } = useSelector((state) => state.user);
  
  //stats
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  //load userData

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  //fill from user data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // getter user data from states
    const userData = {
      name,
      bio,
    };

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (password) {
      userData.password = password;
    }
    console.log("envia dado", userData);
    //build Form data
    const formData = new FormData();
    Object.keys(userData).forEach((key) => formData.append(key, userData[key]));
    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = (e) => {
    e.preventDefault();
    console.log("Arquivo de imagem", e.target.files[0]);
    const image = e.target.files[0];
    setPreviewImage(image);
    //update image state
    setProfileImage(image);
  };
  return (
    <div id="edit-profile">
      <h2>Edite seus Dados</h2>
      <p className="subtitle">Adicione uma imagem e conte mais sobre você...</p>
      {(user.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${uploads}/users/${user.profileImage}`
          }
          alt={user.name}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input type="email" placeholder="E-mail" value={email || ""} disabled />
        <label>
          <span>Image do perfil:</span>
          <input type="file" alt="imagem Perfil" onChange={handleFile} />
        </label>
        <label>
          <span>Bio:</span>
          <input
            type="text"
            placeholder="Descrição do Perfil"
            onChange={(e) => setBio(e.target.value)}
            value={bio || ""}
          />
        </label>
        <label>
          <span>Quer alterar sua senha ?</span>
          <input
            type="current-password"
            placeholder="Digite sua nova senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </label>
        {!loading && <input type="submit" value="Atualizar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default EditProfile;
