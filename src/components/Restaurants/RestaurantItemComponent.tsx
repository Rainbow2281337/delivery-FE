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
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";

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
          image="https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=600"
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
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-2">
              <MenuBookOutlinedIcon />
              <span>{data.cuisineType}</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <LocationOnOutlinedIcon />
              <span>{data.address}</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <PhoneInTalkOutlinedIcon />
              <span>{data.phoneNumber}</span>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RestaurantItemComponent;
