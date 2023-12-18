import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/layout/Header";
import { useNavigate } from "react-router-dom";
import { createTopic } from "../../libs/api/dashboard";
import { toast } from "react-toastify";

const CreateTopic = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    try {
      createTopic({
        ...values,
        approved_budget: Number(values.approved_budget),
        approved_hours: Number(values.approved_hours),
      });
      toast.success("Thêm mới thành công");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE TOPIC" subtitle="Thêm mới đề tài" />

      <Formik
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
                Thêm mới đề tài
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
const initialValues = {
  name: "",
  approved_budget: "",
  approved_hours: "",
  activityId: "09743399-b536-41f1-9c82-b6c21fefaafb",
};

export default CreateTopic;
