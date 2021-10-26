import React from "react";
import "./index.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, TextField } from "@mui/material";
import useAuth from "../../hooks/useAuth";

const validationSchema = yup.object({
  name: yup.string().min(4, "Too Short!").required("name is required"),
});

export const LoginForm = (): JSX.Element => {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      login(values.name);
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
