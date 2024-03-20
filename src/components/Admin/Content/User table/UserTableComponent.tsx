import {
  Alert,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../state/store";
import { User } from "../../../../interfaces/user-interface";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import { getUserTable } from "../../../../state/admin/get-users-slice";
import { deleteUser } from "../../../../state/admin/delete-user-slice";
import { useState } from "react";
import AdminModalComponent from "../../Modal/AdminModalComponent";
import SkeletonComponent from "../../../ui/SkeletonComponent";
import Container from "../../../Container";
import { translate } from "../../../../assets/i18n";

const UserTableComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector<RootState, User[]>(
    (state) => state.userTable.users
  );
  const status = useSelector<RootState>((state) => state.userTable.status);
  const statusOfUserAdd = useSelector<RootState>((state) => state.add.status);
  const nameOfAddedUser = useSelector<RootState>(
    (state) => state.add.firstName
  );
  const deletionStatus = useSelector<RootState>(
    (state) => state.deleteUser.status
  );
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );

  const handleDelete = (userId: string | null) => {
    try {
      dispatch(deleteUser(userId));
    } catch (error) {
      console.error("User deletion error: ", error);
    }
  };

  const handleRefresh = () => {
    try {
      dispatch(getUserTable());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Container>
      {status === "loading" ? (
        <div>
          <SkeletonComponent />
        </div>
      ) : (
        <div className="pt-40">
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: 20, fontWeight: "bold" }}>
                  <div className="dark:text-white">
                    {translate("fullName", preferredLanguage)}
                  </div>
                </TableCell>
                <TableCell sx={{ fontSize: 20, fontWeight: "bold" }}>
                  <div className="dark:text-white">
                    {translate("address", preferredLanguage)}
                  </div>
                </TableCell>
                <TableCell sx={{ fontSize: 20, fontWeight: "bold" }}>
                  <div className="dark:text-white">
                    {translate("phoneNumber", preferredLanguage)}
                  </div>
                </TableCell>
                <TableCell sx={{ fontSize: 20, fontWeight: "bold" }}>
                  <div className="dark:text-white">
                    {translate("role", preferredLanguage)}
                  </div>
                </TableCell>
                <TableCell sx={{ fontSize: 20, fontWeight: "bold" }}>
                  <div className="dark:text-white">
                    {translate("actions", preferredLanguage)}
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="dark:text-neutral-400">
                      {user.firstName} {user.lastName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="dark:text-neutral-400">{user.address}</div>
                  </TableCell>
                  <TableCell>
                    <div className="dark:text-neutral-400">
                      {user.phoneNumber}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="dark:text-neutral-400">{user.role}</div>
                  </TableCell>
                  <TableCell sx={{ display: "flex", gap: 1 }}>
                    <div title="Edit" className="cursor-pointer">
                      <EditIcon color="primary" />
                    </div>
                    <div
                      title="Delete"
                      className="cursor-pointer"
                      onClick={() => handleDelete(user.id)}
                    >
                      <DeleteIcon sx={{ color: "red" }} />
                    </div>
                    {deletionStatus === "loading" && (
                      <div>
                        <CircularProgress />
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex mt-2">
            <div
              title="Add user"
              className="cursor-pointer"
              onClick={handleModal}
            >
              <AddIcon color="success" fontSize="large" />
            </div>
            <div
              title="Refresh"
              className="cursor-pointer dark:text-white"
              onClick={handleRefresh}
            >
              <RefreshIcon fontSize="large" />
            </div>
          </div>
        </div>
      )}
      <Snackbar open={deletionStatus === "succeeded"}>
        <Alert severity="success">User deleted</Alert>
      </Snackbar>
      <Snackbar open={statusOfUserAdd === "succeeded"}>
        <Alert severity="success">
          User {nameOfAddedUser ? `(${nameOfAddedUser})` : ""} added
        </Alert>
      </Snackbar>
      {isModalOpen && (
        <AdminModalComponent isOpen={isModalOpen} handleModal={handleModal} />
      )}
    </Container>
  );
};

export default UserTableComponent;
