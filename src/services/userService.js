// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });



// export const getUsers = (page = 1, limit = 5) =>
//   API.get(`/users?page=${page}&limit=${limit}`);


// export const deleteUser = (id) =>
//   API.delete(`/users/${id}`);



// export const searchUsers = (keyword) =>
//   API.get(`/users/search?keyword=${keyword}`);


// export const exportCSV = () =>
//   window.open("http://localhost:5000/api/users/export/csv");


import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});



// GET USERS
export const getUsers = (page = 1, limit = 5) =>
  API.get(`/users?page=${page}&limit=${limit}`);



// GET SINGLE USER
export const getSingleUser = (id) =>
  API.get(`/users/${id}`);



// CREATE USER
export const createUser = (userData) =>
  API.post("/users", userData);



// UPDATE USER
export const updateUser = (id, userData) =>
  API.put(`/users/${id}`, userData);



// DELETE USER
export const deleteUser = (id) =>
  API.delete(`/users/${id}`);



// SEARCH USER
export const searchUsers = (keyword) =>
  API.get(`/users/search?keyword=${keyword}`);



// EXPORT CSV
export const exportCSV = () =>
  window.open("http://localhost:5000/api/users/export/csv");