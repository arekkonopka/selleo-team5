import React from "react";
import "./index.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, TextField } from "@mui/material";
import { useHistory } from "react-router";

const validationSchema = yup.object({
  name: yup
    .string("Enter your name")
    .min(4, "Too Short!")
    .required("name is required"),
});

const LoginForm = () => {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      localStorage.setItem("name", JSON.stringify(values.name));
      history.push("/tracker");
    },
  });

  return (
    <div className="form-wrapper">
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          placeholder="Wpisz swój nick"
        />
        <Box mt={1}>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            className="button"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default LoginForm;
