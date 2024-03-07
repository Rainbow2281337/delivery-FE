import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../state/store";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { addRestaurant } from "../../../state/admin/add-restaurant-slice";
import { nameRegex } from "../../../consts";
import { getRestaurants } from "../../../state/restaurant/restaurant-slice";

interface AdminModalAddRestaurantComponentProps {
  isOpen: boolean;
  handleModal: () => void;
}

const AdminModalAddRestaurantComponent: React.FC<
  AdminModalAddRestaurantComponentProps
> = ({ isOpen, handleModal }) => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector<RootState>((state) => state.addRestaurant.status);
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const timeOptions: string[] = [];

  // Generate time options with 30-minute intervals
  for (let hours = 5; hours <= 22; hours++) {
    for (let minutes = 0; minutes <= 50; minutes += 30) {
      const formattedTime =
        hours.toString().padStart(2, "0") +
        ":" +
        minutes.toString().padStart(2, "0");
      timeOptions.push(formattedTime);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const title = formData.get("title") as string;
    const cuisineType = formData.get("cuisineType") as string;
    const address = formData.get("address") as string;
    const phoneNumber = formData.get("number") as string;

    const credentials = {
      title,
      cuisineType,
      address,
      openHours: openTime,
      closeHours: closeTime,
      phoneNumber,
    };

    try {
      dispatch(addRestaurant(credentials));
      dispatch(getRestaurants());
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);

    const title = formData.get("title") as string;
    const cusineType = formData.get("cuisineType") as string;

    if (nameRegex.test(title) && nameRegex.test(cusineType)) {
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
        <div>
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
                Add restaurant
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
                  <Grid item xs={12}>
                    <TextField
                      name="title"
                      required
                      fullWidth
                      id="title"
                      label="Title"
                      helperText="Title must contain only letters"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="cuisineType"
                      label="Cuisine type"
                      name="cuisineType"
                      helperText="Cuisine type must contain only letters"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
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
                  <Grid item xs={12} sm={6}>
                    <InputLabel id="open-time">Select open time</InputLabel>
                    <Select
                      id="time"
                      fullWidth
                      value={openTime}
                      labelId="open-time"
                      onChange={(e) => setOpenTime(e.target.value)}
                    >
                      {timeOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel id="close-time">Select close time</InputLabel>
                    <Select
                      id="time"
                      fullWidth
                      value={closeTime}
                      labelId="close-time"
                      onChange={(e) => setCloseTime(e.target.value)}
                    >
                      {timeOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isDisabled}
                    sx={{
                      mt: 3,
                      mb: 2,
                      borderRadius: "10px",
                      fontSize: "18px",
                    }}
                  >
                    {status === "loading" ? "Loading" : "Confirm"}
                  </Button>
                </Grid>
              </Box>
            </Box>
          </Container>
        </div>
      </Modal>
    </div>
  );
};

export default AdminModalAddRestaurantComponent;
