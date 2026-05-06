import { Routes, Route } from "react-router-dom";

import UserList from "../pages/UserList";
import AddEditUser from "../pages/AddEditUser";
import ViewUser from "../pages/ViewUser";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />

      <Route path="/add-user" element={<AddEditUser />} />

      <Route path="/edit-user/:id" element={<AddEditUser />} />

      <Route path="/view-user/:id" element={<ViewUser />} />
    </Routes>
  );
};

export default AppRoutes;