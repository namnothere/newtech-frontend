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

export const registerTopic = async (payload) => {
  return await Axios.post(
    `${HOST_DOMAIN}/research/topic-registration`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export const updateRegisterTopic = async (id, payload) => {
  return await Axios.patch(
    `${HOST_DOMAIN}/research/topic-registration/` + id,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export const getRegisterById = async (id) => {
  return await Axios.get(
    `${HOST_DOMAIN}/admin/research/topic-registration/filter/` + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}