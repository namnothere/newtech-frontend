import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/layout/Header";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getRegisterById, updateRegisterTopic } from '../../libs/api/register';

const UserRegisterUpdate = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState({
    expected_budget: "",
    expected_hours: "",
    completion_status: "in_progress",
  });

  const handleFormSubmit = async (values) => {
    await updateRegisterTopic({
      ...values,
      topicId: id,
      expected_budget: Number(values.expected_budget),
      expected_hours: Number(values.expected_hours),
    });
    toast.success("Cập nhật thông tin thành công");
    navigate("/");
  };

  useEffect(() => {
    const getInfo = async (id) => {
      const res = await getRegisterById(id);
      setInitialValues({
        expected_budget: Number(res?.data?.data?.expected_budget) || "",
        expected_hours: Number(res?.data?.data?.expected_hours) || "",
      });
    };
    getInfo(id);
  }, [id]);

  return (
    <Box m="20px">
      <Header title="UPDATE REGISTER" subtitle="Cập nhật đăng kí" />

      <Formik
        enableReinitialize={true}
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
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
                label="Ngân sách"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.expected_budget}
                name="expected_budget"
                error={!!touched.expected_budget && !!errors.expected_budget}
                helperText={touched.expected_budget && errors.expected_budget}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Số giờ"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.expected_hours}
                name="expected_hours"
                error={!!touched.expected_hours && !!errors.expected_hours}
                helperText={touched.expected_hours && errors.expected_hours}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Cập nhật đăng kí
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default UserRegisterUpdate;
