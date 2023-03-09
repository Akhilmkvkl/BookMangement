import React from "react";
import AdminHome from "../../components/Admin/AdminHome";
import Header from "../../components/Navebar/Header";

function AdminPage() {
  return (
    <div>
      <Header />
      <div>
        <AdminHome />
      </div>
    </div>
  );
}

export default AdminPage;
