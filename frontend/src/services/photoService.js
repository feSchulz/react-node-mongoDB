import { api, requestConfig } from "../utils/config";

const publishPhoto = async (data, token) => {
  const config = requestConfig("POST", data, token, true);
  try {
    const res = await fetch(api + "/photos", config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// Delete a photo

const deletePhoto = async (id, token) => {
  try {
    const config = requestConfig("DELETE", null, token);
    const res = await fetch(api + "/photos/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get User photo

const getUserPhoto = async (id, token) => {
  try {
    const config = requestConfig("GET", null, token);
    const res = await fetch(api + "/photos/user/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// const updatePhoto

const updatePhoto = async (data, id, token) => {
  try {
    const config = requestConfig("PUT", data, token);
    const res = await fetch(api + "/photos/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getPhoto = async (id, token) => {
  try {
    const config = requestConfig("GET", null, token);
    const res = await fetch(api + "/photos/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const like = async (id, token) => {
  try {
    const config = requestConfig("PUT", null, token);
    const res = await fetch(api + "/photos/like/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// add comment to a photo

const comment = async (data, id, token) => {
  try {
    const config = requestConfig("PUT", data, token);
    const res = await fetch(api + "/photos/comment/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// get todas as fotos:
const getAllPhotos = async (token) => {
  try {
    const config = requestConfig("GET", null, token);
    const res = await fetch(api + "/photos", config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Search photo bay title

const searchPhotos = async (query,token) => {
  try {
    const config = requestConfig("GET", null, token);
    const res = await fetch(api + "/photos/search?q=" + query, config).then((res) => res.json()).catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
}

const photoService = {
  publishPhoto,
  getUserPhoto,
  deletePhoto,
  updatePhoto,
  getPhoto,
  like,
  comment,
  getAllPhotos,
  searchPhotos,
};

export default photoService;
