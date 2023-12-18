import Axios from "axios";
import { HOST_DOMAIN } from "../../common/constants";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("accessToken");
};

const token = getTokenFromLocalStorage();

export const getSubmissions = async () => {
  return await Axios.get(
    `${HOST_DOMAIN}/admin/research/topic-submission/filter/all`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const approveSubmission = async (id) => {
  return await Axios.get(
    `${HOST_DOMAIN}/admin/research/topic-submission/review/approve?id=` + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const rejectSubmisison = async (id) => {
  return await Axios.get(
    `${HOST_DOMAIN}/admin/research/topic-submission/review/reject?id=` + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getTopicById = async (id) => {
  return await Axios.get(
    `${HOST_DOMAIN}/admin/research/topic/` + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
