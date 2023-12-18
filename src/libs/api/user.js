import Axios from "axios";
import { HOST_DOMAIN } from "../../common/constants";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("accessToken");
};
  
const token = getTokenFromLocalStorage();

export const logout = async () => {
  try {
    return await Axios.post(
      `${HOST_DOMAIN}/auth/logout`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )} catch (error) {
    console.log(error);
  }
};
  
export const login = async (username, password) => {
  try {
    let data = {
      "username": username,
      "password": password
    };
    await Axios.post(
      `${HOST_DOMAIN}/auth/login`,
      data
    ).then((res) => {
      localStorage.setItem("accessToken", res?.data?.data?.token);
      localStorage.setItem("refreshToken", res?.data?.data?.refreshToken);
      localStorage.setItem("role", res?.data?.data?.user?.role);
    })
    } catch (error) {
      console.log(error);
    }
  };
  