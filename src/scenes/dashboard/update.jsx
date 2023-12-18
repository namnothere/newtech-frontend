import {
  Box,
  Button,
  RadioGroup,
  TextField,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/layout/Header";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getTopicById, updateTopic } from "../../libs/api/dashboard";

const Update = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState({
    name: "",
    approved_budget: "",
    approved_hours: "",
    completion_status: "in_progress",
    // activityId: "09743399-b536-41f1-9c82-b6c21fefaafb",
  });

  const handleFormSubmit = async (values) => {
    await updateTopic(id, {
      ...values,
      approved_budget: Number(values.approved_budget),
      approved_hours: Number(values.approved_hours),
    });
    toast.success("Cập nhật thông tin thành công");
    navigate("/admin");
  };
  
  useEffect(() => {
    const getInfo = async (id) => {
      const res = await getTopicById(id);
      setInitialValues({
        name: res?.data?.data?.name,
        approved_budget: Number(res?.data?.data?.approved_budget) || "",
        approved_hours: Number(res?.data?.data?.approved_hours) || "",
      });
    };
    getInfo(id);
  }, [id]);

  return (
    <Box m="20px">
      <Header title="UPDATE TOPIC" subtitle="Cập nhật đề tài" />

      <Formik
        enableReinitialize={true}
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Ngân sách"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.approved_budget}
                name="approved_budget"
                error={!!touched.approved_budget && !!errors.approved_budget}
                helperText={touched.approved_budget && errors.approved_budget}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Số giờ"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.approved_hours}
                name="approved_hours"
                error={!!touched.approved_hours && !!errors.approved_hours}
                helperText={touched.approved_hours && errors.approved_hours}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Cập nhật đề tài
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Không được để trống"),
});

export default Update;
