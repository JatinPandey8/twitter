import { Button, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { blue } from '@mui/material/colors';
import React from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../Store/Auth/Action';

// use of  formik and yup
const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string().required("Password is required")
});


const SigninForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
        console.log("Form submitted with values: ", values); 
  const result = await dispatch(loginUser(values));
   console.log("Login result: ", result); 
  if (result.success) {
    console.log("Login successful, navigating to homepage...");
    navigate("/");  
  }else {
        console.error("Login failed:", result.error);  // Log the error if login fails
      }
}}
);

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        variant="outlined"
                        size="large"
                        autoComplete="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Password"
                        //type="password"
                        name="password"
                        variant="outlined"
                        size="large"
                        autoComplete="current-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </Grid>
                <Grid className="mt-20" item xs={12}>
                    <Button
                        fullWidth
                        sx={{
                            borderRadius: "29px",
                            py: "15px",
                            bgcolor: blue[500],
                            '&:hover': {
                                bgcolor: blue[700]
                            }
                        }}
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={formik.isSubmitting}
                    >Signin</Button>
                </Grid>
            </Grid>
        </form>
    );
}
export default SigninForm;