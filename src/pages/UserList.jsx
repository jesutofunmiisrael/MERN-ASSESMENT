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



  const handleDelete = async (id) => {

    const result = await Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    try {

      await deleteUser(id);

      toast.success("User deleted");

      fetchUsers();

    } catch (error) {

      toast.error("Delete failed");

    }
  };



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
        py: { xs: 2, md: 5 },
      }}
    >

      <Container maxWidth="xl">

        {/* HEADER */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 4 },
            mb: 3,
            borderRadius: 4,
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
                    xs: "28px",
                    md: "40px",
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
                Manage users and export records
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
                  height: 48,
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
                  height: 48,
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
            p: { xs: 2, md: 4 },
            mb: 3,
            borderRadius: 4,
          }}
        >

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
          >

            <TextField
              fullWidth
              label="Search user"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />



            <Button
              variant="contained"
              startIcon={<Search />}
              onClick={handleSearch}
              sx={{
                minWidth: { xs: "100%", md: 150 },
                borderRadius: 3,
                textTransform: "none",
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
            borderRadius: 4,
            overflow: "hidden",
          }}
        >

          <TableContainer
            sx={{
              overflowX: "auto",
            }}
          >

            <Table sx={{ minWidth: 800 }}>

              <TableHead>

                <TableRow
                  sx={{
                    backgroundColor: "#1976d2",
                  }}
                >

                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    User
                  </TableCell>

                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    Email
                  </TableCell>

                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    Mobile
                  </TableCell>

                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    Gender
                  </TableCell>

                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    Status
                  </TableCell>

                  <TableCell sx={{ color: "#fff", fontWeight: 700 }}>
                    Actions
                  </TableCell>

                </TableRow>

              </TableHead>



              <TableBody>

                {loading ? (

                  <TableRow>

                    <TableCell colSpan={6} align="center">

                      <Box py={5}>
                        <CircularProgress />
                      </Box>

                    </TableCell>

                  </TableRow>

                ) : users.length > 0 ? (

                  users.map((user) => (

                    <TableRow key={user._id} hover>

                      <TableCell>

                        <Stack
                          direction="row"
                          spacing={2}
                          sx={{
                            alignItems: "center",
                          }}
                        >

                          <Avatar>
                            {user.firstName?.charAt(0)}
                          </Avatar>

                          <Box>

                            <Typography fontWeight={600}>
                              {user.firstName} {user.lastName}
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



                      <TableCell>
                        {user.email}
                      </TableCell>

                      <TableCell>
                        {user.mobile}
                      </TableCell>

                      <TableCell>
                        {user.gender}
                      </TableCell>



                      <TableCell>

                        <Chip
                          label={user.status}
                          color={
                            user.status === "Active"
                              ? "success"
                              : "error"
                          }
                          size="small"
                        />

                      </TableCell>



                      <TableCell>

                        <Stack direction="row">

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
                            onClick={() => handleDelete(user._id)}
                          >
                            <Delete />
                          </IconButton>

                        </Stack>

                      </TableCell>

                    </TableRow>

                  ))

                ) : (

                  <TableRow>

                    <TableCell colSpan={6} align="center">

                      <Box py={5}>

                        <Typography>
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
            onChange={(e, value) => setPage(value)}
            color="primary"
          />

        </Box>

      </Container>

    </Box>
  );
};



export default UserList;