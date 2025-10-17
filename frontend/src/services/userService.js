import { api, requestConfig } from "../utils/config";

//getUser detail

const profile = async (data, token) => {
  try {
    const config = requestConfig("GET", data, token);
    console.log(config);
    const res = await fetch(api + "/users/profile", config)
      .then((res) => res.json())
      .catch((err) => err);
    console.log("Json de resposta: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//update user details
const updateProfile = async (data, token) => {
  try {
    const config = requestConfig("PUT", data, token, true);
    console.log("config", config);
    const res = await fetch(api + "/users/", config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

//Get user details
const getUserDetails = async(id) => {
  try {
    const config = requestConfig("GET");
    const res = await fetch(api+"/users/"+id,config).then((res)=>res.json()).catch((err)=>err)
    return res;
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  profile,
  updateProfile,
  getUserDetails,
};

export default userService;
