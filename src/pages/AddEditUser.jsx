import { useEffect } from "react";

import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { ArrowBack } from "@mui/icons-material";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import { toast } from "react-toastify";

import {
  createUser,
  getSingleUser,
  updateUser,
} from "../services/userService";



const schema = yup.object({
  firstName: yup.string().required("First name is required"),

  lastName: yup.string().required("Last name is required"),

  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  mobile: yup
    .string()
    .required("Mobile number is required"),

  gender: yup.string().required("Gender is required"),

  status: yup.string().required("Status is required"),

  location: yup.string().required("Location is required"),
});



const AddEditUser = () => {

  const navigate = useNavigate();

  const { id } = useParams();



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });




  const fetchUser = async () => {

    try {

      const { data } = await getSingleUser(id);

      reset(data.user);

    } catch (error) {

      toast.error("Failed to fetch user");

    }
  };



  useEffect(() => {

    if (id) {
      fetchUser();
    }

  }, [id]);



 
  const onSubmit = async (formData) => {

    try {

      if (id) {

        await updateUser(id, formData);

        toast.success("User updated successfully");

      } else {

        await createUser(formData);

        toast.success("User created successfully");

      }

      navigate("/");

    } catch (error) {
    toast.error(
  error.response?.data?.message || "Something went wrong"
);

    }
  };



  return (

    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f7fb",
        py: 5,
      }}
    >

      <Container maxWidth="md">

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
          }}
        >

          {/* HEADER */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {id ? "Edit User" : "Add User"}
            </Typography>



            <Button
              component={Link}
              to="/"
              startIcon={<ArrowBack />}
            >
              Back
            </Button>

          </Stack>



          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>

            <Grid container spacing={3}>

              <Grid item xs={12} md={6}>

                <TextField
                  fullWidth
                  label="First Name"
                  {...register("firstName")}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />

              </Grid>



              <Grid item xs={12} md={6}>

                <TextField
                  fullWidth
                  label="Last Name"
                  {...register("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />

              </Grid>



              <Grid item xs={12} md={6}>

                <TextField
                  fullWidth
                  label="Email"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />

              </Grid>



              <Grid item xs={12} md={6}>

                <TextField
                  fullWidth
                  label="Mobile"
                  {...register("mobile")}
                  error={!!errors.mobile}
                  helperText={errors.mobile?.message}
                />

              </Grid>



              <Grid item xs={12} md={6}>

                <TextField
                  select
                  fullWidth
                  label="Gender"
                  defaultValue=""
                  {...register("gender")}
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
                >

                  <MenuItem value="Male">
                    Male
                  </MenuItem>

                  <MenuItem value="Female">
                    Female
                  </MenuItem>

                </TextField>

              </Grid>



              <Grid item xs={12} md={6}>

                <TextField
                  select
                  fullWidth
                  label="Status"
                  defaultValue=""
                  {...register("status")}
                  error={!!errors.status}
                  helperText={errors.status?.message}
                >

                  <MenuItem value="Active">
                    Active
                  </MenuItem>

                  <MenuItem value="Inactive">
                    Inactive
                  </MenuItem>

                </TextField>

              </Grid>



              <Grid item xs={12}>

                <TextField
                  fullWidth
                  label="Location"
                  {...register("location")}
                  error={!!errors.location}
                  helperText={errors.location?.message}
                />

              </Grid>



              <Grid item xs={12}>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    textTransform: "none",
                    fontSize: "16px",
                  }}
                >
                  {id ? "Update User" : "Create User"}
                </Button>

              </Grid>

            </Grid>

          </form>

        </Paper>

      </Container>

    </Box>
  );
};



export default AddEditUser;