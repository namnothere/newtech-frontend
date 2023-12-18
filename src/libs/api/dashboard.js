import Axios from "axios";

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5lbSIsInN1YiI6IjNiZDE5YzUyLTE1MjItNDdhZi05MTEyLWI2MThiOTM1NTU0NCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzAyODMwNTE2LCJleHAiOjE3MDI4MzQxMTYsImlzcyI6IkF1dGhTZXJ2aWNlIn0.g7yxga2ZdwziUvF7c3ym2pn3ec76n5ax3FIWyka3J4Ltf1L-aBwWxmDV3GFLty-tcmmTO0zgouEHLyNPUZpG7A0R-_XeP2WnrB34s56xCXSxBt04xhfFu8_gsfRgdDxR_BUNfLgN2HolQsE_gl_BTdxArh52oQltXXBqaqDALIufGqM9vXoQZ-AzMaeccCfxzv3zvOkT3OlZ7aI8de9LjBFAuWlS-DFNi29WtnQRX47sB7YOlJO89tqcA-0IOQmVR4-JGIAanVGapx2Kuo39w0wn7QoIh-Wwvc8WzQ4reJeDL-x11V6Lto0Vm04GIZ-iaCGg6zLuyfXjO8vU-cCM9vCOq7V61COgJmjroeEadYtFczD0Tb0Fbm00ZmT_-33OL99Z2FryFOTVQx-kGV2bbjfW49Ioq2y_d8dnT4CMjESUN_um7SCMwYZkD9XZ1e7OLjRs52_3cmDAS2s05APkTLQGRAjcPKnngtl-I8CO5z_051HZaNAcdZVV80QRFTRCQdyvBYc06XRta51bgtCCUtlDYwFwrIc9eSHBGZ1ycWHaII3fNBbJaM6yKXWacaLd-jOe8fWolxMFfPkHhU1gFqksmR-isqJV5xFHCsICNoQY_aOPavKxGSnpLW8kxnUZODA2rRTJNDTthOBl39G8JIWlLnAlRq1baZq33bWYgIU";

export const getDashboard = async () => {
  return await Axios.get(
    "https://newtech-api.vercel.app/api/v1/admin/research/topic/all",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteTopic = async (id) => {
  return await Axios.delete(
    "https://newtech-api.vercel.app/api/v1/admin/research/topic/" + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createTopic = async (payload) => {
  return await Axios.post(
    "https://newtech-api.vercel.app/api/v1/admin/research/topic/",
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
