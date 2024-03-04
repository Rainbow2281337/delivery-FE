import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { addUser } from "../../../state/admin/add-user-slice";
import { nameRegex } from "../../../consts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";

interface AdminModalComponentProps {
  isOpen: boolean;
  handleModal: () => void;
}

const AdminModalComponent: React.FC<AdminModalComponentProps> = ({
  isOpen,
  handleModal,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector<RootState>((state) => state.add.status);
  const [isDisabled, setIsDisabled] = useState(true);
  const [role, setRole] = useState("USER");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const address = formData.get("address") as string;
    const phoneNumber = formData.get("number") as string;
    const role = formData.get("role") as string;

    const credentials = {
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
      role,
    };

    try {
      await dispatch(addUser(credentials));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);

    const password = formData.get("password") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    if (
      password.length > 3 &&
      nameRegex.test(firstName) &&
      nameRegex.test(lastName)
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="">
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ color: "white", fontWeight: 600 }}
                component="h1"
                variant="h4"
              >
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                onChange={handleChange}
                sx={{
                  mt: 3,
                  borderRadius: "30px",
                  padding: 5,
                  backgroundColor: "#f7f2e7",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      helperText="The first name must contain only letters"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      helperText="The last name must contain only letters"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
                      autoComplete="address"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="number"
                      label="Phone number"
                      name="number"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      helperText="Password must be longer than 3 characters"
                      type="password"
                      id="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Select
                      required
                      fullWidth
                      name="role"
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <MenuItem value="USER">USER</MenuItem>
                      <MenuItem value="DELIVERYMAN">DELIVERYMAN</MenuItem>
                      <MenuItem value="ADMIN">ADMIN</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isDisabled}
                  sx={{ mt: 3, mb: 2, borderRadius: "10px", fontSize: "18px" }}
                >
                  {status === "loading" ? "Loading" : "Confirm"}
                </Button>
              </Box>
            </Box>
          </Container>
        </div>
      </Modal>
    </div>
  );
};

export default AdminModalComponent;
