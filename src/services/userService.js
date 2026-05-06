import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-stack-backend-wg1p.onrender.com/api",
});



export const getUsers = (page = 1, limit = 5) =>
  API.get(`/users?page=${page}&limit=${limit}`);




export const getSingleUser = (id) =>
  API.get(`/users/${id}`);



export const createUser = (userData) =>
  API.post("/users", userData);




export const updateUser = (id, userData) =>
  API.put(`/users/${id}`, userData);




export const deleteUser = (id) =>
  API.delete(`/users/${id}`);



export const searchUsers = (keyword) =>
  API.get(`/users/search?keyword=${keyword}`);




export const exportCSV = () =>
  window.open(
    "https://mern-stack-backend-wg1p.onrender.com/api/users/export/csv"
  );



export default API;