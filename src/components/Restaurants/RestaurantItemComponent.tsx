import React from "react";
import { Restaurant } from "../../interfaces/restaurant-interface";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RESTAURANT_ROUTE } from "../../consts";

interface RestaurantItemComponentProps {
  data: Restaurant;
}

const RestaurantItemComponent: React.FC<RestaurantItemComponentProps> = ({
  data,
}) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        maxWidth: 385,
        borderRadius: "10px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardActionArea
        onClick={() => navigate(RESTAURANT_ROUTE + "/" + data.id)}
      >
        <CardMedia
          component="img"
          height="140"
          image="https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="food"
        />
        <CardContent sx={{ backgroundColor: "#f5f5f5" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textTransform: "uppercase" }}
          >
            {data.title}
          </Typography>
          <Chip
            color="info"
            sx={{ position: "absolute", top: 5, right: 3, fontWeight: 700 }}
            label={`Working hours: ${data.openHours} - ${data.closeHours}`}
          />
          <Chip
            color="secondary"
            sx={{
              position: "absolute",
              bottom: 110,
              left: 3,
              fontWeight: 700,
            }}
            label={`Address: ${data.address}`}
          />
          <Chip
            color="info"
            variant="outlined"
            sx={{ fontWeight: 600 }}
            label={data.cuisineType}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RestaurantItemComponent;
