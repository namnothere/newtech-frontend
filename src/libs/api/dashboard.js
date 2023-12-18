import Axios from "axios";
import { HOST_DOMAIN } from "../../common/constants";
const getTokenFromLocalStorage = () => {
  return localStorage.getItem("accessToken");
};

const token = getTokenFromLocalStorage();

export const getDashboard = async () => {
  return await Axios.get(
    `${HOST_DOMAIN}/admin/research/topic/all`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteTopic = async (id) => {
  return await Axios.delete(
    `${HOST_DOMAIN}/admin/research/topic/` + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createTopic = async (payload) => {
  return await Axios.post(
    `${HOST_DOMAIN}/admin/research/topic/`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateTopic = async (id, payload) => {
  return await Axios.patch(
    "https://newtech-api.vercel.app/api/v1/admin/research/topic/" + id,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getTopicById = async (id) => {
  return await Axios.get(
    "https://newtech-api.vercel.app/api/v1/admin/research/topic/" + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
