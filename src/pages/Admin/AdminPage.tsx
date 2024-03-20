import { useDispatch } from "react-redux";
import UserTableComponent from "../../components/Admin/Content/User table/UserTableComponent";
import { AppDispatch } from "../../state/store";
import { useEffect } from "react";
import { getUserTable } from "../../state/admin/get-users-slice";
import AdminNav from "../../components/Admin/AdminNavbar/AdminNav";

const AdminPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    try {
      dispatch(getUserTable());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [dispatch]);

  return (
    <>
      <AdminNav />
      <UserTableComponent />
    </>
  );
};

export default AdminPage;
