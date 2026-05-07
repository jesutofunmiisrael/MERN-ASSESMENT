import { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import {
  Add,
  Delete,
  Download,
  Edit,
  Search,
  Visibility,
} from "@mui/icons-material";

import { Link } from "react-router-dom";

import Swal from "sweetalert2";

import { toast } from "react-toastify";

import {
  deleteUser,
  exportCSV,
  getUsers,
  searchUsers,
} from "../services/userService";



const UserList = () => {

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");



  // FETCH USERS
  const fetchUsers = async () => {

    try {

      setLoading(true);

      const { data } = await getUsers(page);

      setUsers(data.users);

      setTotalPages(data.totalPages);

    } catch (error) {

      toast.error("Failed to fetch users");

    } finally {

      setLoading(false);

    }
  };



  // DELETE USER
  const handleDelete = async (id) => {

    const result = await Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {

      await deleteUser(id);

      toast.success("User deleted successfully");

      fetchUsers();

    } catch (error) {

      toast.error("Delete failed");

    }
  };



  // SEARCH USER
  const handleSearch = async () => {

    try {

      if (!search.trim()) {

        fetchUsers();

        return;
      }

      setLoading(true);

      const { data } = await searchUsers(search);

      setUsers(data.users);

    } catch (error) {

      toast.error("Search failed");

    } finally {

      setLoading(false);

    }
  };



  useEffect(() => {

    fetchUsers();

  }, [page]);



  return (

    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f7fb",
        py: { xs: 3, md: 5 },
      }}
    >

      <Container maxWidth="xl">

        {/* HEADER */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            borderRadius: 5,
          }}
        >

          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={3}
            sx={{
              alignItems: {
                xs: "stretch",
                lg: "center",
              },
              justifyContent: "space-between",
            }}
          >

            <Box>

              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  fontSize: {
                    xs: "30px",
                    md: "42px",
                  },
                }}
              >
                User Management
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                mt={1}
              >
                Manage users, search records and export data
              </Typography>

            </Box>



            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              width={{ xs: "100%", lg: "auto" }}
            >

              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={exportCSV}
                fullWidth
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                  height: 50,
                  fontWeight: "bold",
                }}
              >
                Export CSV
              </Button>



              <Button
                component={Link}
                to="/add-user"
                variant="contained"
                color="success"
                startIcon={<Add />}
                fullWidth
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                  height: 50,
                  fontWeight: "bold",
                }}
              >
                Add User
              </Button>

            </Stack>

          </Stack>

        </Paper>



        {/* SEARCH */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            borderRadius: 5,
          }}
        >

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
          >

            <TextField
              fullWidth
              label="Search by name or email"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />



            <Button
              variant="contained"
              startIcon={<Search />}
              onClick={handleSearch}
              sx={{
                minWidth: {
                  xs: "100%",
                  md: 170,
                },
                borderRadius: 3,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Search
            </Button>

          </Stack>

        </Paper>



        {/* TABLE */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: 5,
            overflow: "hidden",
          }}
        >

          <TableContainer
            sx={{
              overflowX: "auto",
            }}
          >

            <Table
              sx={{
                minWidth: 900,
              }}
            >

              <TableHead>

                <TableRow
                  sx={{
                    background:
                      "linear-gradient(to right, #1976d2, #42a5f5)",
                  }}
                >

                  <TableCell
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    User
                  </TableCell>



                  <TableCell
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Email
                  </TableCell>



                  <TableCell
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Mobile
                  </TableCell>



                  <TableCell
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Gender
                  </TableCell>



                  <TableCell
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Status
                  </TableCell>



                  <TableCell
                    sx={{
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Actions
                  </TableCell>

                </TableRow>

              </TableHead>



              <TableBody>

                {loading ? (

                  <TableRow>

                    <TableCell
                      colSpan={6}
                      align="center"
                    >

                      <Box py={6}>

                        <CircularProgress />

                      </Box>

                    </TableCell>

                  </TableRow>

                ) : users.length > 0 ? (

                  users.map((user) => (

                    <TableRow
                      key={user._id}
                      hover
                    >

                      {/* USER */}
                      <TableCell>

                        <Stack
                          direction="row"
                          spacing={2}
                          sx={{
                            alignItems: "center",
                          }}
                        >

                          <Avatar
                            src={user.image}
                            alt={user.firstName}
                            sx={{
                              width: 55,
                              height: 55,
                              border:
                                "2px solid #e3f2fd",
                            }}
                          >
                            {user.firstName?.charAt(0)}
                          </Avatar>



                          <Box>

                            <Typography
                              fontWeight={700}
                              fontSize="16px"
                            >
                              {user.firstName}{" "}
                              {user.lastName}
                            </Typography>



                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              {user.location}
                            </Typography>

                          </Box>

                        </Stack>

                      </TableCell>



                      {/* EMAIL */}
                      <TableCell>
                        {user.email}
                      </TableCell>



                      {/* MOBILE */}
                      <TableCell>
                        {user.mobile}
                      </TableCell>



                      {/* GENDER */}
                      <TableCell>
                        {user.gender}
                      </TableCell>



                      {/* STATUS */}
                      <TableCell>

                        <Chip
                          label={user.status}
                          color={
                            user.status === "Active"
                              ? "success"
                              : "error"
                          }
                          size="small"
                          sx={{
                            fontWeight: "bold",
                          }}
                        />

                      </TableCell>



                      {/* ACTIONS */}
                      <TableCell>

                        <Stack
                          direction="row"
                          spacing={1}
                        >

                          <IconButton
                            component={Link}
                            to={`/view-user/${user._id}`}
                            color="info"
                          >
                            <Visibility />
                          </IconButton>



                          <IconButton
                            component={Link}
                            to={`/edit-user/${user._id}`}
                            color="primary"
                          >
                            <Edit />
                          </IconButton>



                          <IconButton
                            color="error"
                            onClick={() =>
                              handleDelete(user._id)
                            }
                          >
                            <Delete />
                          </IconButton>

                        </Stack>

                      </TableCell>

                    </TableRow>

                  ))

                ) : (

                  <TableRow>

                    <TableCell
                      colSpan={6}
                      align="center"
                    >

                      <Box py={6}>

                        <Typography
                          variant="h6"
                          fontWeight="bold"
                        >
                          No Users Found
                        </Typography>

                      </Box>

                    </TableCell>

                  </TableRow>

                )}

              </TableBody>

            </Table>

          </TableContainer>

        </Paper>



        {/* PAGINATION */}
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
          }}
        >

          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) =>
              setPage(value)
            }
            color="primary"
          />

        </Box>

      </Container>

    </Box>
  );
};



export default UserList;