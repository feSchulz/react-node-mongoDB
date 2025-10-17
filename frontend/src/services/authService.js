import {api, requestConfig } from "../utils/config";

//Registrar um usuario

const register = async (data) => {
    const config = requestConfig("POST", data);
    console.log("Registrar um usuario.configuracao: ", config);
    try {
        const res = await fetch(api + "/users/register", config)
            .then((res) => res.json())
            .catch((err) => err);
        if (res) {
            localStorage.setItem("user", JSON.stringify(res));
        }
        return res;
    } catch (error) {
        console.log("Erro: ", error);
    }
    
};

//logout an user
const logout = () => {
    localStorage.removeItem("user");


}

//Sing in an user
const login = async(data) => {
    try {
        const config = requestConfig("POST", data);
        const res = await fetch(api + "/users/login", config).then((res) => res.json()).catch((err) => err);
        
        if (res._id) {
          localStorage.setItem("user", JSON.stringify(res));
        }

        return res;


    } catch (error) {
        console.log(error);
    }
}


const authServices = {
  register,
  logout,
  login,
};

export default authServices;