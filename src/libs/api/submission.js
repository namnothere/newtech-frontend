import Axios from "axios";

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5lbSIsInN1YiI6IjNiZDE5YzUyLTE1MjItNDdhZi05MTEyLWI2MThiOTM1NTU0NCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzAyODg0NzE0LCJleHAiOjE3MDI5MjA3MTQsImlzcyI6IkF1dGhTZXJ2aWNlIn0.bnz2EYNz_3kFWoQRULqCRg_625jBOM9ljwmHGJe9HMZRaza-ANMX-zZc7bgUSud8L3laHBVNuOKhos6vVy0VttaeUScy_w4r3D2e3t7OLJaVTkd0uxC8CTLWD788WO5V-n4tGS3w3K46B0JLNe_Lo0O82tv7uGfxtsHUO4bAg9Vp9BgLmeqaXyhqArDepZ45_2M3iO2lzSgPMsaTE5oQ4nrbvsNrlNM-mOBSAdpilpglVpU3YSsi3zkmREHvoTRqZ8h5x79m15alTJYTX_XDYrwgZ8Uoj3SIsN-LCZVIT-0WT1lvdaTv5brGNlrBq77Bw6yetJTxraxfy79gLTtg5ofc1Wmb4_-Zs-TKZV9yFpJ9T-B7-AF7T3XcRbVAmamOVu5he9FTBMrnAI5wT7UmuyHNB3yuqjAhOcjkyqkIPjAJN7fN9g9bvgOL4gHgmt4Gi6N1Z36MdFiEwZ5YD8jjiW8w-wjOJk-KUqDvoufTeDxKmpniys6RSCkPng-3qxFQ434DiywT6lTPLq99f6TtZsVks_NCmqEHBfD1Ko6mDejWjztWJeEh8z1iV8pkTi4v7y4fAeFx84WgaM7gAjTI8dmhdFn6LtCvLng0ZXYPAtHk6sZoqp4qBUCpv5HvYfYIjagK7JaNbkl8uIKL1Pv2c4LP-i_qXFq4c7OgyMX_S9A";

export const getSubmissions = async () => {
  return await Axios.get(
    "https://newtech-api.vercel.app/api/v1/admin/research/topic-submission/filter/all",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const approveSubmission = async (id) => {
  return await Axios.get(
    "https://newtech-api.vercel.app/api/v1/admin/research/topic-submission/review/approve?id=" + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const rejectSubmisison = async (id) => {
  return await Axios.get(
    "https://newtech-api.vercel.app/api/v1/admin/research/topic-submission/review/reject?id=" + id,
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
