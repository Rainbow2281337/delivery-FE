import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { nameRegex } from "../../../consts";
import { addDish } from "../../../api/addDish";
import { useParams } from "react-router-dom";

interface AdminAddDishComponentProps {
  isOpen: boolean;
  handleModal: () => void;
}

const AdminAddDishComponent: React.FC<AdminAddDishComponentProps> = ({
  isOpen,
  handleModal,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const weightString = formData.get("weight")?.toString() as string;
    const ingredientsString = formData.get("ingredients") as string;
    const caloriesString = formData.get("calories")?.toString() as string;
    const category = formData.get("category") as string;
    const priceString = formData.get("price")?.toString() as string;

    const weight = parseFloat(weightString);
    const calories = parseFloat(caloriesString);
    const price = parseFloat(priceString);

    const ingredients = ingredientsString
      .split(",")
      .map((ingredient) => ingredient.trim());

    const dishInfo = {
      title,
      description,
      weight,
      ingredients,
      calories,
      category,
      price,
    };

    try {
      addDish(id, dishInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const weightString = formData.get("weight")?.toString() as string;
    const caloriesString = formData.get("calories")?.toString() as string;
    const category = formData.get("category") as string;
    const priceString = formData.get("price")?.toString() as string;

    const weight = parseFloat(weightString);
    const calories = parseFloat(caloriesString);
    const price = parseFloat(priceString);

    if (
      nameRegex.test(title) &&
      nameRegex.test(description) &&
      nameRegex.test(category)
    ) {
      setIsDisabled(false);
      setError("");
    } else {
      setIsDisabled(true);
      setError("Title, description, category must contain only letters");
    }
    if (weight > 0 && calories > 0 && price > 0) {
      setError("");
    } else {
      setError("Weight, Calories, Price  must not be less than 0");
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
                Add dish
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
                      id="description"
                      label="Description"
                      name="description"
                      helperText="Description must contain only letters"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="ingredients"
                      label="Ingredients"
                      name="ingredients"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="category"
                      label="Category"
                      name="category"
                      helperText="Category must contain only letters"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="number"
                      id="calories"
                      label="Calories"
                      name="calories"
                      InputProps={{ inputProps: { min: 0, max: 2000 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="number"
                      id="weight"
                      label="Weight"
                      name="weight"
                      InputProps={{ inputProps: { min: 1 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="number"
                      id="price"
                      label="Price"
                      name="price"
                      InputProps={{ inputProps: { min: 0 } }}
                    />
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
                    Confirm
                  </Button>
                  {error !== "" && (
                    <span className="text-center text-sm text-red-500">
                      {error}
                    </span>
                  )}
                </Grid>
              </Box>
            </Box>
          </Container>
        </div>
      </Modal>
    </div>
  );
};

export default AdminAddDishComponent;
