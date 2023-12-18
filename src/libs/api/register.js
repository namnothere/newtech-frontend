import Axios from "axios";
import { HOST_DOMAIN } from "../../common/constants";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("accessToken");
};

const token = getTokenFromLocalStorage();

export const getRegisters = async () => {
  return await Axios.get(
    `${HOST_DOMAIN}/admin/research/topic-registration/filter/all`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const approveRegister = async (id) => {
  return await Axios.get(
    `${HOST_DOMAIN}/admin/research/topic-registration/review/approve?id=` + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const rejectRegister = async (id) => {
  return await Axios.get(
    `${HOST_DOMAIN}/admin/research/topic-registration/review/reject?id=` + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};