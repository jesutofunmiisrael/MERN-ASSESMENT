import { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  ArrowBack,
  Email,
  LocationOn,
  Phone,
  Person,
} from "@mui/icons-material";

import {
  Link,
  useParams,
} from "react-router-dom";

import { toast } from "react-toastify";

import { getSingleUser } from "../services/userService";



const ViewUser = () => {

  const { id } = useParams();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);



  // FETCH USER
  const fetchUser = async () => {

    try {

      setLoading(true);

      const { data } = await getSingleUser(id);

      setUser(data.user);

    } catch (error) {

      toast.error("Failed to fetch user");

    } finally {

      setLoading(false);

    }
  };



  useEffect(() => {

    fetchUser();

  }, []);




  if (loading) {

    return (

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f4f7fb",
        }}
      >

        <CircularProgress />

      </Box>
    );
  }



  return (

    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f7fb",
        py: { xs: 3, md: 5 },
      }}
    >

      <Container maxWidth="md">

        <Paper
          elevation={0}
          sx={{
            borderRadius: 5,
            overflow: "hidden",
          }}
        >

          {/* TOP SECTION */}
          <Box
            sx={{
              background:
                "linear-gradient(to right, #1976d2, #42a5f5)",
              p: { xs: 4, md: 5 },
              color: "#fff",
              textAlign: "center",
            }}
          >

            <Avatar
              src={user?.image}
              alt={user?.firstName}
              sx={{
                width: 130,
                height: 130,
                margin: "0 auto",
                fontSize: "40px",
                fontWeight: "bold",
                mb: 2,
                border: "4px solid rgba(255,255,255,0.3)",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.2)",
              }}
            >
              {user?.firstName?.charAt(0)}
            </Avatar>



            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                fontSize: {
                  xs: "28px",
                  md: "38px",
                },
              }}
            >
              {user?.firstName} {user?.lastName}
            </Typography>



            <Typography
              variant="body1"
              sx={{
                opacity: 0.9,
                mt: 1,
              }}
            >
              {user?.location}
            </Typography>



            <Chip
              label={user?.status}
              color={
                user?.status === "Active"
                  ? "success"
                  : "error"
              }
              sx={{
                mt: 2,
                fontWeight: "bold",
              }}
            />

          </Box>



          {/* DETAILS */}
          <Box
            sx={{
              p: { xs: 3, md: 5 },
            }}
          >

            <Typography
              variant="h5"
              fontWeight="bold"
              mb={3}
            >
              User Information
            </Typography>

            <Divider sx={{ mb: 4 }} />



            <Grid container spacing={4}>

              {/* FULL NAME */}
              <Grid item xs={12} md={6}>

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >

                  <Person color="primary" />

                  <Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Full Name
                    </Typography>

                    <Typography fontWeight={600}>
                      {user?.firstName} {user?.lastName}
                    </Typography>

                  </Box>

                </Stack>

              </Grid>



              {/* EMAIL */}
              <Grid item xs={12} md={6}>

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >

                  <Email color="primary" />

                  <Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Email Address
                    </Typography>

                    <Typography fontWeight={600}>
                      {user?.email}
                    </Typography>

                  </Box>

                </Stack>

              </Grid>



              {/* MOBILE */}
              <Grid item xs={12} md={6}>

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >

                  <Phone color="primary" />

                  <Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Mobile Number
                    </Typography>

                    <Typography fontWeight={600}>
                      {user?.mobile}
                    </Typography>

                  </Box>

                </Stack>

              </Grid>



              {/* LOCATION */}
              <Grid item xs={12} md={6}>

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >

                  <LocationOn color="primary" />

                  <Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Location
                    </Typography>

                    <Typography fontWeight={600}>
                      {user?.location}
                    </Typography>

                  </Box>

                </Stack>

              </Grid>



              {/* GENDER */}
              <Grid item xs={12} md={6}>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Gender
                </Typography>

                <Typography fontWeight={600}>
                  {user?.gender}
                </Typography>

              </Grid>



              {/* STATUS */}
              <Grid item xs={12} md={6}>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Status
                </Typography>

                <Typography fontWeight={600}>
                  {user?.status}
                </Typography>

              </Grid>

            </Grid>



            {/* BUTTON */}
            <Box mt={5}>

              <Button
                component={Link}
                to="/"
                variant="contained"
                startIcon={<ArrowBack />}
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                  px: 3,
                  py: 1,
                  fontWeight: "bold",
                }}
              >
                Back to Users
              </Button>

            </Box>

          </Box>

        </Paper>

      </Container>

    </Box>
  );
};



export default ViewUser;